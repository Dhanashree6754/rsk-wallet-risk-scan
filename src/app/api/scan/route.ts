import { NextRequest, NextResponse } from 'next/server';
import { provider } from '@/lib/rpc';
import { RiskReport, Approval, ContractInteraction } from '@/types/wallet';
import { ethers } from 'ethers';
import { calculateRiskScore } from '@/lib/riskEngine';
import { normalizeAddress } from '@/utils/addressValidator';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

type RateBucket = { windowStartMs: number; count: number };
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;

function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimitOk(ip: string): boolean {
  const now = Date.now();
  const g = globalThis as unknown as { __scanRate?: Map<string, RateBucket> };
  if (!g.__scanRate) g.__scanRate = new Map();
  const m = g.__scanRate;

  const bucket = m.get(ip) ?? { windowStartMs: now, count: 0 };
  if (now - bucket.windowStartMs > RATE_LIMIT_WINDOW_MS) {
    bucket.windowStartMs = now;
    bucket.count = 0;
  }
  bucket.count += 1;
  m.set(ip, bucket);
  return bucket.count <= RATE_LIMIT_MAX;
}

export function __resetScanRateForTests(): void {
  const g = globalThis as unknown as { __scanRate?: Map<string, RateBucket> };
  g.__scanRate = new Map();
}

function getDefaultExplorerApiBase(): string {
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
  if (chainId === 31) return 'https://rootstock-testnet.blockscout.com/api';
  // Rootstock mainnet chainId is 30
  return 'https://rootstock.blockscout.com/api';
}

export function assertAllowedExplorerApiBase(input: string): string {
  const trimmed = input.trim();
  let u: URL;
  try {
    u = new URL(trimmed);
  } catch {
    throw new Error(`Invalid NEXT_PUBLIC_EXPLORER_API URL: ${trimmed}`);
  }

  if (u.protocol !== 'https:') {
    throw new Error(`NEXT_PUBLIC_EXPLORER_API must use https:, got ${u.protocol}`);
  }

  const allowedHosts = new Set(['rootstock.blockscout.com', 'rootstock-testnet.blockscout.com']);
  if (!allowedHosts.has(u.hostname)) {
    throw new Error(
      `NEXT_PUBLIC_EXPLORER_API host not allowed: ${u.hostname}. Allowed: ${Array.from(allowedHosts).join(', ')}`
    );
  }

  // We expect the Blockscout "base" for Etherscan-style queries to be /api.
  if (u.pathname.replace(/\/+$/, '') !== '/api') {
    throw new Error(`NEXT_PUBLIC_EXPLORER_API must end with /api, got path: ${u.pathname}`);
  }

  // Normalize to a canonical base (no query/hash, no trailing slash beyond /api).
  u.search = '';
  u.hash = '';
  u.pathname = '/api';
  return u.toString();
}

function normalizeExplorerApiBase(input: string): string {
  const trimmed = input.trim();
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);

  // If user set the old rsk explorer URL, map it to Blockscout.
  if (/explorer\.rsk\.co\/api/i.test(trimmed)) {
    return chainId === 31
      ? 'https://rootstock-testnet.blockscout.com/api'
      : 'https://rootstock.blockscout.com/api';
  }

  // Common misconfig: chainId=31 but mainnet Blockscout base.
  if (chainId === 31 && /rootstock\.blockscout\.com\/api/i.test(trimmed)) {
    return 'https://rootstock-testnet.blockscout.com/api';
  }

  // Common misconfig: chainId=30 but testnet Blockscout base.
  if (chainId === 30 && /rootstock-testnet\.blockscout\.com\/api/i.test(trimmed)) {
    return 'https://rootstock.blockscout.com/api';
  }

  return trimmed;
}

// Blockscout API supports the Etherscan-style `module=account&action=txlist`.
function getExplorerApiBaseAllowed(): string {
  const base = normalizeExplorerApiBase(
    process.env.NEXT_PUBLIC_EXPLORER_API || getDefaultExplorerApiBase()
  );
  return assertAllowedExplorerApiBase(base);
}

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

function getExplorerFallbackBases(): string[] {
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
  return chainId === 31
    ? ['https://rootstock-testnet.blockscout.com/api', 'https://rootstock.blockscout.com/api']
    : ['https://rootstock.blockscout.com/api', 'https://rootstock-testnet.blockscout.com/api'];
}

export async function fetchExplorerAPIWithFallback(url: string) {
  const first = await fetchExplorerAPI(url);
  if (first !== null) return first;

  // If the configured base is wrong (404/blocked), retry with known bases.
  const fallbacks = getExplorerFallbackBases();
  for (const base of fallbacks) {
    if (url.startsWith(base)) continue;
    const explorerBase = getExplorerApiBaseAllowed();
    const retryUrl = url.replace(explorerBase, base);
    const data = await fetchExplorerAPI(retryUrl);
    if (data !== null) return data;
  }
  return null;
}

