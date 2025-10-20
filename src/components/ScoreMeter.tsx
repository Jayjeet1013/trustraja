"use client";

import { useEffect, useState } from "react";

interface ScoreMeterProps {
  score: number;
  label: string;
  animated?: boolean;
}

export default function ScoreMeter({
  score,
  label,
  animated = true,
}: ScoreMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayScore((prev) => {
            if (prev >= score) {
              clearInterval(interval);
              return score;
            }
            return prev + 2;
          });
        }, 20);
        return () => clearInterval(interval);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setDisplayScore(score);
    }
  }, [score, animated]);

  const getColor = (currentScore: number) => {
    if (currentScore >= 70) return "bg-green-500";
    if (currentScore >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getTextColor = (currentScore: number) => {
    if (currentScore >= 70) return "text-green-600";
    if (currentScore >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${getTextColor(displayScore)}`}>
          {displayScore}/100
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColor(
            displayScore
          )}`}
          style={{ width: `${displayScore}%` }}
        />
      </div>

      {/* Score indicators */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>0</span>
        <span>25</span>
        <span>50</span>
        <span>75</span>
        <span>100</span>
      </div>
    </div>
  );
}
