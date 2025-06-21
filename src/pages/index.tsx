'use client';

import { useEffect, useState, useCallback } from 'react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Header } from '../components/layout/Header';
import { MainWeatherCard } from '../components/dashboard/MainWeatherCard';
import { TodaysHighlight } from '../components/dashboard/TodaysHighlight';
import { SevenDayForecast } from '../components/dashboard/SevenDayForecast';
import { WeatherMap } from '../components/dashboard/WeatherMap';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Rain } from '../components/Rain';
import { Snow } from '../components/Snow';
import { fetchWeatherData, WeatherData } from '../lib/weatherApi';

// Helper function to determine weather type for animation effects
const getWeatherType = (conditionText: string): 'rain' | 'snow' | null => {
  const text = conditionText.toLowerCase();
  if (
    text.includes('rain') ||
    text.includes('drizzle') ||
    text.includes('shower')
  ) {
    return 'rain';
  } else if (
    text.includes('snow') ||
    text.includes('blizzard') ||
    text.includes('sleet')
  ) {
    return 'snow';
  }
  return null;
};

export default function Home() {
  // Initialize state from localStorage or defaults
  const [city, setCity] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCity = localStorage.getItem('lastCity');
      return savedCity || 'Colombo';
    }
    return 'Colombo';
  });
  
  const [temperatureUnit, setTemperatureUnit] = useState<'C' | 'F'>(() => {
    if (typeof window !== 'undefined') {
      const savedUnit = localStorage.getItem('temperatureUnit') as 'C' | 'F';
      return savedUnit || 'C';
    }
    return 'C';
  });
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      return savedTheme || 'light';
    }
    return 'light';
  });

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherType, setWeatherType] = useState<'rain' | 'snow' | null>(null);

  // Apply theme to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  // Fetch weather data from API
  const fetchWeather = useCallback(async (cityName: string) => {
    setIsLoading(true);
    try {
      const data = await fetchWeatherData(cityName);
      setWeatherData(data);

      // Set weather type for animation effects
      const type = getWeatherType(data.current.condition.text);
      setWeatherType(type);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch weather data when city changes
  useEffect(() => {
    fetchWeather(city);
  }, [fetchWeather, city]);

  // Handle city search and persist to localStorage
  const handleSearch = (newCity: string) => {
    setCity(newCity);
    localStorage.setItem('lastCity', newCity);
  };

  // Handle temperature unit change
  const handleTemperatureUnitChange = (unit: 'C' | 'F') => {
    setTemperatureUnit(unit);
    localStorage.setItem('temperatureUnit', unit);
  };

  // Handle theme change
  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Show loading spinner while fetching initial data
  if (isLoading && !weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <PageWrapper>
      {/* Weather animation effects */}
      {weatherType === 'rain' && <Rain />}
      {weatherType === 'snow' && <Snow />}
      
      {/* Header with controls */}
      <Header
        onSearch={handleSearch}
        isLoading={isLoading}
        onTemperatureUnitChange={handleTemperatureUnitChange}
        temperatureUnit={temperatureUnit}
        onThemeChange={handleThemeChange}
        currentTheme={theme}
      />

      {/* Main dashboard layout */}
      {weatherData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main weather card and 7-day forecast */}
          <div className="lg:col-span-1 space-y-6">
            <MainWeatherCard
              currentWeather={weatherData.current}
              location={weatherData.location}
              temperatureUnit={temperatureUnit}
            />
            
            {/* 7-Day Forecast below main weather card */}
            <SevenDayForecast 
              forecast={weatherData.forecast.forecastday} 
              temperatureUnit={temperatureUnit}
            />
          </div>

          {/* Right column - Today's Highlights and Weather Map */}
          <div className="lg:col-span-2 space-y-6">
            <TodaysHighlight
              currentWeather={weatherData.current}
              astro={weatherData.forecast.forecastday[0]?.astro}
              temperatureUnit={temperatureUnit}
            />
            
            {/* Weather Map below Today's Highlights */}
            <WeatherMap location={weatherData.location} />
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
