import React from "react";
import { Box } from "@mui/material";
import { H2, Stepper, StepperPaper } from "../../components";
import {
  MainInfo,
  // Notification,
  Bonus,
  // Summary,
} from "../../components/organisms/CreateKeyword";

const CreateKeyword = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = ["Main Info", "Bonus"];
  const stepsItem = [<MainInfo />, <Bonus />];
  // const steps = ["Main Info", "Bonus", "Notification"];
  // const stepsItem = [<MainInfo />, <Bonus />, <Notification />];

  return (
      <Box
        sx={{
          paddingBlock: "3vw",
          paddingInline: "20vw",
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
            Create Keyword
          </H2>
          <Stepper
            steps={steps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            slug={"insert"}
            type={"keyword"}
          >
            {stepsItem[activeStep]}
          </Stepper>
        </StepperPaper>
      </Box>
  );
};

export default CreateKeyword;
