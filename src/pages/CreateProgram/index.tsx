import React from "react";
import { Box } from "@mui/material";
import { SingleBreadcrumbs, Stepper, StepperPaper } from "../../components";
import {
  MainInfo,
  Notification,
  Segmentation,
  Summary,
} from "../../components/organisms/CreateProgram";

const CreateProgram = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = ["Main Info", "Segmentation", "Notification", "Summary"];
  const stepsItem = [
    <MainInfo />,
    <Segmentation />,
    <Notification />,
    <Summary />,
  ];

  return (
    <Box
      sx={{
        paddingBlock: "3vw",
        paddingInline: "5vw",
      }}
    >
      <SingleBreadcrumbs
        firstTitle="Dashboard"
        secondTitle="Program"
        title="Create Program"
        sx={{ mb: "3vw" }}
      />
      <StepperPaper sx={{ paddingBlock: "3vw", paddingInline: "4vw" }}>
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

export default CreateProgram;
