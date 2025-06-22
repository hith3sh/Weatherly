import React from 'react';

interface WindStatusProps {
  windSpeed: number;
}

export const WindStatus: React.FC<WindStatusProps> = ({ windSpeed }) => {
  // Simple wind speed visualization
  const getWindLevel = (speed: number) => {
    if (speed < 5) return 'Light';
    if (speed < 10) return 'Gentle';
    if (speed < 15) return 'Moderate';
    if (speed < 25) return 'Strong';
    return 'Very Strong';
  };

  const getWindColor = (speed: number) => {
    if (speed < 5) return 'text-blue-400';
    if (speed < 10) return 'text-blue-500';
    if (speed < 15) return 'text-blue-600';
    if (speed < 25) return 'text-blue-700';
    return 'text-blue-800';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#057ceb"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-wind-icon lucide-wind"
          >
            <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
            <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
            <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Wind Status
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {windSpeed} mph
        </div>
        <div className={`text-sm font-medium ${getWindColor(windSpeed)}`}>
          {getWindLevel(windSpeed)} breeze
        </div>
      </div>

      {/* Simple wind visualization */}
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i < Math.min(Math.floor(windSpeed / 5), 5)
                ? 'bg-blue-500'
                : 'bg-slate-200 dark:bg-slate-600'
            }`}
            style={{
              width: `${Math.max(20, (i + 1) * 8)}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
