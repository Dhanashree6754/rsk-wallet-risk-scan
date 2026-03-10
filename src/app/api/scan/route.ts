import { NextRequest, NextResponse } from 'next/server';
import { provider } from '@/lib/rpc';
import { isValidAddress } from '@/utils/addressValidator';
import { RiskReport, Approval, ContractInteraction } from '@/types/wallet';
import { ethers } from 'ethers';
import { calculateRiskScore } from '@/lib/riskEngine';

const EXPLORER_API = process.env.NEXT_PUBLIC_EXPLORER_API || 'https://explorer.rsk.co/api';

// Helper to safely fetch explorer API with timeout
async function fetchExplorerAPI(url: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Explorer API returned ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('Explorer API fetch failed:', error);
    return null; // return null to indicate failure
  }
}

async function fetchExplorerTransactions(address: string): Promise<any[]> {
  // Try normal transactions
  const normalUrl = `${EXPLORER_API}?module=account&action=txlist&address=${address}&sort=desc&offset=100`;
  const normalData = await fetchExplorerAPI(normalUrl);
  const normalTxs = normalData?.status === '1' ? normalData.result : [];

  // Try internal transactions (may not be supported on RSK)
  const internalUrl = `${EXPLORER_API}?module=account&action=txlistinternal&address=${address}&sort=desc&offset=100`;
  const internalData = await fetchExplorerAPI(internalUrl);
  const internalTxs = internalData?.status === '1' ? internalData.result : [];

  return [...normalTxs, ...internalTxs];
}

async function isContract(address: string): Promise<boolean> {
  try {
    const code = await provider.getCode(address);
    return code !== '0x';
  } catch (error) {
    console.error(`Failed to check contract code for ${address}:`, error);
    return false; // assume not a contract on error
  }
}

async function fetchApprovals(address: string): Promise<Approval[]> {
  try {
    const approvalTopic = ethers.id('Approval(address,address,uint256)');
    const paddedAddress = ethers.zeroPadValue(address, 32);
    const latestBlock = await provider.getBlockNumber();
    const fromBlock = Math.max(latestBlock - 5000, 0); // ensure non-negative

    const logs = await provider.getLogs({
      fromBlock,
      toBlock: 'latest',
      topics: [approvalTopic, paddedAddress],
    });

    const approvals: Approval[] = [];

    for (const log of logs) {
      const token = log.address;
      const spender = ethers.getAddress('0x' + log.topics[2].slice(26)); // last 20 bytes
      const value = ethers.toBigInt(log.data);

      let allowanceStr: string;
      let riskFlag: 'unlimited' | 'high' | 'low';

      if (value === ethers.MaxUint256) {
        allowanceStr = 'Unlimited';
        riskFlag = 'unlimited';
      } else {
        allowanceStr = value.toString();
        // Flag as high if > 1,000,000 RBTC worth? This is arbitrary.
        if (value > ethers.parseEther('1000000')) {
          riskFlag = 'high';
        } else {
          riskFlag = 'low';
        }
      }

      approvals.push({
        token,
        spender,
        allowance: allowanceStr,
        riskFlag,
      });
    }

    return approvals;
  } catch (error) {
    console.error('Error fetching approvals:', error);
    return []; // return empty on error
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address || !isValidAddress(address)) {
    return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
  }

  try {
    const normalizedAddress = ethers.getAddress(address);

    // Fetch data in parallel with individual error handling
    const [txCount, approvals, explorerTxs] = await Promise.allSettled([
      provider.getTransactionCount(normalizedAddress),
      fetchApprovals(normalizedAddress),
      fetchExplorerTransactions(normalizedAddress),
    ]);

    // Handle results with defaults
    const finalTxCount = txCount.status === 'fulfilled' ? txCount.value : 0;
    const finalApprovals = approvals.status === 'fulfilled' ? approvals.value : [];
    const finalExplorerTxs = explorerTxs.status === 'fulfilled' ? explorerTxs.value : [];

    // Build contract interactions map
    const interactionMap = new Map<string, number>();

    for (const tx of finalExplorerTxs) {
      const to = tx.to;
      if (to && to !== '0x0000000000000000000000000000000000000000') {
        const isContractAddr = await isContract(to);
        if (isContractAddr) {
          interactionMap.set(to, (interactionMap.get(to) || 0) + 1);
        }
      }
    }

    const contractInteractions: ContractInteraction[] = Array.from(interactionMap.entries()).map(
      ([address, count]) => ({
        address,
        count,
        known: false, // we could check verification later
      })
    );

    // Calculate risk score
    const { score, reasons, riskLevel } = calculateRiskScore(
      finalTxCount,
      finalApprovals,
      contractInteractions
    );

    const report: RiskReport = {
      riskLevel,
      score,
      reasons,
      transactionCount: finalTxCount,
      contractInteractions,
      approvals: finalApprovals,
    };

    return NextResponse.json(report);
  } catch (error) {
    console.error('Unhandled scan error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}