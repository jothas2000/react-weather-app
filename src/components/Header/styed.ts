
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// O container principal do cabeçalho.
export const HeaderContainer = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.5s linear;
  backdrop-filter: blur(5px);
  border-bottom: 0px solid rgba(255, 255, 255, 0.1);
`;

// O título principal "App de Clima com React".
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.appTitleColor};
  align: self: left;
  padding-right: 17rem;
`;

// Um container para agrupar os ícones e links à direita.
export const HeaderIconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

// O link para o seu GitHub.
export const GithubLink = styled.a`
  display: flex;
  align-items: center;
  
  svg {
    width: 32px;
    height: 32px;
    fill: ${({ theme }) => theme.textColor};
    transition: fill 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

// O link para a página "Sobre" 
export const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;