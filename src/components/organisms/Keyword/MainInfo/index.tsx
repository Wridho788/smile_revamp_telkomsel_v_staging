import { Box, Stack } from "@mui/material";
import * as React from "react";
import { MainInfoAuction } from "..";
import {
  keywordTypeOptions,
  options,
  optionsObj,
} from "../../../../mocks/options";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
} from "../../../atoms";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [type, setType] = React.useState<string>("General");
  const [name, setName] = React.useState<string>("");
  const [startPeriod, setStartPeriod] = React.useState<string>("");
  const [endPeriod, setEndPeriod] = React.useState<string>("");
  const [maxRedeemPermisson, setMaxRedeemPermisson] =
    React.useState<string>("");
  const [maxRedeemPermissonType, setMaxRedeemPermissonType] =
    React.useState<string>("");
  const [maxRedeemPermissonFrom, setMaxRedeemPermissonFrom] =
    React.useState<string>("");
  const [maxRedeemPermissonTo, setMaxRedeemPermissonTo] =
    React.useState<string>("");
  const [enableCorporate, setEnableCorporate] = React.useState<string>("");
  const [customerTier, setCustomerTier] = React.useState<string>("");
  const [pointType, setPointType] = React.useState<string>("");
  const [commentApproval, setCommentApproval] = React.useState<string>("");
  const [parent, setParent] = React.useState<string>("");

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing={"1vw"} width={"100%"}>
        <Box px="7vw">
          <Select
            label="Type"
            placeholder="Option"
            options={keywordTypeOptions}
            value={type}
            handleChange={setType}
          />
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
          <OutlinedTextField
            label="Max Redeem Permisson"
            placeholder="Max Redeem Permisson"
            value={maxRedeemPermisson}
            handleChange={setMaxRedeemPermisson}
            variant={"outlined"}
          />
          <OutlinedTextField
            label="Max Redeem Permisson Type"
            placeholder="Max Redeem Permisson Type"
            value={maxRedeemPermissonType}
            handleChange={setMaxRedeemPermissonType}
            variant={"outlined"}
          />
          <ResponsiveDateTimePicker
            label="Max Redeem Permisson From"
            placeholder="Max Redeem Permisson From"
            value={maxRedeemPermissonFrom}
            handleChange={setMaxRedeemPermissonFrom}
          />
          <ResponsiveDateTimePicker
            label="Max Redeem Permisson To"
            placeholder="Max Redeem Permisson To"
            value={maxRedeemPermissonTo}
            handleChange={setMaxRedeemPermissonTo}
          />
          <Select
            label="Enable Corporate"
            placeholder="Option"
            options={optionsObj}
            value={enableCorporate}
            handleChange={setEnableCorporate}
          />
          <Select
            label="Customer Tier"
            placeholder="Option"
            options={optionsObj}
            value={customerTier}
            handleChange={setCustomerTier}
          />
          <Select
            label="Point Type"
            placeholder="Option"
            options={optionsObj}
            value={pointType}
            handleChange={setPointType}
          />
          <OutlinedTextField
            label="Comment Approval"
            placeholder="Comment Approval"
            value={commentApproval}
            handleChange={setCommentApproval}
            variant={"outlined"}
            multiline
            rows={4}
          />
          <Select
            label="Parent"
            placeholder="Option"
            options={optionsObj}
            value={parent}
            handleChange={setParent}
          />
        </Stack>
        {type === "Auction" ? <MainInfoAuction /> : <></>}
      </Stack>
    </Box>
  );
};

export default MainInfo;
