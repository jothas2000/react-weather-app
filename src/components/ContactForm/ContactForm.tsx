import React, { useMemo } from 'react'; // Importamos o useMemo
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'; // 1. Importamos o hook de tradução
import { z } from 'zod';
import styled from 'styled-components';

// --- 1. DEFINIÇÃO DO TIPO E DAS REGRAS
interface IFormData {
  name: string;
  email: string;
  message: string;
}

// --- 2. ESTILOS DO FORMULÁRIO COM STYLED-COMPONENTS ---
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
// O componente do formulário com a lógica de tradução
const ContactForm: React.FC = () => {
  const { t } = useTranslation(); // 2. Usamos o hook para obter a função 't'

  // 3. MOVEMOS A DEFINIÇÃO DO ESQUEMA PARA DENTRO DO COMPONENTE
  //    Envolvemo-la em 'useMemo' para que não seja recriada em cada renderização.
  const contactFormSchema = useMemo(() => {
    return z.object({
      name: z.string().min(3, { message: t('validation_name_min') }),
      email: z.string().email({ message: t('validation_email_invalid') }),
      message: z.string().min(10, { message: t('validation_message_min') }),
    });
  }, [t]); // O esquema será recriado apenas quando o idioma ('t') mudar

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<IFormData>();

  const onSubmit = async (data: IFormData) => {
    try {
      // A validação agora usa o esquema que está ciente do idioma
      contactFormSchema.parse(data);

      console.log("Dados válidos, a enviar...", data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(t('form_alert_success', { name: data.name }));
      reset();

    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setError(err.path[0] as keyof IFormData, {
            message: err.message,
          });
        });
      }
    }
  };

  return (
    // 4. TRADUZIMOS TODOS OS TEXTOS DA INTERFACE
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <label htmlFor="name">{t('form_name')}</label>
        <FormInput id="name" type="text" {...register('name')} />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="email">{t('form_email')}</label>
        <FormInput id="email" type="email" {...register('email')} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </FormGroup>

      <FormGroup>
        <label htmlFor="message">{t('form_message')}</label>
        <FormTextarea id="message" {...register('message')} />
        {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
      </FormGroup>

      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? t('form_submitting_button') : t('form_submit_button')}
      </SubmitButton>
    </FormContainer>
  );
};

export default ContactForm;