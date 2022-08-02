import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { IOutlinedTextFieldProps } from "./types";

const Index: React.FunctionComponent<IOutlinedTextFieldProps> = ({
  label,
  placeholder,
  value,
  setValue,
  totalColumn = 10,
  leftColumn = 4,
  rightColumn = 6,
  ...props
}) => {
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <Grid
      container
      columns={label ? totalColumn : rightColumn}
      alignItems={"center"}
    >
      <Grid item xs={label ? leftColumn : 0}>
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={rightColumn}>
        <TextField
          value={value}
          onChange={handleChangeValue}
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
