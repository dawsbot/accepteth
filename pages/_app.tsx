import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle<any>`
  body{
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    padding: 0px;
    margin: 0px;
  }
`;

const Container = styled.div`
  margin-top: 100px;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AcceptEth</title>
      </Head>
      <Container>
        <Component {...pageProps} />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default MyApp;
