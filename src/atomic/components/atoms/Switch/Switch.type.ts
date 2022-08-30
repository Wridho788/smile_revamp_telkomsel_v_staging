import {SwitchProps} from "@mui/material";

interface ISwitchProps extends SwitchProps{
    checked: boolean
    handleChange: any
    label? : string
    children?: React.ReactNode;
}

export type {
    ISwitchProps
}
