import Head from "next/head";
import React from "react";

const Index = () => {
  if (typeof window !== "undefined") {
    window.location.href = "https://accepteth.unicornplatform.com/";
  }
  return (
    <Head>
      <title>AcceptEth</title>
      <meta name="og:title" content="AcceptEth" />
    </Head>
  );
};

export default Index;
