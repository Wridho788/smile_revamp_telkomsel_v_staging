import * as React from "react";
import { Box, Stack } from "@mui/material";
import { BodyCopy, H2 } from "../..";
import KeywordSearch from "../../atoms/KeywordSearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";

interface IProgramsProps {
  // resultData: Array<any>;
}

const Programs: React.FunctionComponent<IProgramsProps> = () =>
  // {
  //   resultData
  // }
  {
    const [listForm, setListForm] = React.useState("card");
    return (
      <>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          sx={{ paddingTop: "50px" }}
        >
          <H2>Program</H2>
          <Stack direction="row" alignItems="center" spacing={"1vw"}>
            <Stack direction="row" alignItems="center" spacing={"0.5vw"}>
              <ListButton
                onClick={() => setListForm("list")}
                sx={{
                  color:
                    listForm === "list"
                      ? "background.default"
                      : "secondary.light",
                  backgroundColor:
                    listForm === "list"
                      ? "secondary.light"
                      : "background.default",
                }}
              />
              <CardButton
                onClick={() => setListForm("card")}
                sx={{
                  color:
                    listForm === "card"
                      ? "background.default"
                      : "secondary.light",
                  backgroundColor:
                    listForm === "card"
                      ? "secondary.light"
                      : "background.default",
                }}
              />
            </Stack>
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
        <Box mt={5}></Box>
      </>
    );
  };

export default Programs;
