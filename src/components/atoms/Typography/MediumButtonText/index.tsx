import * as React from "react";
import Typography from "@mui/material/Typography";
import { IMediumButtonTextProps } from "./types";

const MediumButtonText: React.FunctionComponent<IMediumButtonTextProps> = (
  props: IMediumButtonTextProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={16} fontWeight={700} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default MediumButtonText;
