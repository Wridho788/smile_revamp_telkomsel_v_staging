import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Card,
  Typography,
  Chip,
  Box,
  Alert,
  Paper,
} from "@mui/material";
import Moment from "moment";
import { BodyCopy, H2 } from "../../../components";
import { Edit, WarningAmber } from "@mui/icons-material";
import ModalCustom from "@mui/material/Modal";
import { IKeywordDetailsModalProps } from "../../../atomic/components/atoms/Modal/Modal.type";
import Swal from "sweetalert2";
import { OutlinedTextField } from "../../../components";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import {
  useKeywordApproveMutation,
  useKeywordRejectMutation,
} from "redux/features/keyword/keyword-api-slice";
import { useGetNotifViaQuery } from "redux/features/lov/lov-api-slice";
import { keywordProgramDetailHelper } from "../Programs/Detail/KeywordLink/initial";

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

const KeywordDetail: FC<IKeywordDetailsModalProps> = ({
  open,
  handleClose,
  data,
  roleAccess,
  isHqLogin,
}) => {
  const { eligibility, notification } = data;
  const { data: notifVia } = useGetNotifViaQuery();
  const [rejectionIssue, setRejectionIssue] = useState("");

  const [approveProgram, { isLoading: isLoadingApprove }] =
    useKeywordApproveMutation();
  const [rejectProgram, { isLoading: isLoadingReject }] =
    useKeywordRejectMutation();

  const approveHandler = async () => {
    approveProgram(data["_id"] ?? "").then((res: any) => {
      if (res?.error) {
        handleClose();
        Swal.fire(res.error.data.message, "Failed!", "warning");
      } else {
        if (res?.data.status === 200) {
          handleClose();
          Swal.fire(res?.data.message, "Approved!", "success");
          window.location.reload();
        }
      }
    });
  };

  const rejectHandler = async () => {
    rejectProgram(data["_id"] ?? "").then((res: any) => {
      if (res?.error) {
        handleClose();
        Swal.fire(res.error.data.message, "Failed", "warning");
      } else {
        if (res?.data.status === 200) {
          handleClose();
          Swal.fire(res?.data.message, "Rejected", "success");
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

  // clean keyword program detail

  const keywordProgramDetail = keywordProgramDetailHelper;

  useEffect(() => {
    setTimeout(() => {
      keywordProgramDetail.opened = true;
    }, 1000);
  }, [keywordProgramDetail]);

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
        style={{ overflowY: "scroll" }}
        sx={style}
        minWidth={"45vw"}
        maxHeight={"90vh"}
      >
        <Box px={2}>
          <H2>{eligibility?.name ?? "Title"}</H2>
          <BodyCopy>Keyword ID : {data["_id"] ?? "Description"}</BodyCopy>
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
                  Waiting for Non HQApproval
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
                  Keyword Main Information
                </Typography>
                {/* <IconButton href={`/edit-program/main-info/${data?._id}`} sx={fontContentIcon}>
                                    <Edit sx={{ fontSize: 14 }}></Edit>
                                </IconButton> */}
              </Stack>

              <Stack direction="column" mt={1}>
                <Grid container columnSpacing={2} rowSpacing={2}>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Keyword Name</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Start Period</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {Moment(eligibility?.start_period).format("YYYY-MM-DD")}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>End Period</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {Moment(eligibility?.end_period).format("YYYY-MM-DD")}
                    </Typography>
                  </Grid>
                  <Grid item zeroMinWidth xs={4}>
                    <Typography sx={fontContent}>
                      <b>Point Type</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.poin_value}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={fontContent}>
                      <b>Keyword Schedule</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.keyword_schedule}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Program Title</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.program_title_expose}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Segmentation Type</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_type}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography sx={fontContent}>
                      <b>Time Zone</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.timezone}
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
                  Keyword Notification
                </Typography>
                {/* <IconButton
                                    href={"/edit-program/notification/".concat(data._id)}
                                    sx={fontContentIcon}
                                >
                                    <Edit sx={{ fontSize: 14 }}></Edit>
                                </IconButton> */}
              </Stack>

              <Stack spacing={2}>
                {notification &&
                  notification.map((_item: any, _index: number) => {
                    let via = "";
                    notifVia?.data?.forEach((item: any) => {
                      if (item?._id === _item?.via) via = item?.set_value;
                    });
                    return (
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
                            <b>{_item?.notification_content}</b>
                          </Typography>
                          {/* <Typography sx={fontContent}>
                            {_item?.notification_content}
                          </Typography> */}
                        </Box>
                        <Chip label={via} size="small" />
                      </Card>
                    );
                  })}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalCustom>
  );
};

export default KeywordDetail;
