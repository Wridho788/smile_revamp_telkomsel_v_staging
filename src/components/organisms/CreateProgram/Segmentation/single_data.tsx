import * as React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
    Box,
    Button,
    CircularProgress, Grid,
    IconButton,
    Stack,
} from "@mui/material";
import {OutlinedTextField, Select} from "../../../atoms";
import {useEffect, useState} from "react";
import {programSegmentationOptions} from "../../../../mocks/options";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Add, Delete} from "@mui/icons-material";
import {
    useDeleteProgramTempListMutation,
    useImportListMutation, useLazyProgramTempListQuery,

} from "../../../../redux/features/program/program-api-slice";
import Swal from "sweetalert2";
import TablePagination from "@mui/material/TablePagination";
import ModalCustom from "@mui/material/Modal";
import {ModalInputs} from "./Segmentation.type";

interface ISegmentationProps {
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,

    p: 4,
};


const SingleData: React.FunctionComponent<ISegmentationProps> = () => {
    const [tempListDelete] = useDeleteProgramTempListMutation()
    const [getTempList, {data: tempList = {data: []}}] = useLazyProgramTempListQuery()

    const [typeMSSIDN, setTypeMSSIDN] = useState('whitelist');
    const [segmentationData, setSegmentationData] = useState(tempList);
    const [isLoading, setIsLoading] = useState(false);
    const [msisdn, setMsisdn] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
    }, [segmentationData]);
    const handleAdd = () => {
        setOpenModal(true)
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

    // TODO LOGIC DATATABLE
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


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

    const {register, handleSubmit, formState: {errors}} = useForm<ModalInputs>();
    const onSubmit: SubmitHandler<ModalInputs> = data => console.log(data);
    return (
        <Box px="3vw">
            <ModalCustom
                keepMounted
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                sx={{overflow: "scroll"}}
            >
                <Box sx={style} minWidth={"45vw"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={"1vw"} width={"100%"}>
                            <OutlinedTextField
                                label="MSISDN"
                                placeholder="628xxxx"
                                variant={"outlined"}
                                value={msisdn}
                                handleChange={setMsisdn}
                                isRequired={false}
                                leftColumn={3}
                                required={true}
                            />
                            {
                                typeMSSIDN === 'whitelist' &&
                                <OutlinedTextField
                                    label="Counter"
                                    placeholder="0"
                                    variant={"outlined"}
                                    value={msisdn}
                                    handleChange={setMsisdn}
                                    isRequired={false}
                                    leftColumn={3}
                                    required={true}
                                />
                            }
                        </Stack>
                        <Grid textAlign={"right"} sx={{marginTop: 5}}>
                            <Button variant="outlined" onClick={() => setOpenModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="contained" type={"submit"} sx={{marginLeft:"5px"}}>
                                Submit
                            </Button>
                        </Grid>
                    </form>
                </Box>
            </ModalCustom>
            <Stack spacing={"1vw"} width={"100%"}>
                <Select
                    label="Segmentation Type"
                    placeholder="Select"
                    options={programSegmentationOptions}
                    optionValue="set_value"
                    value={typeMSSIDN}
                    leftColumn={3}
                    handleChange={setTypeMSSIDN}
                    sx={{maxWidth: "50%"}}
                />

                {isLoading ? <Box sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <CircularProgress/>
                    </Box>
                    :
                    <>
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align={"right"} colSpan={2}>
                                            <Button variant="contained" startIcon={<Add/>}
                                                    onClick={() => setOpenModal(true)}>
                                                Add
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={tempList.data.length}
                            rowsPerPage={2}
                            page={3}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                }
            </Stack>
        </Box>
    );
};

export default SingleData;
