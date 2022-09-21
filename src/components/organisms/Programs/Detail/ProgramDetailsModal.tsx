import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ModalCustom from "@mui/material/Modal";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Card,
  Typography,
  Chip,
  Alert,
  Divider,
  Paper,
} from "@mui/material";
import {
  useApproveProgramMutation,
  useRejectProgramMutation,
} from "../../../../redux/features/program/program-api-slice";
import { BodyCopy, H2 } from "../../../../components";
import { Edit, WarningAmber } from "@mui/icons-material";
import Moment from "moment";
import {
  useGetPointTypeQuery,
  useGetMechanismQuery,
  useGetLocationTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import Swal from "sweetalert2";
import { IProgramDetailsModalProps } from "../../../../atomic/components/atoms/Modal/Modal.type";
import Segmentation from "./Segmentation";
import OutlinedTextField from "../../../atoms/OutlinedTextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import KeywordLink from "./KeywordLink";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  height: "80vh",
  overflowX: "scroll",
  boxShadow: 24,
  p: 4,
};

const fontContentTitle = {
  fontSize: 14,
  color: "#001A41",
  overflowWrap: "break-word",
};

const fontContentIcon = {
  fontSize: 14,
  color: "#001A41",
};

const fontContent = {
  fontSize: 12,
  overflowWrap: "break-word",
};

