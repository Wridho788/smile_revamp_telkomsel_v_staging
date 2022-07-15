import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import { BodyCopy, Subtitle } from "../Typography";
import { StyledTableCell, StyledTitle } from "./StyledComponents";
import { Column, Data } from "./types";

const columns: Column[] = [
  { id: "periode", label: "Periode", align: "center" },
  {
    id: "year_to_date",
    label: "Year\u00a0to\u00a0Date",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "month_to_date",
    label: "Month\u00a0to\u00a0Date",
    align: "center",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];

function createData(
  id: number,
  periode: string,
  year_to_date: number,
  month_to_date: number
): Data {
  return { id, periode, year_to_date, month_to_date };
}

const rows = [
  createData(0, "July 10, 2021", 14124221, 54124),
  createData(1, "July 10, 2022", 14124221, 54124),
  createData(2, "July 10, 2022", 14124221, 54124),
];

//TODO loop data
// let rows:any =[];
// for (var i = 0; i < data.length; i++) {
//   rows.push(createData(data.id, data.period, data[i].year_to_date, data[i].month_to_date));
// }
export default function ColumnGroupingTable(props: any) {
  const { title = "Title", data } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <StyledTitle>
        <Subtitle>{title}</Subtitle>
      </StyledTitle>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <Subtitle>{column.label}</Subtitle>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            <BodyCopy>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </BodyCopy>
                          </StyledTableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
