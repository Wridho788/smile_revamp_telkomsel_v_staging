import { BoxProps } from "@mui/material";
import { ReactNode } from "react";

export interface IBasicFormCardWithRightSwitchProps extends BoxProps {
  title: string;
  children: ReactNode;
}
