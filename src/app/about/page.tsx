'use client';

import { FaShieldAlt, FaSearch, FaChartLine, FaLock, FaRocket, FaUsers, FaCode } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              About RSK Wallet Risk Scan
            </h1>
            <p className="text-gray-400 text-lg">
              A comprehensive security analysis tool designed for the Rootstock ecosystem
            </p>
            <div className="mt-4 h-1 w-24 bg-[#FF6600] rounded"></div>
          </div>

          {/* What is RSK Wallet Risk Scan */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
              <FaShieldAlt className="text-[#FF6600]" />
              What is RSK Wallet Risk Scan?
            </h2>
            <p className="text-gray-300 leading-relaxed">
              RSK Wallet Risk Scan is a cutting-edge security analysis tool built specifically for the 
              Rootstock (RSK) network. It empowers users to connect their wallet or analyze any RSK address 
              to receive a comprehensive risk assessment. The tool examines token approvals, contract interactions, 
              and transaction patterns to identify potential security vulnerabilities and provide actionable insights.
            </p>
          </section>

          {/* How It Works */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
              <FaSearch className="text-[#FF6600]" />
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">1</span>
                  <h3 className="text-white font-semibold">Connect or Enter Address</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Connect your wallet using MetaMask or WalletConnect, or manually paste any RSK address for analysis.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">2</span>
                  <h3 className="text-white font-semibold">Fetch On-Chain Data</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  The tool retrieves transaction history, token approvals, and contract interactions via RSK RPC and Explorer API.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">3</span>
                  <h3 className="text-white font-semibold">Analyze Risk Factors</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Our risk engine evaluates unlimited approvals, high allowances, unknown contract interactions, and transaction volume.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 bg-[#FF6600] text-white font-bold rounded-full flex items-center justify-center">4</span>
                  <h3 className="text-white font-semibold">Generate Report</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  Receive a detailed dashboard with risk score (LOW/MEDIUM/HIGH), flagged approvals, and contract interactions.
                </p>
              </div>
            </div>
          </section>

          {/* Risk Scoring Engine */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
              <FaChartLine className="text-[#FF6600]" />
              Risk Scoring Engine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-red-400 font-bold text-lg">+40</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Unlimited Approvals</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      +40 points for each unlimited approval
                    </p>
                    <p className="text-gray-500 text-xs">
                      Approvals set to max uint256 can lead to complete token drain if the spender is malicious.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-yellow-400 font-bold text-lg">+10</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">High Allowances</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      +10 points for each high allowance
                    </p>
                    <p className="text-gray-500 text-xs">
                      Large allowances (over 1M RBTC) present unnecessary risk exposure.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-orange-400 font-bold text-lg">+20</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Contract Interactions</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      +20 points for frequent activity
                    </p>
                    <p className="text-gray-500 text-xs">
                      More than 10 contract interactions may indicate complex DeFi usage or potential risk.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold text-lg">+5</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Unknown Contracts</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      +5 points for each unknown contract
                    </p>
                    <p className="text-gray-500 text-xs">
                      Interacting with unverified contracts can expose you to malicious code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-black border border-[#2a2a2a] p-6 rounded-lg">
              <h3 className="font-semibold mb-4 text-[#FF6600]">Risk Level Classification</h3>
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

          {/* Security & Privacy */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
              <FaLock className="text-[#FF6600]" />
              Security & Privacy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6600]/20 rounded-full flex items-center justify-center mb-4">
                  <FaShieldAlt className="text-[#FF6600] text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-3">No Data Storage</h3>
                <p className="text-gray-400 text-sm">
                  We don't store any wallet addresses or scan results. All analysis is done on-the-fly and completely private.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6600]/20 rounded-full flex items-center justify-center mb-4">
                  <FaLock className="text-[#FF6600] text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-3">Read-Only Access</h3>
                <p className="text-gray-400 text-sm">
                  We only read public blockchain data; we never request private keys or signing permissions.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <div className="w-12 h-12 bg-[#FF6600]/20 rounded-full flex items-center justify-center mb-4">
                  <FaCode className="text-[#FF6600] text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-3">Open Source</h3>
                <p className="text-gray-400 text-sm">
                  The code is fully open source and auditable on GitHub for complete transparency.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-6 flex items-center gap-2">
              <FaUsers className="text-[#FF6600]" />
              Who Should Use This Tool?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-[#FF6600] text-2xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">Regular Users</h3>
                <p className="text-gray-400 text-sm">
                  Check your own wallet for risky approvals or unknown contract interactions.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="text-[#FF6600] text-2xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">DeFi Participants</h3>
                <p className="text-gray-400 text-sm">
                  Ensure you haven't granted excessive permissions to protocols.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-[#FF6600] text-2xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">Security Researchers</h3>
                <p className="text-gray-400 text-sm">
                  Analyze any address for potential vulnerabilities and security issues.
                </p>
              </div>

              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <div className="w-16 h-16 bg-[#FF6600]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaChartLine className="text-[#FF6600] text-2xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">Project Auditors</h3>
                <p className="text-gray-400 text-sm">
                  Review contract interaction patterns of user wallets for security audits.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-4">
              Start Securing Your Wallet Today
            </h2>
            <p className="text-gray-300 mb-6">
              Join thousands of Rootstock users who trust our tool to keep their wallets safe and secure.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/"
                className="px-5 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] transition"
              >
                Start Scanning
              </a>
              <a
                href="/docs"
                className="px-5 py-2 bg-black border border-[#2a2a2a] text-white rounded-lg hover:border-[#FF6600] transition"
              >
                Learn More
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}