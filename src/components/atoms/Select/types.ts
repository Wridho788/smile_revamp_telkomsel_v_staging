import { SelectProps } from "@mui/material";

export interface ISelectProps extends SelectProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  value?: any;
  setValue?: any;
  totalColumn?: number;
  leftColumn?: number;
  rightColumn?: number;
}
