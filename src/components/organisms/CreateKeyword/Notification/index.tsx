import * as React from "react";
import { Grid, Stack, IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OutlinedTextField, Select } from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  useGetNotifReceiverQuery,
  useGetNotifTypeQuery,
  useGetNotifViaQuery,
  useGetPointTypeQuery,
  useGetTransactionTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword } from "../interfaces";
import { useNotificationTemplateQuery } from "../../../../redux/features/notification/notification-api-slice";
import { FilterInitial } from "../../../../redux/utils/initial-general";

interface INotificationProps {}

const Notification: React.FunctionComponent<INotificationProps> = (props) => {
  const keywordCreate = CreateKeywordGeneral;
  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);
  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  const { data: viaOptions = { data: [] } } = useGetNotifViaQuery();
  const { data: templateOptions = { data: [] } } =
    useNotificationTemplateQuery(FilterInitial);
  const { data: typeOptions = { data: [] } } = useGetNotifTypeQuery();
  const { data: pointTypeOptions = { data: [] } } = useGetPointTypeQuery();
  // const { data: transactionTypeOptions = { data: [] } } =
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
              <Grid container columns={4} spacing={"1vw"}>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Via"
                    placeholder="Option"
                    options={viaOptions.data}
                    value={keywordCreateState.keyword_notification[idx].via}
                    handleChange={(value: string) => {
                      keywordCreate.keyword_notification[idx].via = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <OutlinedTextField
                    label="Transaction Type"
                    placeholder="Transaction Type"
                    value={
                      keywordCreateState.keyword_notification[idx]
                        .transaction_type
                    }
                    handleChange={(value: any) => {
                      keywordCreate.keyword_notification[idx].transaction_type =
                        value;
                      setStateTrigger(!stateTrigger);
                    }}
                    variant={"outlined"}
                    direction={"column"}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Type"
                    placeholder="Option"
                    options={typeOptions.data}
                    value={
                      keywordCreateState.keyword_notification[idx].notif_type
                    }
                    handleChange={(value: string) => {
                      keywordCreate.keyword_notification[idx].notif_type =
                        value;
                      keywordCreate.keyword_notification[idx].notification = "";
                      keywordCreate.keyword_notification[
                        idx
                      ].notification_content = "";
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  {keywordCreateState.keyword_notification[idx].notif_type !==
                    "" && (
                    <Select
                      direction="column"
                      label="Template"
                      placeholder="Option"
                      options={templateOptions.data}
                      optionLabel={"notif_name"}
                      value={
                        keywordCreateState.keyword_notification[idx]
                          .notification
                      }
                      handleChange={(value: string) => {
                        keywordCreate.keyword_notification[idx].notification =
                          value;
                        keywordCreate.keyword_notification[
                          idx
                        ].notification_content = templateOptions?.data?.find(
                          (e) => e["_id"] === value
                        )?.notif_content;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  {keywordCreateState.keyword_notification[idx]
                    .notification_content !== "" && (
                    <OutlinedTextField
                      direction="column"
                      label={
                        templateOptions?.data?.find(
                          (e) =>
                            e["_id"] ===
                            keywordCreateState.keyword_notification[idx]
                              .notification
                        )?.notif_name
                      }
                      variant={"outlined"}
                      multiline
                      rows={3}
                      value={
                        keywordCreateState.keyword_notification[idx]
                          .notification_content
                      }
                      handleChange={(value: string) => {
                        keywordCreate.keyword_notification[
                          idx
                        ].notification_content = value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  {keywordCreateState.keyword_notification[idx]
                    .notification_content !== "" && (
                    <Stack direction="row" spacing="1vw">
                      <Button
                        onClick={() => {
                          keywordCreate.keyword_notification[
                            idx
                          ].notification_content += keywordCreateState.name;
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                        }}
                      >
                        {keywordCreateState.name}
                      </Button>
                      <Button
                        onClick={() => {
                          keywordCreate.keyword_notification[
                            idx
                          ].notification_content +=
                            pointTypeOptions?.data?.find(
                              (e) => e["_id"] === keywordCreateState.point_type
                            )?.set_value ?? "";
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                        }}
                      >
                        {
                          pointTypeOptions.data.find(
                            (e) => e["_id"] === keywordCreateState.point_type
                          )?.set_value
                        }
                      </Button>
                      <Button
                        onClick={() => {
                          keywordCreate.keyword_notification[
                            idx
                          ].notification_content +=
                            keywordCreateState.start_period.toLocaleDateString();
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                        }}
                      >
                        {keywordCreateState.start_period.toLocaleDateString()}
                      </Button>
                      <Button
                        onClick={() => {
                          keywordCreate.keyword_notification[
                            idx
                          ].notification_content +=
                            keywordCreateState.end_period.toLocaleDateString();
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                        }}
                      >
                        {keywordCreateState.end_period.toLocaleDateString()}
                      </Button>
                    </Stack>
                  )}
                </Grid>
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
                via: "",
                notif_type: "",
                notification: "",
                transaction_type: "",
                notification_content: "",
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
