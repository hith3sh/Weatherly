import React from 'react';
import { Card } from '../shared/Card';
import { WindStatus } from './WindStatus';
import { UvIndex } from './UvIndex';
import { SunriseSunset } from './SunriseSunset';
import { Humidity } from './Humidity';
import { Visibility } from './Visibility';
import { FeelsLike } from './FeelsLike';

interface TodaysHighlightProps {
  currentWeather: {
    temp_c: number;
    temp_f?: number;
    feelslike_c: number;
    feelslike_f?: number;
    humidity: number;
    wind_mph: number;
    wind_kph: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
  };
  astro?: {
    sunrise: string;
    sunset: string;
  };
  temperatureUnit: 'C' | 'F';
  location: {
    localtime: string;
  };
}

export const TodaysHighlight: React.FC<TodaysHighlightProps> = ({
  currentWeather,
  astro,
  temperatureUnit,
  location,
}) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
        Today&apos;s Highlights
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WindStatus windSpeed={currentWeather.wind_mph} />
        <UvIndex uvIndex={currentWeather.uv} />
        <SunriseSunset
          sunrise={astro?.sunrise}
          sunset={astro?.sunset}
          localtime={location.localtime}
        />
        <Humidity humidity={currentWeather.humidity} />
        <Visibility visibility={currentWeather.vis_km} />
        <FeelsLike
          feelsLike={
            temperatureUnit === 'F' && currentWeather.feelslike_f !== undefined
              ? currentWeather.feelslike_f
              : currentWeather.feelslike_c
          }
          temperatureUnit={temperatureUnit}
        />
      </div>
    </Card>
  );
};
