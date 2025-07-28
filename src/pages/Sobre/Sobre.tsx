import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ContactForm from '../../components/ContactForm/ContactForm';

// --- Estilos para a página ---
// Usamos os mesmos princípios de design do resto da aplicação
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

// 2. CRIAMOS UM NOVO COMPONENTE DE ESTILO PARA O BOTÃO "VOLTAR"
//    Ele é baseado no componente Link, então funcionará como um link de navegação.
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
  return (
    <SobreContainer>
      {/* IMPORTANTE: Coloque uma foto sua na pasta 'public' do projeto
          e altere o nome do ficheiro aqui. */}
      <ProfileImage src="selfie.jpeg" alt="Foto de Perfil do Thales" />
      
      <Title>Olá, eu sou o Thales do Prado Menendez!</Title>
      
      <Paragraph>
        Sou um entusiasta de tecnologia principiante em desenvolvimento front-end e criação de interfaces de utilizador. Meu objetivo é desenvolver minha habilidade para desenvolver interfaces intuitivas e confortáveis para o usuário. Estou muito animado com a oportunidade de estágio na BlueRise, pois acredito que é o ambiente ideal para aplicar e expandir os meus conhecimentos em tecnologias como React e TypeScript e desenvolvimento pessoal no geral.
      </Paragraph>

      <Paragraph>
        O meu objetivo é crescer como desenvolvedor, aprender com profissionais experientes e contribuir para projetos desafiadores. Este teste técnico foi uma excelente oportunidade para demonstrar a minha dedicação e vontade de aprender e espero aprender muito mais durante o processo.
      </Paragraph>

      <SectionTitle>Entre em Contato</SectionTitle>
      <ContactForm />

      <BackButton to="/">Voltar para a aplicação</BackButton>
    </SobreContainer>
  );
};

export default Sobre;