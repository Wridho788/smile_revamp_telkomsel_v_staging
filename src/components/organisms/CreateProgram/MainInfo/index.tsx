import * as React from "react";
import { Select } from "../../../atoms";
import StepperPaper from "../../../atoms/StepperPaper";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = (props) => {
  const [type, setType] = React.useState("");
  const typeOptions = ["Type 1", "Type 2", "Type 3"];
  React.useEffect(() => {
    console.log(type);
  }, [type]);
  return (
    <>
      <StepperPaper>
        <Select
          label="Type"
          placeholder="Option"
          options={typeOptions}
          returnedValue={type}
          setReturnedValue={setType}
        />
      </StepperPaper>
    </>
  );
};

export default MainInfo;
