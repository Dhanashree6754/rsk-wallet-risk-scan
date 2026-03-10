'use client';

import { FaBook, FaCode, FaRocket, FaExclamationTriangle, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="flex-1 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <FaBook className="text-[#FF6600] text-3xl" />
          <h1 className="text-4xl font-bold text-white">Documentation</h1>
        </div>

        <div className="space-y-8">
          {/* Quick Start */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaRocket className="text-[#FF6600]" />
              Quick Start
            </h2>
            <div className="space-y-4 text-[#a0a0a0]">
              <div>
                <h3 className="text-white font-semibold mb-2">1. Connect Your Wallet</h3>
                <p>Click "Connect Wallet" and select MetaMask or WalletConnect. Make sure you're on the Rootstock network (Chain ID: 30) or testnet (Chain ID: 31).</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">2. Enter an Address</h3>
                <p>Your connected address will be auto‑scanned, or you can paste any RSK address into the input field.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">3. Run the Scan</h3>
                <p>Click "Scan Wallet" to fetch on‑chain data and generate a risk report.</p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">4. Review the Dashboard</h3>
                <p>Check the risk score, flagged approvals, and contract interactions. Use the information to revoke risky approvals or investigate unknown contracts.</p>
              </div>
            </div>
          </section>

          {/* API Reference */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaCode className="text-[#FF6600]" />
              API Reference
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#FF6600] pl-4">
                <h3 className="text-white font-mono font-semibold">GET /api/scan?address={'{address}'}</h3>
                <p className="text-[#a0a0a0] text-sm mt-1">
                  Returns a risk report for the given RSK address. The address must be a valid 0x‑prefixed Ethereum address.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Response Format</h3>
                <pre className="bg-[#2a2a2a] p-4 rounded-lg overflow-auto text-sm text-[#a0a0a0]">
{`{
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "score": number,
  "reasons": string[],
  "transactionCount": number,
  "contractInteractions": [
    {
      "address": string,
      "count": number,
      "known": boolean
    }
  ],
  "approvals": [
    {
      "token": string,
      "spender": string,
      "allowance": string,
      "riskFlag": "unlimited" | "high" | "low"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Risk Scoring Details */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-[#FF6600]" />
              Risk Scoring Details
            </h2>
            <div className="space-y-3 text-[#a0a0a0]">
              <div className="flex items-start gap-2">
                <span className="text-[#FF6600] font-bold">•</span>
                <span><strong className="text-white">Unlimited approvals:</strong> +40 points each (token allowance = max uint256)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6600] font-bold">•</span>
                <span><strong className="text-white">High allowance:</strong> +10 points each (allowance &gt; 1,000,000 RBTC equivalent)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6600] font-bold">•</span>
                <span><strong className="text-white">Contract interactions &gt; 10:</strong> +20 points</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6600] font-bold">•</span>
                <span><strong className="text-white">Unknown contract interactions:</strong> +5 points each</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF6600] font-bold">•</span>
                <span><strong className="text-white">Transaction count &gt; 50:</strong> +10 points</span>
              </div>
              <p className="mt-4">
                <strong className="text-white">Score ranges:</strong> 0–30 = <span className="text-green-400">LOW</span>, 31–60 = <span className="text-yellow-400">MEDIUM</span>, 61+ = <span className="text-red-400">HIGH</span>.
              </p>
            </div>
          </section>

          {/* Resources */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaSearch className="text-[#FF6600]" />
              Additional Resources
            </h2>
            <div className="space-y-3">
              <Link
                href="https://developers.rsk.co"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#FF6600] hover:text-[#FF8533] transition-colors"
              >
                → Rootstock Developer Documentation
              </Link>
              <Link
                href="https://explorer.testnet.rsk.co"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#FF6600] hover:text-[#FF8533] transition-colors"
              >
                → Rootstock Block Explorer
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}