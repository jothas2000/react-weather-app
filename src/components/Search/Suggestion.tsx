import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../../store/fetchWeather';
import { SuggestionItem } from './styled'; 

interface SuggestionProps {
  label: string;
  lang: string; // O componente agora recebe o idioma
  hideSuggestionFn: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ label, lang, hideSuggestionFn }) => {
  const dispatch = useDispatch();

  const handleSuggestionClick = () => {
    // Ao clicar, despachamos a ação com o FORMATO CORRETO
    dispatch(
      fetchWeather({
        city: label, // A cidade é a string do 'label'
        lang: lang,  // Usamos o idioma recebido via props
      })
    );
    // Escondemos a lista de sugestões
    hideSuggestionFn();
  };

  return (
    // Usamos o seu componente de estilo e ligamos a função ao onClick
    <SuggestionItem onClick={handleSuggestionClick}>
      {label}
    </SuggestionItem>
  );
};

export default Suggestion;