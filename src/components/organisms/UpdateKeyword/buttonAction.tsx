import { FC } from "react";
import { Button, Grid } from "@mui/material";
import React from "react";
import { ArrowLeft, ArrowRight, Close } from "@mui/icons-material";
import { SmallCopy } from "../..";
import { GridProps } from "@mui/material/Grid/Grid";

interface IButtonAction extends GridProps {
  btnBack: any;
  btnNext: any;
  isDone: boolean;
  isCancel: boolean;
}

const ButtonAction: FC<IButtonAction> = ({
  btnNext,
  btnBack,
  isDone,
  isCancel,
  ...props
}: IButtonAction) => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      {...props}
    >
      {isCancel ? (
        <Button variant="contained">
          <Close />
          <SmallCopy>Cancel</SmallCopy>
        </Button>
      ) : (
        <Button variant="contained" onClick={btnBack}>
          <ArrowLeft />
          <SmallCopy>Back</SmallCopy>
        </Button>
      )}

      {isDone ? (
        <Button variant="contained" onClick={btnNext}>
          <SmallCopy>Done</SmallCopy>
        </Button>
      ) : (
        <Button variant="contained" onClick={btnNext}>
          <SmallCopy>Next</SmallCopy>
          <ArrowRight />
        </Button>
      )}
    </Grid>
  );
};

export default ButtonAction;
