import {
  Box,
  Input,
  InputProps,
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Gap } from "components/atoms";
import React from "react";
import "./textarea.css";

interface IProps extends React.TextareaHTMLAttributes<{}> {
  min: number;
  max: number;
  rows: number;
  value: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}
const TextArea = ({
  min,
  max,
  onChange,
  value,
  name,
  rows,
  label,
  required = true,
  ...props
}: IProps) => {
  return (
    <Box>
      <label>{label}</label>
      <textarea
        style={{ width: "100%" }}
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
      <Box sx={{ display: "flex" }}>
        {`${value.length ? value.length : 0}/${max}`}
        <Gap width={5} height={0} />
        {value && min > value.length ? (
          <Typography sx={{ color: "red" }}>
            Minimum character is {min}
          </Typography>
        ) : max < value.length ? (
          <Typography sx={{ color: "red" }}>
            {Math.abs(max - value.length)} of {max} characters left
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default TextArea;
