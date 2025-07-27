import React from 'react';
import { ExtendedForecastData } from '../../api/types';
import ForecastItem from './ForecastItem'; // O componente que renderiza cada dia
import { ForecastContainer, ForecastItems, SectionTitle } from './styled';

// 1. DEFINIMOS A INTERFACE DAS PROPS
//    O componente espera receber 'data' como um array de previsões.
interface ForecastProps {
  data: ExtendedForecastData[];
}

// 2. O COMPONENTE AGORA RECEBE 'data' COMO PROP
const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // 3. REMOVEMOS a lógica do Redux (useSelector).
  //    O componente agora é "puro" e apenas exibe os dados recebidos.

  return (
    <ForecastContainer>
      <SectionTitle>Previsão Estendida</SectionTitle>
      <ForecastItems>
        {/* 4. Mapeamos o array 'data' recebido via props */}
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

// Exportamos o componente Forecast por padrão
export default Forecast;
