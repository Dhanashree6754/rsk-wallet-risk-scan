'use client';

import { useState } from 'react';
import { isValidAddress } from '@/utils/addressValidator';
import { Button } from './ui/button'; // we'll create this shadcn component
import { Input } from './ui/input';

interface WalletInputProps {
  onScan: (address: string) => void;
  isLoading: boolean;
}

export function WalletInput({ onScan, isLoading }: WalletInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleScan = () => {
    if (!address) {
      setError('Please enter an address');
      return;
    }
    if (!isValidAddress(address)) {
      setError('Invalid Ethereum address');
      return;
    }
    setError('');
    onScan(address);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleScan} disabled={isLoading}>
          {isLoading ? 'Scanning...' : 'Scan Wallet'}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}