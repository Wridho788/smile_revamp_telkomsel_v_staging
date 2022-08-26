import React from "react";
import { MainInfo } from "../../../../components/organisms/CreateKeyword/Auction/Registration";
import { KeywordAuctionProvider } from "../../../../app/context/KeywordAuction/Provider";

const KeywordAuction = () => {
  return (
    <KeywordAuctionProvider>
      <MainInfo />
    </KeywordAuctionProvider>
  );
};

export default KeywordAuction;
