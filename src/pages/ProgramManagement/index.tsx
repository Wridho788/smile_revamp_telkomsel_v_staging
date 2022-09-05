import React from "react";
import { Box, Grid } from "@mui/material";
import { Programs } from "../../components";
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
          <Programs  />
        </Grid>
    </Box>
  );
};

export default ProgramManagement;
