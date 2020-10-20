import React, { useReducer, useState } from "react";
import styled from "styled-components";

import Select from "react-select";
import { BiPlusCircle } from "react-icons/bi";

import { images } from "../../src/utils/images";
export type ObjectEntries = <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];

export type AllValidTokens = keyof typeof images;

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

const allAddressOptions = Object.keys(images).map((tokenName) => {
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

const Header = styled.div`
  background-color: black;
  padding: 50px 30px;
  border-radius: 10px 10px 0px 0px;
  margin: 0px;
`;

const H3 = styled.h3`
  margin-bottom: 10px;
  color: white;
  margin-top: 0px;
`;

const Input = styled.input`
  height: 38px;
  box-sizing: border-box;
  padding: 4px 10px;
  font-size: 14px;
  border-radius: 4px;
  border-width: 0px;
  width: 100%;
  font-family: monospace;
`;

const InputContainer = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
const AcceptAny = () => {
  const [selectedValue, setSelectedValue] = useState<any>(allAddressOptions[0]);
  const [currentAddress, setCurrentAddress] = useState("");
  const [allWalletState, setAllWalletState] = useState({});
  const persistWalletAddress = () => {
    setAllWalletState({
      [selectedValue.value]: currentAddress,
    });
  };
  return (
    <>
      <Header>
        <H3>I want to accept</H3>
        <Select
          value={selectedValue}
          label="Select CryptoCurrency"
          options={allAddressOptions}
          onChange={setSelectedValue}
          // styles={colourStyles}
        />
        <InputContainer>
          <Input
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            placeholder={`Your ${selectedValue.value} address`}
          />
          <BiPlusCircle
            color="white"
            size="38"
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={persistWalletAddress}
          />
        </InputContainer>
        {Object.entries(allWalletState).map(([token, address]) => (
          <div style={{ color: "white" }}>
            {token}, {address}
          </div>
        ))}
      </Header>
    </>
  );
};

export default AcceptAny;
