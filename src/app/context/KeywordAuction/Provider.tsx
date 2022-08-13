import React from "react";
import { KeywordAuctionContext } from ".";
import { IKeywordAuctionData } from "./types";

export const KeywordAuctionProvider = ({ children }: any) => {
  const [keywordAuctionData, setKeywordAuctionData] =
    React.useState<IKeywordAuctionData>({
      auction_notif_outbid: "",
      auction_notif_winning: "",
      auction_notif_bidding: "",
      auction_notif_refund_success: "",
    });

  return (
    <KeywordAuctionContext.Provider
      value={{
        keywordAuctionData,
        setKeywordAuctionData,
      }}
    >
      {children}
    </KeywordAuctionContext.Provider>
  );
};
