import React from "react";
import { Box } from "@mui/material";
import MainInfo from "../../components/organisms/CreateProgram/MainInfo";

const CreateProgram = () => {
  return (
    <Box
      sx={{
        paddingTop: "3vw",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <MainInfo />
    </Box>
  );
};

export default CreateProgram;
