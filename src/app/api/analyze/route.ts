import { NextRequest, NextResponse } from "next/server";
import {
  fetchWalletTxs,
  fetchTokenTransfers,
  fetchWalletBalance,
} from "@/lib/blockscout";
import { getAIAnalysis } from "@/lib/asi";
import { calculateTrustScore } from "@/lib/score";

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Wallet address is required" },
        { status: 400 }
      );
    }

    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    console.log("🔍 Starting analysis for wallet:", address);

    const [transactions, tokenTransfers, balance] = await Promise.all([
      fetchWalletTxs(address),
      fetchTokenTransfers(address),
      fetchWalletBalance(address),
    ]);

    console.log(
      `📊 Fetched ${transactions.length} transactions, ${tokenTransfers.length} token transfers`
    );

    const trustScore = calculateTrustScore(
      transactions,
      tokenTransfers,
      balance
    );

    const aiAnalysis = await getAIAnalysis({
      transactions,
      tokenTransfers,
      walletBalance: balance,
    });

    console.log("✅ Analysis completed successfully");

    return NextResponse.json({
      success: true,
      address,
      trustScore,
      aiAnalysis,
      metadata: {
        transactionCount: transactions.length,
        tokenTransferCount: tokenTransfers.length,
        balanceETH: (parseFloat(balance) / 1e18).toFixed(4),
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Analysis API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "TrustRaja Analysis API is running",
    version: "1.0.0",
    endpoints: ["POST /api/analyze - Analyze wallet trust score"],
  });
}
