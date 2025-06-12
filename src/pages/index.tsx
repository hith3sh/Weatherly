'use client';

import { useEffect, useState, useCallback } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SearchBar } from '../components/SearchBar';
import { ClipLoader } from 'react-spinners';

interface WeatherData {
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    uv: number;
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
}

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState(() => {
    // Get the last searched city from localStorage or default to Colombo
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lastCity') || 'Colombo';
    }
    return 'Colombo';
  });

  const fetchWeatherData = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);


    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}&aqi=no`
      );
      const data = await response.json();
      
      if (!response.ok) {
        // Handle API error responses
        if (data.error?.code === 1006) {
          setError(`City "${cityName}" not found. Please try another city.`);
        } else {
          setError(data.error?.message || 'Failed to fetch weather data');
        }
        setWeatherData(null);
        return;
      }

      setWeatherData(data);
      // Save the successful city to localStorage
      localStorage.setItem('lastCity', cityName);

      // Determine theme based on local time
      const localTimeHour = new Date(data.location.localtime).getHours();
      const isDaytime = localTimeHour >= 6 && localTimeHour < 18; //  6 AM to 6 PM is daytime
      document.documentElement.setAttribute('data-theme', isDaytime ? 'light' : 'dark');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          setError('Network error. Please check your internet connection and try again.');
        } else {
          setError('Failed to fetch weather data. Please try again later.');
        }
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add online/offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      if (error?.includes('offline') || error?.includes('Network error')) {
        setError(null);
        fetchWeatherData(city);
      }
    };

    const handleOffline = () => {
      setError('You are currently offline. Please check your internet connection.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [city, error, fetchWeatherData]);

  useEffect(() => {
    fetchWeatherData(city);
  }, [fetchWeatherData, city]);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  const clearError = () => {
    setError(null);
  };

  if (isLoading && !weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="weather-container">
      <div className="search-section">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        {error && (
          <div className="error-message-inline">
            {error}
          </div>
        )}
      </div>
      
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
} 