import React from 'react';

interface SunriseSunsetProps {
  sunrise?: string;
  sunset?: string;
}

export const SunriseSunset: React.FC<SunriseSunsetProps> = ({ sunrise, sunset }) => {
  const formatTime = (timeString?: string) => {
    if (!timeString) return '--:--';
    return timeString;
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sunrise & Sunset</span>
        </div>
      </div>

      <div className="space-y-3">
        {/* Sunrise */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Sunrise</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            {formatTime(sunrise)}
          </span>
        </div>

        {/* Sunset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Sunset</span>
          </div>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            {formatTime(sunset)}
          </span>
        </div>
      </div>
    </div>
  );
}; 