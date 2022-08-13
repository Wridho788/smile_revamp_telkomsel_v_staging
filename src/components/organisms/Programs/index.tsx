import * as React from "react";
import { Box, Card, CardContent, Grid, IconButton, Stack } from "@mui/material";
import { BodyCopy, H2, SmallCopy, PreTitle } from "../..";
import KeywordSearch from "../../atoms/KeywordSearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTypedSelector } from "../../../app/hooks/useTypedSelector";
import { useActions } from "../../../app/hooks/useActions";
import { useEffect } from "react";
import mock from "../../../mock-data/programs-data.json";

const Programs: React.FunctionComponent = () => {
  const [listForm, setListForm] = React.useState<string>("card");
  const { result, error, loading } = useTypedSelector(
    (state) => state.defaultList
  );
  const { getProgramList } = useActions();
  useEffect(() => {
    getProgramList({});
  }, [result]);

  const data = result.data;
  //   if (error) {
  //     return <h1 style={{ color: "red", fontWeight: "700" }}>{error}</h1>;
  //   }
  //   if (loading) {
  //     return <h1>Loading ...</h1>;
  //   }
  console.log(mock.data);
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <H2 color={"secondary.dark"}>Program</H2>
        <Stack direction="row" alignItems="center" spacing={"1vw"}>
          <ListButton
            onClick={() => setListForm("list")}
            sx={{
              width: "2.1vw",
              height: "2.1vw",
              color:
                listForm === "list" ? "background.default" : "secondary.light",
              backgroundColor:
                listForm === "list" ? "secondary.light" : "background.default",
            }}
          />
          <CardButton
            onClick={() => setListForm("card")}
            sx={{
              width: "2.1vw",
              height: "2.1vw",
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
        {listForm === "card" && (
          <Grid container columns={5} spacing={"1vw"}>
            {[0].map((_, id) =>
              mock.data.map((_: any, id: number) => (
                <Grid key={id} item xs={1}>
                  <Card sx={{ position: "relative", minHeight: "12.5vw" }}>
                    <CardContent>
                      <Grid container columns={11}>
                        <Grid item xs={9}>
                          <PreTitle
                            color={"secondary.light"}
                            sx={{ opacity: 0.5 }}
                          >
                            {/* 1 */}
                            {/* {_["name"]} */}
                            {_.link}
                          </PreTitle>
                        </Grid>
                        <Grid item xs={1}>
                          <IconButton
                            sx={{
                              width: "2.1vw",
                              height: "2.1vw",
                              bgcolor: "secondary.main",
                              borderRadius: "0.4vw",
                              opacity: 0.8,
                            }}
                          >
                            <MoreVertIcon fontSize="inherit" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {/* 2 */}
                      {/* <H2 mt={"2.5vw"}>{_["name"]}</H2> */}
                      <H2 mt={"1.5vw"} pb="2vw">
                        {_.title}
                      </H2>
                      <Box position="absolute" bottom={"1vw"}>
                        <Stack direction={"row"} spacing={"0.5vw"} mt={"0.5vw"}>
                          <Box
                            bgcolor={"secondary.main"}
                            color={"secondary.light"}
                            borderRadius={"1vw"}
                            px={"0.9vw"}
                            py={"0.2vw"}
                            sx={{ opacity: 0.8 }}
                          >
                            {/* 3 */}
                            {/* <SmallCopy>{_["name"]}</SmallCopy> */}
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
                            {/* 4 */}
                            {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                            <SmallCopy>{_.rules_amount}</SmallCopy>
                          </Box>
                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}

        {listForm === "list" && (
          <Stack spacing="1vw">
            {[0].map((_, id) =>
              mock.data.map((_: any, id: number) => (
                <Grid
                  container
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  bgcolor="background.paper"
                  py="1.5vw"
                  px="3vw"
                >
                  <Grid item xs={9}>
                    <Grid container display="flex" alignItems="center">
                      <Grid item xs={6}>
                        <BodyCopy
                          color={"secondary.light"}
                          sx={{ opacity: 0.5 }}
                        >
                          {/* 1 */}
                          {/* {_["name"]} */}
                          {_.link}
                        </BodyCopy>
                      </Grid>
                      <Grid item xs={6}>
                        {/* 2 */}
                        {/* <H2 mt={"2.5vw"}>{_["name"]}</H2> */}
                        <H2>{_.title}</H2>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container display="flex" alignItems="center">
                      <Grid item xs={5}>
                        <Box
                          bgcolor={"secondary.main"}
                          color={"secondary.light"}
                          borderRadius={"1vw"}
                          maxWidth="6vw"
                          px={"0.9vw"}
                          py={"0.4vw"}
                          sx={{ opacity: 0.8 }}
                        >
                          {/* 3 */}
                          {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                          <SmallCopy align="center">{_.unit_amount}</SmallCopy>
                        </Box>
                      </Grid>
                      <Grid item xs={5}>
                        <Box
                          bgcolor={"secondary.main"}
                          color={"secondary.light"}
                          borderRadius={"1vw"}
                          maxWidth="6vw"
                          px={"0.9vw"}
                          py={"0.4vw"}
                          sx={{ opacity: 0.8 }}
                        >
                          {/* 4 */}
                          {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                          <SmallCopy align="center">{_.rules_amount}</SmallCopy>
                        </Box>
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          size="small"
                          sx={{
                            bgcolor: "secondary.main",
                            borderRadius: "0.4vw",
                            opacity: 0.8,
                            width: "2.1vw",
                            height: "2.1vw",
                          }}
                        >
                          <MoreVertIcon fontSize="inherit" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              ))
            )}
          </Stack>
        )}
      </Box>
    </>
  );
};
export default Programs;
