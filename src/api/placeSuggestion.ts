// src/api/placeSuggestion.ts

export const fetchCities = async (search: string) => {
  // Pega a chave de API do arquivo .env
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  // Se a chave não estiver configurada, interrompe a função para evitar erros.
  if (!apiKey) {
    console.error("Chave da API do OpenWeatherMap não encontrada. Verifique seu arquivo .env");
    return []; // Retorna um array vazio para não quebrar a aplicação.
  }

  // Novo URL da API de Geocodificação do OpenWeatherMap
  // Ele busca até 5 cidades que correspondam ao termo de busca.
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`;

  try {
    const response = await fetch(url);

    // Se a resposta não for "ok" (ex: erro 401 Chave Inválida), lança um erro.
    if (!response.ok) {
      throw new Error(`Erro na rede: ${response.statusText}`);
    }

    const data = await response.json();

    // Mapeia a resposta da nova API para o formato que nosso componente espera
    // (um array de strings "Cidade, País").
    return data.map((city: any) => `${city.name}, ${city.country}`);

  } catch (error) {
    // Captura qualquer erro (de rede ou outro) e o exibe no console.
    console.error("Falha ao buscar cidades:", error);
    return []; // Retorna um array vazio em caso de erro.
  }
};