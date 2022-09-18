import { FC, useState } from 'react'
import ModalCustom from "@mui/material/Modal";
import { Box } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { IPicManagemenrModalProps } from "../../../../atomic/components/atoms/Modal/Modal.type";
import { useCreatePicManagementMutation } from '../../../../redux/features/program/program-api-slice';
import { H2 } from "../../../../components";
import { OutlinedTextField } from "../../../atoms";
import Swal from "sweetalert2";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    height: '65vh',
    boxShadow: 24,
    p: 4,
};

const ModalCreatePIC: FC<IPicManagemenrModalProps> = ({ open, handleClose, handleResfresh }) => {
    const [createPicManagement] = useCreatePicManagementMutation();
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
        name: "",
        msisdn: "",
        email: ""
    });

    const handleCreatePicManagement = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        await createPicManagement(formData).then((res: any) => {
            if (res?.data?.statusCode === 201) {
                Swal.fire("Success!", `${res?.data?.message}`, "success");
                handleClose();
                handleResfresh(true);
            } else {
                handleClose();
                Swal.fire('Error!', '', 'error');
            }
        })
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
                <Box px={2} pt={2}>
                    <H2>Create PIC Management</H2>
                </Box>

                <Box pt={5}>
                    <form id="form-pic" onSubmit={handleCreatePicManagement} >
                        <Box pt={2}>
                            <OutlinedTextField
                                label="Name"
                                placeholder="Name"
                                variant={"outlined"}
                                value={formData.name}
                                inputProps={{ minLength: 6 }}
                                handleChange={(value: any) => {
                                    setFormData({ ...formData, name: value });
                                }}
                                required
                            />
                        </Box>

                        <Box pt={2}>
                            <OutlinedTextField
                                label="MSISDN"
                                placeholder="MSISDN"
                                type='number'
                                variant={"outlined"}
                                value={formData.msisdn}
                                inputProps={{ minLength: 8, min: 8 }}
                                handleChange={(value: any) => {
                                    setFormData({ ...formData, msisdn: value });
                                }}
                                required
                            />
                        </Box>

                        <Box pt={2}>
                            <OutlinedTextField
                                label="Email"
                                placeholder="Email"
                                variant={"outlined"}
                                type="email"
                                value={formData.email}
                                inputProps={{ minLength: 8 }}
                                handleChange={(value: any) => {
                                    setFormData({ ...formData, email: value });
                                }}
                                required
                            />
                        </Box>

                        <Box pt={5} style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                            <LoadingButton
                                id="form-pic"
                                type='submit'
                                sx={{ minWidth: "100px", backgroundColor: "#7B61FF" }}
                                className="p-button-success mr-2"
                                variant="contained"
                                loading={loading}
                            >
                                Submit PIC
                            </LoadingButton>
                        </Box>
                    </form>
                </Box>
            </Box>
        </ModalCustom>
    )
}

export default ModalCreatePIC;