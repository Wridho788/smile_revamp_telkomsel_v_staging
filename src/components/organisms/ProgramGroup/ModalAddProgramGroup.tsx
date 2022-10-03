import { FC, useState } from 'react'
import ModalCustom from "@mui/material/Modal";
import { Box, TextField } from "@mui/material";
import { H2 } from "../../../components";
import Swal from "sweetalert2";
import LoadingButton from '@mui/lab/LoadingButton';
import { useCreateProgramGroupMutation } from "redux/features/lov/lov-api-slice";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    height: '40vh',
    boxShadow: 24,
    p: 4,
};

interface ModalAddProgramProps {
    open: any;
    handleClose?: any;
    handleRefetch?: any;
    handleChange?: any;
}

const ModalAddProgramGroup: FC<ModalAddProgramProps> = ({ open, handleClose, handleRefetch, handleChange }) => {
    const [createProgramGroup] = useCreateProgramGroupMutation();
    const [name, setName] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateProgramGroup = async () => {
        if(name !== ""){
            setLoading(true);
            await createProgramGroup({ group_name: name }).then((res: any) => {
                if (res?.data?.status === 200) {
                    handleRefetch();
                    handleClose()
                    Swal.fire("Success!", `${res?.data?.message}`, "success");
                    handleChange(res?.data?.payload?._id);
                } else {
                    Swal.fire('Error!', '', 'error');
                }
            })
        }else{
            setErrorMsg("Please fill out this field!")
        }
        
    }

    return (
        <ModalCustom
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Box pt={1}>
                    <H2>Add Program Group</H2>
                </Box>

                <Box pt={2}>
                    <TextField
                        id='program_group'
                        name='program_group'
                        value={name}
                        type="text"
                        placeholder="Input New group"
                        size="small"
                        sx={{ width: "100%" }}
                        onChange={(event: any) => setName(event.target.value)}
                    />

                    {errorMsg !== "" && <div style={{paddingTop: "5px", color: "red", fontStyle: "italic", fontSize: "0.75rem"}}>{errorMsg}</div>}
                </Box>

                <Box pt={5} style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                    <LoadingButton
                        id="form-pic"
                        type='submit'
                        sx={{ minWidth: "100px", backgroundColor: "#7B61FF" }}
                        className="p-button-success mr-2"
                        variant="contained"
                        loading={loading}
                        onClick={handleCreateProgramGroup}
                    >
                        Submit Group
                    </LoadingButton>
                </Box>
            </Box>
        </ModalCustom>
    )
}

export default ModalAddProgramGroup;