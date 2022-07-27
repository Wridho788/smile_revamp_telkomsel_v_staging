import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function ResponsiveDateTimePickers(props: any) {
  const { dateTimeValue, setDateTimeValue } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        value={dateTimeValue}
        onChange={(newValue) => {
          setDateTimeValue(newValue);
        }}
        renderInput={(params) => <TextField size="small" {...params} />}
      />
    </LocalizationProvider>
  );
}
