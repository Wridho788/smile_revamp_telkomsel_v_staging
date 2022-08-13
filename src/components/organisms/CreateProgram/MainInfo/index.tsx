import { Box, Grid, Stack } from "@mui/material";
import * as React from "react";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
} from "../../../atoms";
import { IMainInfo } from "../../../../app/redux/Utils/Interface/IProgram";
import { useState } from "react";
import {
  CreateProgramInitial,
  ProgramSegmentationInitial,
} from "../../../../app/redux/Utils/InitialState/ProgramInitial";

interface IMainInfoProps {
  mainInfo: IMainInfo;
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
  mainInfo,
}: IMainInfoProps) => {
  const optionStatic = [
    { _id: "1", set_value: "True" },
    { _id: "2", set_value: "False" },
  ];
  const logicStatic = [
    { _id: "intercept", set_value: "Intercept" },
    { _id: "union", set_value: "Union" },
  ];
  const programData = CreateProgramInitial;
  const programSegmentation = ProgramSegmentationInitial;

  const [programTypeLabel, handleChangeProgramType] = useState(
    programData.program_type
  );
  const [pointTypeLabel, handleChangePointType] = useState(
    programData.point_type
  );
  const [programMechanismLabel, handleChangeProgramMechanism] = useState(
    programData.program_mechanism
  );
  const [programOwnerLabel, handleChangeProgramOwner] = useState(
    programData.program_owner
  );
  const [programOwnerDetail, setProgramOwnerDetail] = React.useState<string>(
    programData.program_owner_detail
  );
  const [programDescriptionLabel, handleChangeProgramDescription] = useState(
    programData.program
  );
  const [programNameLabel, handleChangeProgramName] = useState(
    programData.name
  );
  const [startPeriod, setStartPeriod] = useState(programData.start_period);
  const [endPeriod, setEndPeriod] = useState(programData.end_period);

  let cLOSEnableInitial = programData.c_los_enable === true ? "True" : "False";
  const [cLOSEnabled, setCLOSEnabled] = useState(cLOSEnableInitial);

  const [cLOSValue, setCLOSValue] = useState<number>(programData.c_los_value);
  const [logicValue, setLogicValue] = useState(programData.logic);
  const [cPointBalance, setCPointBalance] = React.useState<number>(
    programData.c_point_balance
  );

  React.useEffect(() => {
    programData.name = programNameLabel;
    programData.program_type = programTypeLabel;
    programData.point_type = pointTypeLabel;
    programData.program_mechanism = programMechanismLabel;
    programData.program_owner = programOwnerLabel;
    programData.program_owner_detail = programOwnerDetail;
    programData.program = programDescriptionLabel;
    programData.start_period = startPeriod;
    programData.end_period = endPeriod;
    programData.logic = logicValue;

    programData.c_los_enable = cLOSEnabled === "True" ? true : false;
    programSegmentation.customer_los_enable =
      cLOSEnabled === "True" ? true : false;

    programData.c_los_value = Number(cLOSValue);
    programSegmentation.customer_los_value = String(cLOSValue);

    programData.c_point_balance = Number(cPointBalance);
    programSegmentation.customer_point_balance = Number(cPointBalance);

    return;
  }, [
    programData,
    programNameLabel,
    programTypeLabel,
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
        <Select
          label="Type"
          placeholder="Option"
          options={mainInfo.program_type}
          optionLabel="set_value"
          value={programTypeLabel}
          handleChange={handleChangeProgramType}
        />
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
          options={mainInfo.point_type}
          optionLabel="set_value"
          value={pointTypeLabel}
          handleChange={handleChangePointType}
        />
        <Select
          label="Mechanism"
          placeholder="Option"
          options={mainInfo.mechanism}
          optionLabel="set_value"
          value={programMechanismLabel}
          handleChange={handleChangeProgramMechanism}
        />
        <Select
          label="Owner"
          placeholder="Option"
          options={mainInfo.owner}
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
