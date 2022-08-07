import React, { FC } from 'react'
import { ButtonCustom } from "./ButtonApp.style";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ButtonApp: FC = () => {
    return (
        <ButtonCustom variant="contained" endIcon={<ArrowForwardIcon />}> Next </ButtonCustom>
    )
}

export default ButtonApp