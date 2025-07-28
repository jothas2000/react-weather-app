import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Importamos o hook
import ContactForm from '../../components/ContactForm/ContactForm';

// --- Estilos para a página ---
const SobreContainer = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem 3rem;
  background: ${({ theme }) => theme.panelBgColor};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.panelShadow};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: ${({ theme }) => theme.textColor};
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid ${({ theme }) => theme.accentColor};
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.appTitleColor};
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.subTextColor};
`;

const BackButton = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.accentColor};
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.appTitleColor};
  margin-top: 3rem;
  margin-bottom: 1rem;
  border-top: 1px solid ${({ theme }) => theme.subTextColor};
  padding-top: 2rem;
`;

// --- Componente da Página ---
const Sobre: React.FC = () => {
  const { t } = useTranslation(); // 2. Usamos o hook

  return (
    <SobreContainer>
      <ProfileImage src="selfie.jpeg" alt="Foto de Perfil do Thales" />
      
      {/* 3. Todos os textos agora usam a função 't' */}
      <Title>{t('about_page_title')}</Title>
      
      <Paragraph>
        {t('about_paragraph_1')}
      </Paragraph>

      <Paragraph>
        {t('about_paragraph_2')}
      </Paragraph>

      <SectionTitle>{t('contact_form_title')}</SectionTitle>
      <ContactForm />

      <BackButton to="/">{t('back_to_weather_button')}</BackButton>
    </SobreContainer>
  );
};

export default Sobre;