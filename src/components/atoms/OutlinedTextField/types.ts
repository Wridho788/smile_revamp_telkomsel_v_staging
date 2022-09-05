import { OutlinedTextFieldProps } from "@mui/material";

export interface IOutlinedTextFieldProps extends OutlinedTextFieldProps {
  label?: string;
  placeholder?: string;
  value?: any;
  handleChange?: any;
  totalColumn?: number;
  leftColumn?: number;
  rightColumn?: number;
  direction?: "row" | "column";
  isRequired?: boolean;
}
