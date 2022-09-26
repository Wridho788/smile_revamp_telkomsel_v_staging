import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

interface InitialOptions {
  name: string;
}
interface IProps<T> {
  value?: T;
  label: string;
  options: T[];
  onChange: (e: any, newValue: T | null) => void;
  size?: "small" | "medium";
  required?: boolean;
  disabled?: boolean;
}
const InputSearchable = <T extends Pick<InitialOptions, "name">>({
  label,
  value,
  options,
  size = "small",
  required,
  disabled = false,
  onChange,
}: IProps<T>) => {
  return (
    <Autocomplete
      disabled={disabled}
      autoComplete={false}
      value={value}
      size={size}
      fullWidth
      onChange={onChange}
      id="controllable-states-demo"
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label={label} required={required} />
      )}
    />
  );
};
export default InputSearchable;
