import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Switch, Grid, Divider } from "@mui/material";
import {
  OutlinedTextField,
  Subtitle,
  BodyCopy,
  SmallCopy,
} from "../../../../atoms";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { KeywordBonusLoyaltyPoin } from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";

interface ILoyaltyPoinProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LoyaltyPoin: React.FunctionComponent<ILoyaltyPoinProps> = ({
  bonusType,
  bonusTypeId,
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);

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
          location_id: location,
          stock: 0,
        })
      );
    }
  }, []);

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
                {keywordCreateState.bonus[index].locations.map(
                  (location: any, idx: any) => {
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
                            value={keywordCreateState.bonus[index].locations[
                              idx
                            ].stock.toString()}
                            handleChange={(value: number) => {
                              keywordCreate.bonus[index].locations[idx].stock =
                                Number(value);
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

export default LoyaltyPoin;
