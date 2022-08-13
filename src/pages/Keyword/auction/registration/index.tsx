import React from "react";
import { MainInfo } from "../../../../components/organisms/Keyword/Auction/Registration";
import { KeywordAuctionProvider } from "../../../../app/context/KeywordAuction/Provider";

const KeywordAuction = () => {
  return (
    <KeywordAuctionProvider>
      <MainInfo />
    </KeywordAuctionProvider>
  );
};

export default KeywordAuction;
