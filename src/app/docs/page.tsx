'use client';

import { FaBook, FaCode, FaRocket, FaExclamationTriangle, FaSearch, FaGithub, FaShieldAlt, FaNetworkWired, FaFlask } from 'react-icons/fa';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Documentation
            </h1>
            <p className="text-gray-400 text-lg">
              Comprehensive guides and API documentation for RSK Wallet Risk Scan
            </p>
            <div className="mt-4 h-1 w-24 bg-[#FF6600] rounded"></div>
          </div>

          <div className="space-y-10">
            {/* Quick Start */}
            <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
                <FaRocket className="text-[#FF6600]" />
                Quick Start Guide
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">1</span>
                    <h3 className="text-white font-semibold">Connect Your Wallet</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Click "Connect Wallet" and select MetaMask or WalletConnect. Ensure you're on Rootstock mainnet (Chain ID: 30) or testnet (Chain ID: 31).
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">2</span>
                    <h3 className="text-white font-semibold">Enter Address</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Your connected address will be ready for scanning, or paste any RSK address into the input field for analysis.
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">3</span>
                    <h3 className="text-white font-semibold">Run Security Scan</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Click "Scan Wallet" to fetch on-chain data and generate a comprehensive risk report.
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">4</span>
                    <h3 className="text-white font-semibold">Review Results</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Analyze the risk score, flagged approvals, and contract interactions. Take action to revoke risky approvals.
                  </p>
                </div>
              </div>
            </section>

            {/* API Reference */}
            <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
                <FaCode className="text-[#FF6600]" />
                API Reference
              </h2>
              <div className="space-y-6">
                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <h3 className="text-white font-mono font-semibold text-lg mb-3 text-[#FF6600]">
                    GET /api/scan?address={'{address}'}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Returns a comprehensive risk report for the given RSK address. The address must be a valid 0x‑prefixed RSK address.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 font-mono text-sm">GET</span>
                      <code className="bg-[#111111] px-2 py-1 rounded text-gray-300 text-sm">
                        /api/scan?address=0x0000000000000000000000000000000000001000
                      </code>
                    </div>
                  </div>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <h3 className="text-white font-semibold text-lg mb-4">Response Format</h3>
                  <pre className="bg-black p-4 rounded-lg overflow-auto text-sm text-gray-300 border border-[#2a2a2a]">
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
            <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
                <FaExclamationTriangle className="text-[#FF6600]" />
                Risk Scoring Algorithm
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-400 font-bold text-lg">+40</span>
                    </div>
                    <h3 className="text-white font-semibold">Unlimited Approvals</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Each unlimited approval (max uint256) adds 40 points to the risk score.
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <span className="text-yellow-400 font-bold text-lg">+10</span>
                    </div>
                    <h3 className="text-white font-semibold">High Allowances</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Each allowance over 1,000,000 RBTC equivalent adds 10 points.
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-lg">+20</span>
                    </div>
                    <h3 className="text-white font-semibold">Contract Interactions</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    More than 10 contract interactions adds 20 points.
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-lg">+5</span>
                    </div>
                    <h3 className="text-white font-semibold">Unknown Contracts</h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Each interaction with unverified contracts adds 5 points.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <h3 className="text-white font-semibold mb-4 text-[#FF6600]">Risk Level Classification</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400 mb-1">0-30</div>
                    <div className="text-green-400 font-medium">LOW RISK</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400 mb-1">31-60</div>
                    <div className="text-yellow-400 font-medium">MEDIUM RISK</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400 mb-1">61+</div>
                    <div className="text-red-400 font-medium">HIGH RISK</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
                <FaNetworkWired className="text-[#FF6600]" />
                Technical Architecture
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaNetworkWired className="text-[#FF6600] text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">RSK RPC Integration</h3>
                  <p className="text-gray-400 text-sm">
                    Direct blockchain queries for transaction counts and contract verification
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaSearch className="text-[#FF6600] text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Explorer API</h3>
                  <p className="text-gray-400 text-sm">
                    Historical transaction data and contract interaction analysis
                  </p>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt className="text-[#FF6600] text-2xl" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Risk Engine</h3>
                  <p className="text-gray-400 text-sm">
                    Advanced algorithm for security assessment and vulnerability detection
                  </p>
                </div>
              </div>
            </section>

            {/* Resources */}
            <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
                <FaBook className="text-[#FF6600]" />
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FaGithub className="text-[#FF6600]" />
                    Developer Resources
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="https://developers.rsk.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#FF6600] hover:text-[#E55A00] transition-colors flex items-center gap-2"
                    >
                      <FaGithub className="text-sm" />
                      Rootstock Developer Documentation
                    </Link>
                    <Link
                      href="https://github.com/rootstock/rsk-wallet-risk-scan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#FF6600] hover:text-[#E55A00] transition-colors flex items-center gap-2"
                    >
                      <FaGithub className="text-sm" />
                      GitHub Repository
                    </Link>
                  </div>
                </div>

                <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FaFlask className="text-[#FF6600]" />
                    Testing & Tools
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href="https://explorer.testnet.rsk.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#FF6600] hover:text-[#E55A00] transition-colors flex items-center gap-2"
                    >
                      <FaFlask className="text-sm" />
                      Rootstock Testnet Explorer
                    </Link>
                    <Link
                      href="https://explorer.rsk.co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-[#FF6600] hover:text-[#E55A00] transition-colors flex items-center gap-2"
                    >
                      <FaSearch className="text-sm" />
                      Rootstock Mainnet Explorer
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-[#FF6600] mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-300 mb-6">
                Start scanning wallets and securing your assets with our comprehensive risk analysis tool.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/"
                  className="px-5 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] transition"
                >
                  Start Scanning
                </a>
                <a
                  href="/contact"
                  className="px-5 py-2 bg-black border border-[#2a2a2a] text-white rounded-lg hover:border-[#FF6600] transition"
                >
                  Get Support
                </a>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  );
}