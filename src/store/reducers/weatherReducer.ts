import { createSlice } from '@reduxjs/toolkit';
import { ExtendedForecastData, WeatherData } from '../../api/types';
import { fetchWeather, transformWeatherData } from '../fetchWeather';

// 1. ATUALIZAMOS A "PLANTA" DO NOSSO ESTADO
export type WeatherState = {
  weatherData: WeatherData;
  extendedWeatherData: ExtendedForecastData[];
  isError: boolean;
  lastSearchedCity: string | { lat: number; lon: number } | null; 
}

const initialState: WeatherState = {
  weatherData: {
    main: {
      feels_like: 0,
      humidity: 0,
      pressure: 0,
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    name: '',
    sys: {
      country: '',
      sunrise: 0,
      sunset: 0,
    },
    weather: {
      id: 200,
      main: '',
      description: '',
      icon: '',
    },
    wind: {
      deg: 0,
      speed: 0,
    },
  },
  extendedWeatherData: [],
  isError: false,
 lastSearchedCity: null, // <-- VALOR INICIAL
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        // 3. GUARDAMOS A ÚLTIMA CIDADE PESQUISADA QUANDO A BUSCA TEM SUCESSO
        // 'action.meta.arg' contém os parâmetros originais que passámos para o fetchWeather
        state.lastSearchedCity = action.meta.arg.city; 

        const res = transformWeatherData(action.payload);
        state.weatherData = res.weather;
        state.extendedWeatherData = res.forecast;
        state.isError = false; // Resetamos o erro em caso de sucesso
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isError = true;
      });
  },
});

export default weatherSlice.reducer;