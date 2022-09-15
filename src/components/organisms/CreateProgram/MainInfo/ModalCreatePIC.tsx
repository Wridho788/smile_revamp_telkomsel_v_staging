import { FC, useState } from 'react'
import ModalCustom from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import { ModalProps } from "../../../../atomic/components/atoms/Modal/Modal.type";
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

const ModalCreatePIC: FC<ModalProps> = ({ open, handleClose }) => {
    const [createPicManagement] = useCreatePicManagementMutation();
    const [formData, setFormData] = useState<any>({
        name: "",
        msisdn: "",
        email: ""
    });

    const handleCreatePicManagement = async () => {
        try {
            await createPicManagement(formData).then((res: any) => {
                if (res?.data?.statusCode === 201) {
                    Swal.fire("Success!", `${res?.data?.message}`, "success");
                    handleClose();
                } else {
                    handleClose();
                    Swal.fire('Error!',`${res?.data?.message}`,'error');
                }
            })
        } catch (error) {
            Swal.fire('Error!',`Something went wrong`,'error');
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
                            value={formData.name}
                            handleChange={(value: any) => {
                                setFormData({ ...formData, name: value });
                            }}
                        />
                    </Box>

                    <Box pt={2}>
                        <OutlinedTextField
                            label="MSISDN"
                            placeholder="MSISDN"
                            variant={"outlined"}
                            value={formData.msisdn}
                            handleChange={(value: any) => {
                                setFormData({ ...formData, msisdn: value });
                            }}
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
                        />
                    </Box>

                    <div style={{ paddingTop: "3rem", width: "100%", display: "flex", justifyContent: "end" }}>
                        <Button
                            sx={{ minWidth: "100px", backgroundColor: "#7B61FF" }}
                            className="p-button-success mr-2"
                            variant="contained"
                            onClick={handleCreatePicManagement}
                        >
                            Submit PIC
                        </Button>
                    </div>

                </Box>
            </Box>
        </ModalCustom>
    )
}

export default ModalCreatePIC;