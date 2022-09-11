import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Stack,
  Button,
  Switch,
  Box,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import {
  Select,
  OutlinedTextField,
  Subtitle,
  BodyCopy,
  ResponsiveDateTimePicker,
  SmallCopy,
} from "../../../../atoms";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import {
  ICreateKeyword,
  IKeywordBonusLuckyDraw,
  IKeywordNotificationLuckyDraw,
  IKeywordNotificationLuckyDrawHelper,
} from "../../interfaces";
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
import {
  KeywordNotificationLuckyDrawHelper,
  KeywordNotificationLuckyDraw,
  KeywordBonusLuckyDraw,
} from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";

interface INotificationLuckyDrawProps {
  bonusType: string;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationLuckyDraw: React.FunctionComponent<
  INotificationLuckyDrawProps
> = ({
  bonusType,
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
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

  const keywordNotificationLuckyDrawHelper = KeywordNotificationLuckyDrawHelper;
  const [
    keywordNotificationLuckyDrawHelperState,
    setKeywordNotificationLuckyDrawHelperState,
  ] = useState<IKeywordNotificationLuckyDrawHelper[]>(
    keywordNotificationLuckyDrawHelper
  );

  const keywordNotificationLuckyDraw: IKeywordNotificationLuckyDraw[] =
    KeywordNotificationLuckyDraw;
  const [
    keywordNotificationLuckyDrawState,
    setKeywordNotificationLuckyDrawState,
  ] = useState<IKeywordNotificationLuckyDraw[]>(keywordNotificationLuckyDraw);

  const keywordBonusLuckyDraw: IKeywordBonusLuckyDraw = KeywordBonusLuckyDraw;
  const [keywordBonusLuckyDrawState, setKeywordBonusLuckyDrawState] =
    useState<IKeywordBonusLuckyDraw>(keywordBonusLuckyDraw);

  const { data: locationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);

  useEffect(() => {
    getKeywordNotification("LUCKY_DRAW_NOTIFICATION");
    keywordBonusLuckyDraw.bonus_type = bonusType;
    if (keywordBonusLuckyDraw.locations.length === 0) {
      keywordCreateState.eligibility.locations.map((location) =>
        keywordBonusLuckyDraw.locations.push({
          location_id: location,
          stock: 0,
        })
      );
    }
  }, []);

  useEffect(() => {
    setKeywordNotificationLuckyDrawHelperState(
      keywordNotificationLuckyDrawHelper
    );
  }, [keywordNotificationLuckyDrawHelper, stateTrigger]);

  useEffect(() => {
    setKeywordNotificationLuckyDrawState(keywordNotificationLuckyDraw);
  }, [keywordNotificationLuckyDraw, stateTrigger]);

  useEffect(() => {
    setKeywordBonusLuckyDrawState(keywordBonusLuckyDraw);
  }, [keywordBonusLuckyDraw, stateTrigger]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">{bonusType}</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="2vw" px="0.5vw">
          <Stack spacing="1vw" px="1.5vw" py="0.5vw">
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
                keywordNotificationLuckyDraw[idx].code_identifier = _["_id"];
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
                        keywordNotificationLuckyDrawHelperState[idx]
                          .notification_template
                      }
                      handleChange={(value: string) => {
                        keywordNotificationLuckyDrawHelper[
                          idx
                        ].notification_template = value;
                        keywordNotificationLuckyDraw[idx].notification_content =
                          templateOptions?.data?.find((e) => e["_id"] === value)
                            ?.notif_content ?? "";
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    {keywordNotificationLuckyDrawHelperState[idx]
                      .notification_template !== "" && (
                      <OutlinedTextField
                        direction="column"
                        label="Notification Content"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={
                          keywordNotificationLuckyDrawState[idx]
                            .notification_content
                        }
                        handleChange={(value: string) => {
                          keywordNotificationLuckyDraw[
                            idx
                          ].notification_content = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    )}
                    {keywordNotificationLuckyDrawHelperState[idx]
                      .notification_template !== "" && (
                      <Stack direction="row" spacing="1vw">
                        <Button
                          onClick={() => {
                            keywordNotificationLuckyDraw[
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
                            keywordNotificationLuckyDraw[
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
                            keywordNotificationLuckyDraw[
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
                      value={keywordNotificationLuckyDrawState[idx].via}
                      handleChange={(value: string) => {
                        keywordNotificationLuckyDraw[idx].via = value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                    <Stack direction="row" spacing="0.5vw" alignItems="center">
                      <Switch
                        checked={
                          keywordNotificationLuckyDrawHelperState[idx]
                            .follow_period
                        }
                        onChange={(e) => {
                          keywordNotificationLuckyDrawHelper[
                            idx
                          ].follow_period = e.target.checked;
                          if (e.target.checked) {
                            keywordNotificationLuckyDraw[idx].start_period =
                              keywordCreateState.eligibility.start_period;
                            keywordNotificationLuckyDraw[idx].end_period =
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
                          keywordNotificationLuckyDrawHelperState[idx]
                            .follow_period
                        }
                        direction="column"
                        label="From"
                        placeholder="From"
                        value={
                          keywordNotificationLuckyDrawState[idx].start_period
                        }
                        handleChange={(value: Date) => {
                          keywordNotificationLuckyDraw[idx].start_period =
                            value;
                          if (
                            keywordNotificationLuckyDrawState[idx].end_period <=
                            value
                          ) {
                            keywordNotificationLuckyDraw[idx].end_period =
                              value;
                          }
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                      <ResponsiveDateTimePicker
                        disabled={
                          keywordNotificationLuckyDrawHelperState[idx]
                            .follow_period
                        }
                        direction="column"
                        label="To"
                        placeholder="To"
                        minDateTime={
                          keywordNotificationLuckyDrawState[idx].start_period
                        }
                        value={
                          keywordNotificationLuckyDrawState[idx].end_period
                        }
                        handleChange={(value: Date) => {
                          keywordNotificationLuckyDraw[idx].end_period = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    </Stack>
                  </Stack>
                );
              })
            )}
          </Stack>
          <Grid alignItems="center" container columns={3}>
            <Grid item xs={1}>
              <OutlinedTextField
                direction="column"
                label="Prize"
                variant="outlined"
                value={keywordBonusLuckyDrawState.lucky_draw_prize}
                handleChange={(value: string) => {
                  keywordBonusLuckyDraw.lucky_draw_prize = value;
                  setStateTrigger(!stateTrigger);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Switch
                  checked={
                    keywordBonusLuckyDrawState.lucky_draw_allow_inject_coupon
                  }
                  onChange={(e) => {
                    keywordBonusLuckyDraw.lucky_draw_allow_inject_coupon =
                      e.target.checked;
                    setStateTrigger(!stateTrigger);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <SmallCopy>Allow Inject Coupon</SmallCopy>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Switch
                  checked={keywordBonusLuckyDrawState.redeem_after_verification}
                  onChange={(e) => {
                    keywordBonusLuckyDraw.redeem_after_verification =
                      e.target.checked;
                    setStateTrigger(!stateTrigger);
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <SmallCopy>Redeem After Verification</SmallCopy>
              </Stack>
            </Grid>
          </Grid>
          <Divider textAlign="left" sx={{ pt: "1vw" }}>
            <Subtitle textTransform="uppercase">
              stock per location management
            </Subtitle>
          </Divider>
          <Stack>
            <Grid container>
              <Grid item xs={5} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">
                <BodyCopy
                  align="center"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  Location
                </BodyCopy>
              </Grid>
              <Grid item xs={7} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">
                <BodyCopy
                  align="center"
                  textTransform="uppercase"
                  fontWeight="bold"
                >
                  Stock Per Location
                </BodyCopy>
              </Grid>
            </Grid>
            {keywordBonusLuckyDraw.locations.map((location, idx) => {
              const locationName = locationOptions.data.find(
                (e) => e["_id"] === location.location_id
              )?.name;
              return (
                <Grid key={`location__${idx}`} container>
                  <Grid
                    item
                    xs={5}
                    border="0.1vw solid rgba(0,0,0,0.1)"
                    p="0.8vw"
                  >
                    <BodyCopy textTransform="uppercase">
                      {locationName}
                    </BodyCopy>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    border="0.1vw solid rgba(0,0,0,0.1)"
                    p="0.8vw"
                  >
                    <OutlinedTextField
                      type="number"
                      variant="outlined"
                      InputProps={{ inputProps: { min: 0 } }}
                      value={keywordBonusLuckyDrawState.locations[
                        idx
                      ].stock.toString()}
                      handleChange={(value: number) => {
                        keywordBonusLuckyDraw.locations[idx].stock =
                          Number(value);
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  </Grid>
                </Grid>
              );
            })}
            <SmallCopy color="primary" mt="1vw">
              ** If you don't want set stock, please leave it blank
            </SmallCopy>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default NotificationLuckyDraw;
