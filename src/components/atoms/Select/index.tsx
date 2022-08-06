import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
  Grid,
} from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { ISelectProps } from "./types";

const Index: React.FunctionComponent<ISelectProps> = ({
  label,
  placeholder,
  options,
  value,
  setValue,
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
      alignItems={"center"}
    >
      <Grid
        item
        xs={!label ? 0 : direction === "column" ? rightColumn : leftColumn}
      >
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={rightColumn} mt={direction === "column" ? "1vw" : 0}>
        <FormControl sx={{ minWidth: "100%" }}>
          <Select
            value={value}
            onChange={(event: SelectChangeEvent) => {
              setValue(event.target.value);
            }}
            displayEmpty
            size="small"
            input={<OutlinedInput />}
            inputProps={{ "aria-label": "Without label" }}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <>{placeholder}</>;
              }
              return selected;
            }}
            {...props}
          >
            <MenuItem disabled value="">
              {placeholder}
            </MenuItem>
            {typeof options !== "undefined" &&
              options.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Index;
