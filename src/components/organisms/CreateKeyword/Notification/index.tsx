import * as React from "react";
import { Grid, Stack, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Select } from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  useGetNotifReceiverQuery,
  useGetNotifViaQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword } from "../interface";
import { useNotificationTemplateQuery } from "../../../../redux/features/notification/notification-api-slice";
import { FilterInitial } from "../../../../redux/utils/initial-general";

interface INotificationProps {}

const Notification: React.FunctionComponent<INotificationProps> = (props) => {
  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);
  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  const { data: viaOption = { data: [] } } = useGetNotifViaQuery();
  const { data: receiverOption = { data: [] } } = useGetNotifReceiverQuery();
  const { data: templateOption = { data: [] } } =
    useNotificationTemplateQuery(FilterInitial);
  // const { data: typeOption = { data: [] } } = useGetNotifTypeQuery();
  // const { data: transactionTypeOption = { data: [] } } =
  //   useGetTransactionTypeQuery();

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate, stateTrigger]);
  console.log(keywordCreate);
  return (
    <Box pt="1vw">
      <Stack maxWidth={"100%"} spacing="2vw">
        {keywordCreate.keyword_notification.map((_, idx) => (
          <Grid key={`rowItem__${idx}`} container columns={12} px="3vw">
            <Grid
              item
              xs={11}
              border="0.1vw solid rgba(0, 0, 0, 0.1)"
              borderRadius="0.3vw"
              p="2vw"
            >
              <Grid container columns={3} spacing={"1vw"}>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Via"
                    placeholder="Option"
                    options={viaOption.data}
                    value={keywordCreateState.keyword_notification[idx].via}
                    handleChange={(value: any) => {
                      keywordCreate.keyword_notification[idx].via = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Receiver"
                    placeholder="Option"
                    options={receiverOption.data}
                    value={
                      keywordCreateState.keyword_notification[idx].receiver
                    }
                    handleChange={(value: any) => {
                      keywordCreate.keyword_notification[idx].receiver = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Template"
                    placeholder="Option"
                    options={templateOption.data}
                    optionLabel={"notif_name"}
                    value={
                      keywordCreateState.keyword_notification[idx].notification
                    }
                    handleChange={(value: any) => {
                      keywordCreate.keyword_notification[idx].notification =
                        value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                {/* <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Type"
                    placeholder="Option"
                    options={typeOption.data}
                    value={type}
                    // setValue={setType}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Transaction Type"
                    placeholder="Option"
                    options={transactionTypeOption.data}
                    value={transactionType}
                    // setValue={setTransactionType}
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <Grid
              item
              xs={1}
              display="flex"
              justifyContent="end"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  keywordCreate.keyword_notification.splice(idx, 1);
                  setStateTrigger(!stateTrigger);
                }}
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
            onClick={() => {
              keywordCreate.keyword_notification.push({
                notification: "",
                via: "",
                receiver: "",
              });
              setStateTrigger(!stateTrigger);
            }}
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
