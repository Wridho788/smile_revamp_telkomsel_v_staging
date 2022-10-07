/**
 * TODO: Create Keyword
 * **/

import React from "react";
import { Box } from "@mui/material";
import { DrawerNav, H2, Stepper, StepperPaper } from "../../components";
import { MainInfo, Bonus } from "../../components/organisms/CreateKeyword";

const CreateKeyword = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const steps = ["Main Info", "Bonus"];
  const stepsItem = [<MainInfo />, <Bonus />];

  return (
    <DrawerNav>
      <Box
        sx={{
          paddingBlock: "3vw",
          paddingInline: "20vw",
        }}
      >
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
    </DrawerNav>
  );
};

export default CreateKeyword;
