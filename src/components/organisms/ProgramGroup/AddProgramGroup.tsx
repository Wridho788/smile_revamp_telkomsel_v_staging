import React, { useState, FC } from 'react'
import { MenuItem, Stack, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCreateProgramGroupMutation } from "redux/features/lov/lov-api-slice";
import Swal from "sweetalert2";
import ModalAddProgramGroup from './ModalAddProgramGroup';
interface ProgramGroupProps {
    handleShow?: any;
}

const AddProgramGroup: FC<ProgramGroupProps> = ({ handleShow }) => {
    return (
        <MenuItem onClick={handleShow} style={{ borderTop: "1px solid #EEEEEE" }}>
            <Stack direction="row" alignItems="center" spacing={"1vw"} >
                <Add fontSize="inherit" />
                <span>Add Group </span>
            </Stack>

        </MenuItem>
    )
}

export default AddProgramGroup