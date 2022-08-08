import React, { FC } from 'react'
import { ButtonCustom } from "./ButtonApp.style";
import {ButtonAppProps} from "./ButtonApp.type";

const ButtonApp: FC<ButtonAppProps> = ({icon, label, onClick}) => {
    return (
        <ButtonCustom variant="contained" endIcon={icon} onClick={onClick}> {label} </ButtonCustom>
    )
}

export default ButtonApp