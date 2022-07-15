import * as React from "react";
import Typography from "@mui/material/Typography";
import { IH3Props } from "./types";

const H3: React.FunctionComponent<IH3Props> = (props: IH3Props) => {
  let typographyProps = { ...props };
  delete typographyProps.children;
  return (
    <Typography fontSize={21} fontWeight={500} {...typographyProps}>
      {props.children}
    </Typography>
  );
};

export default H3;
