import { Box, Button, Divider, Grid, IconButton, Stack } from "@mui/material";
import * as React from "react";
import {
  MainInfoAuction,
  MainInfoCoreProduct,
  MainInfoDirectRedeem,
  MainInfoDonation,
  MainInfoLuckyDraw,
} from "..";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  Subtitle,
  BodyCopy,
  ResponsiveTimePicker,
} from "../../../atoms";
import {
  useCustomerListQuery,
  useCustomerTierListQuery,
} from "../../../../redux/features/customer/customer-api-slice";
import {
  useGetKeywordTypeQuery,
  useGetPointTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import { CreateKeywordInitial } from "../../../../pages/CreateKeyword/initial";
import { FilterInitial } from "../../../../redux/utils/initial-general";
import { useKeywordListQuery } from "../../../../redux/features/keyword/keyword-api-slice";

import { keywordTypeOptions, optionsObj } from "../../../../mocks/options";
import {
  BooleanOption,
  CreateKeywordGeneral,
  MaxModeOption,
  PointValueOption,
  TelkomselLOSOperatorOption,
  TelkomselLOSTypeOption,
} from "../initial";
import { useState } from "react";
import { useMerchantManagementListQuery } from "../../../../redux/features/merchant/merchant-api-slice";
import { useChannelListQuery } from "../../../../redux/features/channel/merchant-api-slice";
import { ICreateKeyword } from "../interface";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const { data: keywordTypeOption = { data: [] } } = useGetKeywordTypeQuery();
  const { data: customerTierOption = { data: [] } } =
    useCustomerTierListQuery(FilterInitial);
  const { data: pointTypeOption = { data: [] } } = useGetPointTypeQuery();
  const { data: keywordParentOption = { data: [] } } =
    useKeywordListQuery(FilterInitial);
  const { data: merchantManagementOption = { data: [] } } =
    useMerchantManagementListQuery(FilterInitial);
  const { data: channelOption = { data: [] } } =
    useChannelListQuery(FilterInitial);
  const { data: customerOption = { data: [] } } =
    useCustomerListQuery(FilterInitial);

  const keywordCreate = CreateKeywordGeneral;
  const [keywordType, setKeywordType] = useState("");
  const [name, setName] = React.useState<string>(keywordCreate.name);
  const [startPeriod, setStartPeriod] = React.useState(
    keywordCreate.start_period
  );
  const [endPeriod, setEndPeriod] = React.useState(keywordCreate.end_period);

  const [pointType, setPointType] = React.useState<[]>(
    keywordCreate.point_type
  );
  const [poinValue, setPoinValue] = React.useState<string>(
    keywordCreate.poin_value
  );
  const [poinRedeemed, setPoinRedeemed] = React.useState<number>(
    keywordCreate.poin_redeemed
  );
  const [forNewRedeemer, setForNewRedeemer] = React.useState(
    keywordCreate.for_new_redeemer === true ? "1" : "2"
  );
  const [maxRedeemPermissonMsisdn, setMaxRedeemPermissonMsisdn] =
    React.useState<number>(keywordCreate.max_redeem_per_msisdn);
  const [maxMode, setMaxMode] = React.useState<string>(keywordCreate.max_mode);
  const [maxRedeemCounter, setMaxRedeemCounter] = React.useState<number>(
    keywordCreate.max_redeem_counter
  );
  const [channelValidation, setChannelValidation] = useState(
    keywordCreate.channel_validation === true ? "1" : "2"
  );
  // const [channelValidation, setChannelValidation] = useState<[]>(
  //   keywordCreate.channel_validation
  // );
  const [merchandiseKeyword, setMerchandiseKeyword] = useState(
    keywordCreate.merchandise_keyword === true ? "1" : "2"
  );
  const [smsMasking, setSmsMasking] = useState<string>(
    keywordCreate.sms_masking
  );

  const [merchant, setMerchant] = useState<string>(keywordCreate.merchant);
  const [merchantName, setMerchantName] = useState<string>(
    keywordCreate.merchant_name
  );
  const [telkomselLos, setTelkomselLos] = useState(
    keywordCreate.telkomsel_los === true ? "1" : "2"
  );
  const [telkomselLosType, setTelkomselLosType] = useState<string>(
    keywordCreate.telkomsel_los_type
  );
  const [telkomselLosOperator, setTelkomselLosOperator] = useState<string>(
    keywordCreate.telkomsel_los_operator
  );
  const [telkomselLosValue, setTelkomselLosValue] = useState<number>(
    keywordCreate.telkomsel_los_value
  );
  const [telkomselLosRangeMin, setTelkomselLosRangeMin] = useState<number>(
    keywordCreate.telkomsel_los_range_min
  );
  const [telkomselLosRangeMax, setTelkomselLosRangeMax] = useState<number>(
    keywordCreate.telkomsel_los_range_max
  );

  const [enableCorporate, setEnableCorporate] = React.useState(
    keywordCreate.enable_coorporate === true ? "1" : "2"
  );
  const [customerTier, setCustomerTier] = React.useState<[]>(
    keywordCreate.customer_tier
  );
  const [commentApproval, setCommentApproval] = React.useState<string>(
    keywordCreate.comment_approval
  );
  const [keywordParent, setKeywordParent] = React.useState<string>(
    keywordCreate.keyword_parent
  );

  React.useEffect(() => {
    // keywordCreate.keyword_type = keywordType;
    keywordCreate.keyword_parent = keywordParent;
    keywordCreate.name = name;
    keywordCreate.start_period = startPeriod;
    keywordCreate.end_period = endPeriod;
    keywordCreate.point_type = pointType;
    keywordCreate.poin_value = poinValue;
    keywordCreate.for_new_redeemer = forNewRedeemer === "1" ? true : false;
    keywordCreate.poin_redeemed = Number(poinRedeemed);
    keywordCreate.max_mode = maxMode;
    keywordCreate.max_redeem_counter = Number(maxRedeemCounter);
    keywordCreate.max_redeem_per_msisdn = Number(maxRedeemPermissonMsisdn);
    keywordCreate.channel_validation = channelValidation === "1" ? true : false;
    // keywordCreate.channel_validation = channelValidation;
    keywordCreate.merchandise_keyword =
      merchandiseKeyword === "1" ? true : false;
    keywordCreate.sms_masking = smsMasking;
    keywordCreate.merchant = merchant;
    keywordCreate.merchant_name = merchantName;
    keywordCreate.telkomsel_los = telkomselLos === "1" ? true : false;
    keywordCreate.telkomsel_los_type = telkomselLosType;
    keywordCreate.telkomsel_los_operator = telkomselLosOperator;
    keywordCreate.telkomsel_los_value = Number(telkomselLosValue);
    keywordCreate.telkomsel_los_range_min = Number(telkomselLosRangeMin);
    keywordCreate.telkomsel_los_range_max = Number(telkomselLosRangeMax);
    keywordCreate.enable_coorporate = enableCorporate === "1" ? true : false;
    keywordCreate.customer_tier = customerTier;
    keywordCreate.comment_approval = commentApproval;
    // console.log(keywordCreate);
    return;
  }, [
    name,
    startPeriod,
    endPeriod,
    pointType,
    poinValue,
    maxRedeemPermissonMsisdn,
    maxMode,
    maxRedeemCounter,
    enableCorporate,
    channelValidation,
    merchandiseKeyword,
    merchant,
    merchantName,
    telkomselLos,
    telkomselLosType,
    telkomselLosValue,
    telkomselLosOperator,
    telkomselLosRangeMin,
    telkomselLosRangeMax,
    customerTierOption,
    customerTier,
    commentApproval,
    keywordParent,
    keywordCreate,
    poinRedeemed,
    forNewRedeemer,
    smsMasking,
  ]);

  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);
  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="1vw" width="100%">
        <Stack spacing="1vw" px="7vw" pb="3vw">
          <Select
            label="Type"
            placeholder="Option"
            options={keywordTypeOption.data}
            value={keywordType}
            handleChange={setKeywordType}
          />
          <Divider textAlign="left" sx={{ pt: "1.2vw", pb: "0.6vw" }}>
            <Subtitle textTransform="uppercase">General Information</Subtitle>
          </Divider>
          <Select
            label="Keyword Group"
            placeholder="Option"
            options={keywordParentOption.data}
            value={keywordParent}
            optionLabel={"name"}
            handleChange={setKeywordParent}
          />
          <OutlinedTextField
            label="Keyword Name"
            placeholder="Merdeka2000"
            value={name}
            handleChange={(value: string) => setName(value.replace(/\s/g, ""))}
            variant={"outlined"}
          />
          <ResponsiveDateTimePicker
            label="Start Period"
            placeholder="Start Period"
            value={startPeriod}
            handleChange={setStartPeriod}
          />
          <ResponsiveDateTimePicker
            label="End Period"
            placeholder="End Period"
            value={endPeriod}
            handleChange={setEndPeriod}
          />
          <Select
            multiple
            label="Point Type"
            placeholder="Option"
            options={pointTypeOption.data}
            value={pointType}
            handleChange={setPointType}
          />
          <Select
            label="Point Value"
            placeholder="Option"
            options={PointValueOption}
            value={poinValue}
            handleChange={setPoinValue}
          />
          <Select
            label="For New Redeemer"
            placeholder="Option"
            options={BooleanOption}
            value={forNewRedeemer}
            handleChange={setForNewRedeemer}
          />
          <OutlinedTextField
            type={"number"}
            label="POIN Redeemed"
            placeholder="100"
            value={poinRedeemed}
            handleChange={setPoinRedeemed}
            variant={"outlined"}
          />
          <Select
            label="Max Mode"
            placeholder="Option"
            value={maxMode}
            options={MaxModeOption}
            handleChange={setMaxMode}
          />
          <OutlinedTextField
            type={"number"}
            label="Max Redeem Counter"
            placeholder="Max Redeem Counter"
            value={maxRedeemCounter}
            handleChange={setMaxRedeemCounter}
            variant={"outlined"}
          />

          <OutlinedTextField
            type={"number"}
            label="Max Redeem Permisson Msisdn"
            placeholder="Max Redeem Permisson Msisdn"
            value={maxRedeemPermissonMsisdn}
            handleChange={setMaxRedeemPermissonMsisdn}
            variant={"outlined"}
          />
          <Select
            label="Channel Validation"
            placeholder="Option"
            options={BooleanOption}
            value={channelValidation}
            handleChange={setChannelValidation}
          />
          {/* <Select
            multiple
            label="Channel Validation"
            placeholder="Option"
            value={channelValidation}
            options={channelOption.data}
            optionLabel={"name"}
            handleChange={setChannelValidation}
          /> */}
          <Select
            label="Merchandise Keyword"
            placeholder="Option"
            options={BooleanOption}
            value={merchandiseKeyword}
            handleChange={setMerchandiseKeyword}
          />
          <OutlinedTextField
            label="SMS Masking"
            placeholder="SMS Masking"
            value={smsMasking}
            handleChange={setSmsMasking}
            variant={"outlined"}
          />
          <Grid container columns={11}>
            <Grid item xs={4}>
              <BodyCopy>Shift</BodyCopy>
            </Grid>
            <Grid item xs={7}>
              <Stack gap="1vw">
                {keywordCreate.keyword_shift.map((_, idx) => (
                  <Grid
                    key={`keyword_shift__item__${idx}`}
                    container
                    columns={7}
                    spacing="1vw"
                  >
                    <Grid item xs={3}>
                      <ResponsiveTimePicker
                        direction="column"
                        label="From"
                        placeholder="From"
                        value={keywordCreateState.keyword_shift[idx].from}
                        handleChange={(value: any) => {
                          keywordCreate.keyword_shift[idx].from = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <ResponsiveTimePicker
                        direction="column"
                        label="To"
                        placeholder="To"
                        value={keywordCreateState.keyword_shift[idx].to}
                        handleChange={(value: any) => {
                          keywordCreate.keyword_shift[idx].to = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      display="flex"
                      justifyContent="end"
                      alignItems="center"
                      mt="1.3vw"
                    >
                      <IconButton
                        onClick={() => {
                          keywordCreate.keyword_shift.length > 1 &&
                            keywordCreate.keyword_shift.splice(idx, 1);
                          setStateTrigger(!stateTrigger);
                        }}
                        aria-label="delete"
                        size="large"
                        sx={{ color: "primary.main" }}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  onClick={() => {
                    keywordCreate.keyword_shift.push({
                      from: new Date().getTime(),
                      to: new Date().getTime(),
                    });
                    setStateTrigger(!stateTrigger);
                  }}
                  color="primary"
                  startIcon={<AddBoxIcon fontSize="large" />}
                  sx={{
                    paddingInline: "1.5vw",
                    paddingBlock: "0.5vw",
                  }}
                >
                  Add Shift Time
                </Button>
              </Stack>
            </Grid>
          </Grid>

          <Select
            label="Merchant"
            placeholder="Option"
            value={merchant}
            options={merchantManagementOption.data}
            optionLabel={"company_name"}
            handleChange={setMerchant}
          />
          <OutlinedTextField
            label="Merchant Name"
            placeholder="Merchant Name"
            value={merchantName}
            handleChange={setMerchantName}
            variant={"outlined"}
          />

          <Select
            label="Telkomsel Los"
            placeholder="Option"
            options={BooleanOption}
            value={telkomselLos}
            handleChange={setTelkomselLos}
          />
          <Select
            label="Telkomsel Los Type"
            placeholder="Option"
            options={TelkomselLOSTypeOption}
            value={telkomselLosType}
            handleChange={setTelkomselLosType}
          />
          <Select
            label="Telkomsel Los Operator"
            placeholder="Option"
            options={TelkomselLOSOperatorOption}
            value={telkomselLosOperator}
            handleChange={setTelkomselLosOperator}
          />
          <OutlinedTextField
            type={"number"}
            label="Telkomsel Los Value"
            placeholder="Telkomsel Los Value"
            value={telkomselLosValue}
            handleChange={setTelkomselLosValue}
            variant={"outlined"}
          />
          <OutlinedTextField
            type={"number"}
            label="Telkomsel Los Range Min"
            placeholder="Telkomsel Los Range Min"
            value={telkomselLosRangeMin}
            handleChange={setTelkomselLosRangeMin}
            variant={"outlined"}
          />
          <OutlinedTextField
            type={"number"}
            label="Telkomsel Los Range Max"
            placeholder="Telkomsel Los Range Max"
            value={telkomselLosRangeMax}
            handleChange={setTelkomselLosRangeMax}
            variant={"outlined"}
          />
          <Select
            label="Enable Corporate"
            placeholder="Option"
            options={BooleanOption}
            value={enableCorporate}
            handleChange={setEnableCorporate}
          />

          <Select
            multiple
            label="Customer Tier"
            placeholder="Option"
            options={customerTierOption.data}
            value={customerTier}
            optionLabel={"name"}
            handleChange={setCustomerTier}
          />
          <OutlinedTextField
            label="Comment Approval"
            placeholder="Comment Approval"
            value={commentApproval}
            handleChange={setCommentApproval}
            variant={"outlined"}
          />
        </Stack>
        {keywordTypeOption.data.find((item) => item["_id"] === keywordType)
          ?.set_value === "Auction and Racing POIN" && <MainInfoAuction />}
        {keywordTypeOption.data.find((item) => item["_id"] === keywordType)
          ?.set_value === "Redeem Core Product" && <MainInfoCoreProduct />}
        {keywordTypeOption.data.find((item) => item["_id"] === keywordType)
          ?.set_value === "Lucky Draw" && <MainInfoLuckyDraw />}
        {keywordTypeOption.data.find((item) => item["_id"] === keywordType)
          ?.set_value === "Direct Redeem" && <MainInfoDirectRedeem />}
        {keywordTypeOption.data.find((item) => item["_id"] === keywordType)
          ?.set_value === "Free Gift" && <MainInfoDonation />}
      </Stack>
    </Box>
  );
};

export default MainInfo;
