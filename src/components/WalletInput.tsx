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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="text-6xl sm:text-7xl animate-pulse-glow">👑</div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-slide-up">
          TrustRaja
        </h1>
        <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 font-semibold mb-3">
          AI-Powered Web3 Trust Analyzer
        </p>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Analyze any Ethereum wallet&apos;s trustworthiness using blockchain
          data and advanced AI algorithms
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-100 dark:border-gray-700 backdrop-blur-sm animate-slide-up">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="wallet-address"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3"
            >
              <span className="flex items-center">
                <span className="mr-2">🔍</span>
                Wallet Address
              </span>
            </label>
            <div className="relative">
              <input
                id="wallet-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
                className="w-full px-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 text-sm font-mono transition-all duration-200 placeholder:text-gray-400"
                disabled={isLoading}
              />
              {address && (
                <button
                  type="button"
                  onClick={() => setAddress("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  disabled={isLoading}
                >
                  ✕
                </button>
              )}
            </div>
            {error && (
              <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start animate-fade-in">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
          >
            <span className="flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                </>
              ) : (
                <>
                  <span className="mr-2">🚀</span>
                  Analyze Trust Score
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            <span className="mr-2">✨</span>
            Powered by Blockscout & ASI AI
          </p>
        </div>
      </div>

      {/* Example Addresses */}
      <div className="mt-8 text-center animate-slide-up">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
          Try an example address:
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() =>
              setAddress("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")
            }
            className="text-xs font-mono text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800 transition-all duration-200 hover:shadow-md"
            disabled={isLoading}
          >
            0x742d...f44e
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800/50 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Instant Analysis
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Get results in seconds
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-5 rounded-xl border border-purple-200 dark:border-purple-800/50 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="text-3xl mb-2">🧠</div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
            AI-Powered
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Advanced intelligence
          </p>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-5 rounded-xl border border-pink-200 dark:border-pink-800/50 text-center hover:shadow-lg transition-shadow duration-200">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
            Secure & Private
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Your data is safe
          </p>
        </div>
      </div>
    </div>
  );
}
