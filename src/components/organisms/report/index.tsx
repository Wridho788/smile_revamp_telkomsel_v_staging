import * as React from "react";
import { Box, Stack } from "@mui/material";
import { BodyCopy, H2 } from "../../../components";
import FilterListIcon from "@mui/icons-material/FilterList";
import PopUpDatePicker from "../../../components/atoms/PopUpDatePicker";
import ColumnGroupingTable from "../../../components/atoms/ColumnGroupingTable";
import DarkButton from "../../../components/atoms/DarkButton";
import KeywordSearch from "../../../components/atoms/KeywordSearch";

interface IReportProps {
  resultData: Array<any>;
}

const Report: React.FunctionComponent<IReportProps> = ({ resultData }) => {
  const datePickerRef = React.useRef<any>();
  const [filterValue, setFilterValue] = React.useState("");

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ paddingTop: "50px" }}
      >
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
            <PopUpDatePicker
              datePickerRef={datePickerRef}
              setFilterValue={setFilterValue}
            />
          </Box>
        </Stack>
      </Stack>
      <Box mt={5}>
        <ColumnGroupingTable title="Poin Owner" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Gross Revenue" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Poin Earned" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Redeemer Existing" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Reward Live System" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Reward TRX" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Program" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Redeemer" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Gross Revenue Redeemer" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Poin Earned Reedemer" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Poin Burning" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="TRX Burn" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="Redeemer MyTelkomsel" data={resultData} />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable
          title="Gross Revenue Redeemer MyTelkomsel"
          data={resultData}
        />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable
          title="Poin Earned Reedemer MyTelkomsel"
          data={resultData}
        />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable
          title="Poin Burning MyTelkomsel"
          data={resultData}
        />
      </Box>
      <Box mt={5}>
        <ColumnGroupingTable title="TRX Burn MyTelkomsel" data={resultData} />
      </Box>
    </>
  );
};

export default Report;
