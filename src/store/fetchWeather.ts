import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

// Dicionário de tradução para as condições do tempo
const weatherConditionsMap: { [key: string]: string } = {
  Clear: 'Céu Limpo',
  Clouds: 'Nuvens',
  Rain: 'Chuva',
  Drizzle: 'Chuvisco',
  Thunderstorm: 'Trovoadas',
  Snow: 'Neve',
  Mist: 'Névoa',
  Smoke: 'Fumaça',
  Haze: 'Neblina',
  Dust: 'Poeira',
  Fog: 'Nevoeiro',
  Sand: 'Areia',
  Ash: 'Cinzas',
  Squall: 'Rajada',
  Tornado: 'Tornado',
};

// Função para traduzir a condição principal do tempo
const translateWeatherMain = (main: string): string => {
  return weatherConditionsMap[main] || main; // Retorna a tradução ou o original se não encontrar
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string | { lat: number; lng: number }, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetchWeatherData(city),
        fetchExtendedForecastData(city),
      ]);
      dispatch(setIsLoading(false));
      if (weatherRes.cod === 200 && forecastRes.cod === "200") {
        dispatch(setIsInitial(false));
        return { weatherRes, forecastRes };
      }
      return rejectWithValue(weatherRes.message || 'Não foi possível buscar os dados do clima.');
    } catch (error) {
      dispatch(setIsLoading(false));
      const e = error as Error;
      return rejectWithValue(e.message || 'Ocorreu um erro desconhecido.');
    }
  }
);

export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const weatherResponse = res.weatherRes;
  const forecastResponse = res.forecastRes;

  const weather: WeatherData = {
    ...weatherResponse,
    weather: {
      ...weatherResponse.weather[0],
      // --- TRADUÇÃO APLICADA AQUI ---
      main: translateWeatherMain(weatherResponse.weather[0].main),
    },
    main: {
      ...weatherResponse.main,
      temp: Math.round(weatherResponse.main.temp),
      feels_like: Math.round(weatherResponse.main.feels_like),
      temp_max: Math.round(weatherResponse.main.temp_max),
      temp_min: Math.round(weatherResponse.main.temp_min),
    },
    wind: {
      ...weatherResponse.wind,
      speed: Math.round(weatherResponse.wind.speed * 3.6),
    }
  };

  const forecast: ExtendedForecastData[] = [];
  const next5Days = getNextSevenDays().slice(0, 5);
  const dailyForecasts = forecastResponse.list.filter((item: any) =>
    item.dt_txt.includes('12:00:00')
  );

  dailyForecasts.forEach((item: any, index: number) => {
    if (next5Days[index]) {
      forecast.push({
        day: next5Days[index],
        temp: {
          temp_max: Math.round(item.main.temp_max),
          temp_min: Math.round(item.main.temp_min),
        },
        weather: {
          id: item.weather[0].id,
          // --- E A TRADUÇÃO APLICADA AQUI TAMBÉM ---
          main: translateWeatherMain(item.weather[0].main),
        },
      });
    }
  });

  return {
    weather,
    forecast,
  };
};
