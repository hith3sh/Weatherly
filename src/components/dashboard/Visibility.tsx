import React from 'react';

interface VisibilityProps {
  visibility: number;
}

export const Visibility: React.FC<VisibilityProps> = ({ visibility }) => {
  const getVisibilityLevel = (vis: number) => {
    if (vis < 1) return { level: 'Very Poor', color: 'text-red-500' };
    if (vis < 5) return { level: 'Poor', color: 'text-orange-500' };
    if (vis < 10) return { level: 'Moderate', color: 'text-yellow-500' };
    if (vis < 20) return { level: 'Good', color: 'text-green-500' };
    return { level: 'Excellent', color: 'text-blue-500' };
  };

  const { level, color } = getVisibilityLevel(visibility);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/20 dark:to-gray-800/20 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Visibility</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">
          {visibility} km
        </div>
        <div className={`text-sm font-medium ${color}`}>
          {level}
        </div>
      </div>

      {/* Visibility indicator */}
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < Math.min(Math.floor(visibility / 4), 5)
                ? 'bg-slate-400'
                : 'bg-slate-200 dark:bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}; 