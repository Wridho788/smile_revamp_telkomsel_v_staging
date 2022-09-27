import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {Box, CircularProgress, Grid, Stack} from "@mui/material";
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
import {
  useLocationRebaseMutation,
  useLocationTemplateQuery
} from "../../../../../redux/features/location/location-api-slice";
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
  const { data: locationTypeOptions = { data: [] }, isFetching } =
    useGetLocationTypeQuery();

  const [getOwnerDetail, { data: locationOptions }] =
      useLocationRebaseMutation();

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

  // useEffect(() => {
  //   getOwnerDetail({ type: keywordEligibilityLocationHelperState.location_type });
  // }, [keywordCreateState.eligibility?.eligibility_locations]);

  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">
          <Stack direction="row" spacing={2}>
            {isFetching && (<Box className="accordion-loading">
              <CircularProgress size={16}></CircularProgress>
            </Box>)}
            <Box className="accordion-subtitle">
              location redeem eligibility
            </Box>
          </Stack>
        </Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        {!isFetching && (<Stack spacing="1vw" px="2vw" py="0.5vw">
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
          {/*{keywordCreateState.eligibility.eligibility_locations && (*/}
          {/*    <Select*/}
          {/*        label="Location Type"*/}
          {/*        placeholder="Option"*/}
          {/*        options={locationTypeOptions.data}*/}
          {/*        value={keywordEligibilityLocationHelperState.location_type}*/}
          {/*        handleChange={(value: string) => {*/}
          {/*          keywordEligibilityLocationHelper.location_type = value;*/}
          {/*          setStateTrigger(!stateTrigger);*/}
          {/*        }}*/}
          {/*    />*/}
          {/*)}*/}
          {/*{keywordCreateState.eligibility.eligibility_locations && (*/}
          {/*    <Grid item xs={3}>*/}
          {/*      <Select*/}
          {/*          multiple*/}
          {/*          label="Location"*/}
          {/*          placeholder="Option"*/}
          {/*          options={locationOptions}*/}
          {/*          optionLabel={"name"}*/}
          {/*          value={keywordCreateState.eligibility.locations}*/}
          {/*          handleChange={(value: any) => {*/}
          {/*            keywordCreate.eligibility.locations = value;*/}
          {/*            setStateTrigger(!stateTrigger);*/}
          {/*          }}*/}
          {/*      />*/}
          {/*    </Grid>*/}
          {/*)}*/}
        </Stack>)}
      </AccordionDetails>
    </Accordion>
  );
};

export default Location;
