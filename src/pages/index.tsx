'use client';

import { useEffect, useState } from 'react';
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
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Colombo');

  const fetchWeatherData = async (cityName: string) => {
    setLoading(true);
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
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again later.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (searchCity: string) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  if (loading && !weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="weather-container">
      <div className="search-section">
        <SearchBar onSearch={handleSearch} isLoading={loading} />
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