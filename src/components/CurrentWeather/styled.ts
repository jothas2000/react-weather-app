import styled from 'styled-components';

export const WeatherContainer = styled.div`
  background-color: ${({ theme }) => theme.panelBgColor};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
`;
export const SectionTitle = styled.h6`
  font-weight: 500;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.panelTitleColor};
`;
// O card principal que contém tudo
export const CurrentWeatherContainer = styled.div`
  /* --- ESTILOS MOBILE-FIRST --- */
  /* Por defeito, as colunas ficam uma em cima da outra */
  display: flex;
  flex-direction: column; /* <-- O mais importante para o telemóvel */
  gap: 2rem;
  
  padding: 1.5rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.panelBgColor};
  box-shadow: ${({ theme }) => theme.panelShadow};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-top: 2rem;

  /* --- MEDIA QUERY PARA ECRÃS MAIORES --- */
  /* Se o ecrã tiver no mínimo 768px de largura (tablet)... */
  @media (min-width: 768px) {
    /* ...mudamos a direção para que fiquem lado a lado. */
    flex-direction: row; /* <-- A MÁGICA DA RESPONSIVIDADE */
    justify-content: space-between;
    align-items: center;
  }
`;

// Coluna da esquerda (ícone, temperatura, nome da cidade)
export const CurrentWeatherStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza no telemóvel */
  text-align: center;

  h4 { /* Nome da Cidade */
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    color: ${({ theme }) => theme.appTitleColor};
  }

  div { /* Container do Ícone e Temperatura */
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
  }

  span { /* Container da Temperatura */
    font-size: 5rem;
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.textColor};
  }

  h6 { /* Descrição */
    font-size: 1.1rem;
    font-weight: 400;
    margin-top: 0.5rem;
    text-transform: capitalize;
    color: ${({ theme }) => theme.subTextColor};
  }

  @media (min-width: 768px) {
    align-items: flex-start; /* Alinha à esquerda no desktop */
    text-align: left;
  }
`;

// Coluna da direita (detalhes: humidade, vento, etc.)
export const CurrentWeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%; /* Ocupa toda a largura no telemóvel */
  
  @media (min-width: 768px) {
    width: auto; /* Largura automática no desktop */
    flex: 1;
    max-width: 250px; /* Define uma largura máxima para os detalhes */
  }
`;

export const FeelsLike = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.subTextColor};
  text-align: center; /* Centraliza no telemóvel */

  @media (min-width: 768px) {
    text-align: right; /* Alinha à direita no desktop */
  }
`;

export const HighLowContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 2rem;
`;
export const WeatherDegree = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.25rem;
  color: #3a86ca;
  margin-top: 0.8rem;
  margin-right: 2.5rem;
  svg {
    fill: ${({ theme }) => theme.smallIconColor};
    margin-right: 1rem;
  }
`;
export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0.8rem;
  div {
    color: ${({ theme }) => theme.smallIconTextColor};
    display: flex;
    align-items: center;
    font-size: 1rem;
    width: 8rem;
  }
  svg {
    fill: ${({ theme }) => theme.smallIconColor};
    margin-right: 1rem;
    width: 1.6rem;
    margin-left: -0.3rem;
  }
  span {
    color: #3080c8;
    font-weight: 500;
    font-size: 1rem;
  }
`;
