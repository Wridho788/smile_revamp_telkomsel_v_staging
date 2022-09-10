import * as React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {
    Alert,
    Box,
    Button,
    CircularProgress, Grid,
    IconButton, Snackbar,
    Stack, Typography,
} from "@mui/material";
import {H2, OutlinedTextField, Select} from "../../../../atoms";
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
import { useCreateProgramSegmentationAddMutation,

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

    // Handle Loading
    const [sendBlacklistProcess, setSendBlacklistProcess] = useState(false)
    const [sendWhitelistProcess, setSendWhitelistProcess] = useState(false)

    const whitelistHandle = () => {
        const data: IWhitelist = {
            type: "whitelist",
            msisdn: whitelistMsisdn,
            counter: Number(counter),
            program: programId ?? ''
        }
        whitelistArray.push(data)
        setWhitelistMsisdn('')
        setCounter(0)
    }
    const blacklistHandle = () => {
        const data: IBlacklist = {
            type: "blacklist",
            msisdn: blacklistMsisdn,
            program: programId ?? ''
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
        setSendWhitelistProcess(true)
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
        setSendWhitelistProcess(false)
    }
    const createBlacklistHandle = async () => {
        setSendBlacklistProcess(true)
        if (blacklistArray.length === 0) {
            setWarningShow(true)
            return
        }
        await createProgramTempList({"set": blacklistArray}).then((res: any) => {
            if (res.error) {
                setOpen(true)
                setMessageError(res.error.data.message)
            } else {
                Swal.fire("Success!", "Data has been created!", "success");
            }
        })
        setSendBlacklistProcess(false)
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
                    <H2>WHITELIST</H2> <br/>
                    <ul>
                        <li>MSISDN must begin with 628xxxxx</li>
                    </ul>
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
                                    {whitelistArray.length > 0 ? whitelistArray.map((row: any) => (
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
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell component="th" scope="row" colSpan={2}>
                                                <Typography variant="body1">
                                                    No MSISDN added to this list
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    }

                                    <TableRow>
                                        <TableCell align={"right"} colSpan={2}>
                                            {
                                                whitelistArray.length > 0 &&
                                                <>
                                                    {
                                                        sendWhitelistProcess ?
                                                            <Button variant="contained" disabled color="inherit">
                                                                Loading ...
                                                            </Button> :
                                                            <Button variant="contained" color="inherit"
                                                                    onClick={() => createWhitelistHandle()}>
                                                                Send
                                                            </Button>
                                                    }
                                                </>

                                            }
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </Grid>
                <Grid xs={1}/>
                <Grid xs={6}>
                    <H2>BLACKLIST</H2> <br/>
                    <ul>
                        <li>MSISDN must begin with 628xxxxx</li>
                    </ul>
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
                                <Button sx={{marginTop:4}} variant="contained"
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
                                    {blacklistArray.length > 0 ? blacklistArray.map((row: any) => (
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
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell component="th" scope="row" colSpan={2}>
                                                <Typography variant="body1">
                                                    No MSISDN added to this list
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    }

                                    <TableRow>
                                        <TableCell align={"right"} colSpan={2}>
                                            {
                                                blacklistArray.length > 0 &&
                                                <>
                                                    {
                                                        sendBlacklistProcess ?
                                                            <Button variant="contained" disabled color="inherit">
                                                                Loading ...
                                                            </Button> :
                                                            <Button variant="contained" color="inherit"
                                                                    onClick={() => createBlacklistHandle()}>
                                                                Send
                                                            </Button>
                                                    }
                                                </>
                                            }
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
