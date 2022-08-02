import { Grid, TextField } from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { IOutlinedTextFieldProps } from "./types";

const Index: React.FunctionComponent<IOutlinedTextFieldProps> = ({
  label,
  placeholder,
  returnedValue,
  setReturnedValue,
}) => {
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReturnedValue(event.target.value);
  };
  return (
    <Grid container columns={10} alignItems={"center"}>
      <Grid item xs={4}>
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          value={returnedValue}
          onChange={handleChangeValue}
          placeholder={placeholder}
          variant={"outlined"}
          size="small"
          sx={{ width: "100%" }}
        />
      </Grid>
    </Grid>
  );
};

export default Index;
