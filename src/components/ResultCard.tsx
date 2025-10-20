"use client";

import type { TrustScoreDetails } from "@/lib/score";
import type { AIAnalysisResult } from "@/lib/asi";
import { getScoreColor, getScoreBackground } from "@/lib/score";

interface ResultCardProps {
  address: string;
  trustScore: TrustScoreDetails;
  aiAnalysis: AIAnalysisResult;
  onBack: () => void;
}

export default function ResultCard({
  address,
  trustScore,
  aiAnalysis,
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
