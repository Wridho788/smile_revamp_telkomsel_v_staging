import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { Select, Subtitle } from "../../../../atoms";
import { useGetLocationTypeQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import {
  IUpdateKeyword,
  IKeywordEligibilityLocationHelper,
} from "../../interfaces";
import { BooleanOptions } from "../../options";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import { KeywordEligibilityLocationHelper } from "../../initial";

interface ILocationProps {
  keywordCreateState: IUpdateKeyword;
  keywordCreate: IUpdateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Location: React.FunctionComponent<ILocationProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
  const { data: locationTypeOptions = { data: [] } } =
    useGetLocationTypeQuery();
  const { data: locationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);

  const keywordEligibilityLocationHelper = KeywordEligibilityLocationHelper;
  const [
    keywordEligibilityLocationHelperState,
    setKeywordEligibilityLocationHelperState,
  ] = useState<IKeywordEligibilityLocationHelper>(
    keywordEligibilityLocationHelper
  );

  useEffect(() => {
    setKeywordEligibilityLocationHelperState(keywordEligibilityLocationHelper);
  }, [keywordEligibilityLocationHelper, stateTrigger]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">
          location redeem eligibility
        </Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="1vw" px="2vw" py="0.5vw">
          <Select
            label="Eligibility Location"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.eligibility.eligibility_locations}
            handleChange={(value: boolean) => {
              keywordCreate.eligibility.eligibility_locations = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.eligibility.eligibility_locations !== false && (
            <Select
              label="Location Type"
              placeholder="Option"
              options={locationTypeOptions.data}
              value={keywordEligibilityLocationHelperState.location_type}
              handleChange={(value: string) => {
                keywordEligibilityLocationHelper.location_type = value;
                keywordCreate.eligibility.locations = [];
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordEligibilityLocationHelperState.location_type.length > 0 &&
            locationOptions.data.find(
              (e) =>
                e["type"] ===
                keywordEligibilityLocationHelperState.location_type
            ) !== undefined && (
              <Grid item xs={3}>
                <Select
                  multiple
                  label="Location"
                  placeholder="Option"
                  options={locationOptions.data.filter(
                    (e) =>
                      e["type"] ===
                      keywordEligibilityLocationHelperState.location_type
                  )}
                  optionLabel={"name"}
                  value={keywordCreateState.eligibility.locations}
                  handleChange={(value: any) => {
                    keywordCreate.eligibility.locations = value;
                    setStateTrigger(!stateTrigger);
                  }}
                />
              </Grid>
            )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Location;
