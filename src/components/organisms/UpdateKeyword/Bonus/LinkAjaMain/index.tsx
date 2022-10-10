import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Box, Grid } from "@mui/material";
import { OutlinedTextField, Select, Subtitle } from "../../../../atoms";
import { ICreateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationManagement from "../LocationManagement";
import {
  useLocationRebaseMutation,
  useLocationTemplateQuery,
} from "../../../../../redux/features/location/location-api-slice";
import { KeywordBonusLinkAjaMain } from "../../initial";
import { BooleanOptions } from "components/organisms/UpdateKeyword/options";
import { useGetLocationTypeQuery } from "redux/features/lov/lov-api-slice";
import { useAccountAuthenticateQuery } from "redux/features/account/account-api-slice";

interface INotificationLinkAjaMainProps {
  bonusType: string;
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LinkAjaMain: React.FunctionComponent<INotificationLinkAjaMainProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationTypeOptions = { data: [] } } =
    useGetLocationTypeQuery();
  const { data: accountAuth } = useAccountAuthenticateQuery();
  const { data: locationOptions, isFetching } = useLocationTemplateQuery({
    type: keywordCreate.eligibility.location_type,
  });
  const [getOwnerDetail, { data: locationDetailOptions }] =
    useLocationRebaseMutation();

  const [index, setIndex] = useState<number>(-1);

  useEffect(() => {
    // Initial Keyword Bonus Link Aja Main
    const index = keywordCreate.bonus.findIndex(
      ({ bonus_type }) => bonus_type === "linkaja_main"
    );

    if (
      (locationOptions && index === -1) ||
      !keywordCreate.eligibility.eligibility_locations
    ) {
      keywordCreate.bonus.push(KeywordBonusLinkAjaMain);
      const bonusIdx = keywordCreate.bonus.findIndex(
        ({ bonus_type }) => bonus_type === "linkaja_main"
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
        <Subtitle textTransform="uppercase">Link Aja Main</Subtitle>
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
                    label="Nominal"
                    variant="outlined"
                    InputProps={{ inputProps: { min: 0 } }}
                    value={keywordCreate.bonus[index].nominal.toString()}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].nominal = Number(value);
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="External API Configuration"
                    placeholder="Option"
                    options={BooleanOptions}
                    value={keywordCreate.bonus[index].external_api_config}
                    handleChange={(value: boolean) => {
                      keywordCreate.bonus[index].external_api_config = value;
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container columns={3} spacing={2}>
                <Grid item xs={1}>
                  <Select
                    direction="column"
                    label="Location"
                    placeholder="Option"
                    options={locationTypeOptions.data.filter((item) => {
                      if (
                        accountAuth?.account_location.location_detail.type ===
                        "62ffc0fc8a01008799e785be"
                      ) {
                        const scope: any = [
                          "62ffc0fc8a01008799e785bc",
                          "62ffc0fc8a01008799e785bd",
                        ];
                        if (!scope.includes(item._id)) {
                          return item;
                        }
                      } else {
                        return item;
                      }
                    })}
                    value={keywordCreate.bonus[index].location}
                    handleChange={(value: string) => {
                      keywordCreate.bonus[index].location = value;
                      keywordCreate.bonus[index].location_detail = "";
                      keywordCreate.bonus[index].bucket = "";
                      getOwnerDetail({ type: value });
                      setStateTrigger(!stateTrigger);
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  {keywordCreate.bonus[index].location !== "" && (
                    <Select
                      direction="column"
                      label="Location Detail"
                      placeholder="Option"
                      options={locationDetailOptions}
                      optionLabel={"name"}
                      value={keywordCreate.bonus[index].location_detail}
                      handleChange={(value: any) => {
                        keywordCreate.bonus[index].location_detail = value;
                        keywordCreate.bonus[index].bucket = "";
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={1}>
                  {keywordCreate.bonus[index].location_detail !== "" &&
                    locationDetailOptions?.find(
                      (e: any) =>
                        e["_id"] === keywordCreate.bonus[index].location_detail
                    )?.bucket !== undefined && (
                      <Select
                        direction="column"
                        label="Bucket"
                        placeholder="Option"
                        options={
                          locationDetailOptions.find(
                            (e: any) =>
                              e["_id"] ===
                              keywordCreate.bonus[index].location_detail
                          )?.bucket ?? []
                        }
                        optionLabel={"name"}
                        value={keywordCreate.bonus[index].bucket}
                        handleChange={(value: any) => {
                          keywordCreate.bonus[index].bucket = value;
                          setStateTrigger(!stateTrigger);
                        }}
                      />
                    )}
                </Grid>
              </Grid>
            </Box>

            {/* Stock Location Management */}
            <Stack>
              {locationOptions && (
                <LocationManagement
                  bonusType="linkaja_main"
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

export default LinkAjaMain;
