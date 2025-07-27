import { createGlobalStyle } from 'styled-components';
import { Theme } from './themes';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => `linear-gradient(to top, ${theme.backgroundGradient.color1}, ${theme.backgroundGradient.color2})`};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3e%3cpath fill='%23ffffff' fill-opacity='0.1' d='M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,240C672,267,768,277,864,256C960,235,1056,181,1152,154.7C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3e%3c/path%3e%3c/svg%3e"),
                        linear-gradient(to top, ${({ theme }) => theme.backgroundGradient.color1}, ${({ theme }) => theme.backgroundGradient.color2});

    background-repeat: no-repeat;
    background-position: bottom;
    background-attachment: fixed;
    background-size: cover;

    color: ${({ theme }) => theme.textColor};
    font-family: 'Poppins', 'Roboto', sans-serif; // Usando uma fonte mais moderna
    transition: all 0.5s linear;
  }
`;