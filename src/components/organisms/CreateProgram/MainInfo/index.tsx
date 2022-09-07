import {
    Alert,
    Box, Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Input,
    Stack, Tooltip, Typography,
} from "@mui/material";
import * as React from "react";
import {
    Select,
    OutlinedTextField,
    ResponsiveDateTimePicker,
    H2,
} from "../../../atoms";
import {useEffect, useRef, useState} from "react";
import {
    useGetKeywordTypeQuery,
    useGetLocationTypeQuery,
    useGetMechanismQuery,
    useGetOwnerQuery,
    useGetPointTypeQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import {
    BooleanOption,
    FilterInitial,
    logicOption,
    PicTypeOption,
    programTimeZoneOption,
    ThresholdAlarmExpiredOption,
} from "../../../../redux/utils/initial-general";
import {ProgramDetailInitial} from "../../../../pages/CreateProgram/programInitial";
import {useKeywordListQuery} from "../../../../redux/features/keyword/keyword-api-slice";
import {useLocationTemplateQuery} from "../../../../redux/features/location/location-api-slice";
import {IParams} from "../../../../redux/utils/IGeneral";
import {
    useLazyAccountListQuery,
    useLazyAccountRoleQuery,
} from "../../../../redux/features/account/account-api-slice";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Delete} from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import {useParams} from "react-router-dom";
import {useDetailProgramQuery, useProgramListQuery} from "../../../../redux/features/program/program-api-slice";
import {ICreateProgram} from "../../../../pages/CreateProgram/interface";
import CachedIcon from '@mui/icons-material/Cached';