const ProgramDetailsModal: FC<IProgramDetailsModalProps> = ({
  open,
  handleClose,
  data,
  roleAccess,
  isHqLogin,
}) => {
  const [rejectionIssue, setRejectionIssue] = useState("");

  const [approveProgram, { isLoading: isLoadingApprove }] =
    useApproveProgramMutation();
  const [rejectProgram, { isLoading: isLoadingReject }] =
    useRejectProgramMutation();

  const { data: pointTypeOptions } = useGetPointTypeQuery();
  const { data: mechanismOptions } = useGetMechanismQuery();
  const { data: ownerOption } = useGetLocationTypeQuery();

  const pointType = pointTypeOptions?.data.find(
    ({ _id }: any) => _id === data.point_type
  );
  const mechanism = mechanismOptions?.data.find(
    ({ _id }: any) => _id === data.program_mechanism
  );
  const owner = ownerOption?.data.find(
    ({ _id }: any) => _id === data.program_owner
  );

  const approveHandler = async () => {
    approveProgram(data["_id"] ?? "").then((res: any) => {
      if (res?.error) {
        handleClose();
        Swal.fire(res.error.data.message, "Failed!", "warning");
      } else {
        if (res?.data.status === 200) {
          handleClose();
          Swal.fire(res?.data.message, "Approved", "success");
          window.location.reload();
        }
      }
    });
  };

  const rejectHandler = async () => {
    rejectProgram({
      _id: data["_id"] ?? "",
      reason_reject: rejectionIssue,
    }).then((res: any) => {
      if (res?.error) {
        handleClose();
        Swal.fire(res.error.data.message, "Failed!", "warning");
      } else {
        if (res?.data.status === 200) {
          handleClose();
          Swal.fire(res?.data.message, "Rejected!", "success");
          window.location.reload();
        }
      }
    });
  };

  const renderApproveSection = (text: string) => {
    return (
      <>
        {roleAccess ? (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing="2vw"
              mt="1vw"
              sx={{ p: 2, backgroundColor: "#E5E5E5", borderRadius: 2 }}
            >
              <Stack direction="row" spacing="1vw">
                <Alert sx={{ margin: 2 }} severity="warning">
                  {text}
                </Alert>
              </Stack>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                }}
                spacing="1vw"
              >
                <Button
                  disabled={isLoadingApprove || isLoadingReject}
                  onClick={approveHandler}
                  variant={"contained"}
                  color="success"
                  sx={{ color: "white" }}
                >
                  Approve
                </Button>
                <Button
                  disabled={isLoadingApprove || isLoadingReject}
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
              label=""
              placeholder="Leave comment of your approval action ..."
              variant={"outlined"}
              value={rejectionIssue}
              handleChange={setRejectionIssue}
              multiline
              rows={3}
            />
          </>
        ) : (
          <Alert sx={{ margin: 2 }} severity="info">
            {text}
          </Alert>
        )}
      </>
    );
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
      <Box sx={style}>
        <Box px={2}>
          <H2>{data.name ?? "Title"}</H2>
          <BodyCopy>Program ID : {data["_id"] ?? "Description"}</BodyCopy>
        </Box>
        {/* TODO: Checking status "Approval" of Detail Program */}

        {data.approval_log && data.approval_log.length > 0 ? (
          isHqLogin ? (
            !data.isHQ &&
            data.approval_log[data.approval_log.length - 1].status[0]
              .set_value === "Approved by Manager HQ" ? (
              <Alert sx={{ margin: 2 }} severity="success">
                {
                  data.approval_log[data.approval_log.length - 1].status[0]
                    .set_value
                }
              </Alert>
            ) : // Jika bukan approved by manager HQ, check apakah direject oleh manager HQ
            data.approval_log[data.approval_log.length - 1].status[0]
                .set_value !== "Approved by Manager Non HQ" ? (
              // Check apakah di reject oleh manager HQ
              data.approval_log[data.approval_log.length - 1].status[0]
                .set_value === "Rejected by Manager HQ" ? (
                renderApproveSection(
                  "HQ Manager Approval Needed after rejection"
                )
              ) : (
                <Alert sx={{ margin: 2 }} severity="warning">
                  Waiting For approval 1
                </Alert>
              )
            ) : (
              renderApproveSection("HQ Manager Approval Needed")
            )
          ) : !data.isHQ &&
            data.approval_log[data.approval_log.length - 1].status[0]
              .set_value === "Approved by Manager HQ" ? (
            <Alert sx={{ margin: 2 }} severity="success">
              {
                data.approval_log[data.approval_log.length - 1].status[0]
                  .set_value
              }
            </Alert>
          ) : data.approval_log[data.approval_log.length - 1].status[0]
              .set_value !== "Approved by Manager Non HQ" ? (
            // Check apakah status bukan Approved by Manager Non HQ dikarenakan direject oleh manager HQ
            data.approval_log[data.approval_log.length - 1].status[0]
              .set_value === "Rejected by Manager HQ" ? (
              <Alert sx={{ margin: 2 }} severity="warning">
                Rejected By Manager HQ
              </Alert>
            ) : (
              renderApproveSection("Need approve by Area Manager")
            )
          ) : (
            <Alert sx={{ margin: 2 }} severity="success">
              Your Management Level has approved this program
            </Alert>
          )
        ) : isHqLogin ? (
          data.isHQ ? (
            renderApproveSection("Need approve by HQ Manager")
          ) : (
            <Alert sx={{ margin: 2 }} severity="warning">
              Need approve by Area Manager first.
            </Alert>
          )
        ) : (
          renderApproveSection("Need approve by Area Manager")
        )}

        <Paper>
          <Grid container>
            <Box item component={Grid} xs={12}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {data.approval_log && data.approval_log.length > 0 ? (
                  data.approval_log.map((item: any) => {
                    return (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <FiberManualRecordIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={item.status[0].set_value}
                          secondary={moment(item.approved_at).format(
                            "MMMM d, YYYY"
                          )}
                        />
                      </ListItem>
                    );
                  })
                ) : (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Belum Ada" secondary="Jan 9, 2014" />
                  </ListItem>
                )}
              </List>
            </Box>
          </Grid>
        </Paper>

        <Grid sx={{ flexGrow: 1 }}>
          <Grid container mt={2}>
            <Grid item md={6} px={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={fontContentTitle}
                >
                  Program Main Information
                </Typography>
                <IconButton
                  href={"/edit-program/main-info/".concat(data._id)}
                  sx={fontContentIcon}
                >
                  <Edit sx={{ fontSize: 14 }}></Edit>
                </IconButton>
              </Stack>

              <Stack direction="column" mt={1}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Program Name</b>
                    </Typography>
                    <Typography sx={fontContent}>{data.name}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Start Period</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {Moment(data.start_period).format("YYYY-MM-DD")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>End Period</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {Moment(data.end_period).format("YYYY-MM-DD")}
                    </Typography>
                  </Grid>
                  <Grid item zeroMinWidth xs={4}>
                    <Typography sx={fontContent}>
                      <b>Point Type</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {pointType?.set_value}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={fontContent}>
                      <b>Program Mechanism</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {mechanism?.set_value}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Owner</b>
                    </Typography>
                    <Typography sx={fontContent}>{owner?.set_value}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Owner Detail</b>
                    </Typography>
                    <Typography sx={fontContent}>-</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Time Zone</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {data.program_time_zone}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Threshold Alarm Exp</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {data.threshold_alarm_expired}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={fontContent}>
                      <b>Threshold Alarm Quota</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {data.threshold_alarm_voucher}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Whitelist Counter</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {data.whitelist_counter || 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item md={6} px={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={fontContentTitle}
                  onClick={() => {
                    console.log(data);
                  }}
                >
                  Program Notification
                </Typography>
                <IconButton
                  href={"/edit-program/notification/".concat(data._id)}
                  sx={fontContentIcon}
                >
                  <Edit sx={{ fontSize: 14 }}></Edit>
                </IconButton>
              </Stack>

              <Stack spacing={2}>
                {data.program_notification &&
                  data.program_notification.map(
                    (_item: any, _index: number) => (
                      <Card
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 1,
                        }}
                        key={_index}
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography sx={fontContent}>
                            <b>{_item.template.notif_name}</b>
                          </Typography>
                          <Typography sx={fontContent}>
                            {_item.template.notif_content}
                          </Typography>
                        </Box>
                        <Chip label={_item.via.set_value} size="small" />
                      </Card>
                    )
                  )}
              </Stack>
            </Grid>
            <Box sx={{ paddingTop: "3vw" }} width="100%">
              <KeywordLink data={data} />
            </Box>
            <Box
              sx={{ paddingTop: "3vw" }}
              onClick={() => {
                console.log("data open", data);
              }}
            >
              <Segmentation programId={data._id} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ModalCustom>
  );
};
export default ProgramDetailsModal;
