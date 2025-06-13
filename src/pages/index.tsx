'use client';

import { useEffect, useState, useCallback } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SearchBar } from '../components/SearchBar';
import { Rain } from '../components/Rain';
import { Snow } from '../components/Snow';

const getWeatherType = (conditionText: string): 'rain' | 'snow' | null => {
  const text = conditionText.toLowerCase();
  if (text.includes('rain') || text.includes('drizzle') || text.includes('shower')) {
    return 'rain';
  } else if (text.includes('snow') || text.includes('blizzard') || text.includes('sleet')) {
    return 'snow';
  }
  return null;
};

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
  const [weatherType, setWeatherType] = useState<'rain' | 'snow' | null>(null);

  const fetchWeatherData = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName}&days=4&aqi=no`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        
        //weather type
        const type = getWeatherType(data.current.condition.text);
        setWeatherType(type);

        
        const is_day = data.current.is_day
        const newTheme = (is_day==1) ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      } else {
        if (data.error && data.error.code === 1006) {
          setError('😥 City not found. Try another city!');
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
    {weatherType === 'rain' && <Rain />}
    {weatherType === 'snow' && <Snow />}
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

