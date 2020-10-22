import React, { useState, useEffect } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import styled from "styled-components";

const TextContainer = styled.div`
  border: 1px solid lightseagreen;
  padding-left: 16px;
  padding-right: 78px;
  border-radius: 6px;
  align-items: center;
  position: relative;
  font-size: 14px;
  background-color: lightgrey;
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
  margin-right: -1px; // chrome border bug
`;

const AnchorHOC: React.FunctionComponent<{
  href?: string;
  isAnchor: boolean;
}> = ({ isAnchor, href, children }) => {
  return isAnchor ? (
    <a href={href} target="_blank" style={{ color: "black" }}>
      {children}
    </a>
  ) : (
    <>{children}</>
  );
};
export const TextDisplayWithCopyButton = ({
  text,
  isAnchor,
}: {
  text: string;
  isAnchor?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    setCopied(false);
  }, [text]);
  return (
    <TextContainer>
      <AnchorHOC isAnchor={Boolean(isAnchor)} href={text}>
        <code
          style={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            letterSpacing: "-0.3px",
          }}
        >
          {text}
        </code>
      </AnchorHOC>
      <CopyToClipboard text={text} onCopy={() => setCopied(true)}>
        <CopyButton>
          <>{copied ? "Copied" : "Copy"}</>
        </CopyButton>
      </CopyToClipboard>
    </TextContainer>
  );
};
