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
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Trust Analysis Results
        </h1>
        <p className="text-sm font-mono text-gray-600 bg-gray-100 rounded px-3 py-1 inline-block">
          {address}
        </p>
      </div>

      {/* Main Score Display */}
      <div
        className={`bg-white rounded-lg shadow-lg border-2 p-8 mb-6 ${getScoreBackground(
          totalScore
        )}`}
      >
        <div className="text-center">
          <div className="mb-4">
            <div className={`text-6xl font-bold ${getScoreColor(totalScore)}`}>
              {totalScore}
            </div>
            <div className="text-xl text-gray-600">/ 100</div>
          </div>
          <div className="mb-2">
            <span
              className={`text-lg font-semibold ${getScoreColor(totalScore)}`}
            >
              {scoreCategory}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-gray-600">Risk Level:</span>
            <span
              className={`text-sm font-medium px-2 py-1 rounded ${
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
        </div>
      </div>

      {/* Blockchain Data Overview */}
      {metadata && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            ⛓️ Blockchain Data Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-blue-600 text-sm font-medium mb-1">
                ETH Balance
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {metadata.balanceETH}
              </div>
              <div className="text-blue-600 text-xs">ETH</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-green-600 text-sm font-medium mb-1">
                Total Transactions
              </div>
              <div className="text-2xl font-bold text-green-900">
                {metadata.transactionCount}
              </div>
              <div className="text-green-600 text-xs">On-chain TXs</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-purple-600 text-sm font-medium mb-1">
                Token Interactions
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {metadata.tokenTransferCount}
              </div>
              <div className="text-purple-600 text-xs">Detected</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="text-gray-600 text-sm font-medium mb-1">
                Last Analyzed
              </div>
              <div className="text-lg font-bold text-gray-900">
                {new Date(metadata.analyzedAt).toLocaleDateString()}
              </div>
              <div className="text-gray-600 text-xs">
                {new Date(metadata.analyzedAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Analysis */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          🧠 AI Analysis
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Behavior Pattern
            </h3>
            <p className="text-blue-600 font-medium">{behaviorPattern}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Summary</h3>
            <p className="text-gray-700 leading-relaxed">{summary}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Key Insights</h3>
            <ul className="space-y-2">
              {keyInsights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          📊 Score Breakdown
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(breakdown).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <span className="text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
              </span>
              <span
                className={`font-semibold ${
                  value >= 0 ? "text-green-600" : "text-red-600"
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
      <div className="text-center">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Analyze Another Wallet
        </button>
      </div>
    </div>
  );
}
