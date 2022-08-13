import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IResponsiveDateTimePickerProps } from "./types";
import { Grid } from "@mui/material";
import { BodyCopy } from "../Typography";
import { DatePicker } from "@mui/x-date-pickers";

const Index: React.FunctionComponent<IResponsiveDateTimePickerProps> = ({
  label,
  placeholder,
  value,
  handleChange,
  totalColumn = 11,
  leftColumn = 4,
  rightColumn = 7,
  direction = "row",
}) => {
  return (
    <Grid
      container
      columns={!label || direction === "column" ? rightColumn : totalColumn}
      alignItems={"center"}
    >
      <Grid
        item
        xs={!label ? 0 : direction === "column" ? rightColumn : leftColumn}
      >
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={rightColumn} mt={direction === "column" ? "0.3vw" : 0}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              handleChange(newValue);
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
