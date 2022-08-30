import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import ModalCustom from "@mui/material/Modal";
import { IProgramDetailsModalProps } from "./Modal.type";
import { Button, Chip, Stack } from "@mui/material";
import {
  useApproveProgramMutation,
  useRejectProgramMutation,
} from "../../../../redux/features/program/program-api-slice";
import { BodyCopy, H2, OutlinedTextField } from "../../../../components";

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

const ProgramDetailsModal: FC<IProgramDetailsModalProps> = ({
  open,
  handleClose,
  data,
  roleAccess,
}) => {
  const [rejectionIssue, setRejectionIssue] = useState("");
  const [approveProgram, { isLoading: isLoadingApprove }] =
    useApproveProgramMutation();
  const [rejectProgram, { isLoading: isLoadingReject }] =
    useRejectProgramMutation();

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
        <H2>{data.name ?? "Title"}</H2>
        <BodyCopy>Program ID : {data["_id"] ?? "Description"}</BodyCopy>
        {data?.program_approval?.length > 0 ? (
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
export default ProgramDetailsModal;
