import React from "react";
import { Box } from "@mui/material";
import { H2, Stepper, StepperPaper } from "../../components";
import {
  MainInfo,
  Notification,
  Segmentation,
  Summary,
} from "../../components/organisms/CreateProgram";
import { CreateProgramProvider } from "../../app/context/CreateProgram/Provider";

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
    <CreateProgramProvider>
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
            Create Program
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
    </CreateProgramProvider>
  );
};

export default CreateProgram;