type ExplorerTx = { to: string | null };

async function fetchExplorerTransactionsPaged(
  address: string,
  opts?: { pageSize?: number; maxPages?: number }
): Promise<{ transactions: ExplorerTx[]; totalCount: number }> {
  const addressEncoded = encodeURIComponent(address);
  const pageSize = Math.max(1, Math.min(opts?.pageSize ?? 200, 1000));
  const maxPages = Math.max(1, Math.min(opts?.maxPages ?? 10, 50));

  const all: ExplorerTx[] = [];
  const explorerBase = getExplorerApiBaseAllowed();

  for (let page = 1; page <= maxPages; page++) {
    const apiUrl = `${explorerBase}?module=account&action=txlist&address=${addressEncoded}&sort=desc&page=${page}&offset=${pageSize}`;
    const data = await fetchExplorerAPIWithFallback(apiUrl);

    // Blockscout-style API: { status: "1"|"0", result: []|string }
    const pageTxs = data?.status === '1' && Array.isArray(data.result) ? data.result : [];
    if (pageTxs.length === 0) break;

    for (const tx of pageTxs) {
      all.push({ to: typeof tx?.to === 'string' ? tx.to : null });
    }

    // If we got less than a full page, we reached the end.
    if (pageTxs.length < pageSize) break;
  }

  return { transactions: all, totalCount: all.length };
}

