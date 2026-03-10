import { ethers } from 'ethers';

const RPC_URL = process.env.NEXT_PUBLIC_RSK_RPC || 'https://public-node.rsk.co';

export const provider = new ethers.JsonRpcProvider(RPC_URL);

// Helper to get transaction count
export async function getTransactionCount(address: string): Promise<number> {
  return await provider.getTransactionCount(address);
}