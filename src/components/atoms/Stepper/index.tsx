import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BodyCopy } from "../Typography";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TelegramIcon from "@mui/icons-material/Telegram";

export default function HorizontalLinearStepper({
  children,
  optionalStep = 0,
  steps,
  activeStep,
  setActiveStep,
}: {
  children?: any;
  optionalStep?: number;
  steps?: any;
  activeStep?: any;
  setActiveStep?: any;
}) {
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return optionalStep ? step === optionalStep : false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} sx={{ mb: "3vw" }}>
        {steps.map((label: any, index: any) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <Box display="flex" justifyContent="center" mb="1vw">
                <StepLabel {...labelProps} />
              </Box>
              <BodyCopy>{label}</BodyCopy>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: "1vw", mb: 1 }}>
            All steps completed - your inputs are submitted
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {children}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: "1vw" }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              color="primary"
              variant="contained"
              startIcon={<ArrowLeftIcon fontSize="large" />}
              sx={{
                borderRadius: "0.3vw",
                paddingInline: "1.5vw",
                paddingBlock: "0.5vw",
              }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button
              onClick={handleNext}
              color="primary"
              variant="contained"
              endIcon={
                activeStep === steps.length - 1 ? (
                  <TelegramIcon fontSize="large" />
                ) : (
                  <ArrowRightIcon fontSize="large" />
                )
              }
              sx={{
                borderRadius: "0.3vw",
                paddingInline: "1.5vw",
                paddingBlock: "0.5vw",
              }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
