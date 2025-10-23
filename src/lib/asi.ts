import type { TxItem } from "./blockscout";

const ASI_API_KEY = process.env.ASI_API_KEY;

interface TokenTransfer {
  from_address: string;
  to_address: string;
  token_symbol: string;
  value: string;
  timestamp: string;
}

interface ASIAnalysisRequest {
  transactions: TxItem[];
  tokenTransfers?: TokenTransfer[];
  walletBalance?: string;
}

export interface AIAnalysisResult {
  summary: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  keyInsights: string[];
  behaviorPattern: string;
}

export async function getAIAnalysis(
  data: ASIAnalysisRequest
): Promise<AIAnalysisResult> {
  try {
    console.log("🧠 Generating AI analysis using ASI API...");

    if (!ASI_API_KEY) {
      throw new Error("ASI API key not configured");
    }

    const analysisPrompt = createAnalysisPrompt(data);

    const response = await fetch("https://api.asi1.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ASI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "asi1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a blockchain analyst expert. Analyze wallet behavior and provide insights in a structured format.",
          },
          {
            role: "user",
            content: analysisPrompt,
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`ASI API error: ${response.statusText}`);
    }

    const data_response = await response.json();

    if (data_response && data_response.choices && data_response.choices[0]) {
      const aiResponse = data_response.choices[0].message.content;
      console.log("✅ Successfully generated AI analysis");

      return parseAIResponse(aiResponse, data);
    } else {
      throw new Error("Invalid ASI API response");
    }
  } catch {
    console.log("❌ ASI API failed, generating fallback analysis");

    return generateFallbackAnalysis(data);
  }
}

function createAnalysisPrompt(data: ASIAnalysisRequest): string {
  const { transactions, tokenTransfers = [], walletBalance } = data;

  const txCount = transactions.length;
  const successfulTx = transactions.filter((tx) => tx.status === "1").length;
  const failedTx = txCount - successfulTx;
  const uniqueTokens = new Set(tokenTransfers.map((t) => t.token_symbol)).size;

  return `Analyze this wallet behavior data:
  
Transaction Summary:
- Total transactions: ${txCount}
- Successful: ${successfulTx}
- Failed: ${failedTx}
- Unique tokens interacted: ${uniqueTokens}
- Current balance: ${
    walletBalance
      ? (parseFloat(walletBalance) / 1e18).toFixed(4) + " ETH"
      : "Unknown"
  }

Recent Transactions:
${transactions
  .slice(0, 5)
  .map(
    (tx) =>
      `- ${tx.method || "transfer"}: ${(parseFloat(tx.value) / 1e18).toFixed(
        4
      )} ETH (${tx.status === "1" ? "Success" : "Failed"})`
  )
  .join("\n")}

Provide a concise analysis focusing on:
1. Overall behavior pattern (DeFi user, trader, holder, etc.)
2. Risk assessment (LOW/MEDIUM/HIGH)
3. Key insights about wallet activity
4. Brief summary (2-3 sentences)

Format as: RISK_LEVEL|PATTERN|SUMMARY|INSIGHT1|INSIGHT2|INSIGHT3`;
}

function parseAIResponse(
  aiResponse: string,
  _data: ASIAnalysisRequest
): AIAnalysisResult {
  try {
    const parts = aiResponse.split("|");

    if (parts.length >= 4) {
      return {
        riskLevel:
          (parts[0].trim().toUpperCase() as "LOW" | "MEDIUM" | "HIGH") ||
          "MEDIUM",
        behaviorPattern: parts[1].trim(),
        summary: parts[2].trim(),
        keyInsights: parts
          .slice(3)
          .map((insight) => insight.trim())
          .filter(Boolean),
      };
    }
  } catch {
    console.log("Failed to parse structured AI response, using fallback");
  }

  return {
    summary: aiResponse.slice(0, 200) + "...",
    riskLevel: "MEDIUM",
    keyInsights: ["AI analysis completed", "Wallet behavior assessed"],
    behaviorPattern: "General wallet activity",
  };
}

function generateFallbackAnalysis(data: ASIAnalysisRequest): AIAnalysisResult {
  const { transactions, tokenTransfers = [] } = data;

  const txCount = transactions.length;
  const successfulTx = transactions.filter((tx) => tx.status === "1").length;
  const successRate = txCount > 0 ? (successfulTx / txCount) * 100 : 0;
  const uniqueTokens = new Set(tokenTransfers.map((t) => t.token_symbol)).size;

  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "MEDIUM";
  if (successRate >= 90 && txCount >= 10) riskLevel = "LOW";
  else if (successRate < 70 || txCount < 5) riskLevel = "HIGH";

  let behaviorPattern = "Standard Wallet";
  if (uniqueTokens > 5) behaviorPattern = "DeFi Enthusiast";
  else if (txCount > 100) behaviorPattern = "Active Trader";
  else if (txCount < 10) behaviorPattern = "Casual User";

  const insights = [
    `Success rate: ${successRate.toFixed(1)}%`,
    `${txCount} total transactions`,
    uniqueTokens > 0
      ? `Interacted with ${uniqueTokens} tokens`
      : "Primarily ETH transactions",
  ];

  const summary = `This wallet shows ${behaviorPattern.toLowerCase()} behavior with ${txCount} transactions and a ${successRate.toFixed(
    1
  )}% success rate. ${
    riskLevel === "LOW"
      ? "Demonstrates consistent and reliable activity."
      : riskLevel === "HIGH"
      ? "Shows some irregular patterns that warrant attention."
      : "Exhibits moderate activity levels with standard patterns."
  }`;

  return {
    summary,
    riskLevel,
    keyInsights: insights,
    behaviorPattern,
  };
}
