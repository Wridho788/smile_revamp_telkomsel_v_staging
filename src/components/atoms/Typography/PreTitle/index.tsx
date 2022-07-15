import * as React from "react";
import Typography from "@mui/material/Typography";
import { IPreTitleProps } from "./types";

const PreTitle: React.FunctionComponent<IPreTitleProps> = (
  props: IPreTitleProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={12} fontWeight={700} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default PreTitle;
