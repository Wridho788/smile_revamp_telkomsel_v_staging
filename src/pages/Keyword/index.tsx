import React from "react";
import { Box, Grid } from "@mui/material";
import Keywords from "../../components/organisms/Keywords";


const Keyword = () => {
  return (
    <Box
      sx={{
        paddingTop: "3vw",
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
        <Grid item xs={7}>
          <Keywords />
        </Grid>
    </Box>
  );
};

export default Keyword;
