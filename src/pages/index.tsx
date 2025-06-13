'use client';

import { useEffect, useState, useCallback } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { SearchBar } from '../components/SearchBar';
import { Rain } from '../components/Rain';
import { Snow } from '../components/Snow';

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

// Type definition matching the WeatherAPI.com response structure
interface WeatherData {
  current: {
    temp_c: number;
    humidity: number;
    wind_mph: number;
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
  forecast: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

export default function Home() {
  // Initialize city from localStorage or default to 'Colombo'
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

  // Fetch weather data from API and handle theme switching
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

        // Set weather type for animation effects
        const type = getWeatherType(data.current.condition.text);
        setWeatherType(type);

        // Switch theme based on day/night
        const is_day = data.current.is_day;
        const newTheme = is_day == 1 ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      } else {
        // Handle specific API error cases
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

  // Fetch weather data when city changes
  useEffect(() => {
    fetchWeatherData(city);
  }, [fetchWeatherData, city]);

  // Handle city search and persist to localStorage
  const handleSearch = (newCity: string) => {
    setCity(newCity);
    localStorage.setItem('lastCity', newCity);
  };

  // Show loading spinner while fetching initial data
  if (isLoading && !weatherData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="weather-container">
      {/* Weather animation effects */}
      {weatherType === 'rain' && <Rain />}
      {weatherType === 'snow' && <Snow />}
      
      {/* Search section with error handling */}
      <div className="search-section">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        {error && <div className="error-message-inline">{error}</div>}
      </div>

      {/* Main weather card display */}
      {weatherData && <WeatherCard weatherData={weatherData} />}
    </div>
  );
}
