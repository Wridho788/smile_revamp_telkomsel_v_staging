import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import ModalCustom from "@mui/material/Modal";
import { IKeywordDetailsModalProps } from "./Modal.type";
import { Button, Chip, Grid, Stack } from "@mui/material";
import { BodyCopy, H2, OutlinedTextField } from "../../../../components";
import {
  useKeywordApproveMutation,
  useKeywordRejectMutation,
} from "../../../../redux/features/keyword/keyword-api-slice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  p: 4,
};

const KeywordDetailsModal: FC<IKeywordDetailsModalProps> = ({
  open,
  handleClose,
  data,
  roleAccess,
}) => {
  const [rejectionIssue, setRejectionIssue] = useState("");
  const [keywordApprove, { isLoading: isLoadingApprove }] =
    useKeywordApproveMutation();
  const [keywordReject, { isLoading: isLoadingReject }] =
    useKeywordRejectMutation();

  const approveHandler = async () => {
    await keywordApprove(data["_id"] ?? "");
  };

  const rejectHandler = async () => {
    await keywordReject(data["_id"] ?? "");
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
        <H2>{data.detail.name ?? "Title"}</H2>
        <BodyCopy>Keyword ID : {data["_id"] ?? "Description"}</BodyCopy>
        <Grid container columns={12} spacing={"2vw"} mt="0.5vw">
          <Grid item xs={6}>
            <OutlinedTextField
              label="Merchant"
              value={data.detail.merchant_name ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <OutlinedTextField
              label="Point Value"
              value={data.detail.point_value ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="Enable Coorporate"
              value={data.detail.enable_coorporate ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="For New Redeemer"
              value={data.detail.for_new_redeemer ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="Merchandise Keyword"
              value={data.detail.merchandise_keyword ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="Max Mode"
              value={data.detail.max_mode ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="Max Redeem Counter"
              value={data.detail.max_redeem_counter ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="Max Redeem Per MSISDN"
              value={data.detail.max_redeem_per_msisdn ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <OutlinedTextField
              label="LOS Type"
              value={data.detail.telkomsel_los_type ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={6}>
            <OutlinedTextField
              label="LOS Operator"
              value={data.detail.telkomsel_los_operator ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>

          <Grid item xs={4}>
            <OutlinedTextField
              label="LOS Value"
              value={data.detail.telkomsel_los_value ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="LOS Range Max"
              value={data.detail.telkomsel_los_range_max ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <OutlinedTextField
              label="LOS Range Min"
              value={data.detail.telkomsel_los_range_min ?? ""}
              variant={"outlined"}
              direction={"column"}
              disabled={true}
            />
          </Grid>
        </Grid>
        {data?.keyword_approval?.length > 0 ? (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="end"
            mt="2vw"
          >
            <Chip
              color="success"
              label="APPROVED"
              sx={{
                color: "white",
                fontSize: "1vw",
                fontWeight: "bold",
                paddingBlock: "1.2vw",
                paddingInline: "0.4vw",
              }}
            />
          </Stack>
        ) : roleAccess ? (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="end"
              spacing="1vw"
              mt="2vw"
            >
              <Button
                disabled={isLoadingApprove}
                onClick={approveHandler}
                variant={"contained"}
                color="success"
                sx={{ color: "white" }}
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
        ) : (
          <></>
        )}
      </Box>
    </ModalCustom>
  );
};
export default KeywordDetailsModal;
