import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Stack,
} from "@mui/material";
import * as React from "react";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
} from "../../../atoms";
import { useEffect, useRef, useState } from "react";
import {
  useGetKeywordTypeQuery,
  useGetLocationTypeQuery,
  useGetMechanismQuery,
  useGetOwnerQuery,
  useGetPointTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import {
  useDetailProgramQuery,
  useProgramListQuery,
} from "../../../../redux/features/program/program-api-slice";
import { useParams } from "react-router-dom";
import {
  BooleanOption,
  FilterInitial,
  logicOption,
  PicTypeOption,
  programTimeZoneOption,
} from "../../../../redux/utils/initial-general";
import { ProgramDetailInitial } from "../../../../pages/CreateProgram/programInitial";
import { useKeywordListQuery } from "../../../../redux/features/keyword/keyword-api-slice";
import { useLocationTemplateQuery } from "../../../../redux/features/location/location-api-slice";
import { IParams } from "../../../../redux/utils/IGeneral";
import {
  useLazyAccountListQuery,
  useLazyAccountRoleQuery,
} from "../../../../redux/features/account/account-api-slice";

interface IMainInfoProps {
  slug: string;
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
  slug,
}: IMainInfoProps) => {
  let programData = ProgramDetailInitial.data;
  let { _id } = useParams();
  const { data: fetchDetail = programData, isLoading } = useDetailProgramQuery(
    _id ?? ""
  );
  useEffect(() => {
    programData._id = fetchDetail._id;
  }, [fetchDetail]);

  const [programNameLabel, setProgramName] = useState(fetchDetail.name);
  const [programDescriptionLabel, setProgramDescription] = useState(
    fetchDetail.desc
  );
  const [startPeriod, setStartPeriod] = useState(fetchDetail.start_period);
  const [endPeriod, setEndPeriod] = useState(fetchDetail.end_period);

  const [pointTypeLabel, setPointType] = useState(fetchDetail.point_type);
  const [programMechanismLabel, setProgramMechanism] = useState(
    fetchDetail.program_mechanism
  );

  const [programOwnerLabel, setProgramOwner] = useState(
    fetchDetail.program_owner
  );
  const [programOwnerDetail, setProgramOwnerDetail] = React.useState<string>(
    fetchDetail.program_owner_detail
  );

  const [keywordRegistration, setKeywordRegistration] = useState(
    fetchDetail.keyword_registration
  );
  const [whiteListCounter, setWhiteListCounter] = React.useState(
    fetchDetail.whitelist_counter === true ? "1" : "2"
  );

  const [logicValue, setLogicValue] = useState(fetchDetail.logic);
  const [programTimeZone, setProgramTypeZone] = useState(
    fetchDetail.program_time_zone
  );
  const [programParent, setProgramParent] = useState(
    fetchDetail.program_parent
  );
  const [alarmPicType, setAlarmPicType] = useState(fetchDetail.alarm_pic_type);
  const [thresholdAlarmExpired, setThresholdAlarmExpired] = useState<number>(
    fetchDetail.threshold_alarm_expired
  );
  const [thresholdAlarmVoucher, setThresholdAlarmVoucher] = useState<number>(
    fetchDetail.threshold_alarm_voucher
  );

  const { data: pointTypeOption = { data: [] } } = useGetPointTypeQuery();
  const { data: mechanismOption = { data: [] } } = useGetMechanismQuery();
  const { data: keywordRegisterOption = { data: [] } } =
    useKeywordListQuery(FilterInitial);
  const { data: programParentOption = { data: [] } } =
    useProgramListQuery(FilterInitial);
  const { data: ownerOption = { data: [] } } = useGetLocationTypeQuery();

  const ownerFilterInitial: IParams = {
    limit: 100,
    skip: 0,
    filter: `{"type":"${programOwnerLabel}"}`,
    sort: "{}",
  };
  const { data: ownerDetailOption = { data: [] } } =
    useLocationTemplateQuery(ownerFilterInitial);
  const [getAlarmPicList, { data: alarmPicList = { data: [] } }] =
    useLazyAccountListQuery();
  const [getAlarmRoleList, { data: alarmRoleList = { data: [] } }] =
    useLazyAccountRoleQuery();
  useEffect(() => {
    if (alarmPicType === "PIC") {
      getAlarmPicList(FilterInitial);
    } else if (alarmPicType === "Role") {
      getAlarmRoleList(FilterInitial);
    }
  }, [alarmPicType]);

  const handleChangeCheckbox = (event: any) => {
    let isChecked = event.target.checked;
    let _id = event.target.value;
    if (isChecked) {
      programData.alarm_pic.push(_id);
    } else {
      const index = programData.alarm_pic.indexOf(_id);
      programData.alarm_pic.splice(index, 1);
    }
  };
  React.useEffect(() => {
    programData.name = programNameLabel;
    programData.desc = programDescriptionLabel;
    programData.start_period = startPeriod;
    programData.end_period = endPeriod;
    programData.point_type = pointTypeLabel;
    programData.program_mechanism = programMechanismLabel;
    programData.program_owner = programOwnerLabel;
    programData.program_owner_detail = programOwnerDetail;
    programData.keyword_registration = keywordRegistration;
    programData.whitelist_counter = whiteListCounter === "1" ? true : false;
    programData.logic = logicValue;
    programData.program_time_zone = programTimeZone;
    programData.program_parent = programParent;
    programData.alarm_pic_type = alarmPicType;
    programData.threshold_alarm_expired = Number(thresholdAlarmExpired);
    programData.threshold_alarm_voucher = Number(thresholdAlarmVoucher);
    return;
  }, [
    programData,
    programNameLabel,
    programDescriptionLabel,
    startPeriod,
    endPeriod,
    pointTypeLabel,
    programMechanismLabel,
    programOwnerLabel,
    programOwnerDetail,
    keywordRegistration,
    whiteListCounter,
    logicValue,
    programTimeZone,
    programParent,
    thresholdAlarmExpired,
    thresholdAlarmVoucher,
  ]);
  return (
    <Box display="flex" justifyContent="center" px="20%" py="1vw">
      <Stack spacing={"1vw"} width={"100%"}>
        <OutlinedTextField
          label="Name"
          placeholder="Name"
          variant={"outlined"}
          value={programNameLabel}
          handleChange={setProgramName}
        />
        <OutlinedTextField
          label="Description"
          placeholder="Description"
          variant={"outlined"}
          value={programDescriptionLabel}
          handleChange={setProgramDescription}
          multiline
          rows={4}
        />

        <ResponsiveDateTimePicker
          label="Start Period"
          placeholder="Start Period"
          value={startPeriod}
          handleChange={setStartPeriod}
        />
        <ResponsiveDateTimePicker
          label="End Period"
          placeholder="End Period"
          value={endPeriod}
          handleChange={setEndPeriod}
        />
        <Select
          label="Point Type"
          placeholder="Option"
          options={pointTypeOption.data}
          optionLabel="set_value"
          value={pointTypeLabel}
          handleChange={setPointType}
        />
        <Select
          label="Mechanism"
          placeholder="Option"
          options={mechanismOption.data}
          optionLabel="set_value"
          value={programMechanismLabel}
          handleChange={setProgramMechanism}
        />
        <Select
          label="Owner"
          placeholder="Option"
          options={ownerOption.data}
          optionLabel="set_value"
          value={programOwnerLabel}
          handleChange={setProgramOwner}
        />
        <Select
          label="Owner Detail"
          placeholder="Option"
          options={ownerDetailOption.data}
          optionLabel="name"
          value={programOwnerDetail}
          handleChange={setProgramOwnerDetail}
        />
        <Select
          label="Keyword Registration"
          placeholder="Option"
          options={keywordRegisterOption.data}
          value={keywordRegistration}
          optionLabel="name"
          handleChange={setKeywordRegistration}
        />
        <Select
          label="Whitelist Counter"
          placeholder="Option"
          options={BooleanOption}
          value={whiteListCounter}
          handleChange={setWhiteListCounter}
        />
        <Select
          label="Logic"
          placeholder="Option"
          options={logicOption}
          value={logicValue}
          handleChange={setLogicValue}
        />
        <Select
          label="Program Time Zone"
          placeholder="Option"
          options={programTimeZoneOption}
          value={programTimeZone}
          handleChange={setProgramTypeZone}
        />
        <Select
          label="Program Parent"
          placeholder="Option"
          options={programParentOption.data}
          value={programParent}
          optionLabel="name"
          handleChange={setProgramParent}
        />
        <Select
          label="Alarm Pic Type"
          placeholder="Option"
          options={PicTypeOption}
          value={alarmPicType}
          handleChange={setAlarmPicType}
        />
        <FormGroup>
          {(alarmPicType === "PIC"
            ? alarmPicList.data
            : alarmRoleList.data
          ).map((_, idx) => (
            <Grid
              key={`alarmRoleList__data__${idx}`}
              item
              xs={8}
              display="flex"
              alignItems="center"
              pl="0.5vw"
            >
              <FormControlLabel
                key={`checkBox__${_._id}`}
                control={
                  <Checkbox onChange={handleChangeCheckbox} value={_._id} />
                }
                label={alarmPicType === "PIC" ? _.phone : _.name}
              />
            </Grid>
          ))}
        </FormGroup>
        <OutlinedTextField
          InputProps={{ inputProps: { min: 0, max: 7 } }}
          type={"number"}
          label="Threshold Alarm Experied"
          placeholder="Threshold Alrm Experied"
          value={thresholdAlarmExpired}
          handleChange={setThresholdAlarmExpired}
          variant={"outlined"}
        />
        <OutlinedTextField
          InputProps={{ inputProps: { min: 70, max: 100 } }}
          type={"number"}
          label="Threshold Alarm Voucher"
          placeholder="Threshold Alrm Voucher"
          value={thresholdAlarmVoucher}
          handleChange={setThresholdAlarmVoucher}
          variant={"outlined"}
        />
      </Stack>
    </Box>
  );
};

export default MainInfo;
