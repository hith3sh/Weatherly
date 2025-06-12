import { HumidityIcon } from './icons/HumidityIcon';
import { WindIcon } from './icons/WindIcon';
import { UvIcon } from './icons/UvIcon';
import { TempIcon } from './icons/TemperatureIcon';

// Define the mapping for weather conditions to local SVG icon paths
export const conditionToIcon: { [key: string]: string } = {
  "sunny": "/icons/sunny.svg",
  "clear": "/icons/clear-night.svg",
  "partly cloudy": "/icons/partly-cloudy.svg",
  "cloudy": "/icons/cloudy.svg",
  "overcast": "/icons/overcast.svg",
  "mist": "/icons/mist.svg",
  "patchy rain possible": "/icons/light-rain.svg",
  "patchy snow possible": "/icons/light-snow.svg",
  "patchy sleet possible": "/icons/sleet.svg",
  "patchy freezing drizzle possible": "/icons/freezing-drizzle.svg",
  "thundery outbreaks possible": "/icons/thunder.svg",
  "blowing snow": "/icons/blowing-snow.svg",
  "blizzard": "/icons/blizzard.svg",
  "fog": "/icons/fog.svg",
  "freezing fog": "/icons/freezing-fog.svg",
  "patchy light drizzle": "/icons/light-drizzle.svg",
  "light drizzle": "/icons/light-drizzle.svg",
  "freezing drizzle": "/icons/freezing-drizzle.svg",
  "heavy freezing drizzle": "/icons/freezing-drizzle.svg",
  "patchy light rain": "/icons/light-rain.svg",
  "light rain": "/icons/light-rain.svg",
  "moderate rain at times": "/icons/moderate-rain.svg",
  "moderate rain": "/icons/moderate-rain.svg",
  "heavy rain at times": "/icons/heavy-rain.svg",
  "heavy rain": "/icons/heavy-rain.svg",
  "light freezing rain": "/icons/freezing-rain.svg",
  "moderate or heavy freezing rain": "/icons/freezing-rain.svg",
  "light sleet": "/icons/sleet.svg",
  "moderate or heavy sleet": "/icons/sleet.svg",
  "patchy light snow": "/icons/light-snow.svg",
  "light snow": "/icons/light-snow.svg",
  "patchy moderate snow": "/icons/moderate-snow.svg",
  "moderate snow": "/icons/moderate-snow.svg",
  "patchy heavy snow": "/icons/heavy-snow.svg",
  "heavy snow": "/icons/heavy-snow.svg",
  "ice pellets": "/icons/ice-pellets.svg",
  "light rain shower": "/icons/rainy-4.svg",
  "moderate or heavy rain shower": "/icons/heavy-rain.svg",
  "torrential rain shower": "/icons/extreme-rain.svg",
  "light sleet showers": "/icons/sleet.svg",
  "moderate or heavy sleet showers": "/icons/sleet.svg",
  "light snow showers": "/icons/light-snow.svg",
  "moderate or heavy snow showers": "/icons/heavy-snow.svg",
  "light showers of ice pellets": "/icons/ice-pellets.svg",
  "moderate or heavy showers of ice pellets": "/icons/ice-pellets.svg",
  "patchy light rain with thunder": "/icons/thunder-rain.svg",
  "moderate or heavy rain with thunder": "/icons/thunder-rain.svg",
  "patchy light snow with thunder": "/icons/thunder-snow.svg",
  "moderate or heavy snow with thunder": "/icons/thunder-snow.svg",
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