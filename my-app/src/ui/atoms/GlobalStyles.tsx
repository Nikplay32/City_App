import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Reset styles */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Add your global styles here */
  body {
    font-family: 'Nunito', sans-serif;    /* Add other body styles */
  }

  /* Add more global styles as needed */
`;

export default GlobalStyles;
