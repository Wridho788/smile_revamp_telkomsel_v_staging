import * as React from "react";
import Typography from "@mui/material/Typography";
import { IH1Props } from "./types";

const H1: React.FunctionComponent<IH1Props> = ({ children, ...props }) => {
  return (
    <Typography fontSize={36} fontWeight={700} {...props}>
      {children}
    </Typography>
  );
};

export default H1;
