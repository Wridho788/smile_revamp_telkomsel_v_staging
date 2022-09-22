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
} from "components/atoms";
import { FilterInitial } from "redux/utils/initial-general";
import {
  ICreateKeyword,
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
} from "redux/features/lov/lov-api-slice";
import { useNotificationTemplateQuery } from "redux/features/notification/notification-api-slice";
import {
  KeywordNotificationLuckyDrawHelper,
  KeywordNotificationLuckyDraw,
  KeywordBonusLuckyDraw,
  KeyWordBonusDonation,
} from "../../initial";
import { useLocationTemplateQuery } from "redux/features/location/location-api-slice";
import _find from "lodash/find";

interface INotificationLuckyDrawProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationLuckyDraw: React.FunctionComponent<
  INotificationLuckyDrawProps
> = ({
  bonusType,
  bonusTypeId,
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

  const { data: locationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);

  const [index, setIndex] = useState<number>(-1);

  // TODO: Get Lucky Draw Notification
  useEffect(() => {
    getKeywordNotification("LUCKY_DRAW_NOTIFICATION");

    // Initial Keyword Bonus Lucky Draw
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "donation"
    );

    if (index === -1) {
      keywordCreate.bonus.push(KeyWordBonusDonation);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "donation"
      );
      setIndex(bonusIdx);
      keywordCreateState.eligibility.locations.map((location) => {
        keywordCreate.bonus[bonusIdx].stock_location.push({
          location: location,
          stock: 0,
        });
      });
    }
  }, []);

  useEffect(() => {
    setKeywordNotificationLuckyDrawHelperState(
      keywordNotificationLuckyDrawHelper
    );
  }, [keywordNotificationLuckyDrawHelper, stateTrigger]);

  useEffect(() => {
    // Prevent duplicate data of "Lucky Draw"
    if (
      !_find(
        keywordCreate.notification,
        ({ bonus_type_id }) => bonus_type_id === bonusTypeId
      ) &&
      bonusType === "donation"
    ) {
      keywordCreate.notification = keywordCreate.notification.concat(
        keywordNotificationLuckyDraw
      );
    }

    setKeywordNotificationLuckyDrawState(keywordNotificationLuckyDraw);
  }, [keywordNotificationLuckyDraw, stateTrigger]);

  console.log(locationOptions);
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
          {index !== -1 && (
            <>
              <Grid alignItems="center" container columns={3}>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="text"
                    direction="column"
                    label="Donation Category"
                    variant="outlined"
                    value={keywordCreateState.bonus[index].donation_category}
                    handleChange={(value: number) => {
                      keywordCreate.bonus[index].donation_category = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="number"
                    direction="column"
                    label="Minimum POIN"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={keywordCreateState.bonus[
                      index
                    ].minimum_poin.toString()}
                    handleChange={(value: number) => {
                      keywordCreate.bonus[index].minimum_poin = Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="number"
                    direction="column"
                    label="Target POIN"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={keywordCreateState.bonus[
                      index
                    ].target_poin.toString()}
                    handleChange={(value: number) => {
                      keywordCreate.bonus[index].target_poin = Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
              </Grid>
              <Divider textAlign="left" sx={{ pt: "1vw" }}>
                <Subtitle textTransform="uppercase">
                  stock per location management
                </Subtitle>
              </Divider>
              <Stack>
                <Grid container>
                  <Grid
                    item
                    xs={5}
                    border="0.1vw solid rgba(0,0,0,0.1)"
                    p="0.8vw"
                  >
                    <BodyCopy
                      align="center"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      Location
                    </BodyCopy>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                    border="0.1vw solid rgba(0,0,0,0.1)"
                    p="0.8vw"
                  >
                    <BodyCopy
                      align="center"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      Stock Per Location
                    </BodyCopy>
                  </Grid>
                </Grid>
                {keywordCreateState.bonus[index].stock_location.map(
                  (location: any, idx: any) => {
                    const locationName = locationOptions.data.find(
                      (e) => e["_id"] === location.location
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
                            isRequired={false}
                            type="number"
                            variant="outlined"
                            InputProps={{ inputProps: { min: 0 } }}
                            value={keywordCreateState.bonus[
                              index
                            ].stock_location[idx].stock.toString()}
                            handleChange={(value: number) => {
                              keywordCreate.bonus[index].stock_location[
                                idx
                              ].stock = Number(value);
                              setStateTrigger(!stateTrigger);
                            }}
                          />
                        </Grid>
                      </Grid>
                    );
                  }
                )}
                <SmallCopy color="primary" mt="1vw">
                  ** If you don't want set stock, please leave it blank
                </SmallCopy>
              </Stack>
            </>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default NotificationLuckyDraw;
