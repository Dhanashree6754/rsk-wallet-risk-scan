import { RiskReport } from '@/types/wallet';

export async function scanWallet(address: string): Promise<RiskReport> {
  const response = await fetch(`/api/scan?address=${address}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to scan wallet');
  }
  return response.json();
}