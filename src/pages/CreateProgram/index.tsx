import React from "react";
import { Box } from "@mui/material";
import MainInfo from "../../components/organisms/CreateProgram/MainInfo";

const CreateProgram = () => {
  return (
    <Box
      sx={{
        paddingBlock: "5vw",
        paddingInline: "5vw",
      }}
    >
      <MainInfo />
    </Box>
  );
};

export default CreateProgram;
