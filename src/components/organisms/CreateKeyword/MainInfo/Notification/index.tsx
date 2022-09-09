import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Stack, Button, Switch, Box, CircularProgress } from "@mui/material";
import {
  Select,
  OutlinedTextField,
  Subtitle,
  BodyCopy,
  ResponsiveDateTimePicker,
} from "../../../../atoms";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword, IKeywordNotificationInitial } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  useGetNotifViaQuery,
  useLazyGetKeywordNotificationQuery,
} from "../../../../../redux/features/lov/lov-api-slice";
import { useNotificationTemplateQuery } from "../../../../../redux/features/notification/notification-api-slice";

interface INotificationProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
  keywordNotificationInitialState: IKeywordNotificationInitial[];
  keywordNotificationInitial: IKeywordNotificationInitial[];
}

const Notification: React.FunctionComponent<INotificationProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
  keywordNotificationInitialState,
  keywordNotificationInitial,
}) => {
  const { data: viaOptions = { data: [] } } = useGetNotifViaQuery();
  const { data: templateOptions = { data: [] } } =
    useNotificationTemplateQuery(FilterInitial);

  const [
    getKeywordNotification,
    {
      data: keywordNotification = {
        data: [],
      },
      isLoading,
    },
  ] = useLazyGetKeywordNotificationQuery();

  useEffect(() => {
    getKeywordNotification("ELIGIBILITY_VERIFICATION");
  }, []);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">
          notification redeem eligibility
        </Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="1vw" px="2vw" py="0.5vw">
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "10vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            keywordNotification.data.map((_: any, idx: any) => {
              keywordCreate.notification[idx].code_identifier = _["_id"];
              return (
                <Stack
                  key={idx}
                  spacing="1vw"
                  border="0.1vw solid rgba(0, 0, 0, 0.1)"
                  borderRadius="0.3vw"
                  p="2vw"
                >
                  <Subtitle color="warning.main">{_.set_value}</Subtitle>
                  <OutlinedTextField
                    disabled={true}
                    direction="column"
                    label="Keyword Name"
                    variant="outlined"
                    value={keywordCreateState.eligibility.name}
                    handleChange={(value: string) => {
                      keywordCreate.eligibility.name = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                  <Select
                    direction="column"
                    label="Notification Template"
                    placeholder="Option"
                    options={templateOptions.data}
                    optionLabel={"notif_name"}
                    value={
                      keywordNotificationInitialState[idx].notification_template
                    }
                    handleChange={(value: string) => {
                      keywordNotificationInitial[idx].notification_template =
                        value;
                      keywordCreate.notification[idx].notification_content =
                        templateOptions?.data?.find(
                          (e) => e["_id"] === value
                        )?.notif_content;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                  {keywordNotificationInitialState[idx]
                    .notification_template !== "" && (
                    <OutlinedTextField
                      direction="column"
                      label="Notification Content"
                      variant="outlined"
                      multiline
                      rows={3}
                      value={
                        keywordCreateState.notification[idx]
                          .notification_content
                      }
                      handleChange={(value: string) => {
                        keywordCreate.notification[idx].notification_content =
                          value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  )}
                  {keywordNotificationInitialState[idx]
                    .notification_template !== "" && (
                    <Stack direction="row" spacing="1vw">
                      <Button
                        onClick={() => {
                          keywordCreate.notification[
                            idx
                          ].notification_content += `[KeywordName]`;
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                          textTransform: "capitalize",
                        }}
                      >
                        [KeywordName]
                      </Button>
                      <Button
                        onClick={() => {
                          keywordCreate.notification[
                            idx
                          ].notification_content += `[StartPeriod]`;
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                          textTransform: "capitalize",
                        }}
                      >
                        [StartPeriod]
                      </Button>
                      <Button
                        onClick={() => {
                          keywordCreate.notification[
                            idx
                          ].notification_content += `[EndPeriod]`;
                          setStateTrigger(!stateTrigger);
                        }}
                        color="primary"
                        variant="outlined"
                        endIcon={<AddBoxIcon fontSize="large" />}
                        sx={{
                          borderRadius: "0.3vw",
                          paddingInline: "1.5vw",
                          paddingBlock: "0.5vw",
                          textTransform: "capitalize",
                        }}
                      >
                        [EndPeriod]
                      </Button>
                    </Stack>
                  )}
                  <Select
                    direction="column"
                    label="Notification Via"
                    placeholder="Option"
                    options={viaOptions.data}
                    value={keywordCreateState.notification[idx].via}
                    handleChange={(value: string) => {
                      keywordCreate.notification[idx].via = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                  <Stack direction="row" spacing="0.5vw" alignItems="center">
                    <Switch
                      checked={
                        keywordNotificationInitialState[idx].follow_period
                      }
                      onChange={(e) => {
                        keywordNotificationInitial[idx].follow_period =
                          e.target.checked;
                        if (e.target.checked) {
                          keywordCreate.notification[idx].start_period =
                            keywordCreateState.eligibility.start_period;
                          keywordCreate.notification[idx].end_period =
                            keywordCreateState.eligibility.end_period;
                        }
                        setStateTrigger(!stateTrigger);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <BodyCopy>Follow Period of Keyword Redeem</BodyCopy>
                  </Stack>
                  <Stack direction="row" spacing="2vw" alignItems="center">
                    <ResponsiveDateTimePicker
                      disabled={
                        keywordNotificationInitialState[idx].follow_period
                      }
                      direction="column"
                      label="From"
                      placeholder="From"
                      value={keywordCreateState.notification[idx].start_period}
                      handleChange={(value: string) => {
                        keywordCreate.notification[idx].start_period = value;
                        if (
                          Date.parse(
                            keywordCreateState.notification[idx].end_period
                          ) <= Date.parse(value)
                        ) {
                          keywordCreate.notification[idx].end_period = value;
                        }
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <ResponsiveDateTimePicker
                      disabled={
                        keywordNotificationInitialState[idx].follow_period
                      }
                      direction="column"
                      label="To"
                      placeholder="To"
                      minDateTime={
                        keywordCreateState.notification[idx].start_period
                      }
                      value={keywordCreateState.notification[idx].end_period}
                      handleChange={(value: string) => {
                        keywordCreate.notification[idx].end_period = value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  </Stack>
                </Stack>
              );
            })
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Notification;
