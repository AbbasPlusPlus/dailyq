import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle.";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </>
    </ThemeProvider>
  );
}

export default App;
