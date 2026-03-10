'use client';

import { FaShieldAlt, FaSearch, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaLock } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <main className="flex-1 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">About RSK Wallet Risk Scan</h1>

        <div className="space-y-8">
          {/* What is RSK Wallet Risk Scan */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaShieldAlt className="text-[#FF6600]" />
              What is RSK Wallet Risk Scan?
            </h2>
            <p className="text-[#a0a0a0] leading-relaxed">
              RSK Wallet Risk Scan is a security analysis tool for the Rootstock (RSK) network. It allows users
              to connect their wallet or enter any RSK address to receive a comprehensive risk report. The tool
              analyzes token approvals, contract interactions, and transaction patterns to identify potential
              security vulnerabilities and provide actionable insights.
            </p>
          </section>

          {/* How It Works */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaSearch className="text-[#FF6600]" />
              How It Works
            </h2>
            <div className="space-y-4 text-[#a0a0a0]">
              <div className="flex items-start gap-3">
                <span className="text-[#FF6600] font-bold">1.</span>
                <p>
                  <strong className="text-white">Connect or Enter Address:</strong> Connect your wallet using
                  MetaMask or WalletConnect, or manually paste any RSK address.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF6600] font-bold">2.</span>
                <p>
                  <strong className="text-white">Fetch On-Chain Data:</strong> The tool retrieves transaction
                  history, token approvals, and contract interactions via RSK RPC and Explorer API.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF6600] font-bold">3.</span>
                <p>
                  <strong className="text-white">Analyze Risk Factors:</strong> Our risk engine evaluates
                  unlimited approvals, high allowances, unknown contract interactions, and transaction volume.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF6600] font-bold">4.</span>
                <p>
                  <strong className="text-white">Generate Report:</strong> You receive a detailed dashboard
                  with risk score (LOW/MEDIUM/HIGH), flagged approvals, and contract interactions.
                </p>
              </div>
            </div>
          </section>

          {/* Risk Scoring Engine */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaChartLine className="text-[#FF6600]" />
              Risk Scoring Engine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Unlimited Approvals (+40 each)</h3>
                  <p className="text-[#a0a0a0] text-sm">
                    Approvals set to max uint256 can lead to complete token drain if the spender is malicious.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">High Allowances (+10 each)</h3>
                  <p className="text-[#a0a0a0] text-sm">
                    Large allowances (over 1M RBTC) present unnecessary risk.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Frequent Contract Interactions (+20)</h3>
                  <p className="text-[#a0a0a0] text-sm">
                    More than 10 contract interactions may indicate complex DeFi usage or potential risk.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">Unknown Contracts (+5 each)</h3>
                  <p className="text-[#a0a0a0] text-sm">
                    Interacting with unverified contracts can expose you to malicious code.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-1">High Transaction Volume (+10)</h3>
                  <p className="text-[#a0a0a0] text-sm">
                    Over 50 transactions increases exposure to potential risks.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[#a0a0a0] mt-4">
              <strong className="text-white">Score Ranges:</strong> 0–30 = LOW (green), 31–60 = MEDIUM (yellow),
              61+ = HIGH (red)
            </p>
          </section>

          {/* Security & Privacy */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaLock className="text-[#FF6600]" />
              Security & Privacy
            </h2>
            <ul className="space-y-2 text-[#a0a0a0]">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">No Data Storage:</strong> We don't store any wallet addresses or
                  scan results. All analysis is done on-the-fly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">Read-Only Access:</strong> We only read public blockchain data;
                  we never request private keys or signing permissions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">Open Source:</strong> The code is fully open source and auditable
                  on GitHub.
                </span>
              </li>
            </ul>
          </section>

          {/* Use Cases */}
          <section className="bg-[#1a1a1a] border border-[#2a2a2a] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <FaExclamationTriangle className="text-[#FF6600]" />
              Who Should Use This Tool?
            </h2>
            <ul className="space-y-2 text-[#a0a0a0]">
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">Regular Users:</strong> Check your own wallet for risky approvals
                  or unknown contract interactions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">DeFi Participants:</strong> Ensure you haven't granted excessive
                  permissions to protocols.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">Security Researchers:</strong> Analyze any address for potential
                  vulnerabilities.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF6600]">•</span>
                <span>
                  <strong className="text-white">Project Auditors:</strong> Review contract interaction patterns
                  of user wallets.
                </span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}