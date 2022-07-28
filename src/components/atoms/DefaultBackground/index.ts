import React from "react";
import { styled } from "@mui/material/styles";

const DefaultBackground = styled("div")(({ theme }) => ({
  // position: "absolute",
  top: 0,
  width: "100vw",
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
}));

export default DefaultBackground;
