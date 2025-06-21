import React from 'react';
import { Card } from '../shared/Card';

interface WeatherMapProps {
  location: {
    name: string;
    country: string;
  };
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ location }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        Weather Map
      </h2>
      
      <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl h-48 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
          </svg>
          <div className="text-slate-600 dark:text-slate-400 mb-1 text-sm">
            Weather Map for {location.name}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-500">
            Map integration coming soon
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-slate-600 dark:text-slate-400">
        Interactive weather map with current conditions and forecasts will be available here.
      </div>
    </Card>
  );
}; 