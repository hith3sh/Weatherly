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
  );
}; 