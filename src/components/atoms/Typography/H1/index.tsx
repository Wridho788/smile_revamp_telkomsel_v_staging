import * as React from "react";
import Typography from "@mui/material/Typography";
import { IH1Props } from "./types";

const H1: React.FunctionComponent<IH1Props> = (props: IH1Props) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={36} fontWeight={700} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default H1;
