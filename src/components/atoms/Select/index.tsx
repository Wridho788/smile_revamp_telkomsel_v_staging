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

interface IIndexProps {
  label?: string;
  placeholder?: string;
  options?: [];
  setReturnedValue?: any;
}

const Index: React.FunctionComponent<IIndexProps> = ({
  label,
  placeholder,
  options,
  setReturnedValue,
}) => {
  const [value, setValue] = React.useState("");

  const handleChangeValue = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    setReturnedValue(event.target.value);
  };

  return (
    <Grid container columns={10} alignItems={"center"}>
      <Grid item xs={4}>
        <BodyCopy>{label}</BodyCopy>
      </Grid>
      <Grid item xs={6}>
        <FormControl sx={{ minWidth: "100%" }}>
          <Select
            multiple
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
            }}
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
