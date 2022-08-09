import { Box, Grid, Stack } from "@mui/material";
import * as React from "react";
import useCreateProgram from "../../../../app/context/CreateProgram/useCreateProgram";
import useCreateProgramOptions, {
  useProgramName,
  usePointType,
  useProgramMechanism,
  useProgramOwner,
  useProgramType,
  useProgramDescription,
} from "../../../../app/hooks/useCreateProgramOptions";
import { options } from "../../../../mocks/options";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  H3,
} from "../../../atoms";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const { programData } = useCreateProgram();

  const [ownerDetail, setOwnerDetail] = React.useState<string>("");
  const [startPeriod, setStartPeriod] = React.useState<string>("");
  const [endPeriod, setEndPeriod] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [cPointBalance, setCPointBalance] = React.useState<string>("");
  const [startNumeric, setStartNumeric] = React.useState<string>("");
  const [endNumeric, setEndNumeric] = React.useState<string>("");
  const [cLOSEnabled, setCLOSEnabled] = React.useState<string>("");
  const [cLOSType, setCLOSType] = React.useState<string>("");
  const [cLOSValue, setCLOSValue] = React.useState<string>("");
  const { main_info } = useCreateProgramOptions();

  const { programTypeLabel, handleChangeProgramType } = useProgramType(
    main_info.program_type
  );
  const { programNameLabel, handleChangeProgramName } = useProgramName();
  const { pointTypeLabel, handleChangePointType } = usePointType(
    main_info.point_type
  );
  const { programMechanismLabel, handleChangeProgramMechanism } =
    useProgramMechanism(main_info.program_mechanism);
  const { programOwnerLabel, handleChangeProgramOwner } = useProgramOwner(
    main_info.program_owner
  );
  const { programDescriptionLabel, handleChangeProgramDescription } =
    useProgramDescription();

  React.useEffect(() => {
    console.log(programData);
    return;
  }, [programData]);

  return (
    <Box display="flex" justifyContent="center" px="20%" py="1vw">
      <Stack spacing={"1vw"} width={"100%"}>
        <Select
          label="Type"
          placeholder="Option"
          options={main_info.program_type ? main_info.program_type : []}
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
          options={main_info.point_type ? main_info.point_type : []}
          optionLabel="set_value"
          value={pointTypeLabel}
          handleChange={handleChangePointType}
        />
        <Select
          label="Mechanism"
          placeholder="Option"
          options={
            main_info.program_mechanism ? main_info.program_mechanism : []
          }
          optionLabel="set_value"
          value={programMechanismLabel}
          handleChange={handleChangeProgramMechanism}
        />
        <Select
          label="Owner"
          placeholder="Option"
          options={main_info.program_owner ? main_info.program_owner : []}
          optionLabel="set_value"
          value={programOwnerLabel}
          handleChange={handleChangeProgramOwner}
        />
        <OutlinedTextField
          label="Owner Detail"
          placeholder="Owner Detail"
          value={ownerDetail}
          // setValue={setOwnerDetail}
          variant={"outlined"}
          multiline
          rows={4}
        />
        <ResponsiveDateTimePicker
          label="Start Period"
          placeholder="Start Period"
          value={startPeriod}
          // setValue={setStartPeriod}
        />
        <ResponsiveDateTimePicker
          label="End Period"
          placeholder="End Period"
          value={endPeriod}
          // setValue={setEndPeriod}
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
          label="C. Point Balance"
          placeholder="C. Point Balance"
          value={cPointBalance}
          // setValue={setCPointBalance}
          variant={"outlined"}
          type="number"
        />

        <Grid container columns={11}>
          <Grid item xs={4}></Grid>
          <Grid item xs={7}>
            <Stack direction="row" spacing={"1vw"} alignItems="center">
              <OutlinedTextField
                placeholder="Start Numeric"
                value={startNumeric}
                // setValue={setStartNumeric}
                variant={"outlined"}
              />
              <H3 lineHeight={0}>-</H3>
              <OutlinedTextField
                placeholder="End Numeric"
                value={endNumeric}
                // setValue={setEndNumeric}
                variant={"outlined"}
              />
            </Stack>
          </Grid>
        </Grid>
        <Select
          label="C. LOS Enabled"
          placeholder="Option"
          options={options}
          value={cLOSEnabled}
          // setValue={setCLOSEnabled}
        />
        <Select
          label="C. LOS Type"
          placeholder="Option"
          options={options}
          value={cLOSType}
          // setValue={setCLOSType}
        />
        <OutlinedTextField
          label="C. LOS Value"
          placeholder="C. LOS Value"
          value={cLOSValue}
          // setValue={setCLOSValue}
          variant={"outlined"}
        />
      </Stack>
    </Box>
  );
};

export default MainInfo;
