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
        <script
          dangerouslySetInnerHTML={{
            __html: `
                <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=G-J52ZQ1G3KQ"
              ></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-J52ZQ1G3KQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J52ZQ1G3KQ');
</script>
            `,
          }}
        />
      </Head>
      <Container>
        <Component {...pageProps} />
        <GlobalStyle />
      </Container>
    </>
  );
}

export default MyApp;
