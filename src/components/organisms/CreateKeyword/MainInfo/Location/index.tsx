import React, { Dispatch, SetStateAction } from "react";
import { Button, Grid, IconButton, Stack } from "@mui/material";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  Subtitle,
  BodyCopy,
  ResponsiveTimePicker,
  ResponsiveDatePicker,
} from "../../../../atoms";
import { useCustomerBadgeListQuery } from "../../../../../redux/features/customer/customer-api-slice";
import { useGetPointTypeQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import { useChannelListQuery } from "../../../../../redux/features/channel/merchant-api-slice";
import { ICreateKeyword } from "../../interfaces";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BooleanOptions,
  KeywordScheduleTypeOptions,
  MaxModeOptions,
  PoinValueOptions,
} from "../../options";
import { useProgramListQuery } from "../../../../../redux/features/program/program-api-slice";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputAdornment from "@mui/material/InputAdornment";

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
  const { data: pointTypeOptions = { data: [] } } = useGetPointTypeQuery();
  const { data: programListOptions = { data: [] } } =
    useProgramListQuery(FilterInitial);
  const { data: channelOptions = { data: [] } } =
    useChannelListQuery(FilterInitial);
  // const { data: customerBadgeOptions = { data: [] } } =
  //   useCustomerBadgeListQuery(FilterInitial);
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
              options={programListOptions.data}
              optionLabel="name"
              value={keywordCreateState.multiwhitelist_program}
              handleChange={(value: string) => {
                keywordCreate.multiwhitelist_program = value;
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          {/* {keywordCreateState.eligibility_locations !== false && (
            <Stack gap="1vw" pt="1vw">
              {keywordCreate.keyword_schedule_shift.map((_, idx) => (
                <Grid
                  key={`keywordScheduleShift__item__${idx}`}
                  container
                  columns={7}
                  spacing="1vw"
                >
                  <Grid item xs={3}>
                    <ResponsiveTimePicker
                      direction="column"
                      label="From"
                      placeholder="From"
                      value={
                        keywordCreateState.keyword_schedule_shift[idx].from
                      }
                      handleChange={(value: any) => {
                        keywordCreate.keyword_schedule_shift[idx].from = value;
                        if (
                          Date.parse(
                            keywordCreateState.keyword_schedule_shift[idx].to
                          ) <= Date.parse(value)
                        ) {
                          keywordCreate.keyword_schedule_shift[idx].to = value;
                        }
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <ResponsiveTimePicker
                      direction="column"
                      label="To"
                      placeholder="To"
                      minTime={
                        keywordCreateState.keyword_schedule_shift[idx].from
                      }
                      value={keywordCreateState.keyword_schedule_shift[idx].to}
                      handleChange={(value: any) => {
                        keywordCreate.keyword_schedule_shift[idx].to = value;
                        setStateTrigger(!stateTrigger);
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                    mt="1.3vw"
                  >
                    <IconButton
                      onClick={() => {
                        keywordCreate.keyword_schedule_shift.length > 1 &&
                          keywordCreate.keyword_schedule_shift.splice(idx, 1);
                        setStateTrigger(!stateTrigger);
                      }}
                      aria-label="delete"
                      size="large"
                      sx={{ color: "primary.main" }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Button
                onClick={() => {
                  keywordCreate.keyword_schedule_shift.push({
                    from: new Date().getTime(),
                    to: new Date().getTime(),
                  });
                  setStateTrigger(!stateTrigger);
                }}
                color="primary"
                startIcon={<AddBoxIcon fontSize="large" />}
                sx={{
                  paddingInline: "1.5vw",
                  paddingBlock: "0.5vw",
                }}
              >
                Add Location
              </Button>
            </Stack>
          )} */}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default Location;
