import * as React from "react";
import Typography from "@mui/material/Typography";
import { IBigButtonTextProps } from "./types";

const BigButtonText: React.FunctionComponent<IBigButtonTextProps> = (
  props: IBigButtonTextProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={28} fontWeight={500} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default BigButtonText;
