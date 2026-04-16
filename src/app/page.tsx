'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletInput } from '@/components/WalletInput';
import { Dashboard } from '@/components/Dashboard';
import { scanWallet } from '@/services/walletService';
import { RiskReport } from '@/types/wallet';
import { Loader2, Shield, Zap, FileText, Search } from 'lucide-react';

export default function Home() {
  const { address: connectedAddress, isConnected } = useAccount();
  const [report, setReport] = useState<RiskReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScan = async (address: string) => {
    setLoading(true);
    setError('');
    setReport(null); // Clear previous results immediately
    try {
      const data = await scanWallet(address);
      setReport(data); // Only set report after successful scan
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to scan wallet. Please try again.';
      setError(message);
      setReport(null); // Ensure no results on error
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex-1 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              RSK Wallet Risk Scan
            </h1>
            <p className="text-xl text-[#a0a0a0] max-w-2xl mx-auto">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              RSK Wallet Risk Scan
            </h1>
            <p className="text-gray-400 text-lg">
              Analyze any Rootstock wallet for security risks, token approvals, and contract interactions.
            </p>
            <div className="mt-4 h-1 w-24 bg-[#FF6600] rounded"></div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group">
            <Shield className="text-[#FF6600] text-3xl mb-4" aria-hidden="true" focusable="false" />
            <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">Risk Detection</h3>
            <p className="text-gray-400 text-sm">
              Identify unlimited approvals, high allowances, and suspicious contract interactions.
            </p>
            </div>
            <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group">
            <Zap className="text-[#FF6600] text-3xl mb-4" aria-hidden="true" focusable="false" />
            <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">Instant Scan</h3>
            <p className="text-gray-400 text-sm">
              Connect your wallet or paste any RSK address for immediate analysis.
            </p>
            </div>
            <div className="bg-[#111111] border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group">
            <FileText className="text-[#FF6600] text-3xl mb-4" aria-hidden="true" focusable="false" />
            <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">Detailed Report</h3>
            <p className="text-gray-400 text-sm">
              Get a comprehensive dashboard with risk score, flagged approvals, and contract list.
            </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
            <Search className="text-[#FF6600]" aria-hidden="true" focusable="false" />
            Start Scanning
          </h2>

          <div className="mb-6">
            {!isConnected && (
              <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 mb-4">
                <p className="text-yellow-500 text-sm">
                  <strong>Optional:</strong> Connect your wallet to quickly copy your address or use WalletConnect. You can still scan any address without connecting.
                </p>
              </div>
            )}

            {isConnected && connectedAddress && (
              <p className="text-sm text-[#a0a0a0] mb-2 text-center">
                Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)} (ready to scan)
              </p>
            )}

            <WalletInput onScan={handleScan} isLoading={loading} />

            {!isConnected && (
              <div className="flex justify-center mt-4">
                <ConnectButton />
              </div>
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
            <div
              className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-center"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          {/* Dashboard (only after successful scan) */}
          {report && !loading && (
            <div className="mt-8 pt-8 border-t border-[#2a2a2a]">
              <Dashboard report={report} />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}