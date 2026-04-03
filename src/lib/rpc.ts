import { ethers } from 'ethers';

function getDefaultRpcUrl(): string {
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
  if (chainId === 31) return 'https://public-node.testnet.rsk.co';
  // Rootstock mainnet chainId is 30
  return 'https://public-node.rsk.co';
}

function normalizeRpcUrl(rpcUrl: string): string {
  const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
  const url = rpcUrl.trim();

  // Common misconfig: chainId=31 (testnet) but mainnet public node URL set.
  if (chainId === 31 && /public-node\.rsk\.co/i.test(url) && !/testnet/i.test(url)) {
    return 'https://public-node.testnet.rsk.co';
  }

  // Common misconfig: chainId=30 (mainnet) but testnet URL set.
  if (chainId === 30 && /public-node\.testnet\.rsk\.co/i.test(url)) {
    return 'https://public-node.rsk.co';
  }

  return url;
}

const RPC_URL = normalizeRpcUrl(process.env.NEXT_PUBLIC_RSK_RPC || getDefaultRpcUrl());

export const provider = new ethers.JsonRpcProvider(RPC_URL);

// Helper to get transaction count
export async function getTransactionCount(address: string): Promise<number> {
  return await provider.getTransactionCount(address);
}