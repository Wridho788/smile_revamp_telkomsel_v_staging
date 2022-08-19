import * as React from "react";
import { Grid, Stack, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select } from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { options } from "../../../../mocks/options";
import {
  useGetNotifReceiverQuery,
  useGetNotifTypeQuery,
  useGetNotifViaQuery,
  useGetProgramTypeQuery, useGetTransactionTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";

interface INotificationProps {}

const Notification: React.FunctionComponent<INotificationProps> = (props) => {

  const {data: viaOption = {data: []}} = useGetNotifViaQuery()
  const {data: typeOption = {data: []}} = useGetNotifTypeQuery()
  const {data: receiverOption = {data: []}} = useGetNotifReceiverQuery()
  const {data: transactionTypeOption = {data: []}} = useGetTransactionTypeQuery()
  const [via, setVia] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [template, setTemplate] = React.useState<string>("");
  const [transactionType, setTransactionType] = React.useState<string>("");
  const [totalRow, setTotalRow] = React.useState<number[]>([1]);

  return (
    <Box pt="1vw">
      <Stack maxWidth={"100%"} spacing="3vw">
        {totalRow.map((_, idx) => (
          <Grid
            key={`rowItem__${idx}`}
            container
            columns={21}
            border="0.1vw solid rgba(0, 0, 0, 0.1)"
            borderRadius="0.3vw"
            p="3vw"
          >
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Via"
                placeholder="Option"
                options={viaOption.data}
                value={via}
                // setValue={setVia}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Type"
                placeholder="Option"
                options={typeOption.data}
                value={type}
                // setValue={setType}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Receiver"
                placeholder="Option"
                options={receiverOption.data}
                value={template}
                // setValue={setTemplate}
              />
            </Grid>
            <Grid item xs={5} pr={"1.5vw"}>
              <Select
                direction="column"
                label="Transaction Type"
                placeholder="Option"
                options={transactionTypeOption.data}
                value={transactionType}
                // setValue={setTransactionType}
              />
            </Grid>
            <Grid
              item
              xs={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <IconButton
                aria-label="delete"
                size="large"
                sx={{ color: "primary.main" }}
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Box display="flex" justifyContent="center">
          <Button
            onClick={() =>
              setTotalRow((prevState) => [...prevState, prevState.length])
            }
            color="primary"
            variant="contained"
            startIcon={<AddBoxIcon fontSize="large" />}
            sx={{
              borderRadius: "0.3vw",
              paddingInline: "1.5vw",
              paddingBlock: "0.5vw",
            }}
          >
            Add
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Notification;
