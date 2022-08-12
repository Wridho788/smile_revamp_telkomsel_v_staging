import { OutlinedTextFieldProps } from "@mui/material";

export interface IOutlinedTextFieldProps extends OutlinedTextFieldProps {
  type?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  handleChange?: any;
  totalColumn?: number;
  leftColumn?: number;
  rightColumn?: number;
  direction?: "row" | "column";
}
