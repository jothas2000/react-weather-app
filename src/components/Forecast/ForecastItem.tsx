import React from 'react';
import Temperature from '../CurrentWeather/Temperature';
import WeatherIcon from '../CurrentWeather/WeatherIcon';
import { ForecastItemContainer } from './styled';

// Mostra os itens do extended forecast
// Cada item é um dia com a previsão do tempo, temperatura máxima e mínima, e o ícone do clima.

interface IForecastItemProps {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  main: string;
}
const ForecastItem: React.FC<IForecastItemProps> = (props) => {
  return (
    <ForecastItemContainer>
      <h6>{props.day}</h6>
      <WeatherIcon code={props.weatherCode} />
      <p>{props.main}</p>
      <span>
        <strong><Temperature value={props.high} /></strong>  
        <sup>&deg;</sup>
        <small>/</small>
        <Temperature value={props.low} />
        <sup>&deg;</sup>
      </span>
    </ForecastItemContainer>
  );
};

export default ForecastItem;
