import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { defineChain } from 'viem';

// Rootstock Mainnet
export const rootstock = defineChain({
  id: 30,
  name: 'Rootstock Mainnet',
  network: 'rootstock-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Rootstock Bitcoin',
    symbol: 'RBTC',
  },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_RSK_RPC || 'https://public-node.rsk.co'] },
    public: { http: [process.env.NEXT_PUBLIC_RSK_RPC || 'https://public-node.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'RSK Explorer', url: 'https://explorer.rsk.co' },
  },
});

// Rootstock Testnet
export const rootstockTestnet = defineChain({
  id: 31,
  name: 'Rootstock Testnet',
  network: 'rootstock-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Rootstock Bitcoin',
    symbol: 'tRBTC',
  },
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
    public: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: { name: 'RSK Testnet Explorer', url: 'https://explorer.testnet.rsk.co' },
  },
});

export const config = getDefaultConfig({
  appName: 'RSK Wallet Risk Scan',
  projectId: (() => {
    const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
    if (!projectId) {
      throw new Error('Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID');
    }
    return projectId;
  })(),
  chains: [rootstock, rootstockTestnet],
  transports: {
    [rootstock.id]: http(),
    [rootstockTestnet.id]: http(),
  },
});