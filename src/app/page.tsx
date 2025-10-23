"use client";

import { useState } from "react";
import WalletInput from "@/components/WalletInput";
import ResultCard from "@/components/ResultCard";
import Loader from "@/components/Loader";
import type { TrustScoreDetails } from "@/lib/score";
import type { AIAnalysisResult } from "@/lib/asi";

interface AnalysisResult {
  trustScore: TrustScoreDetails;
  aiAnalysis: AIAnalysisResult;
  metadata?: {
    transactionCount: number;
    tokenTransferCount: number;
    balanceETH: string;
    analyzedAt: string;
    blockchainStats?: {
      successfulTransactions: number;
      failedTransactions: number;
      totalEthVolume: string;
      uniqueTokens: number;
      hasRecentActivity: boolean;
    };
  };
}

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (address: string) => {
    setIsLoading(true);
    setError("");
    setCurrentAddress(address);
    setResult(null);

    try {
      console.log("🔍 Starting wallet analysis for:", address);

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult({
          trustScore: data.trustScore,
          aiAnalysis: data.aiAnalysis,
          metadata: data.metadata,
        });
        console.log("✅ Analysis completed successfully");
      } else {
        throw new Error(data.error || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setCurrentAddress("");
    setError("");
  };

  if (isLoading) {
    return <Loader message="Analyzing wallet data with AI..." />;
  }

  if (result) {
    return (
      <ResultCard
        address={currentAddress}
        trustScore={result.trustScore}
        aiAnalysis={result.aiAnalysis}
        metadata={result.metadata}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <WalletInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      {error && (
        <div className="max-w-2xl mx-auto mt-6 px-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Analysis Error
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => setError("")}
                  className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How it works section */}
      <div className="max-w-6xl mx-auto mt-24 px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            We analyze blockchain data using AI to provide comprehensive wallet
            trust scores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
              <span className="text-3xl">⛓️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Blockchain Data
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fetch real transaction history from Blockscout to analyze wallet
              activity patterns and on-chain behavior
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-5">
              <span className="text-3xl">🧠</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              AI Analysis
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Use ASI AI to generate deep insights on behavior patterns and
              assess risk levels intelligently
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-5">
              <span className="text-3xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Trust Score
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Calculate a comprehensive 0-100 score based on transaction
              history, token diversity, and wallet activity
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
