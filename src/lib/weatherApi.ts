// Weather API utility functions
export interface WeatherData {
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_mph: number;
    wind_kph: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    name: string;
    country: string;
    localtime: string;
    lat: number;
    lon: number;
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
      astro?: {
        sunrise: string;
        sunset: string;
      };
    }>;
  };
}

export interface ApiErrorResponse {
  error: {
    code: number;
    message: string;
  };
}

export class WeatherApiError extends Error {
  constructor(
    message: string,
    public code?: number
  ) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    throw new WeatherApiError('Weather API key not configured');
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=no`
    );

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse;
      throw new WeatherApiError(
        errorData.error?.message || 'Failed to fetch weather data',
        errorData.error?.code
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Network error while fetching weather data');
  }
};

interface CitySearchResult {
  name: string;
  country: string;
}

export const searchCities = async (
  query: string
): Promise<CitySearchResult[]> => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  if (!apiKey) {
    throw new WeatherApiError('Weather API key not configured');
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      const errorData = (await response.json()) as ApiErrorResponse;
      throw new WeatherApiError(
        errorData.error?.message || 'Failed to search cities',
        errorData.error?.code
      );
    }

    const data = (await response.json()) as CitySearchResult[];
    return data.map(city => ({
      name: city.name,
      country: city.country,
    }));
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    throw new WeatherApiError('Network error while searching cities');
  }
};
