import styled from 'styled-components';

// O container principal da previsão, agora com o efeito de vidro
export const ForecastContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 16px; // Bordas mais arredondadas
  background: ${({ theme }) => theme.forecastPanelBgColor};
  box-shadow: ${({ theme }) => theme.panelShadow};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

// O título da seção, agora usando as cores do tema
export const SectionTitle = styled.h6`
  font-weight: 500;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.panelTitleColor};
  margin-bottom: 1.5rem;
`;

// O container que organiza os dias em uma grelha responsiva
export const ForecastItems = styled.div`
  display: grid;
  gap: 1rem; // Espaçamento entre os dias

  /* Mobile-first: 2 colunas por defeito */
  grid-template-columns: repeat(2, 1fr);

  /* Tablets pequenos: 3 colunas */
  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Desktop: 5 colunas */
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

// O estilo para cada item individual da previsão
export const ForecastItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  h6 { /* Nome do dia */
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.textColor};
  }
  
  svg { /* Ícone do tempo */
    width: 4rem;
    height: 4rem;
    margin: 0.5rem 0;
  }
  
  p { /* Descrição principal (ex: "Nuvens") */
    font-weight: 400;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.subTextColor};
    text-transform: capitalize;
  }

  span { /* Container das temperaturas */
    font-size: 1rem;
    color: ${({ theme }) => theme.subTextColor};
    
    /* A temperatura máxima (primeiro filho) */
    strong {
      font-weight: 600;
      color: ${({ theme }) => theme.textColor};
    }
  }
`;