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
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center mb-3">
          <div className="text-5xl">👑</div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">TrustRaja</h1>
        <p className="text-lg text-gray-600 mb-2">
          Multi-Chain Wallet Trust Analyzer
        </p>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Analyze any wallet across Ethereum, Polygon, BSC, Base, Arbitrum,
          Optimism & more using blockchain data and AI
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="wallet-address"
              className="block text-sm font-semibold text-gray-800 mb-2"
            >
              Wallet Address
            </label>
            <input
              id="wallet-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Write or paste an Base wallet address"
              className="w-full px-4 py-3 border placeholder-gray-400 text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono transition-all"
              disabled={isLoading}
            />
            {error && (
              <div className="mt-2 flex items-start">
                <span className="text-red-500 text-sm mr-1">⚠</span>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze Trust Score"
            )}
          </button>
        </form>

        <div className="mt-5 pt-5 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            🔒 Powered by Blockscout API and ASI AI
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-3 font-medium">
          Don&apos;t have a wallet address? Try an example:
        </p>
        <button
          onClick={() =>
            setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
          }
          className="group text-xs font-mono text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2.5 rounded-lg border border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all inline-flex items-center hover:shadow-md"
          disabled={isLoading}
        >
          <span className="mr-2 group-hover:scale-110 transition-transform">
            👆
          </span>
          <span className="font-semibold">Click me:</span>
          <span className="ml-2">0x742d...f44e</span>
        </button>
      </div>
    </div>
  );
}
