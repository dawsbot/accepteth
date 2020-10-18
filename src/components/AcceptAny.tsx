import React from "react";
import styled from "styled-components";
import Link from "next/link";

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

const RowContainer = styled.div`
  display: inline-block;
  border: 2px solid orange;
  border-radius: 10px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

const CryptoLogo = styled.img`
  height: 36px;
  max-width: 40px;
  margin-right: 20px;
`;

const CryptoName = styled.b`
  font-size: 22px;
  margin-right: 20px;
`;
export const AcceptAny = () => {
  return (
    <>
      {(Object.entries as ObjectEntries)(allAddresses).map(
        ([token, address]) => (
          <Link href={`/pay/${token}/${address}`}>
            <RowContainer key={address}>
              <>
                <CryptoLogo src={images[token]} />
                <CryptoName>{token}</CryptoName>
                {">"}
              </>
            </RowContainer>
          </Link>
        )
      )}
    </>
  );
};
