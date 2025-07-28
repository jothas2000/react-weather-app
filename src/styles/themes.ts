// A interface definitiva, com todos os tipos de objeto corrigidos.
export interface Theme {
  // --- Backgrounds ---
  body: string; 
  backgroundImage: string;
  backgroundGradient: {
    color1: string;
    color2: string;
  };
  headerBgColor: string;
  panelBgColor: string;
  forecastPanelBgColor: string;
  
  // --- Cores de Texto ---
  appTitleColor: string;
  textColor: string; 
  subTextColor: string;
  panelTitleColor: string;
  
  // --- Componente de Busca ---
  searchInput: {
    color: string;
    placeholderColor: string;
    backgroundColor: string;
  };
  searchSuggestion: {
    backgroundColor: string;
    hoverBackgroundColor: string;
    textColor: string;
    seperatorLineColor: string;
  };

  // --- Elementos Interativos ---
  accentColor: string;
  temperatureSwitch: {
    backgroundColor: string;
    sliderColor: string;
    textColor: string;
  };
  
  // --- Ícones ---
  smallIconColor: string;
  smallIconTextColor: string;

  // --- Outros Estilos ---
  panelShadow: string;
}

// ===================================================================
// TEMA CLARO (LIGHT THEME)
// ===================================================================
export const lightTheme: Theme = {
  // Backgrounds
  body: '#F0F8FF', // Cor de fundo sólida para o body
  backgroundImage: 'linear-gradient(to top, #a1c4fd 0%, #c2e9fb 100%)',
  backgroundGradient: { color1: '#a1c4fd', color2: '#c2e9fb' },
  headerBgColor: 'rgba(255, 255, 255, 0.2)', // Mais transparente
  panelBgColor: 'rgba(255, 255, 255, 1)', // Cor de vidro claro
  forecastPanelBgColor: 'rgba(131, 180, 255, 0.4)', // Cor de vidro claro
  
  // Textos
  appTitleColor: '#2c3e50',
  textColor: '#34495e', // Cor principal do texto
  subTextColor: '#7f8c8d',
  panelTitleColor: '#2c3e50',
  
  // Busca
  searchInput: {
    color: '#34495e',
    placeholderColor: '#95a5a6',
    backgroundColor: '#ffffff',
  },
  searchSuggestion: {
    backgroundColor: '#ffffff',
    hoverBackgroundColor: '#f0f0f0',
    textColor: '#34495e',
    seperatorLineColor: '#e0e0e0',
  },

  // Interativos
  accentColor: '#2980b9',
  temperatureSwitch: {
    backgroundColor: '#2980b9',
    sliderColor: '#ffffff',
    textColor: '#ffffff',
  },
  
  // Ícones
  smallIconColor: '#5a5a5a',
  smallIconTextColor: '#5a5a5a',

  // Outros
  panelShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

// ===================================================================
// TEMA ESCURO (DARK THEME)
// ===================================================================
export const darkTheme: Theme = {
  // Backgrounds
  body: '#0d1117', 
  backgroundImage: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
  backgroundGradient: { color1: '#09203f', color2: '#537895' },
  headerBgColor: 'rgba(9, 32, 63, 0.2)', 
  panelBgColor: 'rgba(9, 32, 63, 1)', 
  forecastPanelBgColor: 'rgba(9, 32, 63, 0.4)', 

  // Textos
  appTitleColor: '#ecf0f1',
  textColor: '#bdc3c7', 
  subTextColor: '#95a5a6',
  panelTitleColor: '#ecf0f1',

  // Busca
  searchInput: {
    color: '#ecf0f1',
    placeholderColor: '#7f8c8d',
    backgroundColor: '#161b22',
  },
  searchSuggestion: {
    backgroundColor: '#161b22',
    hoverBackgroundColor: '#0d1117',
    textColor: '#ecf0f1',
    seperatorLineColor: '#30363d',
  },

  // Interativos
  accentColor: '#3498db',
  temperatureSwitch: {
    backgroundColor: '#3498db',
    sliderColor: '#161b22',
    textColor: '#161b22',
  },

  // Ícones
  smallIconColor: '#95a5a6',
  smallIconTextColor: '#95a5a6',

  // Outros
  panelShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
};
