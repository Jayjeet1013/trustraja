"use client";

import type { TrustScoreDetails } from "@/lib/score";
import type { AIAnalysisResult } from "@/lib/asi";
import { getScoreColor, getScoreBackground } from "@/lib/score";

interface ResultCardProps {
  address: string;
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
  onBack: () => void;
}

export default function ResultCard({
  address,
  trustScore,
  aiAnalysis,
  metadata,
  onBack,
}: ResultCardProps) {
  const { totalScore, breakdown, scoreCategory, riskLevel } = trustScore;
  const { summary, keyInsights, behaviorPattern } = aiAnalysis;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-3">
          <div className="text-4xl">✅</div>
        </div>
        <h1 className="text-3xl font-bold text-gray-200 mb-3">
          Trust Analysis Completed
        </h1>
        <div className="inline-flex items-center bg-gray-100 rounded-lg px-4 py-2 border border-gray-200">
          <span className="text-gray-500 text-xs mr-2">📍</span>
          <p className="text-xs font-mono text-gray-700 break-all">{address}</p>
        </div>
      </div>

      {/* Main Score */}
      <div
        className={`bg-white rounded-xl shadow-lg border-2 p-10 mb-8 ${getScoreBackground(
          totalScore
        )}`}
      >
        <div className="text-center">
          <div className="mb-6">
            <div
              className={`text-7xl font-bold ${getScoreColor(totalScore)} mb-2`}
            >
              {totalScore}
            </div>
            <div className="text-2xl text-gray-500 font-light">/ 100</div>
          </div>
          <div className="mb-4">
            <span className={`text-xl font-bold ${getScoreColor(totalScore)}`}>
              {scoreCategory}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-sm text-gray-600 font-medium">
              Risk Level:
            </span>
            <span
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg ${
                riskLevel === "LOW"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : riskLevel === "MEDIUM"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              {riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Blockchain Data */}
      {metadata && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">⛓️</span>
            Blockchain Data
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
              <div className="text-blue-600 text-xs font-semibold mb-2 uppercase tracking-wide">
                ETH Balance
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {metadata.balanceETH}
              </div>
              <div className="text-xs text-blue-600 mt-1">ETH</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
              <div className="text-green-600 text-xs font-semibold mb-2 uppercase tracking-wide">
                Transactions
              </div>
              <div className="text-2xl font-bold text-green-900">
                {metadata.transactionCount}
              </div>
              <div className="text-xs text-green-600 mt-1">Total</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
              <div className="text-purple-600 text-xs font-semibold mb-2 uppercase tracking-wide">
                Token Activity
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {metadata.tokenTransferCount}
              </div>
              <div className="text-xs text-purple-600 mt-1">Interactions</div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-xl border border-gray-200">
              <div className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wide">
                Analyzed
              </div>
              <div className="text-base font-bold text-gray-900">
                {new Date(metadata.analyzedAt).toLocaleDateString()}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                {new Date(metadata.analyzedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">🧠</span>
          AI Analysis
        </h2>
        <div className="space-y-6">
          <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
              Behavior Pattern
            </h3>
            <p className="text-blue-700 font-semibold text-lg">
              {behaviorPattern}
            </p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-gray-400">
            <h3 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">
              Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
          <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">
              Key Insights
            </h3>
            <ul className="space-y-3">
              {keyInsights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 font-bold mr-3 mt-0.5">
                    ✓
                  </span>
                  <span className="text-gray-700 leading-relaxed">
                    {insight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="mr-2">📊</span>
          Score Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(breakdown).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <span className="text-gray-700 capitalize font-medium">
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </span>
              <span
                className={`font-bold text-lg px-3 py-1 rounded-lg ${
                  value >= 0
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {value > 0 ? "+" : ""}
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm hover:shadow-md inline-flex items-center"
        >
          <span className="mr-2">←</span>
          Analyze Another Wallet
        </button>
      </div>
    </div>
  );
}
