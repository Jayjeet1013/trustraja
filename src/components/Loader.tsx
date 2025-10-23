"use client";

interface LoaderProps {
  message?: string;
}

export default function Loader({
  message = "Analyzing wallet...",
}: LoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-lg w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 sm:p-10 text-center">
          {/* Animated crown logo */}
          <div className="mb-6 relative">
            <div className="inline-block">
              <div className="text-6xl animate-pulse-glow">👑</div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            </div>
          </div>

          {/* Loading spinner */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2">
              <div
                className="w-4 h-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-4 h-4 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>

          {/* Loading message */}
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {message}
          </h2>

          {/* Loading steps with progress */}
          <div className="space-y-4 text-left max-w-sm mx-auto mb-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-green-900 dark:text-green-100">
                    Fetching blockchain data
                  </span>
                  <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-1.5 mt-1">
                    <div className="bg-green-500 h-1.5 rounded-full w-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg
                      className="w-5 h-5 text-white animate-spin"
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
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    Running AI analysis
                  </span>
                  <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-1.5 mt-1">
                    <div className="bg-blue-500 h-1.5 rounded-full w-2/3 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-300">⏳</span>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Calculating trust score
                  </span>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                    <div className="bg-gray-400 dark:bg-gray-500 h-1.5 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <span className="mr-2">⚡</span>
              This usually takes 5-10 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
