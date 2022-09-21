import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { Select, Subtitle } from "../../../../atoms";
import { useGetLocationTypeQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import {
  ICreateKeyword,
  IKeywordEligibilityLocationHelper,
} from "../../interfaces";
import { BooleanOptions } from "../../options";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useLocationRebaseMutation,
  useLocationTemplateQuery
} from "../../../../../redux/features/location/location-api-slice";
import { KeywordEligibilityLocationHelper } from "../../initial";
import {useAccountAuthenticateQuery} from "../../../../../redux/features/account/account-api-slice";

interface ILocationProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
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
  // const { data: locationOptions = { data: [] } } =
  //   useLocationTemplateQuery(FilterInitial);

  const [getOwnerDetail, {data: locationOptions}] =
      useLocationRebaseMutation();

  const { data: accountAuth, isFetching } = useAccountAuthenticateQuery();
  useEffect(() => {
    keywordEligibilityLocationHelperState.location_type = accountAuth?.account_location.location_detail.type;
    setStateTrigger(!stateTrigger);
  }, [isFetching]);

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
              optionLabel="set_value"
              options={locationTypeOptions.data}
              value={keywordEligibilityLocationHelperState.location_type}
              handleChange={(value: string) => {
                keywordEligibilityLocationHelper.location_type = value;
                keywordCreate.eligibility.locations = [];
                getOwnerDetail({ type: value });
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordEligibilityLocationHelperState.location_type.length > 0 &&
            locationOptions.data.find(
              (e: any) =>
                e["type"] ===
                keywordEligibilityLocationHelperState.location_type
            ) !== undefined && (
              <Grid item xs={3}>
                <Select
                  multiple
                  label="Location"
                  placeholder="Option"
                  options={locationOptions.data.filter(
                    (e: any) =>
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
