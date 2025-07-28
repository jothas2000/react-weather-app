import React from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importamos o hook
import { ExtendedForecastData } from '../../api/types';
import ForecastItem from './ForecastItem';
import { ForecastContainer, ForecastItems, SectionTitle } from './styled';

interface ForecastProps {
  data: ExtendedForecastData[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const { t } = useTranslation(); // 2. Usamos o hook para obter a função 't'

  return (
    <ForecastContainer>
      {/* 3. Substituímos o texto fixo pela nossa função de tradução */}
      <SectionTitle>{t('extended_forecast')}</SectionTitle>
      
      <ForecastItems>
        {data.map((item, i) => (
          <ForecastItem
            key={i}
            day={item.day}
            high={item.temp.temp_max}
            low={item.temp.temp_min}
            weatherCode={item.weather.id}
            main={item.weather.main}
          />
        ))}
      </ForecastItems>
    </ForecastContainer>
  );
};

export default Forecast;