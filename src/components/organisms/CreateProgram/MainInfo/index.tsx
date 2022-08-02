import { Stack } from "@mui/material";
import * as React from "react";
import { Select, OutlinedTextField } from "../../../atoms";
import StepperPaper from "../../../atoms/StepperPaper";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const [pointType, setPointType] = React.useState("");
  const [mechanism, setMechanism] = React.useState("");
  const [owner, setOwner] = React.useState("");

  const typeOptions = ["Type 1", "Type 2", "Type 3"];
  const pointTypeOptions = ["Point Type 1", "Point Type 2", "Point Type 3"];
  const mechanismOptions = ["Mechanism 1", "Mechanism 2", "Mechanism 3"];
  const ownerOptions = ["Owner 1", "Owner 2", "Owner 3"];

  return (
    <>
      <StepperPaper>
        <Stack spacing={"1vw"} maxWidth={"50%"}>
          <Select
            label="Type"
            placeholder="Option"
            options={typeOptions}
            returnedValue={type}
            setReturnedValue={setType}
          />
          <OutlinedTextField
            label="Name"
            placeholder="Text"
            returnedValue={name}
            setReturnedValue={setName}
            variant={"outlined"}
          />
          <Select
            label="Point Type"
            placeholder="Option"
            options={pointTypeOptions}
            returnedValue={pointType}
            setReturnedValue={setPointType}
          />
          <Select
            label="Mechanism"
            placeholder="Option"
            options={mechanismOptions}
            returnedValue={mechanism}
            setReturnedValue={setMechanism}
          />
          <Select
            label="Owner"
            placeholder="Option"
            options={ownerOptions}
            returnedValue={owner}
            setReturnedValue={setOwner}
          />
          <OutlinedTextField
            label="Owner Detail"
            placeholder="Text Area"
            returnedValue={name}
            setReturnedValue={setName}
            variant={"outlined"}
          />
        </Stack>
      </StepperPaper>
    </>
  );
};

export default MainInfo;
