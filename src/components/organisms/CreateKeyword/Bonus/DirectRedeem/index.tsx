import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Switch, Grid } from "@mui/material";
import {
  Subtitle,
  SmallCopy,
  Select,
} from "../../../../atoms";
import { ICreateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { KeywordBonusDirectRedeem } from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import { StockTypeOptions } from "../../options";
import LocationManagement from "../LocationManagement";

interface IDirectRedeemProps {
  bonusType: string;
  bonusTypeId: any;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const DirectRedeem: React.FunctionComponent<IDirectRedeemProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationOptions, isFetching } =
      useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

  const [index, setIndex] = useState<number>(-1);

  // TODO: Get Direct Redeem Bonus
  useEffect(() => {
    // Initial Keyword Bonus Direct Redeem
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "direct_redeem"
    );

    if (locationOptions && index === -1) {
      keywordCreate.bonus.push(KeywordBonusDirectRedeem);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "direct_redeem"
      );
      setIndex(bonusIdx);

      if (locationOptions) {
        keywordCreateState.eligibility.locations.map((location) =>
            keywordCreateState.bonus[bonusIdx].locations.push({
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
        <Subtitle textTransform="uppercase">Direct Redeem</Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="2vw" px="0.5vw">
          {index !== -1 && (
            <>
              <Grid alignItems="center" container columns={3}>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Stock Type"
                    placeholder="Option"
                    options={StockTypeOptions}
                    value={keywordCreateState.bonus[index].stock_type}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].stock_type = value;
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
                    bonusType="direct_redeem"
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

export default DirectRedeem;
