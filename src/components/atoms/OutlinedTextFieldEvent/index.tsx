import { Box, Grid, TextField } from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { IOutlinedTextFieldEventProps } from "./types";

const Index: React.FunctionComponent<IOutlinedTextFieldEventProps> = ({
  label,
  placeholder,
  value,
  handleChange,
  totalColumn = 11,
  leftColumn = 4,
  rightColumn = 7,
  direction = "row",
  isRequired = false,
  ...props
}) => {
  return (
    <Grid
      container
      columns={!label || direction === "column" ? rightColumn : totalColumn}
    >
      <Grid
        item
        xs={!label ? 0 : direction === "column" ? rightColumn : leftColumn}
        pt={0.8}
      >
        <Grid container>
          <Grid>
            <BodyCopy>{label}</BodyCopy>
          </Grid>
          {isRequired && (
            <Grid>
              <BodyCopy color={"red"} sx={{ marginLeft: "5px" }}>
                *
              </BodyCopy>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={rightColumn} mt={direction === "column" ? "0.3vw" : 0}>
        <TextField
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event);
          }}
          placeholder={placeholder}
          size="small"
          sx={{ width: "100%" }}
          {...props}
        />
      </Grid>
    </Grid>
  );
};

export default Index;
