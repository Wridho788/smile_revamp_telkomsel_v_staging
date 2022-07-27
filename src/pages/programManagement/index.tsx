import React from "react";
import { Box, Grid } from "@mui/material";
import DefaultBackground from "../../components/atoms/DefaultBackground";
import { Programs } from "../../components";
import programsData from "../../mock-data/programs-data.json";
import CreateProgramForm from "../../components/organisms/CreateProgramForm";

const ProgramManagement = () => {
  return (
    <DefaultBackground>
      <Box
        sx={{
          paddingTop: "3vw",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <Grid container columns={10} spacing={"3vw"}>
          <Grid item xs={7}>
            <Programs programsData={programsData} />
          </Grid>
          <Grid item xs={3}>
            <CreateProgramForm />
          </Grid>
        </Grid>
      </Box>
    </DefaultBackground>
  );
};

export default ProgramManagement;
