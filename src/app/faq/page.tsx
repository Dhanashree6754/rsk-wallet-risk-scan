'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaQuestionCircle, FaShieldAlt, FaSearch, FaLock, FaRocket } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is RSK Wallet Risk Scan?',
    answer: 'RSK Wallet Risk Scan is a cutting-edge security analysis tool built specifically for the Rootstock (RSK) network. It analyzes any RSK wallet address to detect risky token approvals, unknown contract interactions, and calculates a comprehensive risk score to help users identify potential vulnerabilities.',
    category: 'General'
  },
  {
    question: 'How does the risk scoring system work?',
    answer: 'Our advanced risk engine evaluates multiple factors: unlimited approvals (+40 points each), high allowances (+10 points each), frequent contract interactions (+20 points), interactions with unknown contracts (+5 points each), and high transaction volume (+10 points). Risk levels: 0‑30 = LOW (green), 31‑60 = MEDIUM (yellow), 61+ = HIGH (red).',
    category: 'Risk Scoring'
  },
  {
    question: 'What makes unlimited approvals so dangerous?',
    answer: 'Unlimited approvals allow a spender to access your entire token balance (set to maximum uint256 value). If the spender becomes malicious or gets compromised, they could drain all your tokens instantly. Always use limited allowances or revoke unused approvals.',
    category: 'Security'
  },
  {
    question: 'How do I revoke risky token approvals?',
    answer: 'The tool identifies risks but doesn\'t execute transactions. To revoke approvals: 1) Visit RSK Explorer, 2) Find the token contract, 3) Use the "approve" function with allowance set to 0 for the spender address. Always double-check contract addresses!',
    category: 'Security'
  },
  {
    question: 'Is my wallet data stored or tracked?',
    answer: 'Absolutely not. All scanning happens in real-time using public blockchain data. We don\'t store addresses, scan results, or any personal information. Your privacy is our priority - no tracking, no databases, no logs.',
    category: 'Privacy'
  },
  {
    question: 'Which RSK networks are supported?',
    answer: 'We support both Rootstock mainnet (Chain ID: 30) and Rootstock testnet (Chain ID: 31). The tool automatically detects the network from your connected wallet or RPC configuration.',
    category: 'Technical'
  },
  {
    question: 'What should I do if I encounter errors?',
    answer: 'Errors are usually temporary - caused by network congestion or rate limits. Wait a few moments and try again. If issues persist: 1) Verify the address format, 2) Check network connectivity, 3) Report the issue on our GitHub repository.',
    category: 'Troubleshooting'
  },
  {
    question: 'Can I scan addresses other than my own wallet?',
    answer: 'Yes! You can scan any RSK address - simply paste it into the input field. This is useful for checking addresses before transactions, analyzing project wallets, or security research.',
    category: 'General'
  },
  {
    question: 'How accurate is the contract interaction detection?',
    answer: 'Our system analyzes transaction data from RSK Explorer and verifies contract bytecode. While highly accurate, it may miss interactions if explorer data is incomplete. We continuously improve detection algorithms for better accuracy.',
    category: 'Technical'
  },
  {
    question: 'Is there any cost to use this tool?',
    answer: 'RSK Wallet Risk Scan is completely free and open source. You only pay gas fees when you choose to execute transactions (like revoking approvals) yourself. No hidden fees, no subscriptions.',
    category: 'General'
  },
  {
    question: 'How current is the scan data?',
    answer: 'Every scan fetches fresh, real-time data directly from the blockchain and explorer APIs. No caching means you always see the current wallet state. Data is as current as the blockchain itself.',
    category: 'Technical'
  },
  {
    question: 'Does this work on mobile devices?',
    answer: 'Absolutely! The interface is fully responsive and optimized for mobile. Connect via WalletConnect or paste addresses directly. All features work seamlessly on phones and tablets.',
    category: 'General'
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Security', 'Risk Scoring', 'Technical', 'Privacy', 'Troubleshooting'];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-lg">
              Everything you need to know about RSK Wallet Risk Scan and wallet security
            </p>
            <div className="mt-4 h-1 w-24 bg-[#FF6600] rounded"></div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-[#FF6600] text-white'
                    : 'bg-black border border-[#2a2a2a] text-gray-400 hover:border-[#FF6600]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {filteredFAQs.map((faq, index) => (
              <div
                key={faq.question}
                className="bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-[#1a1a1a] transition-colors group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-10 h-10 bg-[#FF6600]/20 rounded-full flex items-center justify-center shrink-0">
                      <FaQuestionCircle className="text-[#FF6600] text-lg" />
                    </div>
                    <span className="text-white font-semibold text-lg group-hover:text-[#FF6600] transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {faq.category && (
                      <span className="px-3 py-1 bg-[#FF6600]/20 text-[#FF6600] text-xs font-medium rounded-full">
                        {faq.category}
                      </span>
                    )}
                    {openIndex === index ? (
                      <FaChevronUp className="text-[#FF6600] shrink-0 text-xl" />
                    ) : (
                      <FaChevronDown className="text-gray-400 shrink-0 text-xl group-hover:text-[#FF6600] transition-colors" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-8 py-6 border-t border-[#2a2a2a] bg-black">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Help Section */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-6">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Can't find the answer you're looking for? Our community and support team are here to help!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <FaShieldAlt className="text-[#FF6600] text-2xl mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Security First</h3>
                <p className="text-gray-400 text-sm">
                  Get expert help with security concerns and best practices
                </p>
              </div>
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <FaSearch className="text-[#FF6600] text-2xl mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Technical Support</h3>
                <p className="text-gray-400 text-sm">
                  Assistance with technical issues and troubleshooting
                </p>
              </div>
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg text-center">
                <FaRocket className="text-[#FF6600] text-2xl mb-4 mx-auto" />
                <h3 className="text-white font-semibold mb-2">Community Help</h3>
                <p className="text-gray-400 text-sm">
                  Connect with other users and share experiences
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="px-5 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] transition"
              >
                Contact Support
              </a>
              <a
                href="https://discord.gg/rootstock"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-black border border-[#2a2a2a] text-white rounded-lg hover:border-[#FF6600] transition"
              >
                Join Discord
              </a>
              <a
                href="https://github.com/rootstock/rsk-wallet-risk-scan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-black border border-[#2a2a2a] text-white rounded-lg hover:border-[#FF6600] transition"
              >
                Visit GitHub
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}