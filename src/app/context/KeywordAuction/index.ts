import React from "react";
import { createContext, SetStateAction } from "react";
import { IKeywordAuctionData } from "./types";

interface IKeywordAuctionContextValues {
  keywordAuctionData: IKeywordAuctionData;
  setKeywordAuctionData: SetStateAction<any>;
}

export const KeywordAuctionContext = createContext<
  IKeywordAuctionContextValues | undefined
>(undefined);
