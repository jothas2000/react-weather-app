// ARQUIVO: src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Os ficheiros de tradução (vamos criá-los a seguir)
import ptTranslation from './locales/pt/translation.json';
import enTranslation from './locales/en/translation.json';

// A configuração do i18next
i18n
  .use(initReactI18next) // Passa a instância do i18n para o react-i18next
  .init({
    // Os recursos (traduções) que temos disponíveis
    resources: {
      pt: {
        translation: ptTranslation,
      },
      en: {
        translation: enTranslation,
      },
    },
    lng: 'pt', // Define o português como o idioma inicial
    fallbackLng: 'en', // Se uma tradução não for encontrada em 'pt', ele tentará em 'en'

    interpolation: {
      escapeValue: false, // O React já faz o escape de XSS, por isso desativamos
    },
  });

export default i18n;