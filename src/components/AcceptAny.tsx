import React, { useState } from "react";
import styled from "styled-components";
// import Link from "next/link";

import Select from "react-select";
import { TokenBody } from "./TokenBody";

import { images } from "../utils/images";
export type ObjectEntries = <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];

// TODO: URL Encode this
const allAddresses = {
  Bitcoin: "33BFZMhRnVeMD12cY7m7BfprrGnwCtuLyP",
  Ethereum: "0x7cF2eBb5Ca55A8bd671A020F8BDbAF07f60F26C1",
  ["Bitcoin Cash"]: "qqftnjls854mudqnuv9qwc4ndfslscz4ecp3u878se",
  ["Ethereum Classic"]: "0x26A7fA981E513873Ba036400dd70C787303930A4",
  ["Litecoin"]: "M9MYWkPkshQRRuyjMVPNfFjasu4sZi1reR",
  "0x": "0x6f16e5FC3Be15Ba3b08Fc884d100a53723A1cA72",
};

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

const allAddressOptions = Object.keys(allAddresses).map((tokenName) => {
  return {
    value: tokenName,
    label: (
      <RowContainer>
        <CryptoLogo src={(images as any)[tokenName]} />
        {tokenName}
      </RowContainer>
    ),
    color: "blue",
  };
});

const Header = styled.div`
  background-color: lightgrey;
  padding: 40px 20px;
  border-radius: 10px 10px 0px 0px;
  margin: 0px;
`;
const Body = styled.div`
  margin: 20px;
`;
export const AcceptAny = () => {
  const [selectedValue, setSelectedValue] = useState<any>(allAddressOptions[0]);
  return (
    <div>
      <Header>
        <div style={{ marginBottom: "8px" }}>I want to send</div>
        <Select
          value={selectedValue}
          label="Select CryptoCurrency"
          options={allAddressOptions}
          onChange={setSelectedValue}
          // styles={colourStyles}
        />
      </Header>
      <Body>
        <TokenBody
          token={selectedValue.value}
          address={(allAddresses as any)[selectedValue.value]}
        />
      </Body>
    </div>
  );
};
