import React from "react";
import { Box, Grid } from "@mui/material";
import DefaultBackground from "../../components/atoms/DefaultBackground";
import { Programs } from "../../components";

const ProgramManagement = () => {
  return (
    <DefaultBackground>
      <Box
        sx={{
          paddingTop: "20px",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Programs />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Box>
    </DefaultBackground>
  );
};

export default ProgramManagement;
