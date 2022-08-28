import { Box, Stack } from "@mui/material";
import * as React from "react";
import { MainInfoAuction } from "..";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
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
import { useChannelListQuery } from "../../../../redux/features/channel/channel-api-slice";

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
  // const [keywordType, setKeywordType] = useState(keywordCreate.keyword_type);
  const [name, setName] = React.useState<string>(keywordCreate.name);
  const [startPeriod, setStartPeriod] = React.useState(
    keywordCreate.start_period
  );
  const [endPeriod, setEndPeriod] = React.useState(keywordCreate.end_period);
  const [forNewRedeemer, setForNewRedeemer] = React.useState(
    keywordCreate.for_new_redeemer === true ? "1" : "2"
  );
  const [pointType, setPointType] = React.useState<[]>(
    keywordCreate.point_type
  );
  const [pointValue, setPointValue] = React.useState<string>(
    keywordCreate.point_value
  );
  const [maxRedeemPermissonMsisdn, setMaxRedeemPermissonMsisdn] =
    React.useState<number>(keywordCreate.max_redeem_per_msisdn);
  const [maxMode, setMaxMode] = React.useState<string>(keywordCreate.max_mode);
  const [maxRedeemCounter, setMaxRedeemCounter] = React.useState<number>(
    keywordCreate.max_redeem_counter
  );
  const [channelValidation, setChannelValidation] = useState<[]>(
    keywordCreate.channel_validation
  );
  const [merchandiseKeyword, setMerchandiseKeyword] = useState(
    keywordCreate.merchandise_keyword === true ? "1" : "2"
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
    // keywordCreate.keyword_type = keywordType
    keywordCreate.name = name;
    keywordCreate.start_period = startPeriod;
    keywordCreate.end_period = endPeriod;
    keywordCreate.point_type = pointType;
    keywordCreate.point_value = pointValue;
    keywordCreate.for_new_redeemer = forNewRedeemer === "1" ? true : false;
    keywordCreate.max_mode = maxMode;
    keywordCreate.max_redeem_counter = Number(maxRedeemCounter);
    keywordCreate.max_redeem_per_msisdn = Number(maxRedeemPermissonMsisdn);
    keywordCreate.channel_validation = channelValidation;
    keywordCreate.merchandise_keyword =
      merchandiseKeyword === "1" ? true : false;
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
    keywordCreate.keyword_parent = keywordParent;
    console.log(keywordCreate);
    return;
  }, [
    name,
    startPeriod,
    endPeriod,
    pointType,
    pointValue,
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
    forNewRedeemer,
    keywordCreate,
  ]);
  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing={"1vw"} width={"100%"}>
        <Box px="7vw">
          {/* <Select
            label="Type"
            placeholder="Option"
            options={keywordTypeOption.data}
            value={keywordType}
            handleChange={setKeywordType}
          /> */}
        </Box>
        <Stack spacing={"1vw"} px="7vw" pb="3vw">
          <OutlinedTextField
            label="Name"
            placeholder="Name"
            value={name}
            handleChange={setName}
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
            value={pointValue}
            handleChange={setPointValue}
          />
          <Select
            label="For New Redeemer"
            placeholder="Option"
            options={BooleanOption}
            value={forNewRedeemer}
            handleChange={setForNewRedeemer}
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
            multiple
            label="Channel Validation"
            placeholder="Option"
            value={channelValidation}
            options={channelOption.data}
            optionLabel={"name"}
            handleChange={setChannelValidation}
          />
          <Select
            label="Merchandise Keyword"
            placeholder="Option"
            options={BooleanOption}
            value={merchandiseKeyword}
            handleChange={setMerchandiseKeyword}
          />
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
          <Select
            label="Keyword Parent"
            placeholder="Option"
            options={keywordParentOption.data}
            value={keywordParent}
            optionLabel={"name"}
            handleChange={setKeywordParent}
          />
        </Stack>
        {/*{type === "Auction" && <MainInfoAuction/>}*/}
      </Stack>
    </Box>
  );
};

export default MainInfo;
