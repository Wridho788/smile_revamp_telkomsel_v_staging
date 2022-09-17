import React, { FC, useEffect } from "react";
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Card,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import Moment from "moment";
import { BodyCopy, H2 } from "../../../components";
import { Edit, WarningAmber } from "@mui/icons-material";
import ModalCustom from "@mui/material/Modal";
import { IKeywordDetailsModalProps } from "../../../atomic/components/atoms/Modal/Modal.type";

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
}) => {
  const { eligibility, notification } = data;

  console.log(`data`, data);

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
                  notification.map((_item: any, _index: number) => (
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
                          <b>{_item?.code_identifier}</b>
                        </Typography>
                        <Typography sx={fontContent}>
                          {_item?.notification_content}
                        </Typography>
                      </Box>
                      <Chip label={_item?.via} size="small" />
                    </Card>
                  ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ModalCustom>
  );
};

export default KeywordDetail;
