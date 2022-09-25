import { FC } from 'react';
import ModalCustom from "@mui/material/Modal";
import { Grid, Stack, Box, Typography } from "@mui/material";
import { H2 } from "components";

interface ModalProps {
    open: any;
    handleClose?: any;
    data?:any;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "45vw",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const fontContent = {
    fontSize: 12,
    overflowWrap: "break-word",
};

const UserDetail: FC<ModalProps> = ({ open, handleClose, data }) => {
    const {username, firstname, lastname, job_level, role_detail, account_location, identification } = data;
    return (
        <ModalCustom
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{ overflow: "scroll" }}
        >
            <Box
                sx={style}
                minWidth={"30vw"}
                maxHeight={"90vh"}
            >
                <Box px={2}>
                    <H2>{"User Detail"}</H2>
                    <Stack direction="column" mt={1}>
                        <Grid container columnSpacing={2} rowSpacing={2}>
                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>Username</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {username}
                                </Typography>
                            </Grid>
                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>Level</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {job_level}
                                </Typography>
                            </Grid>

                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>First Name</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {firstname}
                                </Typography>
                            </Grid>

                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>Last Name</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {lastname}
                                </Typography>
                            </Grid>

                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>Role Name</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {role_detail?.name}
                                </Typography>
                            </Grid>

                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>Location Name</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {account_location?.location_detail?.name}
                                </Typography>
                            </Grid>

                            <Grid item sm={6} >
                                <Typography sx={fontContent}>
                                    <b>Employee Number</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                    {identification?.employee_no}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Stack>
                </Box>
            </Box>
        </ModalCustom>
    )
}

export default UserDetail