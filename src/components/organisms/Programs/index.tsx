import * as React from "react";
import { Box, Card, CardContent, Grid, IconButton, Stack } from "@mui/material";
import { BodyCopy, H2, SmallCopy, PreTitle } from "../..";
import KeywordSearch from "../../atoms/KeywordSearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
      <Stack direction={"row"} justifyContent={"space-between"}>
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
                    <Grid container columns={11}>
                      <Grid item xs={9}>
                        <PreTitle
                          color={"secondary.light"}
                          sx={{ opacity: 0.5 }}
                        >
                          {_.link}
                        </PreTitle>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "secondary.main",
                            borderRadius: "0.4vw",
                            opacity: 0.8,
                          }}
                        >
                          <MoreVertIcon fontSize="inherit" />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <H2 mt={"2.5vw"}>{_.title}</H2>
                    <Stack direction={"row"} spacing={"0.1vw"} mt={"0.5vw"}>
                      <Box
                        bgcolor={"secondary.main"}
                        color={"secondary.light"}
                        borderRadius={"1vw"}
                        px={"0.9vw"}
                        py={"0.2vw"}
                        sx={{ opacity: 0.8 }}
                      >
                        <SmallCopy>{_.unit_amount}</SmallCopy>
                      </Box>
                      <Box
                        bgcolor={"secondary.main"}
                        color={"secondary.light"}
                        borderRadius={"1vw"}
                        px={"0.9vw"}
                        py={"0.2vw"}
                        sx={{ opacity: 0.8 }}
                      >
                        <SmallCopy>{_.rules_amount}</SmallCopy>
                      </Box>
                    </Stack>
                  </CardContent>
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
