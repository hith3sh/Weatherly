'use client';

import { useEffect, useState, useCallback } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SearchBar } from '../components/SearchBar';

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
  const [city, setCity] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCity = localStorage.getItem('lastCity');
      return savedCity || 'Colombo';
    }
    return 'Colombo';
  });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Add artificial delay for testing loading state if it's still there
      await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay for testing

      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}&aqi=no`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        console.log('Weather Condition Text:', data.current.condition.text);

        const localTimeHour = new Date(data.location.localtime).getHours();
        const newTheme = (localTimeHour >= 6 && localTimeHour < 18) ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      } else {
        if (data.error && data.error.code === 1006) {
          setError('City not found. Please try another city.');
        } else {
          setError(data.error?.message || 'Failed to fetch weather data.');
        }
        setWeatherData(null);
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to connect to the weather service!');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(city);
  }, [fetchWeatherData, city]);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
    localStorage.setItem('lastCity', newCity);
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

