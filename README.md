# RSK Wallet Risk Scan

A comprehensive blockchain security analysis tool for the Rootstock (RSK) network. Connect your wallet or paste any RSK address to receive a detailed risk report, including token approvals, contract interactions, and a risk score.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [How It Works](#how-it-works)
- [Risk Scoring Engine](#risk-scoring-engine)
- [API Reference](#api-reference)
- [Security & Privacy](#security--privacy)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

RSK Wallet Risk Scan is a production-ready security analysis tool for the Rootstock blockchain. It allows users to:

1. **Connect their wallet** (MetaMask, WalletConnect) or **paste any RSK address**.
2. **Fetch on-chain data** via RPC and the Rootstock Explorer API.
3. **Analyze** token approvals, contract interactions, and transaction patterns.
4. **Generate a risk report** with a score (LOW/MEDIUM/HIGH) and detailed tables.

The tool is built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, RainbowKit, wagmi, and ethers.js, following clean architecture and production best practices.

 ## ✨ Features

- **Wallet Connection:** Connect via MetaMask or WalletConnect (RainbowKit integration).

- **Manual Address Input:** Paste any RSK address with validation.

- **Transaction Analysis:** Fetch transaction count, list, and contract interactions.

- **Token Approval Detection:** Detect ERC20 approve() calls, flag unlimited or high allowances.

- **Contract Interaction Analysis:** Identify unknown contracts and interaction frequency.

- **Risk Scoring Engine:** Calculate a risk score based on multiple factors:**

Unlimited approvals (+40 each)

High allowances (+10 each)

10 contract interactions (+20)

Unknown contract interactions (+5 each)

50 transactions (+10)

- **Dashboard UI:** Summary cards, tables for approvals and interactions, risk badge.

- **Modern Design:** Tailwind CSS + shadcn/ui with Rootstock's orange and black theme.

- **Responsive:** Works on mobile and desktop.

## 📁 Project Structure

```text
rsk-wallet-risk-scan/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── faq/
│   │   ├── docs/
│   │   ├── contact/
│   │   ├── api/scan/                  # API route for scanning
│   │   │   └── route.ts
│   │   ├── providers.tsx              # RainbowKit/Wagmi providers
│   │   └── globals.css
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── WalletInput.tsx
│   │   ├── Dashboard.tsx
│   │   ├── RiskScoreCard.tsx
│   │   ├── ApprovalTable.tsx
│   │   └── InteractionTable.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── rpc.ts                      # ethers provider
│   │   ├── riskEngine.ts              # Risk scoring logic
│   │   └── wagmiConfig.ts             # RainbowKit/Wagmi config
│   ├── services/
│   │   └── walletService.ts          # API client
│   ├── types/
│   │   └── wallet.ts
│   └── utils/
│       └── addressValidator.ts
├── .env.example                       # Environment variables example
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md     
```          
            
## 🚀 Quick Start

### Prerequisites

- Node.js 18+

- npm or yarn

- MetaMask browser extension (optional for wallet connection)

- A WalletConnect Project ID (get from WalletConnect Cloud)

## Installation

**Clone the repository**

```bash
git clone https://github.com/Dhanashree6754/rsk-wallet-risk-scan.git
cd rsk-wallet-risk-scan
```

## Install dependencies

```bash
npm install
```

**Set up environment variables** 

Copy .env.example to .env.local and fill in your values:

```bash
cp .env.example .env.local
```

**Edit .env.local:**

```text
NEXT_PUBLIC_RSK_RPC=https://public-node.rsk.co
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_EXPLORER_API=https://explorer.rsk.co/api
```
**Run the development server**

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🔍 How It Works
User connects wallet (via RainbowKit) or pastes an address.

If a wallet is connected, the connected address is auto-scanned.

The frontend sends a request to the API endpoint /api/scan?address=0x....

## The API fetches:

- Transaction count via RPC.

- Approval events via eth_getLogs (filtering by Approval event with the user as owner).

- Transaction list from the Rootstock Explorer API (optional, falls back to empty if unavailable).

- It checks if recipient (`to`) addresses are contracts (preferably using Explorer metadata; falls back to RPC `getCode`).

- The risk engine calculates a score based on the collected data.

- The API returns a JSON report to the frontend.

- The dashboard displays the results with tables and a risk badge.

## ⚖️ Risk Scoring Engine
The risk engine uses the following weights:

## Factor	Points	Description

Unlimited approval	+40	Allowance = type(uint256).max
High allowance (>1M RBTC)	+10	Arbitrary threshold for large amounts
>10 contract interactions	+20	Frequent contract calls
Unknown contract interaction	+5	Interacting with an unverified contract
>50 transactions	+10	High overall activity

## Score ranges:

- 0–30: LOW (green)

- 31–60: MEDIUM (yellow)

- 61+: HIGH (red)

The response includes a list of reasons for the final score.

## 📡 API Reference

GET /api/scan?address=0x...
Returns a risk report for the given address.

### Query Parameters

address (required): A valid 0x-prefixed RSK address.

**Response**

```json
{
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
}
```
### Example

```bash
curl "http://localhost:3000/api/scan?address=0xWallet Address"
```
## 🔒 Security & Privacy

- **No data storage:** The tool does not store any wallet addresses, scan results, or personal information. All analysis is performed in real‑time using public blockchain data.

- **Read‑only access:** We only read data; we never request private keys or transaction signing.

- **Open source:** The code is fully open source and auditable.

- **Environment variables:** Sensitive keys (like WalletConnect Project ID) are stored in .env.local and never committed.

## 🔗 Useful Links

- [Rootstock Documentation](https://developers.rsk.co/)
- [Rootstock Explorer (Testnet)](https://explorer.testnet.rsk.co/)
- [Rootstock Explorer (Mainnet)](https://explorer.rsk.co/)
- [RainbowKit Documentation](https://rainbowkit.com/)
- [WalletConnect Cloud](https://dashboard.walletconnect.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh/)
- [Ethers.js Documentation](https://docs.ethers.org/v6/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for Rootstock (RSK)**