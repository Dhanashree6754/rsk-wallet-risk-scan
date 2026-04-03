'use client';

import { FaGithub, FaDiscord, FaEnvelope, FaTwitter, FaTelegram, FaMedium } from 'react-icons/fa';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">
              Contact & Support
            </h1>
            <p className="text-gray-400 text-lg">
              Have questions, feedback, or need help with RSK Wallet Risk Scan?
            </p>
            <div className="mt-4 h-1 w-24 bg-[#FF6600] rounded"></div>
          </div>

          {/* Support Channels */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl mb-10">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-8">
              Get Help
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* GitHub */}
              <Link
                href="https://github.com/rootstock/rsk-wallet-risk-scan"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group"
              >
                <FaGithub className="text-[#FF6600] text-2xl mb-4" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">
                  GitHub
                </h3>
                <p className="text-gray-400 text-sm">
                  Report issues, request features, or contribute to the project.
                </p>
              </Link>

              {/* Discord */}
              <Link
                href="https://discord.gg/rootstock"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group"
              >
                <FaDiscord className="text-[#FF6600] text-2xl mb-4" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">
                  Discord
                </h3>
                <p className="text-gray-400 text-sm">
                  Join the Rootstock developer community for support.
                </p>
              </Link>

              {/* Twitter */}
              <Link
                href="https://twitter.com/rootstock_io"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group"
              >
                <FaTwitter className="text-[#FF6600] text-2xl mb-4" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">
                  Twitter
                </h3>
                <p className="text-gray-400 text-sm">
                  Follow for updates, announcements, and community news.
                </p>
              </Link>

              {/* Telegram */}
              <Link
                href="https://t.me/rootstock_announcements"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group"
              >
                <FaTelegram className="text-[#FF6600] text-2xl mb-4" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">
                  Telegram
                </h3>
                <p className="text-gray-400 text-sm">
                  Join official announcements and community discussions.
                </p>
              </Link>

              {/* Medium */}
              <Link
                href="https://medium.com/rootstock"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black border border-[#2a2a2a] p-6 rounded-lg hover:border-[#FF6600] transition group"
              >
                <FaMedium className="text-[#FF6600] text-2xl mb-4" />
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#FF6600] transition-colors">
                  Medium
                </h3>
                <p className="text-gray-400 text-sm">
                  Read in-depth articles, tutorials, and technical updates.
                </p>
              </Link>

              {/* Email */}
              <div className="bg-black border border-[#2a2a2a] p-6 rounded-lg">
                <FaEnvelope className="text-[#FF6600] text-2xl mb-4" />
                <h3 className="text-white font-semibold mb-2">Business Inquiries</h3>
                <p className="text-gray-400 text-sm">
                  For partnerships and business opportunities, contact through official Rootstock channels.
                </p>
              </div>

            </div>
          </section>
      
          {/* Community Section */}
          <section className="bg-[#111111] border border-[#2a2a2a] p-8 rounded-xl">
            <h2 className="text-2xl font-semibold text-[#FF6600] mb-4">
              Community Driven
            </h2>
            <p className="text-gray-300 mb-6">
              The RSK Wallet Risk Scan is built to improve security and transparency 
              within the Rootstock ecosystem. We welcome feedback and contributions 
              from developers and security experts like you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://github.com/rootstock/rsk-wallet-risk-scan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] transition"
              >
                View on GitHub
              </Link>

              <Link
                href="https://discord.gg/rootstock"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-black border border-[#2a2a2a] text-white rounded-lg hover:border-[#FF6600] transition"
              >
                Join Discord
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
