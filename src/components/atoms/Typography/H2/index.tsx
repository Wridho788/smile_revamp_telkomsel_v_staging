import * as React from "react";
import Typography from "@mui/material/Typography";
import { IH2Props } from "./types";

const H2: React.FunctionComponent<IH2Props> = (props: IH2Props) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={24} fontWeight={700} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default H2;
