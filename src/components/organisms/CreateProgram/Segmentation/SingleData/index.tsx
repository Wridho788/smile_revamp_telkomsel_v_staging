import * as React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    CircularProgress, Grid,
    IconButton, Snackbar,
    Stack,
} from "@mui/material";
import {OutlinedTextField, Select} from "../../../../atoms";
import {useEffect, useState} from "react";
import {programSegmentationOptions} from "../../../../../mocks/options";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Add, Delete} from "@mui/icons-material";
import {
    useCreateProgramMutation, useCreateProgramSegmentationAddMutation,
    useDeleteProgramTempListMutation,
    useImportListMutation, useLazyProgramTempListQuery,

} from "../../../../../redux/features/program/program-api-slice";
import Swal from "sweetalert2";
import {IBlacklist, IWhitelist} from "./SingleData.type";
import {useParams} from "react-router-dom";

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


const whitelistArray: any = []
const blacklistArray: any = []
const SingleData: React.FunctionComponent<ISegmentationProps> = () => {

    let {programId} = useParams();
    const [createProgramTempList] = useCreateProgramSegmentationAddMutation();
    const [whitelistMsisdn, setWhitelistMsisdn] = useState<string>('');
    const [blacklistMsisdn, setBlacklistMsisdn] = useState<string>('');
    const [counter, setCounter] = useState<number>(0);
    const [stateDelete, setStateDelete] = useState<boolean>(true);
    const [open, setOpen] = useState(false);
    const [messageError, setMessageError] = useState('');
    const [warningShow, setWarningShow] = useState(false);

    const whitelistHandle = () => {
        const data: IWhitelist = {
            type: "whitelist",
            msisdn: whitelistMsisdn,
            counter: Number(counter),
            program:programId ?? ''
        }
        whitelistArray.push(data)
        setWhitelistMsisdn('')
        setCounter(0)
    }
    const blacklistHandle = () => {
        const data: IBlacklist = {
            type: "blacklist",
            msisdn: blacklistMsisdn,
            program:programId ?? ''
        }
        blacklistArray.push(data)
        setBlacklistMsisdn('')
    }

    const deleteWhitelistHandle = (msisdn: string) => {
        whitelistArray.splice(whitelistArray.indexOf(msisdn), 1)
        setStateDelete(!stateDelete)
    }
    const deleteBlacklistHandle = (msisdn: string) => {
        blacklistArray.splice(blacklistArray.indexOf(msisdn), 1)
        setStateDelete(!stateDelete)
    }

    const createWhitelistHandle = async () => {
        if (whitelistArray.length === 0) {
            setWarningShow(true)
            return
        }
        await createProgramTempList({"set": whitelistArray}).then((res: any) => {
            if (res.error) {
                setOpen(true)
                setMessageError(res.error.data.message)
            } else {
                Swal.fire("Success!", "Data has been created!", "success");
            }
        })
    }
    const createBlacklistHandle = () => {
        console.log(blacklistArray)
        if (blacklistArray.length === 0) {
            setWarningShow(true)
            return
        }
        createProgramTempList({"set": blacklistArray}).then((res: any) => {
            if (res.error) {
                setOpen(true)
                setMessageError(res.error.data.message)
            } else {
                Swal.fire("Success!", "Data has been created!", "success");
            }
        })
    }
    useEffect(() => {
    }, [whitelistArray, blacklistArray, whitelistMsisdn, counter, stateDelete]);


    return (

        <Box px="3vw">
            {
                warningShow &&
                <Alert variant="outlined" severity="warning" sx={{marginBottom: 5}}>
                    Please complete what is needed first!
                </Alert>
            }
            <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity="error" sx={{width: '100%'}}>
                    {messageError}
                </Alert>
            </Snackbar>
            <Grid container columns={13}>
                <Grid xs={6}>
                    <Stack spacing={"1vw"}>
                        <Grid container columns={13}>
                            <Grid xs={9}>
                                <Stack spacing={"1vw"}>
                                    <OutlinedTextField
                                        type={"number"}
                                        label="MSISDN"
                                        placeholder="628xxxx"
                                        variant={"outlined"}
                                        value={whitelistMsisdn}
                                        handleChange={setWhitelistMsisdn}
                                        isRequired={false}
                                        leftColumn={3}
                                        rightColumn={8}
                                        required={true}
                                    />

                                    <OutlinedTextField
                                        type={"number"}
                                        label="Counter"
                                        placeholder="0"
                                        variant={"outlined"}
                                        value={counter}
                                        handleChange={setCounter}
                                        isRequired={false}
                                        leftColumn={3}
                                        rightColumn={8}
                                        required={true}
                                    />
                                </Stack>
                            </Grid>

                            <Grid xs={1}/>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Button variant="contained"
                                        onClick={() => whitelistHandle()}>+
                                </Button>
                            </Box>

                        </Grid>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>MSSIDN</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {whitelistArray.map((row: any) => (
                                        <TableRow
                                            key={row.msisdn}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {`${row.msisdn} - Counter (${row.counter})`}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <IconButton
                                                    onClick={() => deleteWhitelistHandle(row.msisdn)}
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

                                    <TableRow>
                                        <TableCell align={"right"} colSpan={2}>
                                            <Button variant="contained" color="inherit"
                                                    onClick={() => createWhitelistHandle()}>
                                                Send
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Grid>
                <Grid xs={1}/>
                <Grid xs={6}>
                    <Stack spacing={"1vw"}>
                        <Grid container sx={{marginBottom: 7}}>
                            <Grid xs={8}>
                                <OutlinedTextField
                                    type={"number"}
                                    label="MSISDN"
                                    placeholder="628xxxx"
                                    variant={"outlined"}
                                    value={blacklistMsisdn}
                                    handleChange={setBlacklistMsisdn}
                                    isRequired={false}
                                    leftColumn={3}
                                    rightColumn={8}
                                    required={true}
                                />
                            </Grid>
                            <Grid xs={1}/>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Button variant="contained"
                                        onClick={() => blacklistHandle()}>+
                                </Button>
                            </Box>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>MSSIDN</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {blacklistArray.map((row: any) => (
                                        <TableRow
                                            key={row.msisdn}
                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.msisdn}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                <IconButton
                                                    onClick={() => deleteBlacklistHandle(row.msisdn)}
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

                                    <TableRow>
                                        <TableCell align={"right"} colSpan={2}>
                                            <Button variant="contained" color="inherit"
                                                    onClick={() => createBlacklistHandle()}>
                                                Send
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SingleData;
