import React, {FC, useState} from 'react'
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {FormControl, TextField} from "@mui/material";
import {DatePickerProps} from './Datepicker.type'

const Datepicker: FC<DatePickerProps> = ({label, setExternalValue}) => {
    const [value, setValue] = useState()
    return (
        <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={label}
                    value={value}
                    onChange={(newValue:any) => {
                        setValue(newValue);
                        setExternalValue(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
        </FormControl>
    )
}

export default Datepicker
