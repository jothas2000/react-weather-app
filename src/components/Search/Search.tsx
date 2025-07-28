// ARQUIVO: src/components/Search/Search.tsx

import React, { useEffect, useRef, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next'; // 1. Importamos o hook
import { fetchWeather } from '../../store/fetchWeather';
import { fetchCities } from './../../api/placeSuggestion';
import { useClickOutside } from './../../hooks/useClickOutside';
import { LocationButton, LocationIcon, SearchElement, SearchIcon, SearchInput, SearchResult } from './styled';
import Suggestion from './Suggestion';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const suggestionRef = useRef(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation(); // 2. Usamos o hook para obter a função 't'

  // ... (o resto da sua lógica continua igual)
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
      fetchWeather({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      })
    );
  };

  return (
    <SearchElement>
      <SearchIcon />
      {/* 3. Substituímos o placeholder fixo pela nossa função de tradução */}
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