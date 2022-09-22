import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Switch, Grid } from "@mui/material";
import {
  OutlinedTextField,
  Subtitle,
  SmallCopy,
} from "../../../../atoms";
import { ICreateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { KeywordBonusLoyaltyPoin } from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import LocationManagement from "../LocationManagement";

interface ILoyaltyPoinProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LoyaltyPoin: React.FunctionComponent<ILoyaltyPoinProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationOptions, isFetching } =
      useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

  const [index, setIndex] = useState<number>(-1);

  // TODO: Get Loyalty Poin Bonus
  useEffect(() => {
    // Initial Keyword Bonus Loyalty Poin
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "loyalty_poin"
    );

    if (index === -1) {
      keywordCreate.bonus.push(KeywordBonusLoyaltyPoin);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "loyalty_poin"
      );
      setIndex(bonusIdx);

      keywordCreateState.eligibility.locations.map((location) =>
        keywordCreate.bonus[bonusIdx].locations.push({
          name: locationOptions.find((e: any) => e["_id"] === location).name,
          location_id: location,
          stock: 0,
        })
      );
    }
  }, [isFetching]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">Loyalty Poin</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="2vw" px="0.5vw">
          {index !== -1 && (
            <>
              <Grid alignItems="center" container columns={3}>
                <Grid item xs={1}>
                  <OutlinedTextField
                    type="number"
                    direction="column"
                    label="Earning Poin"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={keywordCreateState.bonus[
                      index
                    ].earning_poin.toString()}
                    handleChange={(value: number) => {
                      keywordCreate.bonus[index].earning_poin = Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Switch
                      checked={
                        keywordCreateState.bonus[index]
                          .redeem_after_verification
                      }
                      onChange={(e) => {
                        keywordCreate.bonus[index].redeem_after_verification =
                          e.target.checked;
                        setStateTrigger(!stateTrigger);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                    <SmallCopy>Redeem After Verification</SmallCopy>
                  </Stack>
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

export default LoyaltyPoin;
