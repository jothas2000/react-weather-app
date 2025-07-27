import React from 'react';
// 1. Importamos 'Switch' em vez de 'Routes'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// O resto das suas importações
import { Provider } from 'react-redux';
import store from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home';
import Sobre from './pages/Sobre/Sobre';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          {/*
            2. Usamos o <Switch> para envolver as nossas rotas.
            O <Switch> garante que apenas a PRIMEIRA rota que corresponder
            à URL seja renderizada.
          */}
          <Switch>
            {/* A sintaxe da <Route> é um pouco diferente na v5 */}
            <Route path="/sobre">
              <Sobre />
            </Route>
            
            {/* A rota principal ("/") deve vir por último */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;