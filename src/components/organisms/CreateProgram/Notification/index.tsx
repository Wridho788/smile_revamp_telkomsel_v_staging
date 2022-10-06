import * as React from "react";
import {
  Grid,
  Stack,
  IconButton,
  Box,
  Button,
  CircularProgress,
  ListItem,
  Typography,
  Snackbar,
} from "@mui/material";
import { OutlinedTextField, Select } from "../../../atoms";
import {
  useGetNotifViaQuery,
  useGetProgramNotificationQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import { useEffect, useState } from "react";
import {
  CreateProgramInitial,
  variableInitial,
} from "../../../../pages/CreateProgram/programInitial";
import { AddBox, Close } from "@mui/icons-material";
import BodyCopy from "../../../atoms/Typography/BodyCopy";
import ListItemButton from "@mui/material/ListItemButton";
import SmallCopy from "../../../atoms/Typography/SmallCopy";
import H3 from "../../../atoms/Typography/H3";
import { IProgramNotification } from "../../../../pages/CreateProgram/interface";
import { useNotificationTemplateQuery } from "redux/features/notification/notification-api-slice";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface INotificationProps {}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification: React.FunctionComponent<
  INotificationProps
> = ({}: INotificationProps) => {
  const programNotification = CreateProgramInitial.program_notification;
  const { data: viaOption = { data: [] } } = useGetNotifViaQuery();
  const {
    data: programNotificationOption = { data: [] },
    isFetching: isFetchingNotifOption,
  } = useGetProgramNotificationQuery();
  const {
    data: notificationTemplate = { data: [] },
    isFetching: isFetchingNotifTemplate,
  } = useNotificationTemplateQuery({
    skip: 0,
    limit: 20,
    filter: "{}",
    sort: "{}",
  });
  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [notifUndefined, setNotifUndefined] = React.useState<string[]>([]);
  const [adjustField, setAdjustField] = React.useState<any>({
    receiver: "",
    channel_id: "",
  });

  const notificationTemplateData = notificationTemplate.data;
  const notificationTemplateList = notificationTemplate.data.map(
    (item: any) => item.notif_name
  );
  const notificationReceiver = notificationTemplate.data.map((item: any) =>
    item.receiver.map((data: any) => data.set_value)
  );
  const notificationChannel = notificationTemplate.data.map((item: any) =>
    item.channel_id.map((data: any) => data.name)
  );

  // ============================================================================================
  // * assignment programNotification: []
  //
  // ============================================================================================
  let list = programNotificationOption.data;
  useEffect(() => {
    if (list.length > 0) {
      if (list.length !== programNotification.length) {
        for (let i = 0; i < list.length; i++) {
          const obj: IProgramNotification = {
            template: "63008b6c746163c934b99aa2",
            template_content: "",
            via: "",
            notif_type: list[i]._id,
          };
          programNotification.push(obj);
          setStateTrigger(!stateTrigger);
        }
      }
    }
  }, [programNotificationOption.data]);

  // ============================================================================================
  // * assignment notification template content: []
  //
  // ============================================================================================
  // useEffect(() => {
  //   if (programNotification.length > 0) {
  //     handleCheckEquivalentNotif(programNotificationOption.data);
  //     programNotificationOption.data.map((item: any, index: number) => {
  //       if (
  //         item.set_value ===
  //         notificationTemplateList.find((e) => e === item.set_value)
  //       ) {
  //         programNotification[index].template_content =
  //           notificationTemplate.data.filter(
  //             (e) => e.notif_name === item.set_value
  //           )[0]?.notif_content;
  //       }
  //     });
  //   }

  //   let receiver: any = [];
  //   let channelID: any = [];
  //   for (let i = 0; i <= notificationReceiver.length; i++) {
  //     receiver.push(notificationReceiver[i]);
  //   }
  //   for (let i = 0; i <= notificationChannel.length; i++) {
  //     channelID.push(notificationChannel[i]);
  //   }
  //   setAdjustField({
  //     channel_id: channelID.join(", "),
  //     receiver: receiver.join(", "),
  //   });
  // }, [programNotification, isFetchingNotifTemplate, isFetchingNotifOption]);

  // ============================================================================================
  // * generate alert if notification template not created
  //
  // ============================================================================================
  let notifNull: string[] = [];
  const handleCheckEquivalentNotif = async (items: any) => {
    items.map((item: any, index: number) => {
      if (notificationTemplateList.some((e) => e === item.set_value)) {
        console.log("items same same: ", item.set_value);
      } else {
        notifNull.push(item.set_value);
      }
      //
    });
    setNotifUndefined(notifNull);
    if (notifNull.length > 0) {
      setOpenAlert(true);
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };
  const OpenSnackbarAlert = (item: string[]) => {
    let topPosition = item.map((item, i: number) => i * 50);
    let autoHideDuration = item.map((item, i: number) => i * 1500);
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <Close fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    return item.map((data, index: number) => (
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        sx={{
          "&.MuiSnackbar-root": {
            position: "fixed",
            top: `${topPosition[index] + 25}px`,
            color: "red",
          },
        }}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          "We don't see notification config for title {data}, please create on
          Notification Management with title {data}
        </Alert>
      </Snackbar>
    ));
  };
  return (
    <>
      {notifUndefined.length > 0 && OpenSnackbarAlert(notifUndefined)}
      {programNotification.length > 0 ? (
        programNotificationOption.data.map((item, i) => (
          <Box key={i} display="flex" px="10%" py="1vw">
            <Grid
              key={`rowItem__${i}`}
              container
              border="0.1vw solid rgba(0, 0, 0, 0.1)"
              borderRadius="0.3vw"
              p="3vw"
            >
              <Stack spacing={"1vw"} width={"100%"}>
                <Grid container>
                  <H3 color={"primary"}> {item.set_value}</H3>
                </Grid>
                <Select
                  isRequired={false}
                  variant={"outlined"}
                  label="Via"
                  placeholder="Option"
                  options={viaOption.data}
                  value={programNotification[i].via}
                  handleChange={(value: any) => {
                    programNotification[i].via = value;
                    setStateTrigger(!stateTrigger);
                  }}
                />
                {/* {item.set_value ===
                  notificationTemplateList.find(
                    (e) => e === item.set_value
                  ) && (
                  <>
                    <Grid container>
                      <OutlinedTextField
                        isRequired={false}
                        disabled
                        label="PIC"
                        variant={"outlined"}
                        value={adjustField.channel_id}
                        handleChange={(value: any) => {
                          programNotification[i].template_content = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Grid>
                    <Grid container>
                      <OutlinedTextField
                        isRequired={false}
                        disabled
                        label="Receiver"
                        variant={"outlined"}
                        value={adjustField.receiver}
                        handleChange={(value: any) => {
                          programNotification[i].template_content = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Grid>
                  </>
                )} */}
                <Grid container>
                  <OutlinedTextField
                    isRequired={false}
                    multiline
                    rows={4}
                    label="Template Content"
                    placeholder="Template Content"
                    variant={"outlined"}
                    value={programNotification[i].template_content}
                    handleChange={(value: any) => {
                      programNotification[i].template_content = value;

                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>

                <Grid container columns={11}>
                  <Grid item xs={4}>
                    <BodyCopy>Variable</BodyCopy>
                    <SmallCopy fontSize={10} color={"orange"}>
                      You can add this variable when editing template content
                    </SmallCopy>
                  </Grid>
                  <Grid item xs={7}>
                    <Grid container columns={12}>
                      {variableInitial.map((item) => (
                        <Grid>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                programNotification[
                                  i
                                ].template_content = `${programNotification[i].template_content} ${item}`;
                                setStateTrigger(!stateTrigger);
                              }}
                            >
                              <AddBox color={"primary"} />
                              <BodyCopy>{item}</BodyCopy>
                            </ListItemButton>
                          </ListItem>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          </Box>
        ))
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
            mt={5}
          >
            <Typography variant={"h3"}>
              Generating notification, please wait...
            </Typography>
          </Box>
        </>
      )}
    </>
  );
};

export default Notification;
