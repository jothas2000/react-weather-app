// ARQUIVO: src/components/Footer/Footer.tsx

import React from 'react';
// 1. Importamos o hook de tradução
import { useTranslation } from 'react-i18next';
// Importamos os seus componentes de estilo
import { FooterContainer, FooterText, ProfileLink } from './styled';

const Footer: React.FC = () => {
  // 2. Usamos o hook para obter a função 't'
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterText>
        {/* 3. Aplicamos a tradução ao texto "Sobre mim" */}
        {t('about_me')} <ProfileLink to="/sobre">Thales do Prado Menendez</ProfileLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;