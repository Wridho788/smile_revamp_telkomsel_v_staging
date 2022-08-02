import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { IResponsiveDateTimePickerProps } from "./types";
import { Grid } from "@mui/material";
import { BodyCopy } from "../Typography";

const Index: React.FunctionComponent<IResponsiveDateTimePickerProps> = ({
  label,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <Grid container columns={label ? 10 : 6} alignItems={"center"}>
      <Grid item xs={label ? 4 : 0}>
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={6}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={({ error, ...params }) => (
              <TextField
                label={placeholder}
                error={false}
                size="small"
                sx={{ minWidth: "100%" }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};

export default Index;
