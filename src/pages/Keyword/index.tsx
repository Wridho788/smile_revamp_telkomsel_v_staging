import React from "react";
import { Box } from "@mui/material";
import { H2, Stepper, StepperPaper } from "../../components";
import {
  MainInfo,
  Notification,
  Bonus,
  Summary,
} from "../../components/organisms/Keyword";

const Keyword = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = ["Main Info", "Bonus", "Notification", "Summary"];
  const stepsItem = [<MainInfo />, <Bonus />, <Notification />, <Summary />];

  return (
    <Box
      sx={{
        paddingBlock: "3vw",
        paddingInline: "5vw",
      }}
    >
      {/* <SingleBreadcrumbs
        firstTitle="Dashboard"
        secondTitle="Program"
        title="Create Program"
        sx={{ mb: "3vw" }}
      /> */}
      <StepperPaper sx={{ paddingTop: "4vw" }}>
        <H2 textAlign="center" mb="2vw">
          Keyword
        </H2>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        >
          {stepsItem[activeStep]}
        </Stepper>
      </StepperPaper>
    </Box>
  );
};

export default Keyword;
