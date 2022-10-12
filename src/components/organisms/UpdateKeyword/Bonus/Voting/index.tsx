import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Box, Grid } from "@mui/material";
import { OutlinedTextField, Subtitle } from "../../../../atoms";
import { ICreateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationManagement from "../LocationManagement";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import { KeywordBonusVoting } from "../../initial";

interface IVotingProps {
  bonusType: string;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Voting: React.FunctionComponent<IVotingProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationOptions, isFetching } = useLocationTemplateQuery({
    type: keywordCreate.eligibility.location_type,
  });

  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    // Initial Keyword Bonus Voting
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "voting"
    );

    if (
      (locationOptions && index === -1) ||
      !keywordCreate.eligibility.eligibility_locations
    ) {
      keywordCreate.bonus.push(KeywordBonusVoting);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "voting"
      );
      setIndex(bonusIdx);

      if (locationOptions && keywordCreate.eligibility.eligibility_locations) {
        keywordCreateState.eligibility.locations.map((location) =>
          keywordCreateState.bonus[bonusIdx].stock_location.push({
            name: locationOptions.find((e: any) => e["_id"] === location).name,
            location_id: location,
            stock: 0,
          })
        );
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
        <Subtitle textTransform="uppercase">Voting</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        {index !== -1 && (
          <Stack spacing="2vw" px="0.5vw">
            <Box>
              <Grid container columns={3} spacing={2}>
                <Grid item xs={1}>
                  <OutlinedTextField
                    direction="column"
                    type="number"
                    label="Target Redeemer"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={keywordCreate.bonus[
                      index
                    ].target_redeemer.toString()}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].target_redeemer =
                        Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>

            {/* Stock Location Management */}
            <Stack>
              {locationOptions && (
                <LocationManagement
                  bonusType="voting"
                  keywordCreateState={keywordCreateState}
                  keywordCreate={keywordCreate}
                  stateTrigger={stateTrigger}
                  setStateTrigger={setStateTrigger}
                />
              )}
            </Stack>
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default Voting;
