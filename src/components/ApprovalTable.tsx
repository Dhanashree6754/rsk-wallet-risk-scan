import { Approval } from '@/types/wallet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface Props {
  approvals: Approval[];
}

export function ApprovalTable({ approvals }: Props) {
  if (approvals.length === 0) {
    return <p className="text-[#a0a0a0]">No approvals found.</p>;
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-[#2a2a2a]">
          <TableRow className="hover:bg-transparent border-b border-[#2a2a2a]">
            <TableHead className="text-white">Token</TableHead>
            <TableHead className="text-white">Spender</TableHead>
            <TableHead className="text-white">Allowance</TableHead>
            <TableHead className="text-white">Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((app, idx) => (
            <TableRow key={idx} className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]">
              <TableCell className="font-mono text-[#a0a0a0]">{app.token.slice(0, 6)}...{app.token.slice(-4)}</TableCell>
              <TableCell className="font-mono text-[#a0a0a0]">{app.spender.slice(0, 6)}...{app.spender.slice(-4)}</TableCell>
              <TableCell className="text-[#a0a0a0]">{app.allowance}</TableCell>
              <TableCell>
                <Badge variant={app.riskFlag === 'unlimited' ? 'destructive' : app.riskFlag === 'high' ? 'default' : 'secondary'} className="border-0">
                  {app.riskFlag}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}