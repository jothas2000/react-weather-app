import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // 1. Importamos o hook de tradução
import { fetchWeather } from '../../store/fetchWeather';
import { fetchCities } from './../../api/placeSuggestion';
import { useClickOutside } from './../../hooks/useClickOutside';
import { LocationButton, LocationIcon, SearchElement, SearchIcon, SearchInput, SearchResult } from './styled';
import Suggestion from './Suggestion';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(); // 2. Obtemos a instância do i18n para saber o idioma atual
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setShowSuggestions(true);
    fetchCities(searchTerm)
      .then((res) => {
        setSuggestions(res);
      })
      .catch(error => {
        console.error("Erro ao definir sugestões:", error);
        setSuggestions([]);
      });
  }, [searchTerm]);

  useClickOutside(suggestionRef, () => setShowSuggestions(false));

  const onSearchInputChanged = (e: any) => {
    setSearchTerm(e.target.value);
  };

    const showPosition = (position: any) => {
    dispatch(
      // 3. CORRIGIMOS O FORMATO DO OBJETO
      fetchWeather({
        // O objeto de coordenadas agora está dentro da propriedade 'city'
        city: { 
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        // E adicionamos o idioma atual
        lang: i18n.language, 
      })
    );
  };

  return (
    <SearchElement>
      <SearchIcon />
      <DebounceInput 
        element={SearchInput} 
        debounceTimeout={300} 
        onChange={onSearchInputChanged} 
        placeholder={t('search_placeholder')} 
      />
      <LocationButton
        onClick={() => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else {
            alert('A geolocalização não é suportada por este navegador.');
          }
        }}
      >
        <LocationIcon />
      </LocationButton>
      {showSuggestions && (
        <SearchResult ref={suggestionRef}>
          {suggestions?.slice(0, 6)?.map((s, i) => (
            <Suggestion
              key={i}
              label={s}
              // 4. Passamos o idioma atual para o componente Suggestion
              lang={i18n.language} 
              hideSuggestionFn={() => {
                setShowSuggestions(false);
              }}
            />
          ))}
        </SearchResult>
      )}
    </SearchElement>
  );
};

export default Search;