import { useRouter } from "next/dist/client/router";
import React from "react";
import QRCode from "qrcode.react";

const Address = () => {
  const { query } = useRouter();
  const { token, address } = query;
  return (
    <div>
      Send {token} to {address}
      <QRCode value={address} />
      <br />
      {token === "Ethereum" && (
        <a href={`https://etherscan.io/address/${address}`}>
          View on Etherscan
        </a>
      )}
    </div>
  );
};

export default Address;
