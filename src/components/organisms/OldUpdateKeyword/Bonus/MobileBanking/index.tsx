import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Grid } from "@mui/material";
import {
  OutlinedTextField,
  Subtitle,

} from "components/atoms";
// import { FilterInitial } from "redux/utils/initial-general";
import {
  IUpdateKeyword,

} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  KeywordBonusMobileBanking,
} from "../../initial";
import { useLocationTemplateQuery } from "redux/features/location/location-api-slice";
import LocationManagement from "../LocationManagement";

interface IMobileBankingProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: IUpdateKeyword;
  keywordCreate: IUpdateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const MobileBanking: React.FunctionComponent<IMobileBankingProps> = ({
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
    // Initial Keyword Bonus Mobile Banking
    const index = keywordCreate.bonus.findIndex(
        ({bonus_type}) => bonus_type === "mbp"
    );

    if ((locationOptions && index === -1) || !keywordCreate.eligibility.eligibility_locations) {
      keywordCreate.bonus.push(KeywordBonusMobileBanking);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "mbp"
      );

      setIndex(bonusIdx);

      if (locationOptions && keywordCreate.eligibility.eligibility_locations) {
        keywordCreateState.eligibility.locations.map((location) => {
          keywordCreateState.bonus[bonusIdx].stock_location.push({
            name: locationOptions.find((e: any) => e["_id"] === location).name,
            location: location,
            stock: 0,
          });
        });

        setStateTrigger(!stateTrigger);
      }
    }
  }, [isFetching]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">Mobile Banking</Subtitle>
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

              {/* Stock Location Management */}
              <Stack>
                {locationOptions && <LocationManagement
                    bonusType="mbp"
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

export default MobileBanking;
