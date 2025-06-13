import { HumidityIcon } from './icons/HumidityIcon';
import { WindIcon } from './icons/WindIcon';
import { UvIcon } from './icons/UvIcon';
import { TempIcon } from './icons/TemperatureIcon';
import { conditionToIcon } from '../utils/weatherIcons';

// Interface for forecast data structure
interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

// Main weather data interface matching the API response structure
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
    forecastday: ForecastDay[];
  };
}

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  // Helper function to format date into short weekday format (e.g., "Mon", "Tue")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="weather-card">
      {/* Location and time header section */}
      <div className="weather-header">
        <h1 className="weather-title">
          {weatherData.location.name}, {weatherData.location.country}
        </h1>
        <p className="weather-subtitle">
          {new Date(weatherData.location.localtime).toLocaleString('en-US', {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Main weather condition display with icon */}
      <div className="weather-main">
        <img
          // Fallback mechanism: Try local SVG first, then use API icon if not found
          src={
            conditionToIcon[weatherData.current.condition.text] ||
            `https:${weatherData.current.condition.icon}`
          }
          alt={weatherData.current.condition.text}
          className="weather-icon"
        />
        <div className="weather-current-condition">
          {weatherData.current.condition.text}
        </div>
      </div>

      {/* Weather metrics grid (humidity, wind, UV, temperature) */}
      <div className="weather-details">
        <div className="weather-detail-item">
          <HumidityIcon />
          <div className="value">{weatherData.current.humidity}%</div>
          <div className="label">Humidity</div>
        </div>

        <div className="weather-detail-item">
          <WindIcon />
          <div className="value">{weatherData.current.wind_mph} mph</div>
          <div className="label">Wind Speed</div>
        </div>

        <div className="weather-detail-item">
          <UvIcon />
          <div className="value">{weatherData.current.uv}</div>
          <div className="label">UV Index</div>
        </div>

        <div className="weather-detail-item">
          <TempIcon />
          <div className="value">{weatherData.current.temp_c}</div>
          <div className="label">Temperature</div>
        </div>
      </div>

      {/* 4-day forecast section */}
      <div className="forecast-section">
        <div className="forecast-grid">
          {weatherData.forecast.forecastday.map((day, index) => (
            <div key={index} className="forecast-day">
              <div className="forecast-date">{formatDate(day.date)}</div>
              <img
                src={day.day.condition.icon}
                alt={day.day.condition.text}
                className="forecast-icon"
              />
              <div className="forecast-temp">
                {day.day.maxtemp_c}° / {day.day.mintemp_c}°
              </div>
              <div className="forecast-condition">{day.day.condition.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
