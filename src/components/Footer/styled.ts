// ARQUIVO: src/components/Footer/styled.ts

import styled from 'styled-components';
// Importamos o Link do react-router-dom para poder estilizá-lo
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  text-align: center;
  padding: 0.5rem 0.5rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.subTextColor};
`;

export const FooterText = styled.p`
  font-size: 0.9rem;
`;

// Estilizamos o componente Link para que ele se comporte como um link de perfil
export const ProfileLink = styled(Link)`
  color: ${({ theme }) => theme.accentColor};
  font-weight: 500;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;