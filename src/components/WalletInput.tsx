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
    <form
      className="space-y-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleScan();
      }}
    >
      <label htmlFor="wallet-address" className="sr-only">
        Wallet address
      </label>
      <div className="flex gap-2">
        <Input
          id="wallet-address"
          placeholder="0x..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={isLoading}
          className="text-white placeholder:text-gray-400"
          aria-label="Wallet address"
          aria-invalid={!!error}
          aria-describedby={error ? 'wallet-address-error' : undefined}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-[#FF6600] hover:bg-[#FF6600]/80 text-white font-medium"
        >
          {isLoading ? 'Scanning...' : 'Scan Wallet'}
        </Button>
      </div>
      {error && (
        <p id="wallet-address-error" className="text-sm text-red-500" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </form>
  );
}