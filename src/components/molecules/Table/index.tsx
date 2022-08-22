import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(203 213 225)",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: string,
  fat: string,
  carbs: string
) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("SMS", "PIC Customer", "Registration", "Redeem"),
  createData("SMS", "PIC Customer", "Registration", "Redeem"),
];

interface Props {
  data: any[];
}

const TableComponent: React.FC<Props> = ({ data }: Props) => {
  console.log(data);
  return (
    <TableContainer sx={{ borderRadius: 0 }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(data[1]).map((data) => (
              <StyledTableCell key={data} align="center">
                {data}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <StyledTableRow key={item.via}>
              <StyledTableCell component="th" scope="row">
                {item.via}
              </StyledTableCell>
              <StyledTableCell>{item.receiver}</StyledTableCell>
              <StyledTableCell>{item.template}</StyledTableCell>
              <StyledTableCell>{item.transactionType}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
