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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          <span className="mr-2">👑</span>
          TrustRaja
        </h1>
        <p className="text-lg text-gray-600 mb-2">Web3 Wallet Trust Analyzer</p>
        <p className="text-sm text-gray-500">
          Analyze wallet trustworthiness using blockchain data and AI
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
              disabled={isLoading}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Analyzing..." : "Analyze Trust Score"}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Powered by Blockscout API and ASI AI
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">Try an example:</p>
        <button
          onClick={() =>
            setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
          }
          className="text-xs font-mono text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
          disabled={isLoading}
        >
          0x742d...f44e
        </button>
      </div>
    </div>
  );
}
