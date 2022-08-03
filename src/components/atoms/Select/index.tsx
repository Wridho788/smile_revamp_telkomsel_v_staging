import {
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    OutlinedInput,
} from "@mui/material";
import * as React from "react";

interface IIndexProps {
    placeholder?: string;
    options?: string[];
    returnedValue?: any;
    setReturnedValue?: any;
    minWidth?:string
}

const Index: React.FunctionComponent<IIndexProps> = ({
                                                         placeholder,
                                                         options,
                                                         returnedValue,
                                                         setReturnedValue,
                                                         minWidth = "100%"
                                                     }) => {

    const handleChangeValue = (event: SelectChangeEvent) => {
        setReturnedValue(event.target.value);
    };
    return (
        <FormControl sx={{minWidth: minWidth }}>
            <Select
                value={returnedValue}
                onChange={handleChangeValue}
                displayEmpty
                size="small"
                input={<OutlinedInput/>}
                inputProps={{"aria-label": "Without label"}}
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <>{placeholder}</>;
                    }
                    return selected;
                }}>
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
    );
};

export default Index;
