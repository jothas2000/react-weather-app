import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux'; 
import styled from 'styled-components';
import { AppStore } from '../../store/store';
import { fetchWeather } from '../../store/fetchWeather';

// --- Estilos para o nosso seletor ---
const SwitcherContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  border: 1px solid ${({ theme, isActive }) => (isActive ? theme.accentColor : theme.subTextColor)};
  color: ${({ theme, isActive }) => (isActive ? theme.accentColor : theme.subTextColor)};
  padding: 0.25rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.accentColor};
    color: #fff;
    border-color: ${({ theme }) => theme.accentColor};
  }
`;

// --- O componente em si ---
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  // Pegamos a última cidade pesquisada do estado do Redux
  const lastSearchedCity = useSelector((state: AppStore) => state.weather.lastSearchedCity);

  const changeLanguage = (lng: string) => {
    // 1. Mudamos o idioma da interface
    i18n.changeLanguage(lng);
    
    // 2. Se já tivermos pesquisado por uma cidade...
    if (lastSearchedCity) {
      // ...disparamos uma nova busca, mas agora com o novo idioma!
      dispatch(fetchWeather({ city: lastSearchedCity, lang: lng }));
    }
  };

  return (
    <SwitcherContainer>
      <LanguageButton
        isActive={i18n.language === 'pt'}
        onClick={() => changeLanguage('pt')}
      >
        PT
      </LanguageButton>
      <LanguageButton
        isActive={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;