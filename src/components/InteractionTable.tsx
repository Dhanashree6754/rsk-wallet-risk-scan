import { ContractInteraction } from '@/types/wallet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface Props {
  interactions: ContractInteraction[];
}

export function InteractionTable({ interactions }: Props) {
  if (interactions.length === 0) {
    return <p className="text-[#a0a0a0]">No contract interactions found.</p>;
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-[#2a2a2a]">
          <TableRow className="hover:bg-transparent border-b border-[#2a2a2a]">
            <TableHead className="text-white">Contract Address</TableHead>
            <TableHead className="text-white">Interaction Count</TableHead>
            <TableHead className="text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interactions.map((interaction) => (
            <TableRow key={interaction.address} className="border-b border-[#2a2a2a] hover:bg-[#2a2a2a]">
              <TableCell className="font-mono text-[#a0a0a0]">{interaction.address.slice(0, 6)}...{interaction.address.slice(-4)}</TableCell>
              <TableCell className="text-[#a0a0a0]">{interaction.count}</TableCell>
              <TableCell>
                <Badge variant={interaction.known ? 'default' : 'secondary'} className="border-0">
                  {interaction.known ? 'Known' : 'Unknown'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}