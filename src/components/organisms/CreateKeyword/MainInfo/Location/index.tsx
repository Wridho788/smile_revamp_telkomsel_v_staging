import React, { Dispatch, SetStateAction } from "react";
import { Grid, Stack } from "@mui/material";
import { Select, Subtitle } from "../../../../atoms";
import { useGetLocationTypeQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { ICreateKeyword } from "../../interfaces";
import { BooleanOptions } from "../../options";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IKeywordLocationTypeGeneral } from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";

interface ILocationProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
  keywordLocationTypeState: IKeywordLocationTypeGeneral;
  keywordLocationType: IKeywordLocationTypeGeneral;
}

const Location: React.FunctionComponent<ILocationProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
  keywordLocationTypeState,
  keywordLocationType,
}) => {
  const { data: locationTypeOptions = { data: [] } } =
    useGetLocationTypeQuery();
  const { data: locationOptions = { data: [] } } =
    useLocationTemplateQuery(FilterInitial);

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
            value={keywordCreateState.eligibility_locations}
            handleChange={(value: boolean) => {
              keywordCreate.eligibility_locations = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.eligibility_locations !== false && (
            <Select
              label="Location Type"
              placeholder="Option"
              options={locationTypeOptions.data}
              value={keywordLocationTypeState.location_type}
              handleChange={(value: string) => {
                keywordLocationType.location_type = value;
                keywordCreate.locations = [];
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {keywordLocationTypeState.location_type.length > 0 &&
            locationOptions.data.find(
              (e) => e["type"] === keywordLocationTypeState.location_type
            ) !== undefined && (
              <Grid item xs={3}>
                <Select
                  multiple
                  label="Location"
                  placeholder="Option"
                  options={[
                    locationOptions.data.find(
                      (e) =>
                        e["type"] === keywordLocationTypeState.location_type
                    ),
                  ]}
                  optionLabel={"name"}
                  value={keywordCreateState.locations}
                  handleChange={(value: any) => {
                    keywordCreate.locations = value;
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
