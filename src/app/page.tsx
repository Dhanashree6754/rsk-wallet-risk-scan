'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletInput } from '@/components/WalletInput';
import { Dashboard } from '@/components/Dashboard';
import { scanWallet } from '@/services/walletService';
import { RiskReport } from '@/types/wallet';
import { Loader2, AlertCircle, Shield, Zap, FileText, Search } from 'lucide-react';

export default function Home() {
  const { address: connectedAddress, isConnected } = useAccount();
  const [scanAddress, setScanAddress] = useState('');
  const [report, setReport] = useState<RiskReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Clear all data when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setReport(null);
      setScanAddress('');
      setError('');
    }
  }, [isConnected]);

  const handleScan = async (address: string) => {
    setScanAddress(address);
    setLoading(true);
    setError('');
    setReport(null);
    try {
      const data = await scanWallet(address);
      setReport(data);
    } catch (err: any) {
      setError(err.message || 'Failed to scan wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <main className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              RSK Wallet Risk Scan
            </h1>
            <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RSK Wallet Risk Scan
          </h1>
          <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">
            Analyze any Rootstock wallet for security risks, token approvals, and contract interactions.
          </p>
        </div>

        {/* Feature Cards (always visible) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <Shield className="text-[#FF6600] text-3xl mb-4" />
            <h3 className="text-white font-semibold mb-2">Risk Detection</h3>
            <p className="text-[#a0a0a0] text-sm">
              Identify unlimited approvals, high allowances, and suspicious contract interactions.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <Zap className="text-[#FF6600] text-3xl mb-4" />
            <h3 className="text-white font-semibold mb-2">Instant Scan</h3>
            <p className="text-[#a0a0a0] text-sm">
              Connect your wallet or paste any RSK address for immediate analysis.
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <FileText className="text-[#FF6600] text-3xl mb-4" />
            <h3 className="text-white font-semibold mb-2">Detailed Report</h3>
            <p className="text-[#a0a0a0] text-sm">
              Get a comprehensive dashboard with risk score, flagged approvals, and contract list.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Search className="text-[#FF6600]" />
            Start Scanning
          </h2>

          {/* Show only Connect Wallet button when not connected */}
          {!isConnected && (
            <div className="text-center py-8">
              <p className="text-[#a0a0a0] mb-6">
                Connect your wallet to start scanning your address.
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          )}

          {/* Show input and scan button only when connected */}
          {isConnected && (
            <>
              <div className="mb-6">
                <WalletInput onScan={handleScan} isLoading={loading} />
                {connectedAddress && (
                  <p className="text-sm text-[#a0a0a0] mt-2 text-center">
                    Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
                  </p>
                )}
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#FF6600]" />
                  <span className="ml-2 text-[#a0a0a0]">Scanning wallet...</span>
                </div>
              )}

              {/* Error Message */}
              {error && !loading && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center">
                  {error}
                </div>
              )}

              {/* Dashboard (only after successful scan) */}
              {report && !loading && (
                <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
                  <Dashboard report={report} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}