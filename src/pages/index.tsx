'use client';

import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=Colombo&aqi=no`
        );
        const data = await response.json();
        
        if (response.ok) {
          setWeatherData(data);
        } else {
          throw new Error(data.error.message);
        }
      } catch (error) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="weather-container">
      {weatherData && (
        <div className="weather-card">
          <div className="weather-header">
            <h1 className="weather-title">
              {weatherData.location.name}, {weatherData.location.country}
            </h1>
            <p className="weather-subtitle">
              {new Date(weatherData.location.localtime).toLocaleString()}
            </p>
          </div>

          <div className="weather-main">
            <img 
              src={`https:${weatherData.current.condition.icon}`} 
              alt={weatherData.current.condition.text}
              className="weather-icon"
            />
            <div className="weather-temp">
              {weatherData.current.temp_c}°C
            </div>
          </div>

          <div className="weather-details">
            <div className="weather-detail-card">
              <div className="detail-label">Humidity</div>
              <div className="detail-value">{weatherData.current.humidity}%</div>
            </div>
            
            <div className="weather-detail-card">
              <div className="detail-label">Wind Speed</div>
              <div className="detail-value">{weatherData.current.wind_kph} km/h</div>
            </div>
            
            <div className="weather-detail-card">
              <div className="detail-label">UV Index</div>
              <div className="detail-value">{weatherData.current.uv}</div>
            </div>
            
            <div className="weather-detail-card">
              <div className="detail-label">Condition</div>
              <div className="detail-value">{weatherData.current.condition.text}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 