import React from 'react';

interface HumidityProps {
  humidity: number;
}

export const Humidity: React.FC<HumidityProps> = ({ humidity }) => {
  const getHumidityLevel = (humidity: number) => {
    if (humidity < 30) return { level: 'Low', color: 'text-blue-500' };
    if (humidity < 60) return { level: 'Normal', color: 'text-green-500' };
    return { level: 'High', color: 'text-purple-500' };
  };

  const { level, color } = getHumidityLevel(humidity);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Humidity</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {humidity}%
        </div>
        <div className={`text-sm font-medium ${color}`}>
          {level}
        </div>
      </div>

      {/* Humidity bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-400 to-cyan-500 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${humidity}%` }}
        ></div>
      </div>
    </div>
  );
}; 