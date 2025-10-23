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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 animate-slide-up">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="text-5xl sm:text-6xl">👑</div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Trust Analysis Results
          </h1>
          <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-xl px-4 sm:px-6 py-3 shadow-lg border border-gray-200 dark:border-gray-700">
            <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mr-2">
              📍
            </span>
            <p className="text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
              {address}
            </p>
          </div>
        </div>

        {/* Main Score Display */}
        <div className="relative mb-8 animate-slide-up">
          <div
            className={`bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 p-8 sm:p-12 relative overflow-hidden ${getScoreBackground(
              totalScore
            )}`}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-pink-400/10 to-purple-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center">
                <div className="mb-6">
                  <div className="inline-flex flex-col items-center justify-center">
                    <div
                      className={`text-7xl sm:text-8xl font-extrabold ${getScoreColor(
                        totalScore
                      )} mb-2 animate-pulse-glow`}
                    >
                      {totalScore}
                    </div>
                    <div className="text-2xl sm:text-3xl text-gray-500 dark:text-gray-400 font-light">
                      / 100
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <span
                    className={`text-2xl sm:text-3xl font-bold ${getScoreColor(
                      totalScore
                    )}`}
                  >
                    {scoreCategory}
                  </span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                    Risk Level:
                  </span>
                  <span
                    className={`text-sm sm:text-base font-bold px-4 py-2 rounded-xl shadow-lg ${
                      riskLevel === "LOW"
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                        : riskLevel === "MEDIUM"
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                        : "bg-gradient-to-r from-red-400 to-pink-500 text-white"
                    }`}
                  >
                    {riskLevel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Data Overview */}
        {metadata && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <span className="mr-3 text-3xl">⛓️</span>
              Blockchain Data Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-5 rounded-xl border-2 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-shadow duration-200">
                <div className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-2 flex items-center">
                  <span className="mr-2">💰</span>
                  ETH Balance
                </div>
                <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                  {metadata.balanceETH}
                </div>
                <div className="text-blue-600 dark:text-blue-400 text-xs font-medium">
                  ETH
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-5 rounded-xl border-2 border-green-200 dark:border-green-700 hover:shadow-lg transition-shadow duration-200">
                <div className="text-green-600 dark:text-green-400 text-sm font-semibold mb-2 flex items-center">
                  <span className="mr-2">📝</span>
                  Total Transactions
                </div>
                <div className="text-3xl font-bold text-green-900 dark:text-green-100 mb-1">
                  {metadata.transactionCount}
                </div>
                <div className="text-green-600 dark:text-green-400 text-xs font-medium">
                  On-chain TXs
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-5 rounded-xl border-2 border-purple-200 dark:border-purple-700 hover:shadow-lg transition-shadow duration-200">
                <div className="text-purple-600 dark:text-purple-400 text-sm font-semibold mb-2 flex items-center">
                  <span className="mr-2">🪙</span>
                  Token Interactions
                </div>
                <div className="text-3xl font-bold text-purple-900 dark:text-purple-100 mb-1">
                  {metadata.tokenTransferCount}
                </div>
                <div className="text-purple-600 dark:text-purple-400 text-xs font-medium">
                  Detected
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-5 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-shadow duration-200">
                <div className="text-gray-600 dark:text-gray-300 text-sm font-semibold mb-2 flex items-center">
                  <span className="mr-2">🕒</span>
                  Last Analyzed
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {new Date(metadata.analyzedAt).toLocaleDateString()}
                </div>
                <div className="text-gray-600 dark:text-gray-300 text-xs font-medium">
                  {new Date(metadata.analyzedAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <span className="mr-3 text-3xl">🧠</span>
            AI Analysis
          </h2>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-5 rounded-xl border-l-4 border-blue-500">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center">
                <span className="mr-2">🎯</span>
                Behavior Pattern
              </h3>
              <p className="text-blue-700 dark:text-blue-300 font-semibold text-lg">
                {behaviorPattern}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-5 rounded-xl border-l-4 border-purple-500">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <span className="mr-2">📋</span>
                Summary
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {summary}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl border-l-4 border-green-500">
              <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                <span className="mr-2">💡</span>
                Key Insights
              </h3>
              <ul className="space-y-3">
                {keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-3 text-xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {insight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 mb-6 sm:mb-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <span className="mr-3 text-3xl">📊</span>
            Score Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(breakdown).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-200"
              >
                <span className="text-gray-700 dark:text-gray-300 capitalize font-medium">
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                </span>
                <span
                  className={`font-bold text-lg px-3 py-1 rounded-lg ${
                    value >= 0
                      ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                      : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
                  }`}
                >
                  {value > 0 ? "+" : ""}
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analytics */}
        {metadata && (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              📈 Wallet Analytics
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-blue-600 text-sm font-medium">
                    Transaction Volume
                  </div>
                  <div className="text-xl font-bold text-blue-900 mt-1">
                    {metadata.transactionCount > 0 ? "Active" : "Limited"}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">
                    {metadata.transactionCount} total transactions
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-green-600 text-sm font-medium">
                    Token Diversity
                  </div>
                  <div className="text-xl font-bold text-green-900 mt-1">
                    {metadata.tokenTransferCount > 5
                      ? "High"
                      : metadata.tokenTransferCount > 2
                      ? "Medium"
                      : "Low"}
                  </div>
                  <div className="text-xs text-green-600 mt-1">
                    {metadata.tokenTransferCount} token interactions
                  </div>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-purple-600 text-sm font-medium">
                    Wallet Maturity
                  </div>
                  <div className="text-xl font-bold text-purple-900 mt-1">
                    {parseFloat(metadata.balanceETH) > 0.1
                      ? "Established"
                      : "Developing"}
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    {metadata.balanceETH} ETH balance
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Activity Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction Count:</span>
                      <span className="font-medium">
                        {metadata.transactionCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Token Activity:</span>
                      <span className="font-medium">
                        {metadata.tokenTransferCount} interactions
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Balance:</span>
                      <span className="font-medium">
                        {metadata.balanceETH} ETH
                      </span>
                    </div>
                    {metadata.blockchainStats && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total ETH Volume:</span>
                        <span className="font-medium">
                          {metadata.blockchainStats.totalEthVolume} ETH
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Activity Level:</span>
                      <span
                        className={`font-medium ${
                          metadata.transactionCount > 50
                            ? "text-green-600"
                            : metadata.transactionCount > 10
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {metadata.transactionCount > 50
                          ? "High"
                          : metadata.transactionCount > 10
                          ? "Medium"
                          : "Low"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Token Engagement:</span>
                      <span
                        className={`font-medium ${
                          metadata.tokenTransferCount > 5
                            ? "text-green-600"
                            : metadata.tokenTransferCount > 2
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {metadata.tokenTransferCount > 5
                          ? "High"
                          : metadata.tokenTransferCount > 2
                          ? "Medium"
                          : "Low"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Assessment:</span>
                      <span
                        className={`font-medium px-2 py-1 rounded text-xs ${
                          riskLevel === "LOW"
                            ? "bg-green-100 text-green-800"
                            : riskLevel === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {riskLevel}
                      </span>
                    </div>
                    {metadata.blockchainStats && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Recent Activity:</span>
                        <span
                          className={`font-medium ${
                            metadata.blockchainStats.hasRecentActivity
                              ? "text-green-600"
                              : "text-gray-600"
                          }`}
                        >
                          {metadata.blockchainStats.hasRecentActivity
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Advanced Stats */}
              {metadata.blockchainStats && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Transaction Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="text-green-600 text-xs font-medium mb-1">
                        SUCCESSFUL
                      </div>
                      <div className="text-lg font-bold text-green-900">
                        {metadata.blockchainStats.successfulTransactions}
                      </div>
                      <div className="text-green-600 text-xs">
                        {metadata.transactionCount > 0
                          ? Math.round(
                              (metadata.blockchainStats.successfulTransactions /
                                metadata.transactionCount) *
                                100
                            )
                          : 0}
                        % success rate
                      </div>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <div className="text-red-600 text-xs font-medium mb-1">
                        FAILED
                      </div>
                      <div className="text-lg font-bold text-red-900">
                        {metadata.blockchainStats.failedTransactions}
                      </div>
                      <div className="text-red-600 text-xs">
                        {metadata.transactionCount > 0
                          ? Math.round(
                              (metadata.blockchainStats.failedTransactions /
                                metadata.transactionCount) *
                                100
                            )
                          : 0}
                        % failure rate
                      </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <div className="text-purple-600 text-xs font-medium mb-1">
                        UNIQUE TOKENS
                      </div>
                      <div className="text-lg font-bold text-purple-900">
                        {metadata.blockchainStats.uniqueTokens}
                      </div>
                      <div className="text-purple-600 text-xs">
                        Token diversity
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="text-center animate-slide-up">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-4 focus:ring-gray-500/50 transition-all duration-200"
          >
            <span className="flex items-center justify-center">
              <span className="mr-2">🔍</span>
              Analyze Another Wallet
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
