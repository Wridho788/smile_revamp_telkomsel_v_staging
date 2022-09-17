import { ListProps } from "./types";
import { FC, useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Box, CircularProgress, Grid, IconButton, Input } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { IParams } from "../../../../../redux/utils/IGeneral";
import { BodyCopy, H3 } from "../../../../atoms";
import {
  useDeleteProgramMutation,
  useLazyProgramSegmentationListQuery,
} from "../../../../../redux/features/program/program-api-slice";
import { PayloadInitial } from "../../../../../redux/utils/initial-general";
import { Delete } from "@mui/icons-material";

const SegmentationList: FC<ListProps> = ({ ...props }) => {
  // TODO LOGIC DATATABLE

  const [searchInput, setSearchInput] = useState<string>("");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleDelete = async (_id: string) => {
    let text = "Do you want to delete data?";
    if (window.confirm(text) == true) {
      await deleteSegmentation(_id).then((res: any) => {
        if (res.error) {
          alert(res.error.data.message);
        }
      });
      getSegmentation(segmentationParams);
    }
  };
  const segmentationParams: IParams = {
    lazyEvent: JSON.stringify({
      first: page,
      rows: rowsPerPage,
      filters: { msisdn: { value: searchInput } },
    }),
    // lazyEvent: `{"first" : ${page}, "rows" : ${rowsPerPage} }`,
    type: props.type,
    program: props.programId,
  };
  const [
    getSegmentation,
    { data: segmentationList = PayloadInitial, isLoading, isSuccess },
  ] = useLazyProgramSegmentationListQuery();

  const [deleteSegmentation, { isLoading: deleteLoading }] =
    useDeleteProgramMutation();

  useEffect(() => {
    if (props.programId !== "") {
      getSegmentation(segmentationParams);
    }
  }, [props.programId, isSuccess, page, rowsPerPage, searchInput]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Grid container>
                <Grid item xs={7}>
                  <BodyCopy sx={{ textTransform: "capitalize" }} mt={1}>
                    {props.type}
                  </BodyCopy>
                </Grid>
                <Grid item xs={5}>
                  <Input
                    fullWidth
                    placeholder="Search..."
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableHead>
        {isLoading || deleteLoading ? (
          <>
            <Box p={5}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                }}
                mt={5}
              >
                <BodyCopy>{`Loading ${props.type} Data, please wait...`}</BodyCopy>
              </Box>
            </Box>
          </>
        ) : (
          <TableBody>
            {segmentationList.payload.data.length > 0 ? (
              segmentationList.payload.data.map((row, idx) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.msisdn}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <IconButton
                      onClick={() => handleDelete(row._id)}
                      color={"primary"}
                      sx={{
                        width: "2.1vw",
                        height: "2.1vw",
                        bgcolor: "secondary",
                        borderRadius: "0.4vw",
                        opacity: 0.8,
                      }}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                mt={5}
              >
                <BodyCopy>No Data ..</BodyCopy>
              </Box>
            )}
          </TableBody>
        )}
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={segmentationList.payload.totalRecords ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        showFirstButton
        showLastButton
      />
    </TableContainer>
  );
};
export default SegmentationList;
