import React, {FC, useState} from 'react'
import Box from '@mui/material/Box';
import ModalCustom from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {ModalProps} from "./Modal.type";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,

    p: 4,
};

const Modal: FC<ModalProps> = ({open, handleClose, title, description}) => {
    return (
        <ModalCustom
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{mt: 2}}>
                    {description}
                </Typography>
            </Box>
        </ModalCustom>
    );
}
export default Modal
