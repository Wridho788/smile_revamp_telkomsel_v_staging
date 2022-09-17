import React from "react";
import { Box, Grid } from "@mui/material";
import ProgramPrimeDt from "../../components/organisms/ProgramPrimeDt";
const ProgramManagement = () => {
  return (
    <Box
      sx={{
        paddingTop: "3vw",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <Grid item xs={7}>
        <ProgramPrimeDt />
      </Grid>
    </Box>
  );
};

export default ProgramManagement;
