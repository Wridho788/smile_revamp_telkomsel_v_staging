import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IData } from "../../../../../../redux/features/program/interface";
import moment from "moment";

interface IInformationProps {
  program: IData | undefined;
}

const Information: React.FunctionComponent<IInformationProps> = ({
  program,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Start Period
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              End Period
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">
              {moment(program?.start_period).format("MMM DD, YYYY")}
            </TableCell>
            <TableCell align="center">
              {moment(program?.end_period).format("MMM DD, YYYY")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Information;
