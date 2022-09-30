import {
  Box,
  Grid,
  Input,
  InputProps,
  StandardTextFieldProps,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Gap } from "components/atoms";
import { BodyCopy, PreTitle } from "components/atoms/Typography";
import React from "react";
import "./textarea.css";

interface IProps extends React.TextareaHTMLAttributes<{}> {
  min: number;
  max: number;
  rows: number;
  value: string;
  name?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  direction?: "row" | "column";
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
  direction = "row",
  ...props
}: IProps) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Grid container>
          <Grid>
            <BodyCopy>{label}</BodyCopy>
          </Grid>
          {required && (
            <Grid>
              <BodyCopy color={"red"} sx={{ marginLeft: "5px" }}>
                *
              </BodyCopy>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item width="100%">
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
          <PreTitle>{`${value.length ? value.length : 0}/${max}`}</PreTitle>
          <Gap width={5} height={0} />
          {value && min > value.length ? (
            <PreTitle sx={{ color: "red" }}>
              Minimum character is {min}
            </PreTitle>
          ) : max < value.length ? (
            <PreTitle sx={{ color: "red" }}>
              {Math.abs(max - value.length)} of {max} characters left
            </PreTitle>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default TextArea;
