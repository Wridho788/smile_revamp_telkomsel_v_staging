import React, { Dispatch, SetStateAction } from "react";
import { Button, Divider, Grid, IconButton, Stack } from "@mui/material";
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

interface IGeneralProps {
  keywordCreateState: ICreateKeyword;
  keywordCreate: ICreateKeyword;
  stateTrigger: boolean;
  setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const General: React.FunctionComponent<IGeneralProps> = ({
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
  const { data: customerBadgeOptions = { data: [] } } =
    useCustomerBadgeListQuery(FilterInitial);
  return (
    <Accordion sx={{ p: "1vw" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon fontSize="large" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Subtitle textTransform="uppercase">
          general redeem eligibility
        </Subtitle>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing="1vw" px="2vw" py="0.5vw">
          <OutlinedTextField
            label="Keyword Group"
            placeholder="Keyword Group"
            variant="outlined"
            value={keywordCreateState.keyword_parent}
            handleChange={(value: string) => {
              keywordCreate.keyword_parent = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <OutlinedTextField
            label="Keyword Name"
            placeholder="Merdeka2000"
            variant="outlined"
            inputProps={{ maxLength: 16 }}
            value={keywordCreateState.name}
            handleChange={(value: string) => {
              keywordCreate.name = value.replace(/\s/g, "");
              setStateTrigger(!stateTrigger);
            }}
          />
          <ResponsiveDateTimePicker
            label="Start Period"
            placeholder="Start Period"
            value={keywordCreateState.start_period}
            handleChange={(value: string) => {
              keywordCreate.start_period = value;
              if (
                Date.parse(keywordCreateState.end_period) <= Date.parse(value)
              ) {
                keywordCreate.end_period = value;
              }
              setStateTrigger(!stateTrigger);
            }}
          />
          <ResponsiveDateTimePicker
            label="End Period"
            placeholder="End Period"
            minDateTime={keywordCreateState.start_period}
            value={keywordCreateState.end_period}
            handleChange={(value: string) => {
              keywordCreate.end_period = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Point Type"
            placeholder="Option"
            options={pointTypeOptions.data}
            value={keywordCreateState.point_type}
            handleChange={(value: string) => {
              keywordCreate.point_type = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Point Value"
            placeholder="Option"
            options={PoinValueOptions}
            value={keywordCreateState.poin_value}
            handleChange={(value: string) => {
              keywordCreate.poin_value = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <OutlinedTextField
            type="number"
            label="POIN Redeemed"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={keywordCreateState.poin_redeemed.toString()}
            handleChange={(value: number) => {
              keywordCreate.poin_redeemed = Number(value);
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Max Mode"
            placeholder="Option"
            options={MaxModeOptions}
            value={keywordCreateState.max_mode}
            handleChange={(value: string) => {
              keywordCreate.max_mode = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <OutlinedTextField
            type="number"
            label="Max Redeem Counter"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={keywordCreateState.max_redeem_counter.toString()}
            handleChange={(value: number) => {
              keywordCreate.max_redeem_counter = Number(value);
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Merchandise Keyword"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.merchandise_keyword}
            handleChange={(value: boolean) => {
              keywordCreate.merchandise_keyword = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Enable SMS Masking"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.enable_sms_masking}
            handleChange={(value: boolean) => {
              keywordCreate.enable_sms_masking = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.enable_sms_masking !== false && (
            <OutlinedTextField
              label="SMS Masking Content"
              placeholder="SMS Masking Content"
              variant="outlined"
              value={keywordCreateState.sms_masking}
              handleChange={(value: string) => {
                keywordCreate.sms_masking = value;
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          <Select
            label="Keyword Schedule"
            placeholder="Option"
            options={KeywordScheduleTypeOptions}
            value={keywordCreateState.keyword_schedule_type}
            handleChange={(value: string) => {
              keywordCreate.keyword_schedule_type = value;
              keywordCreate.keyword_schedule_shift = [
                {
                  from: new Date(),
                  to: new Date(),
                },
              ];
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.keyword_schedule_type === "Shift" && (
            <Grid container columns={11}>
              <Grid item xs={4}>
                <BodyCopy>Shift</BodyCopy>
              </Grid>
              <Grid item xs={7}>
                <Stack gap="1vw">
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
                            keywordCreate.keyword_schedule_shift[idx].from =
                              value;
                            if (
                              Date.parse(
                                keywordCreateState.keyword_schedule_shift[idx]
                                  .to
                              ) <= Date.parse(value)
                            ) {
                              keywordCreate.keyword_schedule_shift[idx].to =
                                value;
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
                          value={
                            keywordCreateState.keyword_schedule_shift[idx].to
                          }
                          handleChange={(value: any) => {
                            keywordCreate.keyword_schedule_shift[idx].to =
                              value;
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
                              keywordCreate.keyword_schedule_shift.splice(
                                idx,
                                1
                              );
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
                    Add Shift Time
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
          {keywordCreateState.keyword_schedule_type === "Daily" && (
            <Grid container columns={11}>
              <Grid item xs={4}>
                <BodyCopy>Daily</BodyCopy>
              </Grid>
              <Grid item xs={7}>
                <Stack gap="1vw">
                  {keywordCreate.keyword_schedule_shift.map((_, idx) => (
                    <Grid
                      key={`keywordScheduleShift__item__${idx}`}
                      container
                      columns={7}
                      spacing="1vw"
                    >
                      <Grid item xs={3}>
                        <ResponsiveDatePicker
                          direction="column"
                          label="From"
                          placeholder="From"
                          value={
                            keywordCreateState.keyword_schedule_shift[idx].from
                          }
                          handleChange={(value: any) => {
                            keywordCreate.keyword_schedule_shift[idx].from =
                              value;
                            if (
                              Date.parse(
                                keywordCreateState.keyword_schedule_shift[idx]
                                  .to
                              ) <= Date.parse(value)
                            ) {
                              keywordCreate.keyword_schedule_shift[idx].to =
                                value;
                            }
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ResponsiveDatePicker
                          direction="column"
                          label="To"
                          placeholder="To"
                          minDate={
                            keywordCreateState.keyword_schedule_shift[idx].from
                          }
                          value={
                            keywordCreateState.keyword_schedule_shift[idx].to
                          }
                          handleChange={(value: any) => {
                            keywordCreate.keyword_schedule_shift[idx].to =
                              value;

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
                              keywordCreate.keyword_schedule_shift.splice(
                                idx,
                                1
                              );
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
                        from: new Date(),
                        to: new Date(),
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
                    Add Daily Time
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
          {keywordCreateState.keyword_schedule_type === "Hourly" && (
            <Grid container columns={11}>
              <Grid item xs={4}>
                <BodyCopy>Hourly</BodyCopy>
              </Grid>
              <Grid item xs={7}>
                <Stack gap="1vw">
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
                            keywordCreate.keyword_schedule_shift[idx].from =
                              value;
                            if (
                              Date.parse(
                                keywordCreateState.keyword_schedule_shift[idx]
                                  .to
                              ) <= Date.parse(value)
                            ) {
                              keywordCreate.keyword_schedule_shift[idx].to =
                                value;
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
                          value={
                            keywordCreateState.keyword_schedule_shift[idx].to
                          }
                          handleChange={(value: any) => {
                            keywordCreate.keyword_schedule_shift[idx].to =
                              value;
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
                              keywordCreate.keyword_schedule_shift.splice(
                                idx,
                                1
                              );
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
                    Add Hourly Time
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )}
          <Select
            label="Subsidized Program"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.program_bersubsidi}
            handleChange={(value: boolean) => {
              keywordCreate.program_bersubsidi = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <OutlinedTextField
            type="number"
            label="Total Budget"
            variant="outlined"
            InputProps={{
              inputProps: { min: 0 },
              startAdornment: (
                <InputAdornment position="start">Rp</InputAdornment>
              ),
            }}
            value={keywordCreateState.total_anggaran.toString()}
            handleChange={(value: number) => {
              keywordCreate.total_anggaran = Number(value);
              setStateTrigger(!stateTrigger);
            }}
          />
          <OutlinedTextField
            type="number"
            label="Customer Value"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={keywordCreateState.customer_value.toString()}
            handleChange={(value: number) => {
              keywordCreate.customer_value = Number(value);
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            label="Multiwhitelist"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.multiwhitelist}
            handleChange={(value: boolean) => {
              keywordCreate.multiwhitelist = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.multiwhitelist !== false && (
            <Select
              label="Multiwhitelist Destination"
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
          <Select
            label="Channel Validation"
            placeholder="Option"
            options={BooleanOptions}
            value={keywordCreateState.channel_validation}
            handleChange={(value: boolean) => {
              keywordCreate.channel_validation = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          {keywordCreateState.channel_validation !== false && (
            <Select
              multiple
              label="Channel List"
              placeholder="Option"
              options={channelOptions.data}
              optionLabel="name"
              value={keywordCreateState.channel_validation_list}
              handleChange={(value: []) => {
                keywordCreate.channel_validation_list = value;
                setStateTrigger(!stateTrigger);
              }}
            />
          )}
          <Select
            multiple
            label="Program Experience"
            placeholder="Option"
            options={customerBadgeOptions.data}
            optionLabel="name"
            value={keywordCreateState.program_experience}
            handleChange={(value: []) => {
              keywordCreate.program_experience = value;
              setStateTrigger(!stateTrigger);
            }}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default General;
