// import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { HiLockClosed } from "react-icons/hi";
import styled from "styled-components";
import CopyToClipboard from "react-copy-to-clipboard";

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
  background-color: darkgrey;

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
export const TokenBody = ({
  token,
  address,
}: {
  token: string;
  address: string;
}) => {
  return (
    <div>
      Send {token} to
      <br />
      <AddressWithCopy address={address} />
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
