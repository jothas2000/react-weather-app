import { createAsyncThunk } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../api/types';
import { fetchExtendedForecastData, fetchWeatherData } from '../api/weather';
import { getNextSevenDays } from '../utils/dateUtils';
import { setIsInitial, setIsLoading } from './reducers/appReducer';

// 1. ATUALIZAMOS O NOSSO DICIONÁRIO DE TRADUÇÃO
//    Agora ele tem uma estrutura aninhada para suportar múltiplos idiomas.
const weatherConditionsMap = {
  pt: {
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
  },
  en: {
    Clear: 'Clear',
    Clouds: 'Clouds',
    Rain: 'Rain',
    Drizzle: 'Drizzle',
    Thunderstorm: 'Thunderstorm',
    Snow: 'Snow',
    Mist: 'Mist',
    Smoke: 'Smoke',
    Haze: 'Haze',
    Dust: 'Dust',
    Fog: 'Fog',
    Sand: 'Sand',
    Ash: 'Ash',
    Squall: 'Squall',
    Tornado: 'Tornado',
  }
};

// 2. A FUNÇÃO DE TRADUÇÃO AGORA RECEBE O IDIOMA
const translateWeatherMain = (main: string, lang: 'pt' | 'en'): string => {
  // Seleciona o dicionário correto com base no idioma
  const dictionary = weatherConditionsMap[lang];
  // Retorna a tradução ou o original se não encontrar
  return dictionary[main as keyof typeof dictionary] || main;
};


export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async ({ city, lang }: { city: string | { lat: number; lon: number }, lang: string }, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetchWeatherData(city, lang),
        fetchExtendedForecastData(city, lang),
      ]);
      
      dispatch(setIsLoading(false));
      if (weatherRes.cod === 200 && forecastRes.cod === "200") {
        dispatch(setIsInitial(false));
        // Passamos o 'lang' para a função de transformação
        return { weatherRes, forecastRes, lang };
      }
      return rejectWithValue(weatherRes.message || 'Não foi possível buscar os dados do clima.');

    } catch (error) {
      dispatch(setIsLoading(false));
      const e = error as Error;
      return rejectWithValue(e.message || 'Ocorreu um erro desconhecido.');
    }
  }
);

// 3. ATUALIZAMOS A FUNÇÃO DE TRANSFORMAÇÃO PARA USAR A NOVA LÓGICA
export const transformWeatherData = (
  res: any
): {
  weather: WeatherData;
  forecast: ExtendedForecastData[];
} => {
  const { weatherRes, forecastRes, lang } = res;
  const weatherResponse = weatherRes;
  const forecastResponse = forecastRes;

  const weather: WeatherData = {
    ...weatherResponse,
    weather: {
      ...weatherResponse.weather[0],
      // Passamos o 'lang' para a função de tradução
      main: translateWeatherMain(weatherResponse.weather[0].main, lang as 'pt' | 'en'),
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
  const nextDays = getNextSevenDays(lang);
  const dailyForecasts: { [key: string]: any[] } = {};


  forecastResponse.list.forEach((item: any) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });

  let dayIndex = 0;
  for (const date in dailyForecasts) {
    if (new Date(date).getDate() === new Date().getDate()) continue;
    
    const dayItems = dailyForecasts[date];
    if (!dayItems || dayItems.length === 0 || dayIndex >= 5) continue;

    const minTemps = dayItems.map(item => item.main.temp_min);
    const maxTemps = dayItems.map(item => item.main.temp_max);
    const temp_min = Math.min(...minTemps);
    const temp_max = Math.max(...maxTemps);

    const representativeWeather = dayItems.find(item => item.dt_txt.includes('12:00:00')) || dayItems[0];

    forecast.push({
      day: nextDays[dayIndex + 1],
      temp: {
        temp_max: Math.round(temp_max),
        temp_min: Math.round(temp_min),
      },
      weather: {
        id: representativeWeather.weather[0].id,
        // Passamos o 'lang' para a função de tradução aqui também
        main: translateWeatherMain(representativeWeather.weather[0].main, lang as 'pt' | 'en'),
      },
    });
    dayIndex++;
  }

  return {
    weather,
    forecast: forecast.slice(0, 5),
  };
};