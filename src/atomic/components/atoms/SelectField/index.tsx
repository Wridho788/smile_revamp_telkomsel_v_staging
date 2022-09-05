import React, { FC } from "react";
import { SelectFieldCustom } from "./SelectField.style";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { SelectFieldProps } from "./SelectField.type";

const SelectField: FC<SelectFieldProps> = ({ label, data, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel color="primary" id="demo-simple-select-label">
        {label}
      </InputLabel>
      <SelectFieldCustom onChange={onChange} color="primary" label={label}>
        {data &&
          data.map((item: any, idx: number) => {
            return (
              <MenuItem key={`data__item__${idx}`} value={item.id ?? item._id}>
                {item.value ?? item.set_value ?? "-"}
              </MenuItem>
            );
          })}
      </SelectFieldCustom>
    </FormControl>
  );
};

export default SelectField;
