// import { useRouter } from "next/dist/client/router";
import React from "react";
import QRCode from "qrcode.react";
import { HiLockClosed } from "react-icons/hi";
import styled from "styled-components";

const ValidateRow = styled.div`
  display: flex;
  align-items: center;
`;

const ValidateAddressLink = styled.a`
  text-decoration: none;
`;

const QRContainer = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const AddressContainer = styled.div`
  border: 1px solid blue;
  padding: 3px 6px;
  border-radius: 4px;
`;

const Or = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;
export const TokenBody = ({ token, address }: any) => {
  return (
    <div>
      Send {token} to
      <br />
      <AddressContainer>{address}</AddressContainer>
      <Or>OR</Or>
      Scan here:
      <QRContainer>
        <QRCode value={address} />
      </QRContainer>
      <br />
      {token === "Ethereum" && (
        <ValidateRow>
          <HiLockClosed
            color="green"
            size="20"
            style={{ marginRight: "6px" }}
          />
          <ValidateAddressLink
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
          >
            Validate address
          </ValidateAddressLink>
        </ValidateRow>
      )}
    </div>
  );
};
