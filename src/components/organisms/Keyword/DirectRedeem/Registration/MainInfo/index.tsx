import { Box, Divider, Grid, Stack, Switch } from "@mui/material";
import * as React from "react";
import {
  BodyCopy,
  H2,
  OutlinedTextField,
  ResponsiveDateTimePicker,
} from "../../../../../atoms";
import { IMainInfoProps } from "./type";

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const [openTimeSaturday, setOpenTimeSaturday] = React.useState("");
  const [openTimeSunday, setOpenTimeSunday] = React.useState("");
  const [holidayOpenTime, setHolidayOpenTime] = React.useState("");
  const [msisdnPic, setMsisdnPic] = React.useState("");

  return (
    <Box pt="2vw">
      <Divider textAlign="left">
        <H2 textTransform="uppercase">
          direct redeem specific main info configuration
        </H2>
      </Divider>
      <Grid container columns={9} columnSpacing="3vw" pt="3vw">
        <Grid item xs={4}>
          <Stack alignItems="center" spacing="1.5vw">
            <ResponsiveDateTimePicker
              direction="column"
              label="Open Time Saturday"
              placeholder="Open Time Saturday"
              value={openTimeSaturday}
              handleChange={setOpenTimeSaturday}
            />
            <ResponsiveDateTimePicker
              direction="column"
              label="Open Time Sunday"
              placeholder="Open Time Sunday"
              value={openTimeSunday}
              handleChange={setOpenTimeSunday}
            />
            <ResponsiveDateTimePicker
              direction="column"
              label="Holiday Open Time"
              placeholder="Holiday Open Time"
              value={holidayOpenTime}
              handleChange={setHolidayOpenTime}
            />
          </Stack>
        </Grid>
        <Grid item xs={5}>
          <OutlinedTextField
            direction="column"
            label="MSISDN PIC"
            placeholder="MSISDN PIC"
            variant={"outlined"}
            value={msisdnPic}
            handleChange={setMsisdnPic}
          />
          <Stack direction="row" alignItems="center" mt="1.5vw">
            <Switch {...label} defaultChecked />
            <BodyCopy>Activate Keyword</BodyCopy>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainInfo;
