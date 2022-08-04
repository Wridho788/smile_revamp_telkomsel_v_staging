import * as React from "react";
import Typography from "@mui/material/Typography";
import { IBodyCopyProps } from "./types";

const BodyCopy: React.FunctionComponent<IBodyCopyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography fontSize={16} fontWeight={400} {...props}>
      {children}
    </Typography>
  );
};

export default BodyCopy;
