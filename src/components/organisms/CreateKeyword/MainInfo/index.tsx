import { Box, Button, Divider, Grid, IconButton, Stack } from "@mui/material";
import * as React from "react";
import {
  MainInfoAuction,
  MainInfoCoreProduct,
  MainInfoDirectRedeem,
  MainInfoDonation,
  MainInfoLuckyDraw,
} from "..";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  Subtitle,
  BodyCopy,
  ResponsiveTimePicker,
  ResponsiveDatePicker,
} from "../../../atoms";
import {
  useCustomerListQuery,
  useCustomerTierListQuery,
} from "../../../../redux/features/customer/customer-api-slice";
import {
  useGetKeywordTypeQuery,
  useGetPointTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../redux/utils/initial-general";
import { useKeywordListQuery } from "../../../../redux/features/keyword/keyword-api-slice";
import { CreateKeywordGeneral } from "../initial";
import { useState } from "react";
import { useMerchantManagementListQuery } from "../../../../redux/features/merchant/merchant-api-slice";
import { useChannelListQuery } from "../../../../redux/features/channel/merchant-api-slice";
import { ICreateKeyword } from "../interfaces";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BooleanOptions,
  KeywordScheduleTypeOptions,
  MaxModeOptions,
  PoinValueOptions,
} from "../options";
import { useProgramListQuery } from "../../../../redux/features/program/program-api-slice";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const { data: keywordTypeOptions = { data: [] } } = useGetKeywordTypeQuery();
  const { data: programListOptions = { data: [] } } =
    useProgramListQuery(FilterInitial);
  const { data: channelOptions = { data: [] } } =
    useChannelListQuery(FilterInitial);

  const { data: customerTierOption = { data: [] } } =
    useCustomerTierListQuery(FilterInitial);
  const { data: pointTypeOption = { data: [] } } = useGetPointTypeQuery();
  const { data: keywordParentOption = { data: [] } } =
    useKeywordListQuery(FilterInitial);
  const { data: merchantManagementOption = { data: [] } } =
    useMerchantManagementListQuery(FilterInitial);

  const { data: customerOption = { data: [] } } =
    useCustomerListQuery(FilterInitial);

  const keywordCreate = CreateKeywordGeneral;

  const [keywordCreateState, setKeywordCreateState] =
    React.useState<ICreateKeyword>(keywordCreate);

  const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

  React.useEffect(() => {
    setKeywordCreateState(keywordCreate);
  }, [keywordCreate]);

  React.useEffect(() => {
    console.log(keywordCreate);
  }, [keywordCreate, stateTrigger]);

  return (
    <Box display="flex" justifyContent="center" px="5%" py="1vw">
      <Stack spacing="1vw" width="100%">
        <Stack spacing="1vw" px="7vw" pb="3vw">
          <Select
            label="Type"
            placeholder="Option"
            options={keywordTypeOptions.data}
            value={keywordCreateState.keyword_type}
            handleChange={(value: string) => {
              keywordCreate.keyword_type = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Divider textAlign="left" sx={{ pt: "1.2vw", pb: "0.6vw" }}>
            <Subtitle textTransform="uppercase">General Information</Subtitle>
          </Divider>
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
              setStateTrigger(!stateTrigger);
            }}
          />
          <ResponsiveDateTimePicker
            label="End Period"
            placeholder="End Period"
            value={keywordCreateState.end_period}
            handleChange={(value: string) => {
              keywordCreate.end_period = value;
              setStateTrigger(!stateTrigger);
            }}
          />
          <Select
            multiple
            label="Point Type"
            placeholder="Option"
            options={pointTypeOption.data}
            value={keywordCreateState.point_type}
            handleChange={(value: []) => {
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
            value={keywordCreateState.poin_redeemed}
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
            value={keywordCreateState.max_redeem_counter}
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
          <Select
            label="Keyword Schedule"
            placeholder="Option"
            options={KeywordScheduleTypeOptions}
            value={keywordCreateState.keyword_schedule_type}
            handleChange={(value: string) => {
              keywordCreate.keyword_schedule_type = value;
              if (value === "Shift") {
                keywordCreate.keyword_schedule_shift = [
                  {
                    from: new Date().getTime(),
                    to: new Date().getTime(),
                  },
                ];
              } else if (value === "Daily") {
                keywordCreate.keyword_schedule_shift = [
                  {
                    from: new Date(),
                    to: new Date(),
                  },
                ];
              }
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
                              value.getTime();
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ResponsiveTimePicker
                          direction="column"
                          label="To"
                          placeholder="To"
                          value={
                            keywordCreateState.keyword_schedule_shift[idx].to
                          }
                          handleChange={(value: any) => {
                            keywordCreate.keyword_schedule_shift[idx].to =
                              value.getTime();
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
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ResponsiveDatePicker
                          direction="column"
                          label="To"
                          placeholder="To"
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
                    Add Shift Time
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
            InputProps={{ inputProps: { min: 0 } }}
            value={keywordCreateState.total_anggaran}
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
            value={keywordCreateState.customer_value}
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
          <Select
            label="Channel List"
            placeholder="Option"
            options={programListOptions.data}
            optionLabel="name"
            value={keywordCreateState.multiwhitelist_program}
            handleChange={(value: string) => {
              keywordCreate.multiwhitelist_program = value;
              setStateTrigger(!stateTrigger);
            }}
          />
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

          {/* 
          
          <Select
            label="Channel Validation"
            placeholder="Option"
            options={BooleanOption}
            value={channelValidation}
            handleChange={setChannelValidation}
          /> */}

          {/* <Select
            multiple
            label="Channel Validation"
            placeholder="Option"
            value={channelValidation}
            options={channelOption.data}
            optionLabel={"name"}
            handleChange={setChannelValidation}
          /> */}

          {/* <Select
            label="Merchant"
            placeholder="Option"
            value={merchant}
            options={merchantManagementOption.data}
            optionLabel={"company_name"}
            handleChange={setMerchant}
          />
          <OutlinedTextField
            label="Merchant Name"
            placeholder="Merchant Name"
            value={merchantName}
            handleChange={setMerchantName}
            variant="outlined"
          />

          <Select
            label="Telkomsel Los"
            placeholder="Option"
            options={BooleanOption}
            value={telkomselLos}
            handleChange={setTelkomselLos}
          />
          <Select
            label="Telkomsel Los Type"
            placeholder="Option"
            options={TelkomselLOSTypeOption}
            value={telkomselLosType}
            handleChange={setTelkomselLosType}
          />
          <Select
            label="Telkomsel Los Operator"
            placeholder="Option"
            options={TelkomselLOSOperatorOption}
            value={telkomselLosOperator}
            handleChange={setTelkomselLosOperator}
          />
          <OutlinedTextField
            type="number"
            label="Telkomsel Los Value"
            placeholder="Telkomsel Los Value"
            value={telkomselLosValue}
            handleChange={setTelkomselLosValue}
            variant="outlined"
          />
          <OutlinedTextField
            type="number"
            label="Telkomsel Los Range Min"
            placeholder="Telkomsel Los Range Min"
            value={telkomselLosRangeMin}
            handleChange={setTelkomselLosRangeMin}
            variant="outlined"
          />
          <OutlinedTextField
            type="number"
            label="Telkomsel Los Range Max"
            placeholder="Telkomsel Los Range Max"
            value={telkomselLosRangeMax}
            handleChange={setTelkomselLosRangeMax}
            variant="outlined"
          />
          <Select
            label="Enable Corporate"
            placeholder="Option"
            options={BooleanOption}
            value={enableCorporate}
            handleChange={setEnableCorporate}
          />

          <Select
            multiple
            label="Customer Tier"
            placeholder="Option"
            options={customerTierOption.data}
            value={customerTier}
            optionLabel={"name"}
            handleChange={setCustomerTier}
          />
          <OutlinedTextField
            label="Comment Approval"
            placeholder="Comment Approval"
            value={commentApproval}
            handleChange={setCommentApproval}
            variant="outlined"
          />
          <Divider textAlign="left" sx={{ pt: "1.2vw", pb: "0.6vw" }}>
            <Subtitle textTransform="uppercase">Segmentation</Subtitle>
          </Divider>
          <Select
            label="New Redeemer"
            placeholder="Option"
            options={BooleanOption}
            value={forNewRedeemer}
            handleChange={setForNewRedeemer}
          /> */}
        </Stack>
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Auction and Racing POIN" && <MainInfoAuction />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Redeem Core Product" && <MainInfoCoreProduct />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Lucky Draw" && <MainInfoLuckyDraw />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Direct Redeem" && <MainInfoDirectRedeem />}
        {keywordTypeOptions.data.find(
          (item) => item["_id"] === keywordCreate.keyword_type
        )?.set_value === "Free Gift" && <MainInfoDonation />}
      </Stack>
    </Box>
  );
};

export default MainInfo;
