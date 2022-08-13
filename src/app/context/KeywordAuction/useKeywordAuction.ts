import React from "react";
import { KeywordAuctionContext } from ".";

const useKeywordAuction = () => {
  const context = React.useContext(KeywordAuctionContext);
  if (!context) {
    throw new Error("Should be called inside provider");
  }
  return context;
};

export default useKeywordAuction;
