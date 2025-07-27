const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Esta função para buscar o clima ATUAL continua a mesma.
export const fetchWeatherData = async (city: string | { lat: number; lon: number }) => {
  let url = '';
  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pt&appid=${apiKey}`;
  } else {
    url = `${baseUrl}/weather?q=${city}&units=metric&lang=pt&appid=${apiKey}`;
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

// VOLTAMOS A USAR A FUNÇÃO DE PREVISÃO ANTIGA E CONFIÁVEL
export const fetchExtendedForecastData = async (city: string | { lat: number; lon: number }) => {
  const forecastType = 'forecast'; // Usando o endpoint /forecast
  let url = '';

  if (typeof city === 'object') {
    // A API de previsão padrão também funciona melhor com coordenadas
    url = `${baseUrl}/${forecastType}?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pt&appid=${apiKey}`;
  } else {
    url = `${baseUrl}/${forecastType}?q=${city}&units=metric&lang=pt&appid=${apiKey}`;
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