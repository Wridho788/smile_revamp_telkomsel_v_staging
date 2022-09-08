import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IResponsiveDatePickerProps } from "./types";
import { Grid } from "@mui/material";
import { BodyCopy } from "../Typography";
import { DatePicker } from "@mui/x-date-pickers";

const Index: React.FunctionComponent<IResponsiveDatePickerProps> = ({
  label,
  placeholder,
  value,
  handleChange,
  totalColumn = 10,
  leftColumn = 4,
  rightColumn = 6,
  direction = "row",
  isRequired = true,
  minDate,
}) => {
  const onKeyDown = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value}
            onChange={(newValue) => {
              handleChange(newValue);
            }}
            minDate={minDate}
            renderInput={({ error, ...params }) => (
              <TextField
                label={placeholder}
                error={false}
                size="small"
                sx={{ minWidth: "100%" }}
                onKeyDown={onKeyDown}
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
