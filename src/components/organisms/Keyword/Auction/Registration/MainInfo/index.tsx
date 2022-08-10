import { Box, Divider, Grid, Stack } from "@mui/material";
import * as React from "react";
import useKeywordAuction from "../../../../../../app/context/KeywordAuction/useKeywordAuction";
import { optionsObj } from "../../../../../../mocks/options";
import { H1, H2, OutlinedTextField, Select } from "../../../../../atoms";
import BasicFormCard from "../../../../../atoms/BasicFormCard";
import CustomPaper from "../../../../../atoms/CustomPaper";
import { IMainInfoProps } from "./type";
import useKeywordAuctionOptions, {
  useAuctionNotifBidding,
  useAuctionNotifOutbid,
  useAuctionNotifRefundSuccess,
  useAuctionNotifWinning,
} from "./useKeywordAuctionMainInfoTab";

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const { keywordAuctionData } = useKeywordAuction();
  const { main_info } = useKeywordAuctionOptions();

  const { AuctionNotifOutbidLabel, handleChangeAuctionNotifOutbid } =
    useAuctionNotifOutbid(main_info.auction_notif_outbid);
  const { AuctionNotifWinningLabel, handleChangeAuctionNotifWinning } =
    useAuctionNotifWinning(main_info.auction_notif_winning);
  const { AuctionNotifBiddingLabel, handleChangeAuctionNotifBidding } =
    useAuctionNotifBidding(main_info.auction_notif_bidding);
  const {
    AuctionNotifRefundSuccessLabel,
    handleChangeAuctionNotifRefundSuccess,
  } = useAuctionNotifRefundSuccess(main_info.auction_notif_refund_success);

  React.useEffect(() => {
    console.log(keywordAuctionData);
    return;
  }, [keywordAuctionData]);
  return (
    // <Box py="2vw" px="10vw">
    // <CustomPaper sx={{ paddingBlock: "3vw", paddingInline: "3vw" }}>
    <Box pt="2vw">
      <Divider textAlign="left">
        <H2 textTransform="uppercase">
          auction specific main info configuration
        </H2>
      </Divider>
      <Grid container columns={10} py="3vw">
        <Grid item xs={4}>
          <BasicFormCard title="notification configuration">
            <Stack direction="column" spacing="1vw">
              <Select
                direction="column"
                label="Outbid"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={AuctionNotifOutbidLabel}
                handleChange={handleChangeAuctionNotifOutbid}
              />
              <Select
                direction="column"
                label="Winning"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={AuctionNotifWinningLabel}
                handleChange={handleChangeAuctionNotifWinning}
              />
              <Select
                direction="column"
                label="Bidding"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={AuctionNotifBiddingLabel}
                handleChange={handleChangeAuctionNotifBidding}
              />
              <Select
                direction="column"
                label="Poin Refund"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={AuctionNotifRefundSuccessLabel}
                handleChange={handleChangeAuctionNotifRefundSuccess}
              />
            </Stack>
          </BasicFormCard>
        </Grid>
      </Grid>
    </Box>
    // </CustomPaper>
    // </Box>
  );
};

export default MainInfo;
