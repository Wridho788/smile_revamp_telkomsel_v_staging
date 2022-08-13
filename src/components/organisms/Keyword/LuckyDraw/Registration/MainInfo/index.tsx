import { Box, Button, Divider, Grid, Stack, Switch } from "@mui/material";
import * as React from "react";
import { optionsObj } from "../../../../../../mocks/options";
import {
  BodyCopy,
  H2,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  Select,
} from "../../../../../atoms";
import BasicFormCard from "../../../../../atoms/BasicFormCard";
import BasicFormCardWithRightSwitch from "../../../../../atoms/BasicFormCardWithRightSwitch";
import { IMainInfoProps } from "./type";
import AddIcon from "@mui/icons-material/Add";

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [bulkNotification, setBulkNotification] = React.useState("");
  const [bulkSuccessNotification, setBulkSuccessNotification] =
    React.useState("");
  const [checkCoupon, setCheckCoupon] = React.useState("");
  const [checkWinner, setCheckWinner] = React.useState("");
  const [checkKeywordInfo, setCheckKeywordInfo] = React.useState("");
  const [enableInjectKeyword, setEnableInjectKeyword] = React.useState("");
  const [couponStartPeriod, setCouponStartPeriod] = React.useState("");
  const [couponEndPeriod, setCouponEndPeriod] = React.useState("");
  const [minBiddingPoin, setMinBiddingPoin] = React.useState("");
  const [multipliePoin, setMultipliePoin] = React.useState("");
  const [winnerPhase, setWinnerPhase] = React.useState("");
  const [maxWinnerInAPhase, setMaxWinnerInAPhase] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [prizeName, setPrizeName] = React.useState("");
  const [prizeDescription, setPrizeDescription] = React.useState("");

  return (
    <Box pt="2vw">
      <Divider textAlign="left">
        <H2 textTransform="uppercase">
          lucky draw specific main info configuration
        </H2>
      </Divider>
      <Grid container columns={9} columnSpacing="3vw" pt="3vw">
        <Grid item xs={4}>
          <BasicFormCard title="notification configuration">
            <Stack direction="column" spacing="1vw">
              <Select
                direction="column"
                label="Bulk Notification"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={bulkNotification}
                handleChange={setBulkNotification}
              />
              <Select
                direction="column"
                label="Bulk Success Notification"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={bulkSuccessNotification}
                handleChange={setBulkSuccessNotification}
              />
              <Select
                direction="column"
                label="Check Coupon"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={checkCoupon}
                handleChange={setCheckCoupon}
              />
              <Select
                direction="column"
                label="Check Winner"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={checkWinner}
                handleChange={setCheckWinner}
              />
              <Select
                direction="column"
                label="Check Keyword Info"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={checkKeywordInfo}
                handleChange={setCheckKeywordInfo}
              />
              <Select
                direction="column"
                label="Enable Inject Keyword"
                placeholder="Option"
                options={optionsObj}
                optionLabel="set_value"
                value={enableInjectKeyword}
                handleChange={setEnableInjectKeyword}
              />
            </Stack>
          </BasicFormCard>
        </Grid>
        <Grid item xs={5}>
          <Stack direction="row" alignItems="center" spacing="1.5vw" mt="1vw">
            <Stack direction="row" alignItems="center">
              <Switch {...label} defaultChecked />
              <BodyCopy>Activate Keyword</BodyCopy>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Switch {...label} defaultChecked />
              <BodyCopy>Regular</BodyCopy>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" spacing="1.5vw" mt="1.5vw">
            <ResponsiveDateTimePicker
              direction="column"
              label="Coupon Start Period"
              placeholder="Coupon Start Period"
              value={couponStartPeriod}
              handleChange={setCouponStartPeriod}
            />
            <ResponsiveDateTimePicker
              direction="column"
              label="Coupon End Period"
              placeholder="Coupon End Period"
              value={couponEndPeriod}
              handleChange={setCouponEndPeriod}
            />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainInfo;
