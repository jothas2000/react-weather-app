// ARQUIVO: src/pages/Home.tsx

import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStore } from '../store/store';

// Importe os seus componentes
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import CurrentWeather from '../components/CurrentWeather/CurrentWeather';
import Forecast from '../components/Forecast/Forecast';
import Footer from '../components/Footer/Footer';

// ESTA É A NOSSA NOVA E ÚNICA ESTRUTURA DE LAYOUT
const PageWrapper = styled.div`
  /* Ocupa no mínimo 100% da altura da janela */
  min-height: 100vh;
  
  /* Usa Flexbox para centralizar tudo */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza verticalmente */
  align-items: center;     /* Centraliza horizontalmente */
  
  /* Adiciona um espaçamento interno e um espaçamento entre os elementos */
  padding: 2rem 1rem;
  gap: 1.5rem;
`;

// O container do conteúdo agora só precisa de se preocupar com a largura
const ContentContainer = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Home: React.FC = () => {
  const { weatherData, extendedWeatherData } = useSelector((state: AppStore) => state.weather);
  const { isInitial, isLoading } = useSelector((state: AppStore) => state.app);

  return (
    // Envolvemos TUDO, incluindo o Header, no nosso PageWrapper
    <PageWrapper>
      <Header />

      <ContentContainer>
        <Search />

        {isLoading && <p style={{ textAlign: 'center' }}>Carregando...</p>}

        {!isInitial && weatherData && extendedWeatherData && (
          <>
            <CurrentWeather data={weatherData} />
            <Forecast data={extendedWeatherData} />
          </>
        )}
        <Footer />
      </ContentContainer>
    </PageWrapper>
  );
};

export default Home;