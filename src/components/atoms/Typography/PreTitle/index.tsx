import * as React from "react";
import Typography from "@mui/material/Typography";
import { IPreTitleProps } from "./types";

const PreTitle: React.FunctionComponent<IPreTitleProps> = ({
  children,
  ...props
}: IPreTitleProps) => {
  return (
    <Typography fontSize={12} fontWeight={700} {...props}>
      {children}
    </Typography>
  );
};

export default PreTitle;
