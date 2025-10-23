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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12">
      <WalletInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      {error && (
        <div className="max-w-3xl mx-auto mt-6 px-4 sm:px-6 animate-slide-up">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-xl">⚠️</span>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-base font-semibold text-red-900 dark:text-red-100">
                  Analysis Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error}
                </p>
                <button
                  onClick={() => setError("")}
                  className="mt-3 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline transition-colors"
                >
                  Dismiss and try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How it works section */}
      <div className="max-w-6xl mx-auto mt-16 sm:mt-20 px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            How TrustRaja Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Our AI-powered analysis combines blockchain data with intelligent
            algorithms to provide comprehensive trust scores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 animate-slide-up">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">⛓️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Blockchain Analysis
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Fetch and analyze real transaction data from Blockscout API to
              understand wallet behavior and activity patterns
            </p>
          </div>

          <div
            className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: "100ms" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              AI Intelligence
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Generate deep insights using ASI API for advanced behavioral
              pattern analysis and risk assessment
            </p>
          </div>

          <div
            className="group bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/40 dark:to-pink-800/40 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Trust Score
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Calculate a comprehensive 0-100 trust rating based on multiple
              factors including transaction history and token diversity
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto mt-16 px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-10 text-white shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">
              Trusted by Web3 Community
            </h3>
            <p className="text-blue-100">
              Real-time analysis powered by cutting-edge technology
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">100%</div>
              <div className="text-sm text-blue-100">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">&lt;10s</div>
              <div className="text-sm text-blue-100">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">24/7</div>
              <div className="text-sm text-blue-100">Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold mb-1">∞</div>
              <div className="text-sm text-blue-100">Wallets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
