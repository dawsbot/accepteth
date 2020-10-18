// import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { HiLockClosed } from "react-icons/hi";
import styled from "styled-components";
import CopyToClipboard from "react-copy-to-clipboard";
import { AllValidTokens } from "./AcceptAny";

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

const Or = styled.div`
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const AddressContainer = styled.div`
  border: 1px solid lightseagreen;
  padding-left: 16px;
  border-radius: 6px;
  align-items: center;
  position: relative;
  font-size: 14px;
`;
const CopyButton = styled.button`
  cursor: pointer;
  position: absolute;
  font-weight: bold;
  right: 0;
  top: 0;
  padding: 10px 20px;
  border-width: 0px;
  background-color: black;
  color: white;

  height: 40px;
  border-radius: 0px 6px 6px 0px;
  font-size: 14px;
`;

const AddressWithCopy = ({ address }: { address: string }) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setCopied(false);
  }, [address]);
  return (
    <AddressContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "40px",
          overflowX: "scroll",
        }}
      >
        {address}
      </div>
      <CopyToClipboard text={address} onCopy={() => setCopied(true)}>
        <CopyButton>
          <>{copied ? "Copied" : "Copy"}</>
        </CopyButton>
      </CopyToClipboard>
    </AddressContainer>
  );
};
const buildBlockExplorerUrl = (token: AllValidTokens, address: string) => {
  switch (token) {
    case "Ethereum":
    case "0x":
      return `https://etherscan.io/address/${address}`;
    case "Bitcoin":
      return `https://www.blockchain.com/btc/address/${address}`;
    case "Bitcoin Cash":
      return `https://www.blockchain.com/bch/address/${address}`;
    case "Ethereum Classic":
      return `https://blockscout.com/etc/mainnet/address/${address}`;
    case "Litecoin":
      return `https://blockchair.com/litecoin/address/${address}`;
    default:
      return "";
  }
};
export const TokenBody = ({
  token,
  address,
}: {
  token: AllValidTokens;
  address: string;
}) => {
  return (
    <div>
      <div style={{ fontWeight: "bold", paddingBottom: "10px" }}>
        Send {token} to:{" "}
      </div>
      <AddressWithCopy address={address} />
      <Or>or</Or>
      Scan here:
      <QRContainer>
        <QRCode value={address} />
      </QRContainer>
      <br />
      {
        <ValidateRow>
          <HiLockClosed
            color="green"
            size="20"
            style={{ marginRight: "6px" }}
          />
          <ValidateAddressLink
            href={buildBlockExplorerUrl(token, address)}
            target="_blank"
          >
            Validate address
          </ValidateAddressLink>
        </ValidateRow>
      }
    </div>
  );
};
