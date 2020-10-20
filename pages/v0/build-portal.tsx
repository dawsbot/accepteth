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

const initialState = Object.keys(images).reduce((acc, tokenName) => {
  acc[tokenName] = {
    value: "",
    visible: true,
  };
  return acc;
}, {} as any);

const AcceptAny = () => {
  // const [selectedValue, setSelectedValue] = useState<any>(allAddressOptions[0]);
  // const [currentAddress, setCurrentAddress] = useState("");
  const [allWalletState, setAllWalletState] = useState(initialState);
  const editWalletAddress = (token: keyof typeof images, value: string) => {
    setAllWalletState({
      ...allWalletState,
      [token]: {
        value,
        visible: true,
      },
    });
  };

  const isClient = typeof window !== "undefined";
  const buildHref = `${
    isClient ? window.location.origin : ""
  }/v0/pay-portal?${Object.entries(allWalletState)
    .filter(([_, data]: any) => data.visible && data.value !== "")
    .map(([token, data]: any) => `${token}=${data.value}`)
    .join("&")}`;

  return (
    <>
      <Header>
        <H3>I want to accept</H3>
        {Object.entries(allWalletState).map(([token, data]: any) => {
          const { value, visible } = data;
          const address = data.value;
          if (!visible) return null;
          // let selectedValue;
          // const selectedValue = allAddressOptions.find(addressOption => {
          //   return addressOption.value ===

          // });
          const selectedValue = allAddressOptions.find(
            (addressOption) => addressOption.value === token
          );

          // const selectValue =
          return (
            <div
              style={{
                marginTop: "20px",
                border: "1px solid white",
                padding: "14px",
                borderRadius: "6px",
              }}
            >
              <Select
                value={selectedValue}
                label="Select CryptoCurrency"
                options={allAddressOptions}
                // onChange={(newAddressOption) => editWalletAddress(newAddressOption.value, )}
                // styles={colourStyles}
              />
              <InputContainer>
                <Input
                  value={address}
                  onChange={(e) => editWalletAddress(token, e.target.value)}
                  placeholder={`Your ${token} address`}
                />
                <BiPlusCircle
                  color="white"
                  size="38"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                  // onClick={persistWalletAddress}
                />
              </InputContainer>
            </div>
          );
        })}

        {isClient && (
          <a href={buildHref}>
            <code style={{ color: "white" }}>{buildHref}</code>
          </a>
        )}
      </Header>
    </>
  );
};

export default AcceptAny;
