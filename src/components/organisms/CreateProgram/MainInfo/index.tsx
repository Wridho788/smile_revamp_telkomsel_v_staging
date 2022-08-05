import { Box, Grid, Stack } from "@mui/material";
import * as React from "react";
import { options } from "../../../../mocks/options";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  H1,
} from "../../../atoms";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [type, setType] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [pointType, setPointType] = React.useState<string>("");
  const [mechanism, setMechanism] = React.useState<string>("");
  const [owner, setOwner] = React.useState<string>("");
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

  return (
    <Box border="0.1vw solid rgba(0, 0, 0, 0.1)" borderRadius="0.3vw" p="3vw">
      <Stack spacing={"1vw"} maxWidth={"50%"}>
        <Select
          label="Type"
          placeholder="Option"
          options={options}
          value={type}
          setValue={setType}
        />
        <OutlinedTextField
          label="Name"
          placeholder="Name"
          value={name}
          setValue={setName}
          variant={"outlined"}
        />
        <Select
          label="Point Type"
          placeholder="Option"
          options={options}
          value={pointType}
          setValue={setPointType}
        />
        <Select
          label="Mechanism"
          placeholder="Option"
          options={options}
          value={mechanism}
          setValue={setMechanism}
        />
        <Select
          label="Owner"
          placeholder="Option"
          options={options}
          value={owner}
          setValue={setOwner}
        />
        <OutlinedTextField
          label="Owner Detail"
          placeholder="Owner Detail"
          value={ownerDetail}
          setValue={setOwnerDetail}
          variant={"outlined"}
          multiline
          rows={4}
        />
        <ResponsiveDateTimePicker
          label="Start Period"
          placeholder="Start Period"
          value={startPeriod}
          setValue={setStartPeriod}
        />
        <ResponsiveDateTimePicker
          label="End Period"
          placeholder="End Period"
          value={endPeriod}
          setValue={setEndPeriod}
        />
      </Stack>
      <Stack mt={"1vw"} spacing={"1vw"} maxWidth={"100%"}>
        <OutlinedTextField
          label="Description"
          placeholder="Description"
          value={description}
          setValue={setDescription}
          variant={"outlined"}
          multiline
          rows={10}
          totalColumn={20}
          leftColumn={4}
          rightColumn={16}
        />
        <Grid container columns={10}>
          <Grid item xs={5}>
            <Select
              label="C. Point Balance"
              placeholder="Option"
              options={options}
              value={cPointBalance}
              setValue={setCPointBalance}
            />
          </Grid>
          <Grid item xs={5} pl="1vw">
            <Stack direction="row" spacing={"1vw"} alignItems="center">
              <OutlinedTextField
                placeholder="Start Numeric"
                value={startNumeric}
                setValue={setStartNumeric}
                variant={"outlined"}
              />
              <H1 lineHeight={0}>-</H1>
              <OutlinedTextField
                placeholder="End Numeric"
                value={endNumeric}
                setValue={setEndNumeric}
                variant={"outlined"}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Stack mt="1vw" spacing={"1vw"} maxWidth={"50%"}>
        <Select
          label="C. LOS Enabled"
          placeholder="Option"
          options={options}
          value={cLOSEnabled}
          setValue={setCLOSEnabled}
        />
        <Select
          label="C. LOS Type"
          placeholder="Option"
          options={options}
          value={cLOSType}
          setValue={setCLOSType}
        />
        <OutlinedTextField
          label="C. LOS Value"
          placeholder="C. LOS Value"
          value={cLOSValue}
          setValue={setCLOSValue}
          variant={"outlined"}
        />
      </Stack>
    </Box>
  );
};

export default MainInfo;
