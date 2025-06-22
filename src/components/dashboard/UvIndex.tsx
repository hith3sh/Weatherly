import React from 'react';

interface UvIndexProps {
  uvIndex: number;
}

export const UvIndex: React.FC<UvIndexProps> = ({ uvIndex }) => {
  const getUvLevel = (uv: number) => {
    if (uv <= 2)
      return { level: 'Low', color: 'text-green-500', bgColor: 'bg-green-500' };
    if (uv <= 5)
      return {
        level: 'Moderate',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500',
      };
    if (uv <= 7)
      return {
        level: 'High',
        color: 'text-orange-500',
        bgColor: 'bg-orange-500',
      };
    if (uv <= 10)
      return {
        level: 'Very High',
        color: 'text-red-500',
        bgColor: 'bg-red-500',
      };
    return {
      level: 'Extreme',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500',
    };
  };

  const { level, color, bgColor } = getUvLevel(uvIndex);
  const percentage = Math.min((uvIndex / 11) * 100, 100);

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg
            className="w-5 h-5 text-orange-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            UV Index
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {uvIndex}
        </div>
        <div className={`text-sm font-medium ${color}`}>{level}</div>
      </div>

      {/* Circular progress indicator */}
      <div className="relative w-16 h-16 mx-auto">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-200 dark:text-slate-600"
          />
          {/* Progress circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
            className={`${color} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-8 h-8 rounded-full ${bgColor} opacity-20`}></div>
        </div>
      </div>
    </div>
  );
};
