import * as React from "react";
import { Box, Stack } from "@mui/material";
import {
  MainInfoAuction,
  MainInfoCoreProduct,
  MainInfoDirectRedeem,
  MainInfoDonation,
  MainInfoLuckyDraw,
} from "..";
import { Select } from "../../../atoms";
import { useGetKeywordTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword } from "../interfaces";
import Merchant from "./Merchant";
import General from "./General";
import Segmentation from "./Segmentation";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const { data: keywordTypeOptions = { data: [] } } = useGetKeywordTypeQuery();

  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);
  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate]);

  React.useEffect(() => {
    console.log(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="1vw" width="100%">
        <Stack spacing="1vw" px="4vw">
          <Select
            label="Type"
            placeholder="Option"
            options={keywordTypeOptions.data}
            value={keywordCreateState.keyword_type}
            handleChange={(value: string) => {
              keywordCreate.keyword_type = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <General
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <Merchant
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
          <Segmentation
            keywordCreateState={keywordCreateState}
            keywordCreate={keywordCreate}
            stateTrigger={stateTrigger}
            setStateTrigger={setStateTrigger}
          />
        </Stack>
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Auction and Racing POIN" && <MainInfoAuction />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Redeem Core Product" && <MainInfoCoreProduct />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Lucky Draw" && <MainInfoLuckyDraw />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Direct Redeem" && <MainInfoDirectRedeem />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Free Gift" && <MainInfoDonation />}
      </Stack>
    </Box>
  );
};

export default MainInfo;
