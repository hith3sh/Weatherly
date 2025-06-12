import { HumidityIcon } from './icons/HumidityIcon';
import { WindIcon } from './icons/WindIcon';
import { UvIcon } from './icons/UvIcon';
import { TempIcon } from './icons/TemperatureIcon';

export const conditionToIcon: { [key: string]: string } = {
  "Sunny": "/icons/sunny-day.svg",
  "Clear": "/icons/clear-day.svg",
  "Partly Cloudy": "/icons/partly-cloudy-day.svg",
  "Cloudy": "/icons/cloudy-day-1.svg",
  "Fog": "/icons/fog.svg",
  "Overcast":"/icons/cloudy.svg",
  "Patchy rain possible": "/icons/rainy-4.svg",
  "Patchy snow possible": "/icons/snow.svg",
  "Thundery outbreaks possible": "/icons/thunder.svg",
  "Blowing snow": "/icons/snow.svg",
  "Patchy light rain": "/icons/rainy-1.svg",
  "Patchy rain nearby": "/icons/rainy-1.svg",
  "Light rain": "/icons/rainy-2.svg",
  "Moderate rain at times": "/icons/rainy-2.svg",
  "Moderate rain": "/icons/rainy-2.svg",
  "Heavy rain at times": "/icons/rainy-7.svg",
  "Heavy rain": "/icons/rainy-7.svg",
  "Light sleet": "/icons/rain-and-sleet-mix.svg",
  "Patchy light snow": "/icons/snowy-1.svg",
  "Light snow": "/icons/snowy-2.svg",
  "Patchy moderate snow": "/icons/snowy-3.svg",
  "Moderate snow": "/icons/snowy-4.svg",
  "Patchy heavy snow": "/icons/snowy-5.svg",
  "Heavy snow": "/icons/snowy-5.svg",
  "Light rain shower": "/icons/rainy-1-day.svg",
  "Moderate or heavy rain shower": "/icons/rainy-7.svg",
  "Torrential rain shower": "/icons/rainy-7.svg",
  "Patchy light rain with thunder": "/icons/thunder.svg",
  "Moderate or heavy rain with thunder": "/icons/thunder.svg",
  "Moderate or heavy snow with thunder": "/icons/severe-thunderstorm.svg",
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

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  return (
    <div className="weather-card">
      <div className="weather-header">
        <h1 className="weather-title">
          {weatherData.location.name}, {weatherData.location.country}
        </h1>
        <p className="weather-subtitle">
          {new Date(weatherData.location.localtime).toLocaleTimeString()}
        </p>
      </div>

      <div className="weather-main">
        <img
          // Try local SVG first, then fall back to API icon
          src={conditionToIcon[weatherData.current.condition.text] || `https:${weatherData.current.condition.icon}`}
          alt={weatherData.current.condition.text}
          className="weather-icon"
        />
        <div className="weather-current-condition">
          {weatherData.current.condition.text}
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail-item">
          <HumidityIcon />
          <div className="value">{weatherData.current.humidity}%</div>
          <div className="label">Humidity</div>
        </div>
        
        <div className="weather-detail-item">
          <WindIcon />
          <div className="value">{weatherData.current.wind_kph} km/h</div>
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
    </div>
  );
}; 