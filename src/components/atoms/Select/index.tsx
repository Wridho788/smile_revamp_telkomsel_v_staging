import {
  FormControl,
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  OutlinedInput,
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
  totalColumn = 10,
  leftColumn = 4,
  rightColumn = 6,
  ...props
}) => {
  const handleChangeValue = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <Grid container columns={totalColumn} alignItems={"center"}>
      <Grid item xs={leftColumn}>
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={rightColumn}>
        <FormControl sx={{ minWidth: "100%" }}>
          <Select
            value={value}
            onChange={handleChangeValue}
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
