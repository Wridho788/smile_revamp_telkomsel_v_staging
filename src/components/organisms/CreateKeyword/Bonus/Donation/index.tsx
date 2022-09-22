import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Stack,
  Grid,
} from "@mui/material";
import {
  OutlinedTextField,
  Subtitle,
} from "components/atoms";
import {
  ICreateKeyword,
} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  KeyWordBonusDonation,
} from "../../initial";
import { useLocationTemplateQuery } from "redux/features/location/location-api-slice";
import LocationManagement from "../LocationManagement";

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
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationOptions, isFetching } =
      useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

  const [index, setIndex] = useState<number>(-1);

  // TODO: Get Lucky Draw Notification
  useEffect(() => {
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
          name: locationOptions.find((e: any) => e["_id"] === location).name,
          location: location,
          stock: 0,
        });
      });
    }
  }, [isFetching]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">Donation</Subtitle>
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

              {/* Stock Location Management */}
              <Stack>
                {locationOptions && <LocationManagement
                    keywordCreateState={keywordCreateState}
                    keywordCreate={keywordCreate}
                    stateTrigger={stateTrigger}
                    setStateTrigger={setStateTrigger}
                />}
              </Stack>
            </>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default NotificationLuckyDraw;
