import * as React from "react";
import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Pagination,
    Stack,
} from "@mui/material";
import {BodyCopy, Select} from "../../../atoms";
import {useEffect, useState} from "react";
import {programSegmentationOptions} from "../../../../mocks/options";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Delete} from "@mui/icons-material";
import {
    useDeleteProgramTempListMutation,
    useImportListMutation, useLazyProgramTempListQuery, useProgramTempListQuery,

} from "../../../../redux/features/program/program-api-slice";
import {FilterInitial} from "../../../../redux/utils/initial-general";
import {IProgramImportFile, IResponse} from "../../../../redux/features/program/interface";
import Swal from "sweetalert2";

interface ISegmentationProps {
}

const EXTENSIONS = ["txt"];

// const EXTENSIONS = ["xlsx", "xls", "csv"];

const Segmentation: React.FunctionComponent<ISegmentationProps> = () => {
    const [importFile, {isLoading: isUpdate, isSuccess}] = useImportListMutation()
    const [tempListDelete] = useDeleteProgramTempListMutation()
    const [getTempList, {data: tempList = {data: []}}] = useLazyProgramTempListQuery()

    const [typeMSSIDN, setTypeMSSIDN] = React.useState("");
    const [colDefs, setColDefs] = useState<any>();
    const [data, setData] = useState<any>();
    const [fileName, setFileName] = useState<any>();
    const [segmentationData, setSegmentationData] = useState(tempList);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
    }, [segmentationData]);

    const getExention = (file: { name: string }) => {
        const parts = file.name.split(".");
        const extension = parts[parts.length - 1];
        return EXTENSIONS.includes(extension); // return boolean
    };

    const convertToJson = (
        headers: { [x: string]: string | number },
        data: any[]
    ) => {
        const rows: {}[] = [];
        data.forEach((row: any[]) => {
            let rowData: any = {};
            row.forEach((element: any, index: any) => {
                rowData[headers[index]] = element;
            });
            rows.push(rowData);
        });
        return rows;
    };
    const importExcel = (e: any) => {
        const file = e.target.files[0];
        if (!getExention(file)) {
            return alert("Invalid file input, Select txt file");
        }
        setFileName(file);
    }

    const handleProcess = async () => {
        const Data = {
            "file": fileName,
            "type": typeMSSIDN
        }
        setIsLoading(true)
        await importFile({Data})
        await getTempList({})
        setIsLoading(false)
    }
    const handleDeleteProgramTempList = async (_id: string) => {
        Swal.fire({
            title: 'Do you want to delete data?',
            showDenyButton: true,
            confirmButtonText: `Delete`,
            denyButtonText: `Don't Delete`,
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                tempListDelete(_id)
                Swal.fire('Deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Data are not deleted', '', 'info')
            }
            setIsLoading(true)
            await getTempList({})
            setIsLoading(false)
        });
    }
    // const importExcel = (e: any) => {
    //     const file = e.target.files[0];
    //
    //     const reader = new FileReader();
    //     reader.onload = (event: any) => {
    //         //parse data
    //
    //         const bstr = event.target.result;
    //         const workBook = read(bstr, {type: "binary"});
    //
    //         //get first sheet
    //         const workSheetName = workBook.SheetNames[0];
    //         const workSheet = workBook.Sheets[workSheetName];
    //         //convert to array
    //         const fileData = utils.sheet_to_json(workSheet, {header: 1});
    //         // console.log(fileData)
    //         const headers: any = fileData[0];
    //         const heads = headers.map((head: any) => ({title: head, field: head}));
    //         setColDefs(heads);
    //
    //         //removing header
    //         fileData.splice(0, 1);
    //
    //         setData(convertToJson(headers, fileData));
    //     };
    //
    //     if (file) {
    //         if (getExention(file)) {
    //             reader.readAsBinaryString(file);
    //         } else {
    //             alert("Invalid file input, Select Excel, CSV file");
    //         }
    //     } else {
    //         setData([]);
    //         setColDefs([]);
    //     }
    // };


    // TODO LOGIC DATATABLE
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    //
    // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     if (event.target.checked) {
    //         const newSelected = tempList.data.map((n) => n.name);
    //         setSelected(newSelected);
    //         return;
    //     }
    //     setSelected([]);
    // };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tempList.data.length) : 0;
    // TODO END LOGIC DATATABLE


    return (
        <Box px="3vw">
            <Box pt="2vw" pb="3vw">
                <Stack direction="row" alignItems="center" spacing="1vw" mb="1.5vw">
                    <Button variant="contained" component="label" color={"inherit"}>
                        File Choices
                        <input type="file" onChange={importExcel} hidden/>
                    </Button>
                </Stack>
                <Select
                    placeholder="Select"
                    options={programSegmentationOptions}
                    optionValue="set_value"
                    value={typeMSSIDN}
                    handleChange={setTypeMSSIDN}
                    sx={{maxWidth: "35%"}}
                />
                <Stack direction="row" alignItems="center" mt="1.5vw">
                    <Button onClick={() => {
                        handleProcess()
                    }} variant="contained" component="label">
                        Process
                    </Button>
                </Stack>
            </Box>
            {isLoading ? <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <CircularProgress/>
                </Box>
                :
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>MSSIDN</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {tempList.data.map((row) => (
                                <TableRow
                                    key={row.msisdn}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.msisdn}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <IconButton
                                            onClick={() => handleDeleteProgramTempList(row['_id'])}
                                            sx={{
                                                width: "2.1vw",
                                                height: "2.1vw",
                                                bgcolor: "secondary",
                                                borderRadius: "0.4vw",
                                                opacity: 0.8,
                                            }}
                                        >
                                            <Delete fontSize="inherit"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
            {/*<TablePagination*/}
            {/*    rowsPerPageOptions={[5, 10, 25]}*/}
            {/*    component="div"*/}
            {/*    count={segmentationData.length}*/}
            {/*    rowsPerPage={rowsPerPage}*/}
            {/*    page={page}*/}
            {/*    onPageChange={handleChangePage}*/}
            {/*    onRowsPerPageChange={handleChangeRowsPerPage}*/}
            {/*/>*/}
        </Box>
    );
};

export default Segmentation;
