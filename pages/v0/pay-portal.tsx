import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Link from "next/link";

import Select from "react-select";
import { TokenBody } from "../../src/components/TokenBody";

import { AllValidTokens, images } from "../../src/utils/images";
import { useRouter } from "next/dist/client/router";
import { CenterChildren } from "../../src/components/CenterChildren";
import { PortalContainer } from "../../src/components/PortalContainer";
import Head from "next/head";
export type ObjectEntries = <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];

const CryptoLogo = styled.img`
  height: 20px;
  max-width: 40px;
  margin-right: 20px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Header = styled.div`
  background-color: black;
  padding: 50px 30px;
  border-radius: 6px 6px 0px 0px;
  margin: 0px;
`;

const H3 = styled.h3`
  margin-bottom: 10px;
  color: white;
  margin-top: 0px;
`;

const PayPortal = () => {
  const [allAddressOptions, setAllAddressOptions] = useState([
    { value: "", label: null, color: "" },
  ]);
  const [selectedValue, setSelectedValue] = useState<any>(allAddressOptions[0]);
  const router = useRouter();
  useEffect(() => {
    const allAddresses = router.query;
    const initialAddressOptions = Object.keys(allAddresses).map((tokenName) => {
      return {
        value: tokenName,
        label: (
          <RowContainer>
            <CryptoLogo src={images[tokenName as AllValidTokens]} />
            {tokenName}
          </RowContainer>
        ),
        color: "blue",
      };
    });

    setAllAddressOptions(initialAddressOptions as any);
    if (allAddresses.hasOwnProperty("Ethereum")) {
      setSelectedValue(
        initialAddressOptions.find(({ value }) => value === "Ethereum")
      );
    }
  }, [router.query]);

  const currentAddress = router.query[selectedValue.value] as string;
  return (
    <>
      <Head>
        <title>AcceptEth | Pay</title>
        <meta name="og:title" content="AcceptEth | Pay" />
      </Head>
      <CenterChildren>
        <PortalContainer>
          <Header>
            <H3>I want to send</H3>
            <Select
              value={selectedValue}
              label="Select CryptoCurrency"
              options={allAddressOptions}
              onChange={setSelectedValue}
            />
          </Header>
          {currentAddress && (
            <TokenBody token={selectedValue.value} address={currentAddress} />
          )}
        </PortalContainer>
      </CenterChildren>
    </>
  );
};

export default PayPortal;
