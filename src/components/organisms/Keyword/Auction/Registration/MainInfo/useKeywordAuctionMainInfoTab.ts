import React from "react";
import { optionsObj } from "../../../../../../mocks/options";
import useKeywordAuction from "../../../../../../app/context/KeywordAuction/useKeywordAuction";

const useKeywordAuctionOptions = () => {
  const main_info = {
    auction_notif_outbid: optionsObj,
    auction_notif_winning: optionsObj,
    auction_notif_bidding: optionsObj,
    auction_notif_refund_success: optionsObj,
  };

  return {
    main_info,
  };
};

export const useAuctionNotifOutbid = (options: any) => {
  const { keywordAuctionData, setKeywordAuctionData } = useKeywordAuction();

  const AuctionNotifOutbidLabel =
    options?.find(
      (option: { _id: any }) =>
        option._id === keywordAuctionData.auction_notif_outbid
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) =>
            option._id === keywordAuctionData.auction_notif_outbid
        )?.set_value
      : "";

  const handleChangeAuctionNotifOutbid = async (value: string) => {
    const auction_notif_outbid_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setKeywordAuctionData((prevState: any) => ({
      ...prevState,
      auction_notif_outbid: auction_notif_outbid_id,
    }));
  };

  return { AuctionNotifOutbidLabel, handleChangeAuctionNotifOutbid };
};

export const useAuctionNotifWinning = (options: any) => {
  const { keywordAuctionData, setKeywordAuctionData } = useKeywordAuction();

  const AuctionNotifWinningLabel =
    options?.find(
      (option: { _id: any }) =>
        option._id === keywordAuctionData.auction_notif_winning
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) =>
            option._id === keywordAuctionData.auction_notif_winning
        )?.set_value
      : "";

  const handleChangeAuctionNotifWinning = async (value: string) => {
    const auction_notif_winning_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setKeywordAuctionData((prevState: any) => ({
      ...prevState,
      auction_notif_winning: auction_notif_winning_id,
    }));
  };

  return { AuctionNotifWinningLabel, handleChangeAuctionNotifWinning };
};

export const useAuctionNotifBidding = (options: any) => {
  const { keywordAuctionData, setKeywordAuctionData } = useKeywordAuction();

  const AuctionNotifBiddingLabel =
    options?.find(
      (option: { _id: any }) =>
        option._id === keywordAuctionData.auction_notif_bidding
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) =>
            option._id === keywordAuctionData.auction_notif_bidding
        )?.set_value
      : "";

  const handleChangeAuctionNotifBidding = async (value: string) => {
    const auction_notif_bidding_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setKeywordAuctionData((prevState: any) => ({
      ...prevState,
      auction_notif_bidding: auction_notif_bidding_id,
    }));
  };

  return { AuctionNotifBiddingLabel, handleChangeAuctionNotifBidding };
};

export const useAuctionNotifRefundSuccess = (options: any) => {
  const { keywordAuctionData, setKeywordAuctionData } = useKeywordAuction();

  const AuctionNotifRefundSuccessLabel =
    options?.find(
      (option: { _id: any }) =>
        option._id === keywordAuctionData.auction_notif_refund_success
    )?.set_value !== undefined
      ? options?.find(
          (option: { _id: any }) =>
            option._id === keywordAuctionData.auction_notif_refund_success
        )?.set_value
      : "";

  const handleChangeAuctionNotifRefundSuccess = async (value: string) => {
    const auction_notif_refund_success_id = await options?.find(
      (option: { set_value: any }) => option.set_value === value
    )?._id;

    await setKeywordAuctionData((prevState: any) => ({
      ...prevState,
      auction_notif_refund_success: auction_notif_refund_success_id,
    }));
  };

  return {
    AuctionNotifRefundSuccessLabel,
    handleChangeAuctionNotifRefundSuccess,
  };
};

// export const useProgramName = () => {
//   const { programData, setProgramData } = useKeywordAuction();

//   const programNameLabel =
//     programData.name !== undefined ? programData.name : "";

//   const handleChangeProgramName = async (value: string) => {
//     await setProgramData((prevState: any) => ({
//       ...prevState,
//       name: value,
//     }));
//   };

//   return { programNameLabel, handleChangeProgramName };
// };

export default useKeywordAuctionOptions;
