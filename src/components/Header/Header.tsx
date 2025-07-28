import React from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { useTheme } from '../../contexts/ThemeContext';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';

// 1. Importamos o hook 'useTranslation'
import { useTranslation } from 'react-i18next';
// 2. Importamos o nosso novo componente
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import {
  HeaderContainer,
  Title,
  HeaderIconsContainer,
  GithubLink,
} from './styed';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  // 3. Usamos o hook para obter a função 't' (de "translate")
  const { t } = useTranslation();

  return (
    <HeaderContainer>
      {/* 4. Substituímos o texto fixo pela nossa função de tradução.
          Ela irá procurar a chave 'app_title' no nosso ficheiro JSON.
      */}
      <Title>{t('app_title')}</Title>

      <HeaderIconsContainer>
        {/* 5. Adicionamos o nosso seletor de idiomas aqui */}
        <LanguageSwitcher />
        
        <DarkModeToggle
          checked={theme === 'dark'}
          onChange={toggleTheme}
          size={60}
        />
        
        <GithubLink href="https://github.com/jothas2000" target="_blank" rel="noopener noreferrer">
          <GithubIcon />
        </GithubLink>
      </HeaderIconsContainer>
    </HeaderContainer>
  );
};

export default Header;