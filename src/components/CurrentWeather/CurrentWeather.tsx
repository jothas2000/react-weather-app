import React from 'react';
import { WeatherData } from '../../api/types'; // Importamos o tipo dos dados

// Importamos os componentes de estilo e ícones necessários
import {
  CurrentWeatherStatus,
  CurrentWeatherContainer,
  CurrentWeatherInfo,
  FeelsLike,
  HighLowContainer,
  InfoRow,
  SectionTitle,
  WeatherContainer,
  WeatherDegree,
} from './styled';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import { ReactComponent as HighIcon } from '../../assets/high-icon.svg';
import { ReactComponent as HumidityIcon } from '../../assets/humidity-icon.svg';
import { ReactComponent as LowIcon } from '../../assets/low-icon.svg';
import { ReactComponent as PressureIcon } from '../../assets/pressure-icon.svg';
import { ReactComponent as WindIcon } from '../../assets/wind-icon.svg';

// 1. DEFINIMOS A INTERFACE DAS PROPS
//    Isso diz ao TypeScript que este componente espera receber
//    uma propriedade 'data' que tem a forma de 'WeatherData'.
interface CurrentWeatherProps {
  data: WeatherData;
}

// 2. O componente agora recebe 'data' como uma prop.
const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  // 3. REMOVEMOS toda a lógica do Redux (useSelector, useDispatch, useEffect).
  //    O componente agora é "puro", ele apenas exibe os dados que recebe.

  return (
    <WeatherContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SectionTitle>Clima Atual</SectionTitle>
        {/* O ToggleSwitch de temperatura pode ser movido para o Header
            ou ter sua lógica adaptada para não depender do Redux aqui.
            Por enquanto, vamos mantê-lo simples.
        */}
      </div>
      <CurrentWeatherContainer>
        <CurrentWeatherStatus>
          {/* 4. Usamos a prop 'data' para exibir todas as informações */}
          <h4>{data.name}</h4>
          <div style={{ display: 'flex' }}>
            <WeatherIcon code={data.weather.id} big />
            <span>
              <Temperature value={data.main.temp} />
              <sup>&deg;</sup>
            </span>
          </div>
          {/* A descrição já vem traduzida da API */}
          <h6>{data.weather.description}</h6>
        </CurrentWeatherStatus>

        <CurrentWeatherInfo>
          <FeelsLike>
            Sensação térmica <Temperature value={data.main.feels_like} />
            <sup>&deg;</sup>
          </FeelsLike>
          <HighLowContainer>
            <WeatherDegree>
              <HighIcon />
              <Temperature value={data.main.temp_max} />
              <sup>&deg;</sup>
            </WeatherDegree>
            <WeatherDegree>
              <LowIcon />
              <Temperature value={data.main.temp_min} />
              <sup>&deg;</sup>
            </WeatherDegree>
          </HighLowContainer>
          <InfoRow>
            <div>
              <HumidityIcon /> Umidade
            </div>
            <span>{data.main.humidity}%</span>
          </InfoRow>
          <InfoRow>
            <div>
              <WindIcon /> Vento
            </div>
            <span>{data.wind.speed} kph</span>
          </InfoRow>
          <InfoRow>
            <div>
              <PressureIcon /> Pressão
            </div>
            <span>{data.main.pressure}hPa</span>
          </InfoRow>
        </CurrentWeatherInfo>
      </CurrentWeatherContainer>
    </WeatherContainer>
  );
};

export default CurrentWeather;