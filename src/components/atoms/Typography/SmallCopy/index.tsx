import * as React from "react";
import Typography from "@mui/material/Typography";
import { ISmallCopyProps } from "./types";

const SmallCopy: React.FunctionComponent<ISmallCopyProps> = (
  props: ISmallCopyProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={14} fontWeight={400} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default SmallCopy;
