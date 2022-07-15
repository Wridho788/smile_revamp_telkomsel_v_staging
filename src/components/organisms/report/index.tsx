import * as React from "react";
import { Box, Container, Stack } from "@mui/material";
import { BodyCopy, H2 } from "../../../components";
import FilterListIcon from "@mui/icons-material/FilterList";
import PopUpDatePickers from "../../../components/atoms/PopUpDatePicker";
import ColumnGroupingTable from "../../../components/atoms/ColumnGroupingTable";
import DarkButton from "../../../components/atoms/DarkButton";
import KeywordSearch from "../../../components/atoms/KeywordSearch";

interface IReportProps {}

const Report: React.FunctionComponent<IReportProps> = (props) => {
  const datePickerRef = React.useRef<any>();
  const [filterValue, setFilterValue] = React.useState("");

  console.log(filterValue);
  return (
      <>
        <Stack direction={"row"} justifyContent={"space-between"} sx={{paddingTop:"50px"}}>
          <H2>Products</H2>
          <Stack direction="row" spacing={2}>
            <KeywordSearch />
            <DarkButton
              onClick={() => datePickerRef.current.click()}
              variant="contained"
              size="small"
              startIcon={<FilterListIcon />}
            >
              <BodyCopy>Filter</BodyCopy>
            </DarkButton>
            <Box display={"none"}>
              <PopUpDatePickers
                datePickerRef={datePickerRef}
                setFilterValue={setFilterValue}
              />
            </Box>
          </Stack>
        </Stack>
        <Box mt={5}>
          <ColumnGroupingTable title="POIN OWNER" />
        </Box>
        <Box mt={5}>
          <ColumnGroupingTable title="Gross Revenue" />
        </Box>
        <Box mt={5}>
          <ColumnGroupingTable title="Poin Earned" />
        </Box>
      </>
  );
};

export default Report;
