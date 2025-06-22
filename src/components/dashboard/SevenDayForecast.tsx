import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '../shared/Card';

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxtemp_f?: number;
    mintemp_f?: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

interface SevenDayForecastProps {
  forecast: ForecastDay[];
  temperatureUnit: 'C' | 'F';
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({
  forecast,
  temperatureUnit,
}) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getTemperature = (day: ForecastDay['day'], type: 'max' | 'min') => {
    if (temperatureUnit === 'F') {
      const temp = type === 'max' ? day.maxtemp_f : day.mintemp_f;
      return temp !== undefined
        ? Math.round(temp)
        : Math.round(
            type === 'max'
              ? (day.maxtemp_c * 9) / 5 + 32
              : (day.mintemp_c * 9) / 5 + 32
          );
    }
    return Math.round(type === 'max' ? day.maxtemp_c : day.mintemp_c);
  };

  const toggleExpanded = (index: number) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        7-Day Forecast
      </h2>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 min-w-max pb-2">
          {forecast.map((day, index) => (
            <div key={index} className="flex-shrink-0 w-32">
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full flex flex-col items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <div className="text-center mb-2">
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    {formatDate(day.date)}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : ''}
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-2 mb-3">
                  <Image
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <div className="text-center">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      {getTemperature(day.day, 'max')}°
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {getTemperature(day.day, 'min')}°
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 text-center capitalize">
                  {day.day.condition.text}
                </div>

                <svg
                  className={`w-4 h-4 text-slate-400 mt-2 transition-transform ${
                    expandedDay === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Expanded content */}
              {expandedDay === index && (
                <div className="mt-2">
                  <div className="bg-slate-50 dark:bg-slate-700/30 rounded-lg p-3">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          High
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {getTemperature(day.day, 'max')}°{temperatureUnit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 dark:text-slate-400">
                          Low
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {getTemperature(day.day, 'min')}°{temperatureUnit}
                        </span>
                      </div>
                      <div className="pt-1 border-t border-slate-200 dark:border-slate-600">
                        <div className="text-slate-500 dark:text-slate-400 mb-1">
                          Condition
                        </div>
                        <div className="font-semibold text-slate-900 dark:text-white capitalize text-xs">
                          {day.day.condition.text}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
