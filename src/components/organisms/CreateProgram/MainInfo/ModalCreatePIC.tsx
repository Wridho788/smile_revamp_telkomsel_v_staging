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
    height: '70vh',
    boxShadow: 24,
    p: 4,
};

const ModalCreatePIC: FC<IPicManagemenrModalProps> = ({ open, handleClose, handleResfresh }) => {
    const [createPicManagement] = useCreatePicManagementMutation();
    const [massageError, setMassageError] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<any>({
        name: "",
        msisdn: "",
        email: ""
    });

    const validationForm = () => {
        return formData.name.length >= 6 && formData.msisdn.length >= 8 && formData.email.length >= 8
    }

    const handleCreatePicManagement = async () => {
        setLoading(true);
        if (validationForm()) {
            try {
                await createPicManagement(formData).then((res: any) => {
                    if (res?.data?.statusCode === 201) {
                        Swal.fire("Success!", `${res?.data?.message}`, "success");
                        handleClose();
                        handleResfresh();
                    } else {
                        handleClose();
                        Swal.fire('Error!', `${res?.data?.message[0]}`, 'error');
                    }
                })
            } catch (error) {
                Swal.fire('Error!', `Something went wrong`, 'error');
            }
        } else {
            setMassageError(["name must be longer than or equal to 6 characters", "msisdn must be longer than or equal to 8 characters", "email must be longer than or equal to 8 characters"])
            setLoading(false);
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
                <Box px={2} pt={2}>
                    <H2>Create PIC Management</H2>
                </Box>

                <Box pt={5}>
                    <Box pt={2}>
                        <OutlinedTextField
                            label="Name"
                            placeholder="Name"
                            variant={"outlined"}
                            inputProps={{ min: 6 }}
                            value={formData.name}
                            handleChange={(value: any) => {
                                setFormData({ ...formData, name: value });
                            }}
                            isRequired
                        />
                    </Box>

                    <Box pt={2}>
                        <OutlinedTextField
                            label="MSISDN"
                            placeholder="MSISDN"
                            type='number'
                            variant={"outlined"}
                            value={formData.msisdn}
                            handleChange={(value: any) => {
                                setFormData({ ...formData, msisdn: value });
                            }}
                            isRequired
                        />
                    </Box>

                    <Box pt={2}>
                        <OutlinedTextField
                            label="Email"
                            placeholder="Email"
                            variant={"outlined"}
                            type="email"
                            value={formData.email}
                            handleChange={(value: any) => {
                                setFormData({ ...formData, email: value });
                            }}
                            isRequired
                        />
                    </Box>

                    {massageError &&
                        <Box pt={2}>
                            {massageError.length > 0 && massageError.map((value: string) => <li style={{ color: "red", fontSize: "12px", fontStyle: "italic", marginLeft: "1rem" }}>{value}</li>)}
                        </Box>
                    }

                    <Box pt={2} style={{ width: "100%", display: "flex", justifyContent: "end" }}>
                        <LoadingButton
                            sx={{ minWidth: "100px", backgroundColor: "#7B61FF" }}
                            className="p-button-success mr-2"
                            variant="contained"
                            onClick={handleCreatePicManagement}
                            loading={loading}
                        >
                            Submit PIC
                        </LoadingButton>
                    </Box>

                </Box>
            </Box>
        </ModalCustom>
    )
}

export default ModalCreatePIC;