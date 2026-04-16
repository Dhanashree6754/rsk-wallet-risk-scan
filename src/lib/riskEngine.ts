import { Approval, ContractInteraction } from '@/types/wallet';

export function calculateRiskScore(
  txCount: number,
  approvals: Approval[],
  contractInteractions: ContractInteraction[]
): { score: number; reasons: string[]; riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' } {
  const reasons: string[] = [];
  let score = 0;

  // Unlimited approvals
  const unlimitedApprovals = approvals.filter(a => a.riskFlag === 'unlimited').length;
  if (unlimitedApprovals > 0) {
    score += unlimitedApprovals * 40;
    reasons.push(`${unlimitedApprovals} unlimited approval(s)`);
  }

  // High value approvals
  const highApprovals = approvals.filter(a => a.riskFlag === 'high').length;
  if (highApprovals > 0) {
    score += highApprovals * 10;
    reasons.push(`${highApprovals} high allowance approval(s)`);
  }

  // Contract interactions > 10
  const totalInteractions = contractInteractions.reduce((acc, cur) => acc + cur.count, 0);
  if (totalInteractions > 10) {
    score += 20;
    reasons.push(`More than 10 contract interactions (${totalInteractions})`);
  }

  // Unknown contract interactions
  const unknownInteractions = contractInteractions.filter(c => !c.known).length;
  if (unknownInteractions > 0) {
    score += unknownInteractions * 5;
    reasons.push(`${unknownInteractions} unknown contract(s)`);
  }

  // Transaction count > 50
  if (txCount > 50) {
    score += 10;
    reasons.push(`More than 50 transactions (${txCount})`);
  }

  let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (score >= 61) riskLevel = 'HIGH';
  else if (score >= 31) riskLevel = 'MEDIUM';

  return { score, reasons, riskLevel };
}