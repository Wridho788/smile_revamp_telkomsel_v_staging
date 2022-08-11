import { Paper } from "@mui/material";
import * as React from "react";
import { ICustomPaperProps } from "./type";

const CustomPaper: React.FunctionComponent<ICustomPaperProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper elevation={3} {...props}>
      {children}
    </Paper>
  );
};

export default CustomPaper;
