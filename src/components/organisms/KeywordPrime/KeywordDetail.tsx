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
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Moment from "moment";
import { BodyCopy, H2 } from "../../../components";
import { Edit, ExpandMore, WarningAmber } from "@mui/icons-material";
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
import { Gap, InputSearchable } from "components/atoms";
import PopUpDatePicker from "components/atoms/PopUpDatePicker";

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
  const { eligibility, notification, bonus } = data;
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
          <Grid container direction="column" mt={2} spacing={"1vw"}>
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
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Keyword Name</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Point Redeemed</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.poin_redeemed}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Max Mode</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.max_mode}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Max Mode</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.max_mode}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Subsidized Program</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.program_bersubsidi ? "True" : "False"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Total Budget</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.total_budget}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Value</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.customer_value}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Multi Whitelist</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.multiwhitelist ? "True" : "False"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Multi Whitelist Destination</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.multiwhitelist_destination}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>SMS Masking Content</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.sms_masking}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing="1vw" mt={3}>
                  <Grid item xs={4}>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                background: "rgb(203 213 225)",
                                fontWeight: "bold",
                              }}
                              colSpan={2}
                            >
                              Channel
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              Channel Name
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {eligibility?.channel_validation_list.map(
                            (item: string, index: number) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{item}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={4}>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                background: "rgb(203 213 225)",
                                fontWeight: "bold",
                              }}
                              colSpan={2}
                            >
                              Location Eligibility
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                            <TableCell
                              align="center"
                              sx={{ fontWeight: "bold" }}
                            >
                              Location
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {eligibility?.locations.map(
                            (item: string, index: number) => (
                              <TableRow
                                key={index}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  {index + 1}
                                </TableCell>
                                <TableCell align="right">{item}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={4}>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="center"
                              sx={{
                                background: "rgb(203 213 225)",
                                fontWeight: "bold",
                              }}
                              colSpan={2}
                            >
                              Merchant
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold" }}
                              align="center"
                            >
                              Merchant
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {/* {eligibility?.channel_validation_list.map(
                            (item: string, index: number) => ( */}
                          <TableRow
                            // key={index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {/* {index + 1} */}
                            </TableCell>
                            <TableCell align="right">
                              {eligibility?.merchant}
                            </TableCell>
                          </TableRow>
                          {/* )
                          )} */}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            <Grid item mt={2} md={6} px={2}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={fontContentTitle}
                onClick={() => {
                  console.log(data);
                }}
              >
                Keyword Segmentation
              </Typography>
              <Stack mt={2}>
                <Grid container spacing={"1vw"}>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Tier</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_tier?.map(
                        (item: any) => item
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Brand</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_brand?.map(
                        (item: any) => item
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Badge</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_brand?.map(
                        (item: any) => item
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Prepaid</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_prepaid_registration
                        ? "True"
                        : "False"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Type</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_type}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Los Operator</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_los_operator}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Los Min</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_los_min}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Los Max</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_los_max}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Los</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_los}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Most Redeem</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_most_redeem.map(
                        (item: any) => item
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Completeness KYC</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_kyc_completeness
                        ? "True"
                        : "False"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Poin Balance Operator</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_poin_balance_operator}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Poin Balance</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_poin_balance}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Poin Balance Min</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_poin_balance_min}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Poin Balance Max</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_poin_balance_max}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Arpu Min</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_arpu_min}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Arpu Max</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_arpu_max}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={fontContent}>
                      <b>Customer Preferences BCP</b>
                    </Typography>
                    <Typography sx={fontContent}>
                      {eligibility?.segmentation_customer_preferences_bcp}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
            <Grid item mt={2} md={6} px={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={fontContentTitle}
                  onClick={() => {
                    console.log(data);
                  }}
                >
                  Redeem Eligibility Notification
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
                    let codeIdentifier = [
                      {
                        _id: _item?.code_identifier,
                        name: _item?.code_identifier,
                      },
                    ];
                    let notificationVia = [
                      {
                        _id: _item?.via,
                        name: _item?.via,
                      },
                    ];
                    return (
                      <Accordion key={_index}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{_item?.notif_type}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <OutlinedTextField
                            variant="outlined"
                            direction="column"
                            label="Keyword Name"
                            value={_item?.notif_type ? _item?.notif_type : ""}
                            disabled
                          />
                          <Gap width={0} height={15} />
                          <InputSearchable
                            label="Notification Template"
                            options={codeIdentifier}
                            value={codeIdentifier[0]}
                            onChange={() => {}}
                            disabled
                          />
                          <Gap width={0} height={15} />
                          <OutlinedTextField
                            multiline
                            rows={4}
                            variant="outlined"
                            direction="column"
                            label="Notification Content"
                            value={
                              _item?.notification_content
                                ? _item?.notification_content
                                : ""
                            }
                            disabled
                          />
                          <Gap width={0} height={15} />
                          <InputSearchable
                            label="Notification Via"
                            options={notificationVia}
                            value={notificationVia[0]}
                            onChange={() => {}}
                            disabled
                          />
                          <Gap width={0} height={15} />
                          <Stack direction="row">
                            <Box>
                              <Typography>From</Typography>
                              <PopUpDatePicker
                                value={new Date(_item?.start_period)}
                                disabled
                              />
                            </Box>
                            <Gap width={15} height={0} />
                            <Box>
                              <Typography>To</Typography>
                              <PopUpDatePicker
                                value={new Date(_item?.end_period)}
                                disabled
                              />
                            </Box>
                          </Stack>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
              </Stack>
            </Grid>
            <Grid item mt={2} md={6} px={2}>
              <Stack direction="row" justifyContent="space-between">
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={fontContentTitle}
                  onClick={() => {
                    console.log(data);
                  }}
                >
                  Keyword Bonus Configuration
                </Typography>
                {/* <IconButton
                                    href={"/edit-program/notification/".concat(data._id)}
                                    sx={fontContentIcon}
                                >
                                    <Edit sx={{ fontSize: 14 }}></Edit>
                                </IconButton> */}
              </Stack>
              {bonus &&
                bonus.map((item: any, index: number) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography sx={{ textTransform: "capitalize" }}>
                        {item.bonus_type.replaceAll("_", " ")}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Locations</Typography>
                      <Gap width={0} height={10} />
                      <Grid container>
                        {item.locations
                          ? item.locations.map((data: any, index: number) => (
                              <Grid key={index} item xs={4}>
                                <Typography sx={fontContent}>
                                  <b>{data.location_id}</b>
                                </Typography>
                                <Typography sx={fontContent}>
                                  {data.stock}
                                </Typography>
                              </Grid>
                            ))
                          : item.stock_location &&
                            item.stock_location.map(
                              (data: any, index: number) => (
                                <Grid key={index} item xs={4}>
                                  <Typography sx={fontContent}>
                                    <b>{data.location_id}</b>
                                  </Typography>
                                  <Typography sx={fontContent}>
                                    {data.stock}
                                  </Typography>
                                </Grid>
                              )
                            )}
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalCustom>
  );
};

export default KeywordDetail;
