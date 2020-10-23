import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="shortcut icon"
            href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/money-with-wings_1f4b8.png"
          />
          <meta
            name="description"
            content="Accept crypto payments in 60 seconds. Free and open-sourced! Access money from the global cryptocurrency economy and start accepting Ethereum, Bitcoin, and more."
          />

          <meta
            name="og:description"
            content="Accept crypto payments in 60 seconds. Free and open-sourced! Access money from the global cryptocurrency economy and start accepting Ethereum, Bitcoin, and more."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://ucarecdn.com/73b716cf-6904-40d9-872a-b1d1554f12cf/image.png"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://ucarecdn.com/73b716cf-6904-40d9-872a-b1d1554f12cf/image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
