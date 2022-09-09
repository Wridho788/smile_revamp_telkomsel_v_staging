import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { IResponsiveDateTimePickerProps } from "./types";
import { Grid } from "@mui/material";
import { BodyCopy } from "../Typography";
import { DateTimePicker } from "@mui/x-date-pickers";

const Index: React.FunctionComponent<IResponsiveDateTimePickerProps> = ({
  label,
  placeholder,
  value,
  handleChange,
  totalColumn = 10,
  leftColumn = 4,
  rightColumn = 6,
  direction = "row",
  isRequired = true,
  minDateTime,
  disabled = false,
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
          <DateTimePicker
            value={value}
            onChange={(newValue) => {
              handleChange(newValue);
            }}
            minDateTime={minDateTime}
            disabled={disabled}
            renderInput={({ error, ...params }) => (
              <TextField
                aria-readonly={true}
                required={isRequired}
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
