import { OutlinedTextFieldProps } from "@mui/material";

export interface IOutlinedTextFieldProps extends OutlinedTextFieldProps {
  label?: string;
  placeholder?: string;
  returnedValue?: any;
  setReturnedValue?: any;
}
