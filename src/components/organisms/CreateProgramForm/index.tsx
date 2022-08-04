import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { BodyCopy, H2, MediumButtonText } from "../../atoms";
import PrimaryButton from "../../atoms/PrimaryButton";
import ResponsiveDateTimePickers from "../../atoms/ResponsiveDateTimePicker";

interface ICreateProgramFormProps {}

const CreateProgramForm: React.FunctionComponent<ICreateProgramFormProps> = (
  props
) => {
  const [name, setName] = React.useState("Combo Sakti");
  const [pointType, setPointType] = React.useState("Digistar");
  const [programMechanism, setProgramMechanism] =
    React.useState("Rule Options");
  const [programOwner, setProgramOwner] = React.useState("HQ");
  const [parentProgram, setParentProgram] = React.useState("GigaMax");
  const [dateTimeValue, setDateTimeValue] = React.useState<Date | null>(
    new Date()
  );

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleChangePointType = (event: SelectChangeEvent) => {
    setPointType(event.target.value);
  };

  const handleChangeProgramMechanism = (event: SelectChangeEvent) => {
    setProgramMechanism(event.target.value);
  };

  const handleChangeProgramOwner = (event: SelectChangeEvent) => {
    setProgramOwner(event.target.value);
  };

  const handleChangeParentProgram = (event: SelectChangeEvent) => {
    setParentProgram(event.target.value);
  };

  return (
    <Card sx={{ borderRadius: "0.3vw", px: "0.5vw" }}>
      <CardContent>
        <H2 align="center" my={"1.5vw"}>
          Create New Program
        </H2>
        <Stack direction={"column"} spacing={"0.5vw"} color={"secondary.dark"}>
          <Grid container columns={10} alignItems={"center"}>
            <Grid item xs={4}>
              <BodyCopy>Name</BodyCopy>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                value={name}
                onChange={handleChangeName}
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>

          <Grid container columns={10} alignItems={"center"}>
            <Grid item xs={4}>
              <BodyCopy>Point Type</BodyCopy>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: "100%" }}>
                <Select
                  value={pointType}
                  onChange={handleChangePointType}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                >
                  <MenuItem value="Digistar">Digistar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container columns={10} alignItems={"center"}>
            <Grid item xs={4}>
              <BodyCopy>Program Mechanism</BodyCopy>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: "100%" }}>
                <Select
                  value={programMechanism}
                  onChange={handleChangeProgramMechanism}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                >
                  <MenuItem value="Rule Options">Rule Options</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container columns={10} alignItems={"center"}>
            <Grid item xs={4}>
              <BodyCopy>Program Owner</BodyCopy>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: "100%" }}>
                <Select
                  value={programOwner}
                  onChange={handleChangeProgramOwner}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                >
                  <MenuItem value="HQ">HQ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container columns={10} alignItems={"center"}>
            <Grid item xs={4}>
              <BodyCopy>Parent Program</BodyCopy>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ minWidth: "100%" }}>
                <Select
                  value={parentProgram}
                  onChange={handleChangeParentProgram}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  size="small"
                >
                  <MenuItem value="GigaMax">GigaMax</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container columns={10} alignItems={"center"}>
            <Grid item xs={4}>
              <BodyCopy>Date & Time</BodyCopy>
            </Grid>
            <Grid item xs={6}>
              <ResponsiveDateTimePickers
                value={dateTimeValue}
                setValue={setDateTimeValue}
              />
            </Grid>
          </Grid>

          <Stack direction={"row"} justifyContent={"center"} py={"1vw"}>
            <PrimaryButton>
              <BodyCopy color={"background.paper"}>Submit</BodyCopy>
            </PrimaryButton>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions sx={{ padding: 0 }}>
        <Stack direction={"row"} width={"100%"}>
          <Box
            width="50%"
            borderTop="0.1vw solid rgba(0, 0, 0, 0.1)"
            borderRight="0.05vw solid rgba(0, 0, 0, 0.1)"
          ></Box>
          <Button
            sx={{
              width: "50%",
              borderTop: "0.1vw solid rgba(0, 0, 0, 0.1)",
              borderLeft: "0.05vw solid rgba(0, 0, 0, 0.1)",
              borderRadius: 0,
              padding: "1vw",
            }}
          >
            <MediumButtonText color={"primary.main"}>
              Save to Draft
            </MediumButtonText>
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default CreateProgramForm;
