import * as React from "react";
import Typography from "@mui/material/Typography";
import { ISubtitleProps } from "./types";

const Subtitle: React.FunctionComponent<ISubtitleProps> = (
  props: ISubtitleProps
) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={18} fontWeight={700} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default Subtitle;
