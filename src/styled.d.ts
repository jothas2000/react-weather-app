// Este arquivo ensina ao TypeScript qual é a "forma" do nosso tema.

// 1. Importamos o 'styled-components' para poder estender seus tipos.
import 'styled-components';

// 2. Importamos a nossa interface 'Theme' que criamos em 'styles/themes.ts'.
//    Certifique-se de que o caminho para o seu arquivo de temas está correto.
import { Theme } from './styles/themes';

// 3. Usamos "declaration merging" para dizer ao TypeScript que a interface
//    'DefaultTheme' do styled-components deve ter todas as propriedades
//    da nossa interface 'Theme'.
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
