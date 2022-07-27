import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { BodyCopy, H2, PreTitle } from "../..";
import KeywordSearch from "../../atoms/KeywordSearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";

interface IProgramsProps {
  programsData: any;
}

const Programs: React.FunctionComponent<IProgramsProps> = ({
  programsData,
}) => {
  const data = programsData.data;
  console.log(data);
  const [listForm, setListForm] = React.useState("card");
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ paddingTop: "50px" }}
      >
        <H2 color={"secondary.dark"}>Program</H2>
        <Stack direction="row" alignItems="center" spacing={"1vw"}>
          <ListButton
            onClick={() => setListForm("list")}
            sx={{
              color:
                listForm === "list" ? "background.default" : "secondary.light",
              backgroundColor:
                listForm === "list" ? "secondary.light" : "background.default",
            }}
          />
          <CardButton
            onClick={() => setListForm("card")}
            sx={{
              color:
                listForm === "card" ? "background.default" : "secondary.light",
              backgroundColor:
                listForm === "card" ? "secondary.light" : "background.default",
            }}
          />
          <KeywordSearch />
          <DarkButton
            variant="contained"
            size="medium"
            startIcon={<FilterListIcon />}
          >
            <BodyCopy>Filter</BodyCopy>
          </DarkButton>
        </Stack>
      </Stack>
      <Box mt={5}>
        <Grid container columns={5} spacing={"1vw"}>
          {[0, 1, 2, 3, 4, 5, 6].map((_, id) =>
            data.map((_: any, id: number) => (
              <Grid key={id} item xs={1}>
                <Card>
                  <CardContent>
                    <Grid container spacing={"1vw"} columns={8}>
                      <Grid item xs={7}>
                        <PreTitle
                          color={"secondary.light"}
                          sx={{ opacity: 0.5 }}
                        >
                          {_.link}
                        </PreTitle>
                      </Grid>
                    </Grid>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Word of the Day
                    </Typography>
                    <Typography variant="h5" component="div">
                      benevolent
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      adjective
                    </Typography>
                    <Typography variant="body2">
                      well meaning and kindly.
                      <br />
                      {'"a benevolent smile"'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Programs;
