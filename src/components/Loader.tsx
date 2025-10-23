"use client";

interface LoaderProps {
  message?: string;
}

export default function Loader({
  message = "Analyzing wallet...",
}: LoaderProps) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center space-x-2">
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">{message}</h2>

        <div className="space-y-3 text-left max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">
              Fetching blockchain data...
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Running AI analysis...
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">
              Calculating trust score...
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          This may take a few seconds
        </p>
      </div>
    </div>
  );
}
