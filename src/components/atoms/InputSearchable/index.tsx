import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Chip, TextField } from "@mui/material";

interface InitialOptions {
  name: string;
}
interface IProps<T> {
  value?: T;
  label: string;
  options: T[];
  onChange: (e: any, newValue: any | null) => void;
  size?: "small" | "medium";
  required?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  onDelete?: (e: any) => void;
}
const InputSearchable = <T extends Pick<InitialOptions, "name">>({
  label,
  value,
  options,
  size = "small",
  required,
  disabled = false,
  multiple = false,
  onDelete,
  onChange,
}: IProps<T>) => {
  return (
    <Autocomplete
      multiple={multiple}
      disabled={disabled}
      autoComplete={false}
      value={value}
      size={size}
      fullWidth
      renderTags={(tagValue, getTagProps) =>
        multiple &&
        tagValue.map((option, index) => (
          <Chip
            label={option.name}
            {...getTagProps({ index })}
            onDelete={(e) => {
              e.preventDefault();
              options.filter((item) => item.name !== option.name);
              onDelete && onDelete(option);
            }}
            onClick={() => console.log("clicked chip")}
          />
        ))
      }
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
