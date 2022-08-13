import { Box, Divider } from "@mui/material";
import * as React from "react";
import { BodyCopy } from "../Typography";
import { IBasicFormCardProps } from "./type";

const BasicFormCard: React.FunctionComponent<IBasicFormCardProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <Box border="0.15vw solid rgba(0, 0, 0, 0.1)" {...props}>
      <Box p="1vw">
        <BodyCopy textAlign="center" textTransform="uppercase">
          {title}
        </BodyCopy>
      </Box>
      <Divider />
      <Box p="1vw">{children}</Box>
    </Box>
  );
};

export default BasicFormCard;
