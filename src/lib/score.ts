import type { TxItem } from "./blockscout";

interface TokenTransfer {
  token_symbol: string;
}

export interface TrustScoreDetails {
  totalScore: number;
  breakdown: {
    transactionVolume: number;
    successRate: number;
    walletAge: number;
    tokenDiversity: number;
    activityConsistency: number;
    riskFactors: number;
  };
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  scoreCategory: string;
}

export function calculateTrustScore(
  transactions: TxItem[],
  tokenTransfers: TokenTransfer[] = [],
  balance: string = "0"
): TrustScoreDetails {
  console.log("📊 Calculating trust score...");

  const txCount = transactions.length;
  const successfulTx = transactions.filter((tx) => tx.status === "1").length;
  const failedTx = txCount - successfulTx;
  const uniqueTokens = new Set(tokenTransfers.map((t) => t.token_symbol)).size;
  const balanceETH = parseFloat(balance) / 1e18;

  const volumeScore = Math.min(25, Math.floor(txCount / 2));

  const successRate = txCount > 0 ? successfulTx / txCount : 0;
  const successScore = Math.floor(successRate * 25);

  const sortedTx = transactions.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  const daysSinceFirst =
    sortedTx.length > 0
      ? Math.floor(
          (Date.now() - new Date(sortedTx[0].timestamp).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;
  const ageScore = Math.min(20, Math.floor(daysSinceFirst / 30));

  const diversityScore = Math.min(15, uniqueTokens * 3);

  const consistencyScore = txCount >= 10 ? 10 : Math.floor(txCount);

  let riskPenalty = 0;

  if (failedTx > txCount * 0.3) riskPenalty += 5;

  if (balanceETH < 0.01 && txCount > 50) riskPenalty += 5;

  if (txCount < 5) riskPenalty += 5;

  const rawScore =
    volumeScore +
    successScore +
    ageScore +
    diversityScore +
    consistencyScore -
    riskPenalty;
  const totalScore = Math.max(0, Math.min(100, rawScore));

  let riskLevel: "LOW" | "MEDIUM" | "HIGH";
  if (totalScore >= 70) riskLevel = "LOW";
  else if (totalScore >= 40) riskLevel = "MEDIUM";
  else riskLevel = "HIGH";

  let scoreCategory: string;
  if (totalScore >= 80) scoreCategory = "Highly Trusted";
  else if (totalScore >= 60) scoreCategory = "Trusted";
  else if (totalScore >= 40) scoreCategory = "Moderately Trusted";
  else if (totalScore >= 20) scoreCategory = "Low Trust";
  else scoreCategory = "High Risk";

  console.log(
    `✅ Trust score calculated: ${totalScore}/100 (${scoreCategory})`
  );

  return {
    totalScore,
    breakdown: {
      transactionVolume: volumeScore,
      successRate: successScore,
      walletAge: ageScore,
      tokenDiversity: diversityScore,
      activityConsistency: consistencyScore,
      riskFactors: -riskPenalty,
    },
    riskLevel,
    scoreCategory,
  };
}

export function getScoreColor(score: number): string {
  if (score >= 70) return "text-green-600";
  if (score >= 40) return "text-yellow-600";
  return "text-red-600";
}

export function getScoreBackground(score: number): string {
  if (score >= 70) return "bg-green-100 border-green-300";
  if (score >= 40) return "bg-yellow-100 border-yellow-300";
  return "bg-red-100 border-red-300";
}
