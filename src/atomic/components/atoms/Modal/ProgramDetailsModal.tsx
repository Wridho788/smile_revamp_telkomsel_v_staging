import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import ModalCustom from "@mui/material/Modal";
import { IProgramDetailsModalProps } from "./Modal.type";
import {Button, Grid, IconButton, Stack, Card, Typography, Chip} from "@mui/material";
import {
  useApproveProgramMutation,
  useRejectProgramMutation,
} from "../../../../redux/features/program/program-api-slice";
import {BodyCopy, H2, OutlinedTextField, SmallCopy} from "../../../../components";
import { Edit } from "@mui/icons-material";
import Moment from "moment";

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
}) => {
  const [rejectionIssue, setRejectionIssue] = useState("");
  const [approveProgram] = useApproveProgramMutation();
  const [rejectProgram] = useRejectProgramMutation();

  const approveHandler = async () => {
    await approveProgram(data["_id"] ?? "");
  };

  const rejectHandler = async () => {
    await rejectProgram(data["_id"] ?? "");
  };

  return (
    <ModalCustom
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{ overflow: "scroll" }}
    >
      <Box sx={style} minWidth={"45vw"}>
        <Box px={2}>
          <H2>{data.name ?? "Title"}</H2>
          <BodyCopy>Program ID : {data["_id"] ?? "Description"}</BodyCopy>
        </Box>
        {roleAccess && (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              spacing="1vw"
              mt="2vw"
            >
              <Button
                onClick={approveHandler}
                variant={"contained"}
                color="success"
                sx={{ color: "white" }}
              >
                Approve
              </Button>
              <Button
                onClick={rejectHandler}
                variant={"contained"}
                color="error"
              >
                Reject
              </Button>
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
        )}
        <Grid sx={{ flexGrow: 1 }}>
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
                <IconButton href={"/edit-program/".concat(data._id)} sx={fontContentIcon}>
                  <Edit sx={{ fontSize: 14 }}></Edit>
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
                    <Typography sx={fontContent}>{Moment(data.start_period).format("Y-m-d")}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}><b>End Period</b></Typography>
                    <Typography sx={fontContent}>{Moment(data.end_period).format("Y-m-d")}</Typography>
                  </Grid>
                  <Grid item zeroMinWidth xs={4}>
                    <Typography sx={fontContent}><b>Point Type</b></Typography>
                    <Typography sx={fontContent}>{data.point_type}</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={fontContent}><b>Program Mechanism</b></Typography>
                    <Typography sx={fontContent}>{data.program_mechanism}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}><b>Owner</b></Typography>
                    <Typography sx={fontContent}>{data.program_owner}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}><b>Owner Detail</b></Typography>
                    <Typography sx={fontContent}>{data.program_owner_detail}</Typography>
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
                >
                  Program Notification
                </Typography>
                <IconButton href={"/edit-program/".concat(data._id)} sx={fontContentIcon}>
                  <Edit sx={{ fontSize: 14 }}></Edit>
                </IconButton>
              </Stack>

              <Box mt={1}>
                {data["program_notification"].map((_item: any, _index: number) => (
                  <Card sx={{ display: 'flex', justifyContent : 'space-between', alignItems: 'center', padding: 1 }} key={_index}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={fontContent}>
                        <b>
                          {_item.template.notif_name}
                        </b>
                      </Typography>
                      <Typography sx={fontContent}>
                        {_item.template.notif_content}
                      </Typography>
                    </Box>
                    <Chip label={_item.via.set_value} size="small" />
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalCustom>
  );
};
export default ProgramDetailsModal;
