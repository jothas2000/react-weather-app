// O caminho provável é src/api/weather.ts

const baseUrl = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

// Função para buscar o clima atual
export const fetchWeatherData = async (city: string | { lat: number; lng: number }) => {
  let url = '';

  // Adicionamos &lang=pt para receber descrições em português (ex: "nuvens dispersas")
  if (typeof city === 'object') {
    url = `${baseUrl}/weather?lat=${city.lat}&lon=${city.lng}&units=metric&lang=pt&appid=${apiKey}`;
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

// Função para buscar a previsão do tempo
export const fetchExtendedForecastData = async (city: string | { lat: number; lng: number }) => {
  let url = '';
  const forecastType = 'forecast'; 

  // Adicionamos &lang=pt também na previsão
  if (typeof city === 'object') {
    url = `${baseUrl}/${forecastType}?lat=${city.lat}&lon=${city.lng}&units=metric&lang=pt&appid=${apiKey}`;
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
