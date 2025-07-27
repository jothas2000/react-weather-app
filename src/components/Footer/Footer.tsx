// ARQUIVO: src/components/Footer/Footer.tsx

import React from 'react';
// Importamos os nossos novos componentes estilizados
import { FooterContainer, FooterText, ProfileLink } from './styled';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>
        {/* A tag <a> foi substituída pelo nosso <ProfileLink> estilizado,
            que aponta para a rota interna "/sobre". */}
        Sobre mim <ProfileLink to="/sobre">Thales do Prado Menendez</ProfileLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;