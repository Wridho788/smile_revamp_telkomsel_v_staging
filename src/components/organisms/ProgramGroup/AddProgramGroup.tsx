import React, { useState, FC } from 'react'
import { MenuItem, Stack, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useCreateProgramGroupMutation } from "redux/features/lov/lov-api-slice";
import Swal from "sweetalert2";

interface ProgramGroupProps {
    label?: string;
}

const AddProgramGroup: FC<ProgramGroupProps> = ({ label }) => {
    const [createProgramGroup] = useCreateProgramGroupMutation();
    const [name, setName] = useState<string>("");
    const [showInput, setShowInput] = useState<boolean>(false);

    const handleCreateProgramGroup = async () => {
        await createProgramGroup({ group_name: name }).then((res: any) => {
            if (res?.data?.status === 200) {
                Swal.fire("Success!", `${res?.data?.message}`, "success");
            } else {
                Swal.fire('Error!', '', 'error');
            }
        })
    }

    return (
        <MenuItem onClick={() => setShowInput(true)} style={{ borderTop: "1px solid #EEEEEE" }}>
            {showInput ?
                <TextField
                    required={true}
                    value={name}
                    type="text"
                    placeholder="New group"
                    size="small"
                    sx={{ width: "100%" }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value);
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                        if(event.key === "Enter"){
                            handleCreateProgramGroup();
                        }
                    }}
                />
                :
                <Stack direction="row" alignItems="center" spacing={"1vw"} >
                    <Add fontSize="inherit" />
                    <span>Add Group </span>
                </Stack>

            }

        </MenuItem>
    )
}

export default AddProgramGroup