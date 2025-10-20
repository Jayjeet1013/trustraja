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
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <WalletInput onAnalyze={handleAnalyze} isLoading={isLoading} />

      {error && (
        <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-400 mr-3">⚠️</div>
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Analysis Error
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
          <button
            onClick={() => setError("")}
            className="mt-3 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How TrustRaja Works
          </h2>
          <p className="text-gray-600">
            Our AI-powered analysis combines blockchain data with intelligent
            algorithms
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">⛓️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Blockchain Analysis
            </h3>
            <p className="text-gray-600 text-sm">
              Fetch and analyze real transaction data from Blockscout API
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              AI Intelligence
            </h3>
            <p className="text-gray-600 text-sm">
              Generate insights using ASI API for behavioral pattern analysis
            </p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Trust Score
            </h3>
            <p className="text-gray-600 text-sm">
              Calculate a comprehensive 0-100 trust rating based on multiple
              factors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
