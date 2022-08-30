import * as React from 'react';
import Switch from '@mui/material/Switch';
import {FC} from "react";
import {ISwitchProps} from "./Switch.type";

const SwitchCustom: FC<ISwitchProps> = ({checked, handleChange, ...props}) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => handleChange(event.target.checked)
    return (
        <Switch {...props}
            checked={checked}
            onChange={onChange}
            inputProps={{'aria-label': 'controlled'}}
        />
    );
}
export default SwitchCustom
