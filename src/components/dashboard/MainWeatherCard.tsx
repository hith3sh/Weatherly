import React from 'react';
import Image from 'next/image';
import { Card } from '../shared/Card';
import { conditionToIcon } from '../../utils/weatherIcons';

interface MainWeatherCardProps {
  currentWeather: {
    temp_c: number;
    temp_f?: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  temperatureUnit: 'C' | 'F';
}

export const MainWeatherCard: React.FC<MainWeatherCardProps> = ({
  currentWeather,
  location,
  temperatureUnit,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTemperature = () => {
    if (temperatureUnit === 'F' && currentWeather.temp_f !== undefined) {
      return Math.round(currentWeather.temp_f);
    }
    return Math.round(currentWeather.temp_c);
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Location and time */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {location.name}, {location.country}
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          {formatTime(location.localtime)} • {formatDate(location.localtime)}
        </p>
      </div>

      {/* Main weather display */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-6xl font-light text-slate-900 dark:text-white">
            {getTemperature()}°
          </div>
          <div className="text-lg text-slate-600 dark:text-slate-400 capitalize">
            {currentWeather.condition.text}
          </div>
        </div>
        <div className="relative">
          <Image
            src={
              conditionToIcon[currentWeather.condition.text] ||
              `https:${currentWeather.condition.icon}`
            }
            alt={currentWeather.condition.text}
            width={120}
            height={120}
            className="w-24 h-24"
            priority
          />
        </div>
      </div>

      {/* Weather summary */}
      <div className="text-sm text-slate-600 dark:text-slate-400">
        Feels like {getTemperature()}°
      </div>
    </Card>
  );
};
