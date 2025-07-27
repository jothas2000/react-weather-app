import React from 'react';
import DarkModeToggle from 'react-dark-mode-toggle';
import { useTheme } from '../../contexts/ThemeContext';
import { ReactComponent as GithubIcon } from '../../assets/github.svg';

// 1. Removemos 'NavLink' das importações de estilo
import { 
  HeaderContainer, 
  Title, 
  HeaderIconsContainer, 
  GithubLink
} from './styed';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <Title>App de Clima com React</Title>
      <HeaderIconsContainer>
        
        {/* 2. O <NavLink> foi removido daqui */}

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