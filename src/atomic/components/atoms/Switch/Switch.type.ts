import {SwitchProps} from "@mui/material";

interface ISwitchProps extends SwitchProps{
    checked: boolean
    handleChange: any
    children?: React.ReactNode;
}

export type {
    ISwitchProps
}
