import { SelectProps } from "@mui/material";

export interface ISelectProps extends SelectProps {
  label?: string;
  placeholder?: string;
  options?: any[];
  optionLabel?: string;
  optionValue?: string;
  value?: any;
  handleChange?: any;
  totalColumn?: number;
  leftColumn?: number;
  rightColumn?: number;
  direction?: "row" | "column";
  isRequired? : boolean;
  handleRefetch?: any;
}
