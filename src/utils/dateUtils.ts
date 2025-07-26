// Nomes dos dias da semana em português
const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const getNextSevenDays = (): string[] => {
  const today = new Date();
  const next7Days: string[] = [];

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);
    // Adiciona o nome do dia em português ao array
    next7Days.push(WEEK_DAYS[nextDay.getDay()]);
  }

  return next7Days;
};
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return date.toLocaleDateString('pt-BR', options);
};