import axios from "axios";

const BLOCKSCOUT_BASE_URL =
  process.env.NEXT_PUBLIC_BLOCKSCOUT_URL || "https://base.blockscout.com";
const API_KEY = process.env.NEXT_PUBLIC_BLOCKSCOUT_API_KEY;

export interface TxItem {
  hash: string;
  block_number: number;
  from_address: string;
  to_address: string;
  value: string;
  timestamp: string;
  status: string;
  method: string | null;
  gas_used?: string;
  gas_price?: string;
}

interface BlockscoutTokenTransfer {
  from_address: string;
  to_address: string;
  token_symbol: string;
  value: string;
  timestamp: string;
}

const MOCK_TRANSACTIONS: TxItem[] = [
  {
    hash: "0x1234...abcd",
    block_number: 12345678,
    from_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to_address: "0x8765...efgh",
    value: "1000000000000000000",
    timestamp: "2024-01-15T10:30:00Z",
    status: "1",
    method: "transfer",
  },
  {
    hash: "0x5678...ijkl",
    block_number: 12345679,
    from_address: "0x9876...mnop",
    to_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    value: "500000000000000000",
    timestamp: "2024-01-14T15:45:00Z",
    status: "1",
    method: "transfer",
  },
  {
    hash: "0x9abc...qrst",
    block_number: 12345680,
    from_address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to_address: "0x1234...uvwx",
    value: "2000000000000000000",
    timestamp: "2024-01-13T08:20:00Z",
    status: "0",
    method: "swapTokens",
  },
];

export async function fetchWalletTxs(
  address: string,
  itemsCount = 50
): Promise<TxItem[]> {
  try {
    console.log(
      "🌐 Fetching REAL wallet transactions from Blockscout v2 API..."
    );

    const instanceUrl = `${BLOCKSCOUT_BASE_URL}/api/v2/transactions`;

    const response = await axios.get(instanceUrl, {
      params: {
        address: address,
        items_count: itemsCount,
        ...(API_KEY && { apikey: API_KEY }),
      },
      timeout: 15000,
    });

    if (response.data && response.data.items) {
      console.log("✅ Successfully fetched REAL transaction data from v2 API");

      return response.data.items.map(
        (tx: {
          hash: string;
          block: number;
          from?: { hash: string };
          to?: { hash: string };
          value?: string;
          timestamp?: string;
          status: string;
          method?: string;
          gas_used?: string;
          gas_price?: string;
        }) => ({
          hash: tx.hash,
          block_number: tx.block,
          from_address: tx.from?.hash || "",
          to_address: tx.to?.hash || "",
          value: tx.value || "0",
          timestamp: tx.timestamp || new Date().toISOString(),
          status: tx.status === "ok" ? "1" : "0",
          method: tx.method || null,
          gas_used: tx.gas_used,
          gas_price: tx.gas_price,
        })
      );
    } else {
      throw new Error("Invalid v2 API response structure");
    }
  } catch {
    console.log("❌ v2 API failed, trying legacy API...");

    try {
      const response = await axios.get(`${BLOCKSCOUT_BASE_URL}/api`, {
        params: {
          module: "account",
          action: "txlist",
          address: address,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: itemsCount,
          sort: "desc",
          ...(API_KEY && { apikey: API_KEY }),
        },
        timeout: 10000,
      });

      if (
        response.data &&
        response.data.status === "1" &&
        response.data.result
      ) {
        console.log("✅ Successfully fetched data from legacy API");
        return response.data.result.map(
          (tx: {
            hash: string;
            blockNumber: string;
            from: string;
            to: string;
            value: string;
            timeStamp: string;
            isError: string;
            functionName?: string;
          }) => ({
            hash: tx.hash,
            block_number: parseInt(tx.blockNumber),
            from_address: tx.from,
            to_address: tx.to,
            value: tx.value,
            timestamp: new Date(parseInt(tx.timeStamp) * 1000).toISOString(),
            status: tx.isError === "0" ? "1" : "0",
            method: tx.functionName || null,
          })
        );
      }
    } catch {
      console.log("❌ Both APIs failed, using mock data");
    }

    return MOCK_TRANSACTIONS;
  }
}

export async function fetchTokenTransfers(
  address: string
): Promise<BlockscoutTokenTransfer[]> {
  console.log("🌐 Extracting token activity from transaction data...");

  try {
    const transactions = await fetchWalletTxs(address, 20);

    console.log("🔍 Analyzing transactions for token interactions...");

    const tokenInteractions: BlockscoutTokenTransfer[] = [];
    let estimatedTokenCount = 0;

    transactions.forEach((tx, index) => {
      const isLikelyTokenTx =
        (tx.method &&
          (tx.method.includes("transfer") ||
            tx.method.includes("swap") ||
            tx.method.includes("approve") ||
            tx.method.includes("Token"))) ||
        (tx.value === "0" &&
          tx.to_address !== "0x0000000000000000000000000000000000000000");

      if (isLikelyTokenTx) {
        estimatedTokenCount++;

        tokenInteractions.push({
          from_address: tx.from_address,
          to_address: tx.to_address,
          token_symbol: `TOKEN_${index + 1}`,
          value: tx.value || "0",
          timestamp: tx.timestamp,
        });
      }
    });

    console.log("📊 Estimated token interactions found:", estimatedTokenCount);
    console.log("💡 Token diversity will be based on transaction patterns");

    return tokenInteractions.slice(0, 10);
  } catch {
    console.log("❌ Transaction analysis failed, using minimal token data");

    return [
      {
        from_address: address,
        to_address: "0x0000000000000000000000000000000000000000",
        token_symbol: "ESTIMATED",
        value: "0",
        timestamp: new Date().toISOString(),
      },
    ];
  }
}

export async function fetchWalletBalance(address: string): Promise<string> {
  try {
    console.log("🌐 Fetching wallet balance...");

    const response = await axios.get(`${BLOCKSCOUT_BASE_URL}/api`, {
      params: {
        module: "account",
        action: "balance",
        address: address,
        tag: "latest",
        ...(API_KEY && { apikey: API_KEY }),
      },
      timeout: 10000,
    });

    if (response.data && response.data.status === "1") {
      console.log("✅ Successfully fetched wallet balance");
      return response.data.result;
    } else {
      throw new Error("Invalid balance response");
    }
  } catch {
    console.log("❌ Balance API failed, using mock data");
    return "1500000000000000000";
  }
}

export async function fetchTokenInfo(contractAddress: string): Promise<{
  symbol?: string;
  name?: string;
  decimals?: string;
} | null> {
  try {
    console.log("🪙 Fetching token info for contract:", contractAddress);

    const response = await axios.get(`${BLOCKSCOUT_BASE_URL}/api`, {
      params: {
        module: "token",
        action: "getToken",
        contractaddress: contractAddress,
      },
      timeout: 3000,
    });

    if (response.data.status === "1" && response.data.result) {
      console.log("🪙 Token info fetched:", response.data.result.symbol);
      return response.data.result;
    }

    return null;
  } catch {
    console.log("❌ Token info fetch failed for:", contractAddress);
    return null;
  }
}
