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
  Alert,
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
  const [activeAlert, setActiveAlert] = React.useState<string[]>([]);

  const notificationTemplateData = notificationTemplate.data;
  const notificationTemplateList = notificationTemplate.data.map(
    (item: any) => item.notif_name
  );
  const notificationReceiver = notificationTemplate.data.map((item: any) =>
    item.receiver.map((data: any) => data.set_value)
  );
  console.log(notificationTemplateData);
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
  useEffect(() => {
    if (programNotification.length > 0) {
      handleCheckEquivalentNotif(programNotificationOption.data);
      programNotificationOption.data.map((item: any, index: number) => {
        if (
          item.set_value ===
          notificationTemplateList.find((e) => e === item.set_value)
        ) {
          programNotification[index].template_content =
            notificationTemplate.data.filter(
              (e) => e.notif_name === item.set_value
            )[0]?.notif_content;
        }
      });
    }
  }, [programNotification, isFetchingNotifTemplate, isFetchingNotifOption]);

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
    setActiveAlert(notifNull);
  };

  const OpenSnackbarAlert = (text?: string) => {
    return (
      <Alert severity="warning">
        "We don't see notification config for title {text}, please create on
        Notification Management with title {text}
      </Alert>
    );
  };
  return (
    <>
      {/* {notifUndefined.length > 0 && OpenSnackbarAlert(activeAlert)} */}
      {programNotification.length > 0 ? (
        programNotificationOption.data.map((item: any, i: number) => {
          // ============================================================================================
          // * defined channel & PIC if have
          //
          // ============================================================================================
          const channelFiltered = notificationTemplateData
            .filter((data: any) => data.notif_name === item.set_value)
            .map((e) => e.channel_id)[0];
          const PICFiltered = notificationTemplateData
            .filter((data: any) => data.notif_name === item.set_value)
            .map((e) => e.receiver)[0];

          return (
            <Box key={i} display="flex" px="10%" py="1vw">
              <Grid
                key={`rowItem__${i}`}
                container
                border="0.1vw solid rgba(0, 0, 0, 0.1)"
                borderRadius="0.3vw"
                p="3vw"
              >
                {activeAlert.some((e) => e === item.set_value) &&
                  OpenSnackbarAlert(item.set_value)}
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
                  {item.set_value ===
                    notificationTemplateList.find(
                      (e) => e === item.set_value
                    ) && (
                    <>
                      {/* <Grid container>
                        <OutlinedTextField
                          isRequired={false}
                          disabled
                          label="Channel"
                          variant={"outlined"}
                          value={
                            channelFiltered &&
                            channelFiltered.map((e) => e.name).join(",")
                          }
                          handleChange={(value: any) => {
                            programNotification[i].template_content = value;
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid> */}
                      <Grid container>
                        <OutlinedTextField
                          isRequired={false}
                          disabled
                          label="PIC"
                          variant={"outlined"}
                          value={
                            PICFiltered &&
                            PICFiltered.map((e) => e.set_value).join(",")
                          }
                          handleChange={(value: any) => {
                            programNotification[i].template_content = value;
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                    </>
                  )}
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
          );
        })
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
