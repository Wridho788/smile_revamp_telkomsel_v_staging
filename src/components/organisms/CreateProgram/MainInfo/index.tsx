import { Box, Grid, Stack } from "@mui/material";
import * as React from "react";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  H1,
} from "../../../atoms";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const [pointType, setPointType] = React.useState("");
  const [mechanism, setMechanism] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [ownerDetail, setOwnerDetail] = React.useState("");
  const [startPeriod, setStartPeriod] = React.useState("");
  const [endPeriod, setEndPeriod] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [cPointBalance, setCPointBalance] = React.useState("");
  const [startNumeric, setStartNumeric] = React.useState("");
  const [endNumeric, setEndNumeric] = React.useState("");
  const [cLOSEnabled, setCLOSEnabled] = React.useState("");
  const [cLOSType, setCLOSType] = React.useState("");
  const [cLOSValue, setCLOSValue] = React.useState("");

  const Options = ["Option 1", "Option 2", "Option 3"];

  return (
    <Box border="0.1vw solid rgba(0, 0, 0, 0.1)" borderRadius="0.3vw" p="3vw">
      <Stack spacing={"1vw"} maxWidth={"50%"}>
        <Select
          label="Type"
          placeholder="Option"
          options={Options}
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
          options={Options}
          value={pointType}
          setValue={setPointType}
        />
        <Select
          label="Mechanism"
          placeholder="Option"
          options={Options}
          value={mechanism}
          setValue={setMechanism}
        />
        <Select
          label="Owner"
          placeholder="Option"
          options={Options}
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
              options={Options}
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
          options={Options}
          value={cLOSEnabled}
          setValue={setCLOSEnabled}
        />
        <Select
          label="C. LOS Type"
          placeholder="Option"
          options={Options}
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
