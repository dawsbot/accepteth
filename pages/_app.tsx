// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<any>`
  body {
    font-family: 'Lato', sans-serif;
    font-size: 16px;
  }
`;

const Container = styled.div`
  max-width: 400px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 100px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
      <GlobalStyle />
    </Container>
  );
}

export default MyApp;
