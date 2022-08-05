import { Box, Stack } from "@mui/material";
import * as React from "react";
import { options } from "../../../../mocks/options";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
} from "../../../atoms";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [type, setType] = React.useState<string>("");
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
    <Box border="0.1vw solid rgba(0, 0, 0, 0.1)" borderRadius="0.3vw" p="3vw">
      <Stack spacing={"1vw"} maxWidth={"50%"}>
        <Select
          label="Type"
          placeholder="Option"
          options={options}
          value={type}
          setValue={setType}
        />
        <OutlinedTextField
          label="Name"
          placeholder="Name"
          value={name}
          setValue={setName}
          variant={"outlined"}
        />
        <ResponsiveDateTimePicker
          label="Start Period"
          placeholder="Start Period"
          value={startPeriod}
          setValue={setStartPeriod}
        />
        <ResponsiveDateTimePicker
          label="End Period"
          placeholder="End Period"
          value={endPeriod}
          setValue={setEndPeriod}
        />
        <OutlinedTextField
          label="Max Redeem Permisson"
          placeholder="Max Redeem Permisson"
          value={maxRedeemPermisson}
          setValue={setMaxRedeemPermisson}
          variant={"outlined"}
        />
        <OutlinedTextField
          label="Max Redeem Permisson Type"
          placeholder="Max Redeem Permisson Type"
          value={maxRedeemPermissonType}
          setValue={setMaxRedeemPermissonType}
          variant={"outlined"}
        />
        <ResponsiveDateTimePicker
          label="Max Redeem Permisson From"
          placeholder="Max Redeem Permisson From"
          value={maxRedeemPermissonFrom}
          setValue={setMaxRedeemPermissonFrom}
        />
        <ResponsiveDateTimePicker
          label="Max Redeem Permisson To"
          placeholder="Max Redeem Permisson To"
          value={maxRedeemPermissonTo}
          setValue={setMaxRedeemPermissonTo}
        />
        <Select
          label="Enable Corporate"
          placeholder="Option"
          options={options}
          value={enableCorporate}
          setValue={setEnableCorporate}
        />
        <Select
          label="Customer Tier"
          placeholder="Option"
          options={options}
          value={customerTier}
          setValue={setCustomerTier}
        />
        <Select
          label="Point Type"
          placeholder="Option"
          options={options}
          value={pointType}
          setValue={setPointType}
        />
        <OutlinedTextField
          label="Comment Approval"
          placeholder="Comment Approval"
          value={commentApproval}
          setValue={setCommentApproval}
          variant={"outlined"}
          multiline
          rows={4}
        />
        <Select
          label="Parent"
          placeholder="Option"
          options={options}
          value={parent}
          setValue={setParent}
        />
      </Stack>
    </Box>
  );
};

export default MainInfo;
