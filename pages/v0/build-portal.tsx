import React, { useReducer, useState } from "react";
import styled from "styled-components";

import Select from "react-select";
import { BiPlusCircle } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";

import { images } from "../../src/utils/images";
import { CenterChildren } from "../../src/components/CenterChildren";
import { PortalContainer } from "../../src/components/PortalContainer";
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
  margin-top: 10px;
`;

const PlusContainer = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const SelectContainer = styled.div`
  display: flex;
`;

const initialState = Object.keys(images).reduce((acc, tokenName) => {
  acc[tokenName] = {
    value: "",
    visible: false,
  };
  return acc;
}, {} as any);
// default only ethereum visible
initialState.Ethereum.visible = true;

const AcceptAny = () => {
  const [allWalletState, setAllWalletState] = useState(initialState);
  const editWalletAddress = (
    token: keyof typeof images,
    newData: { value: string; visible: boolean }
  ) => {
    setAllWalletState({
      ...allWalletState,
      [token]: newData,
    });
  };

  const makeNewTokenVisible = () => {
    const firstInvisibleToken = Object.entries(allWalletState).find(
      ([token, data]: any) => {
        return !data.visible;
      }
    );

    const newData = {
      ...firstInvisibleToken[1],
      visible: true,
    };
    editWalletAddress(firstInvisibleToken[0], newData);
  };

  const isClient = typeof window !== "undefined";
  const buildHref = `${
    isClient ? window.location.origin : ""
  }/v0/pay-portal?${Object.entries(allWalletState)
    .filter(([_, data]: any) => data.visible && data.value !== "")
    .map(([token, data]: any) => `${token}=${data.value}`)
    .join("&")}`;

  return (
    <CenterChildren>
      <PortalContainer>
        <Header>
          <PlusContainer>
            <H3>I want to accept</H3>{" "}
            <BiPlusCircle
              color="white"
              size="38"
              style={{ marginLeft: "10px", cursor: "pointer" }}
              onClick={makeNewTokenVisible}
            />
          </PlusContainer>
          {Object.entries(allWalletState).map(
            ([token, data]: any, index: number) => {
              console.log(token, data);
              const { visible } = data;
              const address = data.value;
              if (!visible) return null;

              const selectedValue = allAddressOptions.find(
                (addressOption) => addressOption.value === token
              );

              const currentAddressOptions = allAddressOptions.filter(
                (addressOption) => {
                  const allVisibleTokens = Object.entries(allWalletState)
                    .filter(([token, data]: any) => data.visible)
                    .map(([token, data]: any) => token);
                  return !allVisibleTokens.includes(addressOption.value);
                }
              );
              return (
                <div
                  key={token}
                  style={{
                    marginTop: "20px",
                    border: "1px solid white",
                    padding: "8px",
                    borderRadius: "6px",
                  }}
                >
                  <SelectContainer>
                    <Select
                      styles={{
                        container: () => ({
                          width: "100%",
                        }),
                      }}
                      value={selectedValue}
                      label="Select CryptoCurrency"
                      options={currentAddressOptions}
                      onChange={(newAddressOption) => {
                        setAllWalletState({
                          ...allWalletState,
                          [newAddressOption.value]: {
                            value: "",
                            visible: true,
                          },
                          [selectedValue.value]: {
                            value: "",
                            visible: false,
                          },
                        });
                      }}
                    />
                    <BiPlusCircle
                      color="white"
                      size="38"
                      style={{
                        marginLeft: "10px",
                        cursor: "pointer",
                        transform: "rotate(45deg)",
                      }}
                      onClick={() => {
                        editWalletAddress(selectedValue.value, {
                          value: "",
                          visible: false,
                        });
                      }}
                    />
                    {/* <TiDeleteOutline
                      style={{ marginLeft: "6px" }}
                      color="white"
                      size="44"
                      onClick={() => {}}
                    /> */}
                  </SelectContainer>
                  <Input
                    value={address}
                    onChange={(e) =>
                      editWalletAddress(token, {
                        value: e.target.value,
                        visible: true,
                      })
                    }
                    placeholder={`Your ${token} address`}
                  />
                </div>
              );
            }
          )}
        </Header>

        {isClient && (
          <a href={buildHref} target="_blank" style={{ color: "black" }}>
            <code>{buildHref}</code>
          </a>
        )}
      </PortalContainer>
    </CenterChildren>
  );
};

export default AcceptAny;
