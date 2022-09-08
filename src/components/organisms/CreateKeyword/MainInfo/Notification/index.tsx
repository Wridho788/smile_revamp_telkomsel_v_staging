import React, { Dispatch, SetStateAction } from "react";
import { Stack, Button, Switch } from "@mui/material";
import {
  Select,
  OutlinedTextField,
  Subtitle,
  BodyCopy,
  ResponsiveDateTimePicker,
} from "../../../../atoms";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useGetNotifViaQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { useNotificationTemplateQuery } from "../../../../../redux/features/notification/notification-api-slice";

interface INotificationProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Notification: React.FunctionComponent<INotificationProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: viaOptions = { data: [] } } = useGetNotifViaQuery();
  const { data: templateOptions = { data: [] } } =
    useNotificationTemplateQuery(FilterInitial);

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
          {/* {keywordCreate.keyword_notification.map((_, idx) => (
            <Stack key={idx} spacing="1vw">
              <Select
                direction="column"
                label="Notification Template"
                placeholder="Option"
                options={templateOptions.data}
                optionLabel={"notif_name"}
                value={
                  keywordCreateState.keyword_notification[idx].notification
                }
                handleChange={(value: string) => {
                  keywordCreate.keyword_notification[idx].notification = value;
                  keywordCreate.keyword_notification[idx].notification_content =
                    templateOptions?.data?.find(
                      (e) => e["_id"] === value
                    )?.notif_content;
                  setStateTrigger(!stateTrigger);
                }}
              />
              {keywordCreateState.keyword_notification[idx]
                .notification_content !== "" && (
                <OutlinedTextField
                  direction="column"
                  label="Notification Content"
                  variant="outlined"
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
              {keywordCreateState.keyword_notification[idx]
                .notification_content !== "" && (
                <Stack direction="row" spacing="1vw">
                  <Button
                    onClick={() => {
                      keywordCreate.keyword_notification[
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
                      keywordCreate.keyword_notification[
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
                      keywordCreate.keyword_notification[
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
                value={keywordCreateState.keyword_notification[idx].via}
                handleChange={(value: string) => {
                  keywordCreate.keyword_notification[idx].via = value;
                  setStateTrigger(!stateTrigger);
                }}
              />
              <Stack direction="row" spacing="0.5vw" alignItems="center">
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <BodyCopy>Follow Period of Keyword Redeem</BodyCopy>
              </Stack>
              <Stack direction="row" spacing="2vw" alignItems="center">
                <ResponsiveDateTimePicker
                  direction="column"
                  label="From"
                  placeholder="From"
                  value={keywordCreateState.eligibility.start_period}
                  handleChange={(value: string) => {
                    keywordCreate.eligibility.start_period = value;
                    if (
                      Date.parse(keywordCreateState.eligibility.end_period) <=
                      Date.parse(value)
                    ) {
                      keywordCreate.eligibility.end_period = value;
                    }
                    setStateTrigger(!stateTrigger);
                  }}
                />
                <ResponsiveDateTimePicker
                  direction="column"
                  label="To"
                  placeholder="To"
                  minDateTime={keywordCreateState.eligibility.start_period}
                  value={keywordCreateState.eligibility.end_period}
                  handleChange={(value: string) => {
                    keywordCreate.eligibility.end_period = value;
                    setStateTrigger(!stateTrigger);
                  }}
                />
              </Stack>
            </Stack>
          ))} */}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Notification;
