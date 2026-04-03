'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { normalizeAddress } from '@/utils/addressValidator';

interface WalletInputProps {
  onScan: (address: string) => void;
  isLoading: boolean;
}

export function WalletInput({ onScan, isLoading }: WalletInputProps) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleScan = () => {
    if (!address.trim()) {
      setError('Please enter an address');
      return;
    }

    const normalized = normalizeAddress(address);
    if (!normalized) {
      setError('Invalid RSK address format');
      return;
    }

    setError('');
    onScan(normalized);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
          className="text-white placeholder:text-gray-400"
        />
        <Button
          onClick={handleScan}
          disabled={isLoading}
          className="bg-[#FF6600] hover:bg-[#FF6600]/80 text-white font-medium"
        >
          {isLoading ? 'Scanning...' : 'Scan Wallet'}
        </Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}