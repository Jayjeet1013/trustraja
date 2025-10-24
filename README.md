# 👑 TrustRaja

### Multi-Chain Wallet Trust Analyzer

---

## 📖 Overview

**TrustRaja** is a powerful web-based platform that helps users instantly understand the trustworthiness and behavior of any blockchain wallet address. It combines real-time blockchain data from **Blockscout** with advanced **AI reasoning** from ASI to deliver comprehensive wallet analysis in clear, human-readable language.

Our mission is to make blockchain transparency accessible and understandable for everyone — from crypto traders and NFT collectors to developers and DeFi users.

---

## 🌟 Key Features

- � **Multi-Chain Support** — Analyze wallets across Ethereum, Polygon, BSC, Base, Arbitrum, Optimism, Gnosis, and Avalanche
- 🧠 **AI-Powered Analysis** — Get intelligent insights using ASI's reasoning capabilities
- 📊 **Comprehensive Metrics** — View transaction counts, token interactions, and portfolio balances
- 💰 **USD Value Display** — See total balance in USDT across all networks
- 🎯 **Trust Score System** — Algorithmic scoring based on wallet behavior patterns
- 🔒 **Privacy-First** — No wallet connection needed, works with public blockchain data
- ⚡ **Real-Time Data** — Fetches up to 250 recent transactions from each network
- 🎨 **Modern UI** — Clean, responsive interface built with React and Tailwind CSS

---

## 💡 How It Works

### 1️⃣ **User Input**

The user enters any EVM-compatible wallet address into the TrustRaja web application.

### 2️⃣ **Data Collection** (via Blockscout API)

TrustRaja fetches comprehensive wallet data including:

- Recent transactions (up to 250 per network)
- Token transfer activities
- Balance information across all supported chains
- Transaction metadata (gas, status, methods)

### 3️⃣ **AI Analysis** (via ASI API)

The collected data is analyzed by ASI to identify:

- **Behavior Patterns** — Trading frequency, holding habits, interaction types
- **Risk Assessment** — Detection of suspicious activities or patterns
- **Wallet Classification** — DeFi user, trader, holder, etc.
- **Activity Trends** — Historical behavior and engagement levels

### 4️⃣ **Trust Score Calculation**

Our algorithm generates a comprehensive trust score (0-100) based on:

- Transaction history and volume
- Token diversity and interactions
- Wallet age and consistency
- Success rate of transactions

### 5️⃣ **Result Generation**

Users receive:

- **Overall Trust Score** with risk level indicator
- **AI-Generated Summary** in plain English
- **Detailed Metrics** including balances, transactions, and token activity
- **Multi-Chain Breakdown** showing activity across all networks

---

## ⚙️ Tech Stack

| Layer               | Technology                             |
| ------------------- | -------------------------------------- |
| **Frontend**        | Next.js 15, React 18, TypeScript       |
| **Styling**         | Tailwind CSS                           |
| **API Routes**      | Next.js API Routes (serverless)        |
| **Blockchain Data** | Blockscout REST API (v2 + Legacy)      |
| **AI Engine**       | ASI (Artificial Superintelligence) API |
| **Deployment**      | Vercel                                 |
| **Package Manager** | pnpm                                   |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- API keys for Blockscout (optional) and ASI

### Installation

```bash
# Clone the repository
git clone https://github.com/Jayjeet1013/trustraja.git
cd trustraja

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your API keys to .env.local

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

```env
NEXT_PUBLIC_BLOCKSCOUT_API_KEY=your_blockscout_key (optional)
NEXT_PUBLIC_BLOCKSCOUT_URL=https://eth.blockscout.com
ASI_API_KEY=your_asi_api_key
```

---

## 🌍 Supported Networks

| Network         | Symbol | Explorer                 |
| --------------- | ------ | ------------------------ |
| Ethereum        | ETH    | eth.blockscout.com       |
| Polygon         | MATIC  | polygon.blockscout.com   |
| BNB Smart Chain | BNB    | bsc.blockscout.com       |
| Base            | ETH    | base.blockscout.com      |
| Arbitrum        | ETH    | arbitrum.blockscout.com  |
| Optimism        | ETH    | optimism.blockscout.com  |
| Gnosis          | xDAI   | gnosis.blockscout.com    |
| Avalanche       | AVAX   | avalanche.blockscout.com |

---

## 🧱 Example Use Case

**Scenario:** A user is about to trade NFTs with an unknown wallet.

**Action:** They paste the wallet address into TrustRaja.

**Result:** TrustRaja instantly provides:

- ✅ **Trust Score:** 78/100 (Medium-High Trust)
- 📊 **Activity:** 145 transactions across 3 networks
- 💰 **Balance:** $4,523.75 USDT total
- 🔍 **AI Insight:** "This wallet shows consistent DeFi activity with 92% successful transactions. Active for 18 months with regular token interactions."
- ⚠️ **Risk Level:** LOW

**Outcome:** User makes an informed decision with confidence.

---

## 🚀 Future Roadmap

### Phase 1 (Current)

- ✅ Multi-chain wallet analysis
- ✅ AI-powered insights
- ✅ Trust score system
- ✅ USD balance display

### Phase 2 (Planned)

- 🔜 Wallet reputation scoring API
- 🔜 Historical trend visualization
- 🔜 Wallet comparison feature
- 🔜 Export reports (PDF/JSON)

### Phase 3 (Future)

- 💭 Browser extension for marketplace integration
- 💭 Fraud detection alerts
- 💭 Community reputation system
- 💭 Smart contract interaction analysis

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Jayjeet1013/trustraja/issues).

---

## 👨‍💻 Author

**Jayjeet**

- GitHub: [@Jayjeet1013](https://github.com/Jayjeet1013)

---

## 🙏 Acknowledgments

- **Blockscout** for providing robust blockchain explorer APIs
- **ASI** for advanced AI reasoning capabilities
- **Next.js** team for the amazing framework
- **Vercel** for seamless deployment

---

<div align="center">

### ⭐ Star this repo if you find it useful!

Made with ❤️ by the TrustRaja team

</div>
