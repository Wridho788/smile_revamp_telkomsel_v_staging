import { Box, Divider } from "@mui/material";
import React, { FC } from "react";
import { PreTitle } from "../../atoms";

interface Props {
  title: string;
}
const Title: FC<Props> = ({ title }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <PreTitle>{title}</PreTitle>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "3px",
          marginLeft: "15px",
          borderBottom: "2px solid rgba(0,0,0, .12)",
          width: "100%",
        }}
      ></Box>
    </Box>
  );
};

export default Title;
