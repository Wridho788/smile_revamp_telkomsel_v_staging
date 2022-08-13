import { Box, Divider, Grid, Switch } from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { IBasicFormCardWithRightSwitchProps } from "./type";

const label = { inputProps: { "aria-label": "Switch demo" } };

const BasicFormCardWithRightSwitch: React.FunctionComponent<
  IBasicFormCardWithRightSwitchProps
> = ({ title, children, ...props }) => {
  return (
    <Box border="0.15vw solid rgba(0, 0, 0, 0.1)" {...props}>
      <Grid container columns={10} py="0.5vw" px="1vw">
        <Grid item xs={2}></Grid>
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          item
          xs={6}
        >
          <BodyCopy textTransform="uppercase">{title}</BodyCopy>
        </Grid>
        <Grid item xs={2}>
          <Switch {...label} defaultChecked />
        </Grid>
      </Grid>
      <Divider />
      <Box p="1vw">{children}</Box>
    </Box>
  );
};

export default BasicFormCardWithRightSwitch;
