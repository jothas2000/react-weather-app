// ARQUIVO: src/components/LanguageSwitcher/LanguageSwitcher.tsx

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// --- Estilos para o nosso seletor ---
const SwitcherContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const LanguageButton = styled.button<{ isActive: boolean }>`
  background-color: transparent;
  /* A cor da borda e do texto muda se o botão estiver ativo */
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
  // O hook useTranslation dá-nos acesso à instância do i18n
  const { i18n } = useTranslation();

  // Função para mudar o idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton
        // O botão está ativo se o idioma atual for 'pt'
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