async function isVerifiedContractOnExplorer(address: string): Promise<boolean> {
  const addressEncoded = encodeURIComponent(address);
  const explorerBase = getExplorerApiBaseAllowed();
  const url = `${explorerBase}?module=contract&action=getsourcecode&address=${addressEncoded}`;
  const data = await fetchExplorerAPIWithFallback(url);

  // Blockscout getsourcecode returns { status: "1", result: [ { SourceCode, ABI, ... } ] }
  const first = Array.isArray(data?.result) ? data.result[0] : null;
  const sourceCode = typeof first?.SourceCode === 'string' ? first.SourceCode : '';
  const abi = typeof first?.ABI === 'string' ? first.ABI : '';

  return sourceCode.trim().length > 0 || (abi.trim().length > 0 && abi.trim() !== 'Contract source code not verified');
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

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return await Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

async function fetchContractInteractions(
  explorerTxs: ExplorerTx[],
  opts?: { maxTxs?: number; timeoutMs?: number; batchSize?: number }
): Promise<ContractInteraction[]> {
  const maxTxs = Math.max(1, Math.min(opts?.maxTxs ?? 200, 2000));
  const timeoutMs = Math.max(250, Math.min(opts?.timeoutMs ?? 2500, 15000));
  const batchSize = Math.max(1, Math.min(opts?.batchSize ?? 10, 50));

  // Count interactions by `to` address first (cheap, no RPC).
  const interactionMap = new Map<string, number>();
  for (const tx of explorerTxs.slice(0, maxTxs)) {
    const to = tx.to;
    if (!to || to === ZERO_ADDRESS) continue;
    interactionMap.set(to, (interactionMap.get(to) || 0) + 1);
  }

  // Dedup and check contract code with concurrency limit + timeout.
  const uniqueTo = Array.from(interactionMap.keys());
  const isContractMap = new Map<string, boolean>();
  const knownMap = new Map<string, boolean>();

  for (let i = 0; i < uniqueTo.length; i += batchSize) {
    const batch = uniqueTo.slice(i, i + batchSize);
    const results = await Promise.allSettled(
      batch.map(async (addr) => {
        const isC = await withTimeout(isContract(addr), timeoutMs);
        return { addr, isC };
      })
    );

    results.forEach((r, idx) => {
      if (r.status === 'fulfilled') isContractMap.set(r.value.addr, r.value.isC);
      else isContractMap.set(batch[idx], false);
    });
  }

  // Mark "known" if Blockscout has verified source/ABI (best-effort, capped).
  const contractAddrs = uniqueTo.filter((a) => isContractMap.get(a) === true).slice(0, 25);
  const verifyResults = await Promise.allSettled(
    contractAddrs.map(async (addr) => {
      const isVerified = await withTimeout(isVerifiedContractOnExplorer(addr), 3000);
      return { addr, isVerified };
    })
  );
  for (const r of verifyResults) {
    if (r.status === 'fulfilled') knownMap.set(r.value.addr, r.value.isVerified);
  }

  return Array.from(interactionMap.entries())
    .filter(([addr]) => isContractMap.get(addr) === true)
    .map(([address, count]) => ({ address, count, known: knownMap.get(address) === true }));
}

function parseApprovalLogs(
  logs: Array<{ address: string; topics: readonly string[]; data: string }>
): Approval[] {
  const approvals: Approval[] = [];
  for (const log of logs) {
    // ERC721 Approval has an indexed tokenId => topics length is 4 and data is usually 0x.
    if (log.topics.length !== 3) continue;

    const token = log.address;
    const spender = ethers.getAddress('0x' + log.topics[2].slice(26)); // last 20 bytes
    if (!log.data || log.data === '0x') continue;

    let value: bigint;
    try {
      value = ethers.toBigInt(log.data);
    } catch {
      continue;
    }

    if (value === ethers.MaxUint256) {
      approvals.push({ token, spender, allowance: 'Unlimited', riskFlag: 'unlimited' });
      continue;
    }

    const allowanceStr = value.toString();
    const riskFlag: 'high' | 'low' = value > ethers.parseEther('1000000') ? 'high' : 'low';
    approvals.push({ token, spender, allowance: allowanceStr, riskFlag });
  }
  return approvals;
}

async function fetchApprovals(address: string): Promise<Approval[]> {
  const rawChunk = process.env.APPROVAL_SCAN_CHUNK_SIZE;
  const parsedChunk = rawChunk === undefined ? undefined : Number(rawChunk);
  const chunkSize =
    parsedChunk === undefined
      ? 5000
      : Number.isFinite(parsedChunk) && parsedChunk > 0
        ? Math.trunc(parsedChunk)
        : (() => {
            throw new Error(`Invalid APPROVAL_SCAN_CHUNK_SIZE: ${rawChunk}`);
          })();
  const boundedChunkSize = Math.max(1000, chunkSize);
  const latestBlock = await provider.getBlockNumber();
  const fromBlock = Math.max(latestBlock - boundedChunkSize, 0);

  const tryGetLogs = async (p: ethers.JsonRpcProvider) => {
    const approvalTopic = ethers.id('Approval(address,address,uint256)');
    const paddedAddress = ethers.zeroPadValue(address, 32);
    return await p.getLogs({
      fromBlock,
      toBlock: 'latest',
      topics: [approvalTopic, paddedAddress],
    });
  };

  try {
    const logs = await tryGetLogs(provider);
    return parseApprovalLogs(logs);
  } catch (error) {
    console.error('Error fetching approvals:', error);

    // Fallback: some public RPCs intermittently fail or disable eth_getLogs.
    const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
    const fallbacks =
      chainId === 31
        ? ['https://rootstock-testnet.drpc.org', 'https://public-node.testnet.rsk.co']
        : ['https://public-node.rsk.co'];

    for (const url of fallbacks) {
      try {
        // Skip if it's the same URL already in use.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentUrl = (provider as any)?._getConnection?.()?.url;
        if (typeof currentUrl === 'string' && currentUrl === url) continue;

        const p = new ethers.JsonRpcProvider(url);
        const logs = await tryGetLogs(p);
        return parseApprovalLogs(logs);
      } catch {
        // try next fallback
      }
    }

    return [];
  }
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  if (!rateLimitOk(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Invalid address' }, { status: 400 });
  }

  try {
    const normalizedAddress = normalizeAddress(address);
    if (!normalizedAddress) {
      return NextResponse.json({ error: 'Invalid RSK address format' }, { status: 400 });
    }

    // Fetch data in parallel with individual error handling
    const [txCount, approvals, explorerTxs] = await Promise.allSettled([
      provider.getTransactionCount(normalizedAddress), // outgoing nonce only (fallback)
      fetchApprovals(normalizedAddress),
      fetchExplorerTransactionsPaged(normalizedAddress),
    ]);

    // Handle results with defaults
    const nonceTxCount = txCount.status === 'fulfilled' ? txCount.value : 0;
    const finalApprovals = approvals.status === 'fulfilled' ? approvals.value : [];
    const explorerResult =
      explorerTxs.status === 'fulfilled'
        ? explorerTxs.value
        : { transactions: [] as ExplorerTx[], totalCount: 0 };
    const finalExplorerTxs = explorerResult.transactions;
    const explorerTxCount = explorerResult.totalCount;

    // Prefer explorer tx count (incoming+outgoing). Fallback to nonce when explorer fails/returns 0.
    const finalTxCount = explorerTxCount > 0 ? explorerTxCount : nonceTxCount;

    const contractInteractions = await fetchContractInteractions(finalExplorerTxs, {
      maxTxs: 200,
      timeoutMs: 2500,
      batchSize: 10,
    });

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
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}