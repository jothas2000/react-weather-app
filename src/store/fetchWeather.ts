import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
// Voltamos a importar a função de previsão padrão
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

// O dicionário de tradução continua o mesmo
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

const translateWeatherMain = (main: string): string => {
  return weatherConditionsMap[main] || main;
};
// A lógica de busca volta a ser mais simples
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string | { lat: number; lon: number }, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      // Voltamos a chamar as duas APIs ao mesmo tempo
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
    // ... (a parte do clima atual continua a mesma)
    ...weatherResponse,
    weather: {
      ...weatherResponse.weather[0],
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

  // --- LÓGICA DE PREVISÃO REFEITA ---
  const forecast: ExtendedForecastData[] = [];
  const dailyForecasts: { [key: string]: any[] } = {};

  // 1. Agrupamos todas as 40 previsões por dia.
  forecastResponse.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0]; // Pega só a parte da data (ex: "2025-07-27")
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });

  const nextDays = getNextSevenDays();
  let dayIndex = 0;

  // 2. Iteramos sobre os dias agrupados para calcular o min/max real.
  for (const date in dailyForecasts) {
    // Ignoramos o dia de hoje, pois ele já está no card principal
    if (new Date(date).getDate() === new Date().getDate()) {
      continue;
    }
    
    const dayItems = dailyForecasts[date];
    if (!dayItems || dayItems.length === 0 || dayIndex >= 5) {
      continue;
    }

    // 3. Encontramos a temperatura MÍNIMA e MÁXIMA entre todas as previsões daquele dia.
    const minTemps = dayItems.map(item => item.main.temp_min);
    const maxTemps = dayItems.map(item => item.main.temp_max);
    const temp_min = Math.min(...minTemps);
    const temp_max = Math.max(...maxTemps);

    // Pegamos a previsão do meio-dia para ter o ícone e a descrição principal.
    const representativeWeather = dayItems.find(item => item.dt_txt.includes('12:00:00')) || dayItems[0];

    forecast.push({
      day: nextDays[dayIndex + 1], // Usamos os nomes de dia traduzidos
      temp: {
        temp_max: Math.round(temp_max),
        temp_min: Math.round(temp_min),
      },
      weather: {
        id: representativeWeather.weather[0].id,
        main: translateWeatherMain(representativeWeather.weather[0].main),
      },
    });
    dayIndex++;
  }

  return {
    weather,
    forecast: forecast.slice(0, 5), // Garantimos que teremos no máximo 5 dias
  };
};