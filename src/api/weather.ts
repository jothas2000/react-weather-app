const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

// A função agora aceita 'lang' como um parâmetro
export const fetchWeatherData = async (city: string | { lat: number; lon: number }, lang: string) => {
  let url = '';
  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${lang}&appid=${apiKey}`;
  } else {
    url = `${baseUrl}/weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do clima: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Falha em fetchWeatherData:", error);
    return Promise.reject(error);
  }
};

/// A função de previsão também aceita 'lang'
export const fetchExtendedForecastData = async (city: string | { lat: number; lon: number }, lang: string) => {
  const forecastType = 'forecast';
  let url = '';
  if (typeof city === 'object') {
    url = `${baseUrl}/${forecastType}?lat=${city.lat}&lon=${city.lon}&units=metric&lang=${lang}&appid=${apiKey}`;
  } else {
    url = `${baseUrl}/${forecastType}?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar previsão do tempo: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Falha em fetchExtendedForecastData:", error);
    return Promise.reject(error);
  }
};