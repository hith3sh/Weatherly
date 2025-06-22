import React from 'react';

interface FeelsLikeProps {
  feelsLike: number;
  temperatureUnit: 'C' | 'F';
}

export const FeelsLike: React.FC<FeelsLikeProps> = ({
  feelsLike,
  temperatureUnit,
}) => {
  const getFeelsLikeDescription = (temp: number, unit: 'C' | 'F') => {
    if (unit === 'F') {
      if (temp < 32) return 'Very Cold';
      if (temp < 50) return 'Cold';
      if (temp < 68) return 'Cool';
      if (temp < 77) return 'Comfortable';
      if (temp < 86) return 'Warm';
      if (temp < 95) return 'Hot';
      return 'Very Hot';
    } else {
      if (temp < 0) return 'Very Cold';
      if (temp < 10) return 'Cold';
      if (temp < 20) return 'Cool';
      if (temp < 25) return 'Comfortable';
      if (temp < 30) return 'Warm';
      if (temp < 35) return 'Hot';
      return 'Very Hot';
    }
  };

  const getFeelsLikeColor = (temp: number, unit: 'C' | 'F') => {
    if (unit === 'F') {
      if (temp < 32) return 'text-blue-600';
      if (temp < 50) return 'text-blue-500';
      if (temp < 68) return 'text-green-500';
      if (temp < 77) return 'text-green-600';
      if (temp < 86) return 'text-orange-500';
      if (temp < 95) return 'text-red-500';
      return 'text-red-600';
    } else {
      if (temp < 0) return 'text-blue-600';
      if (temp < 10) return 'text-blue-500';
      if (temp < 20) return 'text-green-500';
      if (temp < 25) return 'text-green-600';
      if (temp < 30) return 'text-orange-500';
      if (temp < 35) return 'text-red-500';
      return 'text-red-600';
    }
  };

  const color = getFeelsLikeColor(feelsLike, temperatureUnit);
  const range =
    temperatureUnit === 'F' ? { min: 0, max: 100 } : { min: -10, max: 40 };
  const percentage = Math.min(
    Math.max(((feelsLike - range.min) / (range.max - range.min)) * 100, 0),
    100
  );

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9e3333"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-thermometer-icon lucide-thermometer"
          >
            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Feels Like
          </span>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {Math.round(feelsLike)}°
        </div>
        <div className={`text-sm font-medium ${color}`}>
          {getFeelsLikeDescription(feelsLike, temperatureUnit)}
        </div>
      </div>

      {/* Temperature indicator */}
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-slate-200 dark:bg-slate-600 rounded-full h-1">
          <div
            className="bg-gradient-to-r from-blue-400 via-green-400 to-red-500 h-1 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {range.min}° / {range.max}°
        </div>
      </div>
    </div>
  );
};
