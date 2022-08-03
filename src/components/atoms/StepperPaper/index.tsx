import { Paper } from "@mui/material";
import * as React from "react";
import { IStepperPaperProps } from "./types";

const StepperPaper: React.FunctionComponent<IStepperPaperProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper elevation={3} {...props}>
      {children}
    </Paper>
  );
};

export default StepperPaper;
