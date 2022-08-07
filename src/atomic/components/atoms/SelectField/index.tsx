import React, { FC } from 'react'
import { SelectFieldCustom } from "./SelectField.style";
import {FormControl, InputLabel, MenuItem} from "@mui/material";
import {SelectFieldProps} from "./SelectField.type";

const SelectField: FC<SelectFieldProps> = ({label,data, onChange}) => {
    return (
        <FormControl fullWidth>
            <InputLabel color="primary" id="demo-simple-select-label">{label}</InputLabel>
            <SelectFieldCustom onChange={onChange} color="primary" label={label}>
                {data && data.map((item:any) => {
                    return (
                        <MenuItem value={item.id}>{item.value}</MenuItem>
                    )
                })}
            </SelectFieldCustom>
        </FormControl>
    )
}

export default SelectField