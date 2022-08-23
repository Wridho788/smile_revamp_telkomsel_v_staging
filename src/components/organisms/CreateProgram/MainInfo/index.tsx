import { Box, Grid, Stack } from "@mui/material";
import * as React from "react";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
} from "../../../atoms";
import {useEffect, useState} from "react";
import {
  CreateProgramInitial, ProgramDetailInitial,
  ProgramSegmentationInitial,
} from "../../../../app/redux/Utils/InitialState/ProgramInitial";
import {
  useGetKeywordTypeQuery, useGetLocationTypeQuery,
  useGetMechanismQuery, useGetOwnerQuery,
  useGetPointTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";
import {useDetailProgramQuery} from "../../../../redux/features/program/program-api-slice";
import {useParams} from "react-router-dom";

interface IMainInfoProps {
  slug:string
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
    slug
}: IMainInfoProps) => {

  let programData = ProgramDetailInitial.data
  let {_id} = useParams()
  const {data: fetchDetail = programData, isLoading} = useDetailProgramQuery(_id ?? '')
  const {data: pointTypeOption = {data: []}} = useGetPointTypeQuery()
  const {data: mechanismOption = {data: []}} = useGetMechanismQuery()
  const {data: ownerOption = {data: []}} = useGetLocationTypeQuery()
  useEffect(() => {
    programData._id = fetchDetail._id
  }, [fetchDetail]);

    console.log(programData.point_type)
  const optionStatic = [
    { _id: "1", set_value: "True" },
    { _id: "2", set_value: "False" },
  ];
  const logicStatic = [
    { _id: "intercept", set_value: "Intercept" },
    { _id: "union", set_value: "Union" },
  ];

  const [pointTypeLabel, handleChangePointType] = useState(
    fetchDetail.point_type
  );
  const [programMechanismLabel, handleChangeProgramMechanism] = useState(
    fetchDetail.program_mechanism
  );
  const [programOwnerLabel, handleChangeProgramOwner] = useState(
    fetchDetail.program_owner
  );
  const [programOwnerDetail, setProgramOwnerDetail] = React.useState<string>(
    fetchDetail.program_owner_detail
  );
  const [programDescriptionLabel, handleChangeProgramDescription] = useState(
    fetchDetail.desc
  );
  const [programNameLabel, handleChangeProgramName] = useState(
    fetchDetail.name
  );
  const [startPeriod, setStartPeriod] = useState(fetchDetail.start_period);
  const [endPeriod, setEndPeriod] = useState(fetchDetail.end_period);

  let cLOSEnableInitial = fetchDetail.c_los_enable === true ? "True" : "False";
  const [cLOSEnabled, setCLOSEnabled] = useState(cLOSEnableInitial);

  const [cLOSValue, setCLOSValue] = useState<number>(fetchDetail.c_los_value);
  const [logicValue, setLogicValue] = useState(fetchDetail.logic);
  const [cPointBalance, setCPointBalance] = React.useState<number>(
    fetchDetail.c_point_balance
  );

  React.useEffect(() => {
    programData.name = programNameLabel;
    programData.point_type = pointTypeLabel;
    programData.program_mechanism = programMechanismLabel;
    programData.program_owner = programOwnerLabel;
    programData.program_owner_detail = programOwnerDetail;
    programData.desc = programDescriptionLabel;
    programData.start_period = startPeriod;
    programData.end_period = endPeriod;
    programData.logic = logicValue;


    return;
  }, [
    programData,
    programNameLabel,
    pointTypeLabel,
    programMechanismLabel,
    programOwnerLabel,
    programOwnerDetail,
    programDescriptionLabel,
    startPeriod,
    endPeriod,
    logicValue,
    cLOSEnabled,
    cLOSValue,
    cPointBalance,
  ]);

  return (
    <Box display="flex" justifyContent="center" px="20%" py="1vw">
      <Stack spacing={"1vw"} width={"100%"}>
        <OutlinedTextField
          label="Name"
          placeholder="Name"
          variant={"outlined"}
          value={programNameLabel}
          handleChange={handleChangeProgramName}
        />
        <Select
          label="Point Type"
          placeholder="Option"
          options={pointTypeOption.data}
          optionLabel="set_value"
          value={pointTypeLabel}
          handleChange={handleChangePointType}
        />
        <Select
          label="Mechanism"
          placeholder="Option"
          options={mechanismOption.data}
          optionLabel="set_value"
          value={programMechanismLabel}
          handleChange={handleChangeProgramMechanism}
        />
        <Select
          label="Owner"
          placeholder="Option"
          options={ownerOption.data}
          optionLabel="set_value"
          value={programOwnerLabel}
          handleChange={handleChangeProgramOwner}
        />
        <OutlinedTextField
          label="Owner Detail"
          placeholder="Owner Dxetail"
          value={programOwnerDetail}
          handleChange={setProgramOwnerDetail}
          variant={"outlined"}
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
        <OutlinedTextField
          label="Description"
          placeholder="Description"
          variant={"outlined"}
          value={programDescriptionLabel}
          handleChange={handleChangeProgramDescription}
          multiline
          rows={4}
        />

        <OutlinedTextField
          type="number"
          label="C. Point Balance"
          placeholder="C. Point Balance"
          value={cPointBalance}
          handleChange={setCPointBalance}
          variant={"outlined"}
        />
        <Select
          label="C. LOS Enabled"
          placeholder="Option"
          options={optionStatic}
          value={cLOSEnabled}
          handleChange={setCLOSEnabled}
        />
        <OutlinedTextField
          type={"number"}
          label="C. LOS Value"
          placeholder="C. LOS Value"
          value={cLOSValue}
          handleChange={setCLOSValue}
          variant={"outlined"}
        />

        <Select
          label="Logic"
          placeholder="Option"
          options={logicStatic}
          value={logicValue}
          handleChange={setLogicValue}
        />
      </Stack>
    </Box>
  );
};

export default MainInfo;
