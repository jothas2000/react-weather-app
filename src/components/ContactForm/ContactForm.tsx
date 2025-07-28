import React from 'react';
import { useForm } from 'react-hook-form';
// NÃO VAMOS MAIS USAR O ZODRESOLVER
// import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import styled from 'styled-components';

// --- 1. DEFINIÇÃO DO TIPO E DAS REGRAS (continua igual) ---
interface IFormData {
  name: string;
  email: string;
  message: string;
}

const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  message: z.string().min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres.' }),
});

// --- 3. ESTILOS DO FORMULÁRIO COM STYLED-COMPONENTS ---
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormInput = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.subTextColor};
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accentColor};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.subTextColor};
  background-color: transparent;
  color: ${({ theme }) => theme.textColor};
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.accentColor};
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.accentColor};
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


// --- 3. O COMPONENTE DO FORMULÁRIO COM A LÓGICA REFEITA ---
const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError, // Importamos a função para definir erros manualmente
    reset,
  } = useForm<IFormData>({});

  // A nossa função de envio agora fará a validação manualmente.
  const onSubmit = async (data: IFormData) => {
    try {
      // 1. Validamos os dados com o Zod ANTES de fazer qualquer outra coisa.
      //    O 'parse' irá lançar um erro se a validação falhar.
      contactFormSchema.parse(data);

      // 2. Se a validação passar, continuamos com a lógica de envio.
      console.log("Dados válidos, a enviar...", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Obrigado pela sua mensagem, ${data.name}!`);
      reset();

    } catch (error) {
      // 3. Se a validação falhar, o Zod lança um erro que nós capturamos aqui.
      if (error instanceof z.ZodError) {
        // Iteramos sobre os erros que o Zod encontrou...
        error.errors.forEach((err) => {
          // ...e usamos a função 'setError' do react-hook-form para mostrar a mensagem
          // no campo correto.
          setError(err.path[0] as keyof IFormData, {
            message: err.message,
          });
        });
      }
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label htmlFor="name">Nome</label>
        <FormInput id="name" type="text" {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="email">E-mail</label>
        <FormInput id="email" type="email" {...register('email')} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="message">Mensagem</label>
        <FormTextarea id="message" {...register('message')} />
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'A Enviar...' : 'Enviar Mensagem'}
      </SubmitButton>
    </FormContainer>
  );
};

export default ContactForm;