import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: url('/galaxy.jpg') no-repeat center center fixed; 
    background-size: cover;
    font-family: 'Roboto', sans-serif; 
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bangers', cursive; 
  }
`;
