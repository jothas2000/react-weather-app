// ARQUIVO: src/components/CurrentWeather/CurrentWeather.tsx

import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importamos o hook
import { WeatherData } from '../../api/types';
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

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { t } = useTranslation(); // 2. Usamos o hook

  return (
    <WeatherContainer>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* 3. Traduzimos todos os textos fixos */}
        <SectionTitle>{t('current_weather')}</SectionTitle>
      </div>
      <CurrentWeatherContainer>
        <CurrentWeatherStatus>
          <h4>{data.name}</h4>
          <div style={{ display: 'flex' }}>
            <WeatherIcon code={data.weather.id} big />
            <span>
              <Temperature value={data.main.temp} />
              <sup>&deg;</sup>
            </span>
          </div>
          <h6>{data.weather.description}</h6>
        </CurrentWeatherStatus>

        <CurrentWeatherInfo>
          <FeelsLike>
            {t('feels_like')} <Temperature value={data.main.feels_like} />
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
              <HumidityIcon /> {t('humidity')}
            </div>
            <span>{data.main.humidity}%</span>
          </InfoRow>
          <InfoRow>
            <div>
              <WindIcon /> {t('wind')}
            </div>
            <span>{data.wind.speed} kph</span>
          </InfoRow>
          <InfoRow>
            <div>
              <PressureIcon /> {t('pressure')}
            </div>
            <span>{data.main.pressure}hPa</span>
          </InfoRow>
        </CurrentWeatherInfo>
      </CurrentWeatherContainer>
    </WeatherContainer>
  );
};

export default CurrentWeather;