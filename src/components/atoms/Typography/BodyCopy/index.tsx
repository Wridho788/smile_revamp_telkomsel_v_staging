import * as React from "react";
import Typography from "@mui/material/Typography";
import { IBodyCopyProps } from "./types";

const BodyCopy: React.FunctionComponent<IBodyCopyProps> = (
  props: IBodyCopyProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={16} fontWeight={400} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default BodyCopy;
