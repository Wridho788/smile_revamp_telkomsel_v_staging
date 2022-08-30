import * as React from 'react';
import Switch from '@mui/material/Switch';
import {FC} from "react";
import {ISwitchProps} from "./Switch.type";
import {Box, FormControlLabel} from "@mui/material";
import BodyCopy from "../../../../components/atoms/Typography/BodyCopy";

const SwitchCustom: FC<ISwitchProps> = ({checked, handleChange, label, ...props}) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event.target.checked)
    return (
        <Box px="3vw">
            <FormControlLabel
                value={<BodyCopy>Bulk Data</BodyCopy>}
                control={
                    <Switch {...props}
                            checked={checked}
                            onChange={onChange}
                    />
                }
                label={<BodyCopy>{label}</BodyCopy>}
            />
        </Box>
    );
}
export default SwitchCustom
