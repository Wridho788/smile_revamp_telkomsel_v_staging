import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { IOutlinedTextFieldProps } from "./types";

const Index: React.FunctionComponent<IOutlinedTextFieldProps> = ({
  label,
  placeholder,
  value,
  handleChange,
  totalColumn = 11,
  leftColumn = 4,
  rightColumn = 7,
  direction = "row",
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
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={rightColumn} mt={direction === "column" ? "0.3vw" : 0}>
        <TextField
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(event.target.value);
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
