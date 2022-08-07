import React, { FC } from 'react'
import {TextFieldCustom} from "./TextField.style";
import {TextFieldProps} from "./TextField.type";

const TextFieldApp: FC<TextFieldProps> = ({label}) => {
    return (
        <TextFieldCustom color="primary" fullWidth id="outlined-basic" label={label} variant="outlined" />
    )
}
export default TextFieldApp