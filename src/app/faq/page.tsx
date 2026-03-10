'use client';

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is RSK Wallet Risk Scan?',
    answer: 'RSK Wallet Risk Scan is a security analysis tool for the Rootstock (RSK) network. It analyzes any RSK wallet address to detect risky token approvals, unknown contract interactions, and calculates a risk score to help users identify potential vulnerabilities.',
  },
  {
    question: 'How does the risk score work?',
    answer: 'The risk score is calculated based on several factors: unlimited approvals (+40 each), high allowances (+10 each), more than 10 contract interactions (+20), interactions with unknown contracts (+5 each), and over 50 transactions (+10). Scores 0‑30 are LOW (green), 31‑60 are MEDIUM (yellow), and 61+ are HIGH (red).',
  },
  {
    question: 'What are unlimited approvals and why are they risky?',
    answer: 'An unlimited approval is when you allow a spender to use an unlimited amount of your tokens (set to the maximum uint256 value). If the spender is malicious, they could drain your entire token balance. It’s safer to set a limited allowance or revoke unused approvals.',
  },
  {
    question: 'How can I revoke a risky approval?',
    answer: 'Currently, the tool only identifies risky approvals; it does not execute transactions. To revoke an approval, you need to interact with the token contract directly (e.g., using a block explorer like RSK Explorer) and call the `approve` function with an allowance of 0 for the spender address.',
  },
  {
    question: 'Does the tool store my wallet address or data?',
    answer: 'No. All scanning is done in real‑time using public blockchain data via RPC and the RSK Explorer API. We do not store any addresses, scan results, or personal information.',
  },
  {
    question: 'Which networks are supported?',
    answer: 'We support both Rootstock mainnet (Chain ID: 30) and Rootstock testnet (Chain ID: 31). The tool automatically detects the network from your connected wallet or via the RPC.',
  },
  {
    question: 'What if I get an error during a scan?',
    answer: 'Errors are usually temporary and may be caused by network congestion or rate limiting. Try again in a few moments. If the problem persists, check the address format or visit our GitHub to report an issue.',
  },
  {
    question: 'Can I scan any RSK address or only my own?',
    answer: 'You can scan any RSK address—simply paste it into the input field. If you connect your wallet, that address will be auto‑scanned, but you can also enter any other address manually.',
  },
  {
    question: 'How accurate is the contract interaction detection?',
    answer: 'We detect contract interactions by analyzing the transaction list from the RSK Explorer API and checking if the recipient address has bytecode (i.e., is a contract). It may miss some interactions if the explorer data is incomplete, but it provides a solid baseline.',
  },
  {
    question: 'Is this tool free to use?',
    answer: 'Yes, RSK Wallet Risk Scan is completely free and open source. You only pay gas fees if you choose to revoke approvals or interact with contracts yourself.',
  },
  {
    question: 'How often is the data updated?',
    answer: 'Each scan fetches fresh data from the blockchain and explorer in real‑time. There is no caching, so you always get the latest state of the wallet.',
  },
  {
    question: 'Can I use this tool on mobile?',
    answer: 'Yes, the interface is fully responsive and works on mobile devices. You can connect via WalletConnect or simply paste an address.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="flex-1 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Frequently Asked Questions</h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#2a2a2a] transition-colors"
              >
                <span className="text-white font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-[#FF6600] flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-[#a0a0a0] flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-[#2a2a2a]">
                  <p className="text-[#a0a0a0] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}