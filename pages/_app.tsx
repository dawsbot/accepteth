// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";

import styled from "styled-components";
const Container = styled.div`
  max-width: 400px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 100px;
  padding: 40px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
