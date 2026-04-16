import { RiskReport } from '@/types/wallet';
import { RiskScoreCard } from './RiskScoreCard';
import { ApprovalTable } from './ApprovalTable';
import { InteractionTable } from './InteractionTable';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface Props {
  report: RiskReport;
}

export function Dashboard({ report }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{report.transactionCount}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Contract Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{report.contractInteractions.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Token Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{report.approvals.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{report.score}</div>
            <p className="text-xs text-[#a0a0a0]">{report.riskLevel}</p>
          </CardContent>
        </Card>
      </div>

      <RiskScoreCard report={report} />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Token Approvals</h2>
        <ApprovalTable approvals={report.approvals} />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Contract Interactions</h2>
        <InteractionTable interactions={report.contractInteractions} />
      </div>
    </div>
  );
}