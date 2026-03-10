import { RiskReport } from '@/types/wallet';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface Props {
  report: RiskReport;
}

export function RiskScoreCard({ report }: Props) {
  const badgeColor = {
    LOW: 'bg-green-500',
    MEDIUM: 'bg-yellow-500',
    HIGH: 'bg-red-500',
  }[report.riskLevel];

  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
      <CardHeader>
        <CardTitle className="text-white">Risk Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-white">{report.score}</div>
          <Badge className={`${badgeColor} text-white border-0`}>{report.riskLevel}</Badge>
        </div>
        {report.reasons.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-white">Reasons:</p>
            <ul className="list-disc list-inside text-sm text-[#a0a0a0]">
              {report.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}