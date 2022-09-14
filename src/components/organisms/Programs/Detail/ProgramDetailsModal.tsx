import React, {FC, useEffect, useState} from "react";
import Box from "@mui/material/Box";
import ModalCustom from "@mui/material/Modal";
import {Button, Grid, IconButton, Stack, Card, Typography, Chip, Alert} from "@mui/material";
import {
    useApproveProgramMutation,
    useRejectProgramMutation,
} from "../../../../redux/features/program/program-api-slice";
import {BodyCopy, H2} from "../../../../components";
import {Edit, WarningAmber} from "@mui/icons-material";
import Moment from "moment";
import {
    useGetPointTypeQuery,
    useGetMechanismQuery,
    useGetLocationTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";
import Swal from "sweetalert2";
import {IProgramDetailsModalProps} from "../../../../atomic/components/atoms/Modal/Modal.type";
import Segmentation from "./Segmentation";
import OutlinedTextField from "../../../atoms/OutlinedTextField";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const fontContentTitle = {
    fontSize: 14,
    color: '#001A41',
    overflowWrap: 'break-word'
}

const fontContentIcon = {
    fontSize: 14,
    color: '#001A41'
}

const fontContent = {
    fontSize: 12,
    overflowWrap: 'break-word'
};

const ProgramDetailsModal: FC<IProgramDetailsModalProps> = ({
                                                                open,
                                                                handleClose,
                                                                data,
                                                                roleAccess,
                                                                isHqLogin,
                                                            }) => {
    const [rejectionIssue, setRejectionIssue] = useState("");

    const [approveProgram, {isLoading: isLoadingApprove}] =
        useApproveProgramMutation();
    const [rejectProgram, {isLoading: isLoadingReject}] =
        useRejectProgramMutation();

    const {data: pointTypeOptions} = useGetPointTypeQuery();
    const {data: mechanismOptions} = useGetMechanismQuery();
    const {data: ownerOption} = useGetLocationTypeQuery();

    const pointType = pointTypeOptions?.data.find(({_id}: any) => _id === data.point_type);
    const mechanism = mechanismOptions?.data.find(({_id}: any) => _id === data.program_mechanism);
    const owner = ownerOption?.data.find(({_id}: any) => _id === data.program_owner);

    const approveHandler = async () => {
        approveProgram(data["_id"] ?? "").then((res: any) => {
            if (res?.error) {
                handleClose();
                Swal.fire(res.error.data.message, "", "warning");
            } else {
                if (res?.data.status === 200) {
                    handleClose();
                    Swal.fire(res?.data.message, "", "success");
                }
            }
        });
    };

    const rejectHandler = async () => {
        rejectProgram(data["_id"] ?? "").then((res: any) => {
            if (res?.error) {
                handleClose();
                Swal.fire(res.error.data.message, "", "warning");
            } else {
                if (res?.data.status === 200) {
                    handleClose();
                    Swal.fire(res?.data.message, "", "success");
                }
            }
        });
    };


    const renderApproveSection = () => {
        return (
            <>
                <>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing="2vw"
                        mt="1vw"
                        sx={{p: 2, backgroundColor: '#E5E5E5', borderRadius: 2}}
                    >
                        <Stack
                            direction="row"
                            spacing="1vw"
                        >
                            <WarningAmber sx={{color: '#EF6E11'}}></WarningAmber>
                            <h3>
                                Program {data.name} is not approved yet
                            </h3>
                        </Stack>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: 'space-between'
                            }}
                            spacing="1vw"
                        >
                            <Button
                                disabled={isLoadingApprove}
                                onClick={approveHandler}
                                variant={"contained"}
                                color="success"
                                sx={{color: "white"}}
                            >
                                Approve
                            </Button>
                            <Button
                                disabled={isLoadingReject}
                                onClick={rejectHandler}
                                variant={"contained"}
                                color="error"
                            >
                                Reject
                            </Button>
                        </Stack>
                    </Stack>
                    <OutlinedTextField
                      direction="column"
                      label="Rejection Issue"
                      placeholder="Description"
                      variant={"outlined"}
                      value={rejectionIssue}
                      handleChange={setRejectionIssue}
                      multiline
                      rows={3}
                    />
                </>
            </>
        )
    }


    return (
        <ModalCustom
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{overflow: "scroll"}}
        >
            <Box sx={style} minWidth={"45vw"}>
                <Box px={2}>
                    <H2>{data.name ?? "Title"}</H2>
                    <BodyCopy>Program ID : {data["_id"] ?? "Description"}</BodyCopy>
                </Box>
                {/* TODO: Checking status "Approval" of Detail Program */}

                {
                    data.approval_log && data.approval_log.length > 0
                        ?
                            isHqLogin ?
                            !data.isHQ && data.approval_log[data.approval_log.length - 1].status[0].set_value === 'Approved by Manager HQ'
                                ? <Alert severity="success">{data.approval_log[data.approval_log.length - 1].status[0].set_value}</Alert>
                                : data.approval_log[data.approval_log.length - 1].status[0].set_value !== 'Approved by Manager Non HQ' ?
                                    <Alert severity="warning">Waiting for Non HQ Approval</Alert> : renderApproveSection()
                                :
                                !data.isHQ && data.approval_log[data.approval_log.length - 1].status[0].set_value === 'Approved by Manager HQ'
                                    ? <Alert severity="success">{data.approval_log[data.approval_log.length - 1].status[0].set_value}</Alert>
                                    : data.approval_log[data.approval_log.length - 1].status[0].set_value !== 'Approved by Manager Non HQ' ? renderApproveSection() : <Alert severity="success">Your Management Level has approved this program</Alert>
                        :
                            isHqLogin ?
                                data.isHQ
                                    ?
                                    renderApproveSection()
                                    : <Alert severity="warning" onClick={() => {console.log(data)}}>Need approve by Area Manager first.</Alert>
                                :
                                renderApproveSection()
                }


                <Grid sx={{flexGrow: 1}}>
                    <Grid
                        container
                        mt={2}
                    >
                        <Grid md={6} px={2}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    sx={fontContentTitle}
                                >
                                    Program Main Information
                                </Typography>
                                <IconButton href={"/edit-program/main-info/".concat(data._id)} sx={fontContentIcon}>
                                    <Edit sx={{fontSize: 14}}></Edit>
                                </IconButton>
                            </Stack>

                            <Stack
                                direction="column"
                                mt={1}
                            >
                                <Grid container columnSpacing={2} rowSpacing={2}>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Program Name</b></Typography>
                                        <Typography sx={fontContent}>{data.name}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Start Period</b></Typography>
                                        <Typography
                                            sx={fontContent}>{Moment(data.start_period).format("YYYY-MM-DD")}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>End Period</b></Typography>
                                        <Typography
                                            sx={fontContent}>{Moment(data.end_period).format("YYYY-MM-DD")}</Typography>
                                    </Grid>
                                    <Grid item zeroMinWidth xs={4}>
                                        <Typography sx={fontContent}><b>Point Type</b></Typography>
                                        <Typography sx={fontContent}>{pointType?.set_value}</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography sx={fontContent}><b>Program Mechanism</b></Typography>
                                        <Typography sx={fontContent}>{mechanism?.set_value}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Owner</b></Typography>
                                        <Typography sx={fontContent}>{owner?.set_value}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Owner Detail</b></Typography>
                                        <Typography sx={fontContent}>-</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Time Zone</b></Typography>
                                        <Typography sx={fontContent}>{data.program_time_zone}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Threshold Alarm Exp</b></Typography>
                                        <Typography sx={fontContent}>{data.threshold_alarm_expired}</Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography sx={fontContent}><b>Threshold Alarm Quota</b></Typography>
                                        <Typography sx={fontContent}>{data.threshold_alarm_voucher}</Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography sx={fontContent}><b>Whitelist Counter</b></Typography>
                                        <Typography sx={fontContent}>{data.whitelist_counter || 0}</Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>
                        <Grid md={6} px={2}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="subtitle1"
                                    gutterBottom
                                    sx={fontContentTitle}
                                    onClick={() => {
                                        console.log(data)
                                    }}
                                >
                                    Program Notification
                                </Typography>
                                <IconButton
                                    href={"/edit-program/notification/".concat(data._id)}
                                    sx={fontContentIcon}
                                >
                                    <Edit sx={{fontSize: 14}}></Edit>
                                </IconButton>
                            </Stack>

                            <Stack spacing={2}>
                                {data.program_notification && data.program_notification.map((_item: any, _index: number) => (
                                    <Card sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: 1
                                    }} key={_index}>
                                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                            <Typography sx={fontContent}>
                                                <b>
                                                    {_item.template.notif_name}
                                                </b>
                                            </Typography>
                                            <Typography sx={fontContent}>
                                                {_item.template.notif_content}
                                            </Typography>
                                        </Box>
                                        <Chip label={_item.via.set_value} size="small"/>
                                    </Card>
                                ))}
                            </Stack>
                        </Grid>
                        <Box sx={{paddingTop: "3vw"}} onClick={() => {
                            console.log("data open", data)
                        }}>
                            {/*<Segmentation programId={data._id}/>*/}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </ModalCustom>
    );
};
export default ProgramDetailsModal;
