"use client";

import { useState } from "react";

interface WalletInputProps {
  onAnalyze: (address: string) => void;
  isLoading: boolean;
}

export default function WalletInput({
  onAnalyze,
  isLoading,
}: WalletInputProps) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const validateAddress = (addr: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(addr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!address.trim()) {
      setError("Please enter a wallet address");
      return;
    }

    if (!validateAddress(address.trim())) {
      setError("Please enter a valid Ethereum wallet address");
      return;
    }

    onAnalyze(address.trim());
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">👑 TrustRaja</h1>
        <p className="text-lg text-gray-600">AI-powered Web3 Trust Analyzer</p>
        <p className="text-sm text-gray-500 mt-2">
          Analyze any Ethereum wallet's trustworthiness using blockchain data
          and AI
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="wallet-address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Wallet Address
            </label>
            <input
              id="wallet-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
              disabled={isLoading}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Analyzing..." : "Analyze Trust Score"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Enter any Ethereum-compatible wallet address to get instant trust
            analysis
          </p>
        </div>
      </div>

      {/* Example addresses for testing */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Try these example addresses:
        </p>
        <div className="space-y-2">
          <button
            onClick={() =>
              setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
            }
            className="block mx-auto text-xs font-mono text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1 rounded"
            disabled={isLoading}
          >
            0x742d35Cc6634C0532925a3b844Bc454e4438f44e
          </button>
        </div>
      </div>
    </div>
  );
}