interface IMainInfoProps {
    slug: string;
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
                                                               slug,
                                                           }: IMainInfoProps) => {
    let programData = ProgramDetailInitial.data;
    let {_id} = useParams();
    const {data: fetchDetail = programData, isLoading} = useDetailProgramQuery(
        _id ?? ""
    );
    useEffect(() => {
        programData._id = fetchDetail._id;
    }, [fetchDetail]);

    const {data: pointTypeOption = {data: []}} = useGetPointTypeQuery();
    const {data: mechanismOption = {data: []}} = useGetMechanismQuery();
    const {data: ownerOption = {data: []}} = useGetLocationTypeQuery();

    const [searchInput, setSearchInput] = useState<string>("");
    const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

    useEffect(() => {
    }, [programData, stateTrigger]);


    // TODO LOGIC DATATABLE
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const ownerFilterInitial: IParams = {
        limit: 100,
        skip: 0,
        filter: `{"type":"${programData.program_owner}"}`,
        sort: "{}",
    };

    const PicParamInitial: IParams = {
        limit: rowsPerPage,
        skip: page,
        filter: `{"phone": "${searchInput}"}`,
        sort: "{}",
    };
    const RoleParamInitial: IParams = {
        limit: 100,
        skip: 0,
        filter: `{"name": "${searchInput}"}`,
        sort: "{}",
    };

    const {data: ownerDetailOption = {data: []}} =
        useLocationTemplateQuery(ownerFilterInitial);
    const [getAlarmPicList, {data: alarmPicList = {data: []}}] =
        useLazyAccountListQuery();
    const [getAlarmRoleList, {data: alarmRoleList = {data: []}}] =
        useLazyAccountRoleQuery();

    useEffect(() => {
        // if (programData.alarm_pic_type === "PIC") {
        //     getAlarmPicList(PicParamInitial);
        // } else if (programData.alarm_pic_type === "Role") {
        //     getAlarmRoleList(RoleParamInitial);
        // }

        // Setting PIC default
        programData.alarm_pic_type = "PIC"
        getAlarmPicList(PicParamInitial);
    }, [programData.alarm_pic_type, page, rowsPerPage, searchInput]);

    const handleChangeCheckbox = (event: any) => {
        let isChecked = event.target.checked;
        let _id = event.target.value;
        if (isChecked) {
            programData.alarm_pic.push(_id);
        } else {
            const index = programData.alarm_pic.indexOf(_id);
            programData.alarm_pic.splice(index, 1);
        }
    };
    const resultSearchData =
        programData.alarm_pic_type === "PIC" ? alarmPicList.data : alarmRoleList.data;
    const [filteredResults, setFilteredResults] = useState(resultSearchData);
    useEffect(() => {
        if (searchInput !== "") {
            const filteredData = resultSearchData.filter((i) => {
                return Object.values(i)
                    .join("")
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(resultSearchData);
        }
    }, [searchInput]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Box display="flex" justifyContent="center" px="20%" py="1vw">
            <Stack spacing={"1vw"} width={"100%"}>

                <Box pt={5}>
                    <Box>
                        <Stack sx={{width: '100%'}} spacing={2}>
                            <Alert
                                action={
                                    <Tooltip placement="top"
                                             title="This will redirect you to PIC Management page, all data you insert will be discard"
                                             arrow>
                                        <Button color="inherit" size="small">
                                            PIC Management
                                        </Button>
                                    </Tooltip>
                                }
                                severity="info"
                            >
                                Don't find PIC ? Click button on the right corner
                            </Alert>
                        </Stack>
                    </Box>
                    {
                        (programData.alarm_pic_type) &&
                        <> <TableContainer component={Paper}>
                            <Table sx={{minWidth: 650}} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Grid container>
                                                <Grid xs={7}>
                                                    <Button onClick={() => {
                                                        getAlarmPicList(PicParamInitial)
                                                    }} variant="outlined" color="inherit" size="small">
                                                        <CachedIcon/>
                                                        <Typography ml={2} variant="body1">
                                                            Refresh PIC Data
                                                        </Typography>
                                                    </Button>

                                                    <Typography mt={1}>
                                                        <b style={{color: '#888'}}>Choose PIC to alert them about this
                                                            Program</b>
                                                    </Typography>

                                                </Grid>
                                                <Grid xs={5}>
                                                    <Input fullWidth
                                                           placeholder='Search...'
                                                           onChange={(e) => setSearchInput(e.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {
                                    alarmPicList.data.length > 0 ?
                                        <TableBody>
                                            {
                                                (programData.alarm_pic_type === 'PIC' ? alarmPicList.data : alarmRoleList.data).map((row, idx) =>
                                                    (
                                                        <TableRow
                                                            key={row._id}
                                                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                <FormControlLabel
                                                                    key={`checkBox__${row._id}`}
                                                                    control={<Checkbox onChange={handleChangeCheckbox}
                                                                                       value={row._id}/>}
                                                                    label={programData.alarm_pic_type === 'PIC' ? row.phone : row.name}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                        </TableBody> :
                                        <>
                                            <Box p={5}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center'
                                                }}>
                                                    <CircularProgress/>
                                                </Box>
                                                <Box sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignContent: 'center'
                                                }} mt={5}>
                                                    <Typography variant={"h3"}>
                                                        Loading PIC Data, please wait...
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                }

                            </Table>
                        </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={(programData.alarm_pic_type === 'PIC' ? alarmPicList.data : alarmRoleList.data).length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </>
                    }
                </Box>


                <OutlinedTextField
                    label="Program Group"
                    placeholder="Program Group"
                    variant={"outlined"}
                    value={programData.program_group}
                    handleChange={(value: any) => {
                        programData.program_group = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />

                <OutlinedTextField
                    label="Keyword Registration"
                    placeholder="Keyword Registration"
                    variant={"outlined"}
                    value={programData.keyword_registration}
                    handleChange={(value: any) => {
                        programData.keyword_registration = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />

                <OutlinedTextField
                    label="Point Registration"
                    placeholder="Point Registration"
                    variant={"outlined"}
                    value={programData.point_registration}
                    handleChange={(value: any) => {
                        programData.point_registration = Number(value);
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <OutlinedTextField
                    label="Program Name"
                    placeholder="Program Name"
                    variant={"outlined"}
                    value={programData.name}
                    handleChange={(value: any) => {
                        programData.name = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <OutlinedTextField
                    label="Description"
                    placeholder="Description"
                    variant={"outlined"}
                    value={programData.desc}
                    handleChange={(value: any) => {
                        programData.desc = value;
                        setStateTrigger(!stateTrigger);
                    }}
                    multiline
                    rows={4}
                    isRequired={false}
                />
                <ResponsiveDateTimePicker
                    label="Start Period"
                    placeholder="Start Period"
                    value={programData.start_period}
                    handleChange={(value: any) => {
                        programData.start_period = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <ResponsiveDateTimePicker
                    label="End Period"
                    placeholder="End Period"
                    minDateTime={programData.start_period}
                    value={programData.end_period}
                    handleChange={(value: any) => {
                        programData.end_period = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <Select
                    label="Point Type"
                    placeholder="Option"
                    options={pointTypeOption.data}
                    optionLabel="set_value"
                    value={programData.point_type}
                    handleChange={(value: any) => {
                        programData.point_type = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <Select
                    label="Program Mechanism"
                    placeholder="Option"
                    options={mechanismOption.data}
                    optionLabel="set_value"
                    value={programData.program_mechanism}
                    handleChange={(value: any) => {
                        programData.program_mechanism = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <Select
                    label="Owner"
                    placeholder="Option"
                    options={ownerOption.data}
                    optionLabel="set_value"
                    value={programData.program_owner}
                    handleChange={(value: any) => {
                        programData.program_owner = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                {
                    (programData.program_owner) &&
                    <Select
                        label="Owner Detail"
                        placeholder="Option"
                        options={ownerDetailOption.data}
                        optionLabel="name"
                        value={programData.program_owner_detail}
                        handleChange={(value: any) => {
                            programData.program_owner_detail = value;
                            setStateTrigger(!stateTrigger);
                        }}
                    />
                }
                <Select
                    label="Whitelist Counter"
                    placeholder="Option"
                    options={BooleanOption}
                    value={programData.whitelist_counter}
                    handleChange={(value: any) => {
                        programData.whitelist_counter = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <Select
                    label="Segmentation Logic"
                    placeholder="Option"
                    options={logicOption}
                    value={programData.logic}
                    handleChange={(value: any) => {
                        programData.logic = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <Select
                    label="Program Time Zone"
                    placeholder="Option"
                    options={programTimeZoneOption}
                    value={programData.program_time_zone}
                    handleChange={(value: any) => {
                        programData.program_time_zone = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />

                <Select
                    label="Threshold Alarm Experied"
                    placeholder="Option"
                    value={programData.threshold_alarm_expired}
                    options={ThresholdAlarmExpiredOption}
                    handleChange={(value: any) => {
                        programData.threshold_alarm_expired = Number(value);
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <OutlinedTextField
                    InputProps={{inputProps: {min: 70, max: 100}}}
                    label="Threshold Alarm Voucher"
                    placeholder="Threshold Alrm Voucher"
                    value={programData.threshold_alarm_voucher}
                    handleChange={(value: any) => {
                        programData.threshold_alarm_voucher = Number(value);
                        setStateTrigger(!stateTrigger);
                    }}
                    variant={"outlined"}
                />
                {/*<Select*/}
                {/*    label="Alarm Pic Type"*/}
                {/*    placeholder="Option"*/}
                {/*    options={PicTypeOption}*/}
                {/*    value={programData.alarm_pic_type}*/}
                {/*    handleChange={(value: any) => {*/}
                {/*        programData.alarm_pic_type = value;*/}
                {/*        setStateTrigger(!stateTrigger);*/}
                {/*    }}*/}
                {/*/>*/}


            </Stack>
        </Box>
    )
        ;
};

export default MainInfo;
