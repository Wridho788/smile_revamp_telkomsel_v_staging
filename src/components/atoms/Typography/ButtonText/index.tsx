import * as React from "react";
import Typography from "@mui/material/Typography";
import { IButtonTextProps } from "./types";

const ButtonText: React.FunctionComponent<IButtonTextProps> = (
  props: IButtonTextProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={16} fontWeight={400} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default ButtonText;
