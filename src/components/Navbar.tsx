'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Docs', href: '/docs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-black border-b border-[#2a2a2a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-lg hover:text-[#FF6600] transition-colors">
            RSK Wallet Risk Scan
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-[#FF6600]'
                    : 'text-[#a0a0a0] hover:text-[#FF6600]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Wallet Connect Button */}
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}