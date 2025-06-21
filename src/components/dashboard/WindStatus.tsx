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
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Wind Status</span>
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