export interface Approval {
  token: string;          // token contract address
  tokenSymbol?: string;
  spender: string;
  allowance: string;      // as string to avoid bigint issues
  riskFlag: 'unlimited' | 'high' | 'low';
}

export interface ContractInteraction {
  address: string;
  count: number;
  known: boolean;         
}

export interface RiskReport {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  score: number;
  reasons: string[];
  transactionCount: number;
  contractInteractions: ContractInteraction[];
  approvals: Approval[];
}