import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Grid, Divider } from "@mui/material";
import {
  OutlinedTextField,
  Subtitle,
  BodyCopy,
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
import {
  useGetNotifViaQuery,
  useLazyGetKeywordNotificationQuery,
} from "redux/features/lov/lov-api-slice";
import { useNotificationTemplateQuery } from "redux/features/notification/notification-api-slice";
import {
  KeywordNotificationLuckyDrawHelper,
  KeywordNotificationLuckyDraw,
  KeywordBonusMobileBanking,
} from "../../initial";
import { useLocationTemplateQuery } from "redux/features/location/location-api-slice";
import _find from "lodash/find";

interface IMobileBankingProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const MobileBanking: React.FunctionComponent<IMobileBankingProps> = ({
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
    if (index === -1) {
      keywordCreate.bonus.push(KeywordBonusMobileBanking);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "mobile_banking"
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
      bonusType === "Mobile Banking"
    ) {
      keywordCreate.notification = keywordCreate.notification.concat(
        keywordNotificationLuckyDraw
      );
    }

    setKeywordNotificationLuckyDrawState(keywordNotificationLuckyDraw);
  }, [keywordNotificationLuckyDraw, stateTrigger]);

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
              <Grid alignItems="center" spacing={2} container columns={2}>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="text"
                    direction="column"
                    label="Bank Name"
                    variant="outlined"
                    value={keywordCreateState.bonus[index].bank}
                    handleChange={(value: number) => {
                      keywordCreate.bonus[index].bank = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="text"
                    direction="column"
                    label="Digit Coupon"
                    variant="outlined"
                    value={keywordCreateState.bonus[index].digit_coupon}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].digit_coupon = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="text"
                    direction="column"
                    label="Coupon Combination"
                    variant="outlined"
                    value={keywordCreateState.bonus[index].combination_coupon}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].combination_coupon = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="text"
                    direction="column"
                    label="Bank IP Address"
                    variant="outlined"
                    value={keywordCreateState.bonus[index].ip_address}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].ip_address = value;
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

export default MobileBanking;
