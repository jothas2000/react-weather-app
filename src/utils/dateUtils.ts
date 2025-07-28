// ARQUIVO: src/utils/dateUtils.ts

// A função agora recebe o código do idioma (ex: 'pt-BR', 'en-US')
export const getNextSevenDays = (lang: string): string[] => {
  const next7Days: string[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    // Usamos a API Intl para obter o nome do dia da semana abreviado e traduzido
    const dayName = new Intl.DateTimeFormat(lang, { weekday: 'short' }).format(nextDay);
    // Deixamos a primeira letra maiúscula
    next7Days.push(dayName.charAt(0).toUpperCase() + dayName.slice(1));
  }
  return next7Days;
};