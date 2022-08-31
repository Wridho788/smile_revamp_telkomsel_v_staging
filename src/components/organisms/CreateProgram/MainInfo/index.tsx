import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Input,
  Stack,
} from "@mui/material";
import * as React from "react";
import {
  Select,
  OutlinedTextField,
  ResponsiveDateTimePicker,
  H2,
} from "../../../atoms";
import { useEffect, useRef, useState } from "react";
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
import { ProgramDetailInitial } from "../../../../pages/CreateProgram/programInitial";
import { useKeywordListQuery } from "../../../../redux/features/keyword/keyword-api-slice";
import { useLocationTemplateQuery } from "../../../../redux/features/location/location-api-slice";
import { IParams } from "../../../../redux/utils/IGeneral";
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
import { Delete } from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import {useParams} from "react-router-dom";
import {useDetailProgramQuery, useProgramListQuery} from "../../../../redux/features/program/program-api-slice";

interface IMainInfoProps {
  slug: string;
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
  slug,
}: IMainInfoProps) => {
  let programData = ProgramDetailInitial.data;
  let { _id } = useParams();
  const { data: fetchDetail = programData, isLoading } = useDetailProgramQuery(
    _id ?? ""
  );
  useEffect(() => {
    programData._id = fetchDetail._id;
  }, [fetchDetail]);

    const [programGroup, setProgramGroup] = useState(
        fetchDetail.program_group
    );
    const [programNameLabel, setProgramName] = useState(
        fetchDetail.name
    );
    const [programDescriptionLabel, setProgramDescription] = useState(
        fetchDetail.desc
    );
    const [startPeriod, setStartPeriod] = useState(fetchDetail.start_period);
    const [endPeriod, setEndPeriod] = useState(fetchDetail.end_period);
  useEffect(() => {
    programData._id = fetchDetail._id;
  }, [fetchDetail]);

  const [pointTypeLabel, setPointType] = useState(fetchDetail.point_type);
  const [programMechanismLabel, setProgramMechanism] = useState(
    fetchDetail.program_mechanism
  );

  const [programOwnerLabel, setProgramOwner] = useState(
    fetchDetail.program_owner
  );
  const [programOwnerDetail, setProgramOwnerDetail] = React.useState<string>(
    fetchDetail.program_owner_detail
  );

  const [keywordRegistration, setKeywordRegistration] = useState(
    fetchDetail.keyword_registration
  );
  const [whiteListCounter, setWhiteListCounter] = React.useState(
    fetchDetail.whitelist_counter === true ? "1" : "2"
  );

  const [logicValue, setLogicValue] = useState(fetchDetail.logic);
  const [programTimeZone, setProgramTypeZone] = useState(
    fetchDetail.program_time_zone
  );

  const [alarmPicType, setAlarmPicType] = useState(fetchDetail.alarm_pic_type);
  const [thresholdAlarmExpired, setThresholdAlarmExpired] = useState<number>(
    fetchDetail.threshold_alarm_expired
  );
  const [thresholdAlarmVoucher, setThresholdAlarmVoucher] = useState<number>(
    fetchDetail.threshold_alarm_voucher
  );

  const { data: pointTypeOption = { data: [] } } = useGetPointTypeQuery();
  const { data: mechanismOption = { data: [] } } = useGetMechanismQuery();
  const { data: keywordRegisterOption = { data: [] } } =
    useKeywordListQuery(FilterInitial);
  const { data: ownerOption = { data: [] } } = useGetLocationTypeQuery();

  const [searchInput, setSearchInput] = useState<string>("");

  // TODO LOGIC DATATABLE
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const ownerFilterInitial: IParams = {
    limit: 100,
    skip: 0,
    filter: `{"type":"${programOwnerLabel}"}`,
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

  const { data: ownerDetailOption = { data: [] } } =
    useLocationTemplateQuery(ownerFilterInitial);
  const [getAlarmPicList, { data: alarmPicList = { data: [] } }] =
    useLazyAccountListQuery();
  const [getAlarmRoleList, { data: alarmRoleList = { data: [] } }] =
    useLazyAccountRoleQuery();

  useEffect(() => {
    setTimeout(() => {
      if (alarmPicType === "PIC") {
        getAlarmPicList(PicParamInitial);
      } else if (alarmPicType === "Role") {
        getAlarmRoleList(RoleParamInitial);
      }
    }, 100);
  }, [alarmPicType, searchInput]);

  useEffect(() => {
    if (alarmPicType === "PIC") {
      getAlarmPicList(PicParamInitial);
    } else if (alarmPicType === "Role") {
      getAlarmRoleList(RoleParamInitial);
    }
  }, [alarmPicType, page, rowsPerPage]);

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
    alarmPicType === "PIC" ? alarmPicList.data : alarmRoleList.data;
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
    React.useEffect(() => {
        programData.program_group = programGroup;
        programData.name = programNameLabel;
        programData.desc = programDescriptionLabel;
        programData.start_period = startPeriod;
        programData.end_period = endPeriod;
        programData.point_type = pointTypeLabel;
        programData.program_mechanism = programMechanismLabel;
        programData.program_owner = programOwnerLabel;
        programData.program_owner_detail = programOwnerDetail;
        programData.keyword_registration = keywordRegistration;
        programData.whitelist_counter = whiteListCounter === "1" ? true : false
        programData.logic = logicValue;
        programData.program_time_zone = programTimeZone;
        programData.alarm_pic_type = alarmPicType;
        programData.threshold_alarm_expired = Number(thresholdAlarmExpired);
        programData.threshold_alarm_voucher = Number(thresholdAlarmVoucher);
        return;
    }, [
        programData,
        programGroup,
        programNameLabel,
        programDescriptionLabel,
        startPeriod,
        endPeriod,
        pointTypeLabel,
        programMechanismLabel,
        programOwnerLabel,
        programOwnerDetail,
        keywordRegistration,
        whiteListCounter,
        logicValue,
        programTimeZone,
        thresholdAlarmExpired,
        thresholdAlarmVoucher,
    ]);
    return (
        <Box display="flex" justifyContent="center" px="20%" py="1vw">
            <Stack spacing={"1vw"} width={"100%"}>
                <OutlinedTextField
                    label="Program Group"
                    placeholder="Program Group"
                    variant={"outlined"}
                    value={programGroup}
                    handleChange={setProgramGroup}
                />
                <OutlinedTextField
                    label="Program Name"
                    placeholder="Program Name"
                    variant={"outlined"}
                    value={programNameLabel}
                    handleChange={setProgramName}
                />
                <OutlinedTextField
                    label="Description"
                    placeholder="Description"
                    variant={"outlined"}
                    value={programDescriptionLabel}
                    handleChange={setProgramDescription}
                    multiline
                    rows={4}
                    isRequired={false}
                />

                <ResponsiveDateTimePicker
                    label="Start Period"
                    placeholder="Start Period"
                    value={startPeriod}
                    handleChange={setStartPeriod}
                />
                <ResponsiveDateTimePicker
                    label="End Period"
                    placeholder="End Period"
                    value={endPeriod}
                    handleChange={setEndPeriod}
                />
                <Select
                    label="Point Type"
                    placeholder="Option"
                    options={pointTypeOption.data}
                    optionLabel="set_value"
                    value={pointTypeLabel}
                    handleChange={setPointType}
                />
                <Select
                    label="Program Mechanism"
                    placeholder="Option"
                    options={mechanismOption.data}
                    optionLabel="set_value"
                    value={programMechanismLabel}
                    handleChange={setProgramMechanism}
                />
                <Select
                    label="Owner"
                    placeholder="Option"
                    options={ownerOption.data}
                    optionLabel="set_value"
                    value={programOwnerLabel}
                    handleChange={setProgramOwner}
                />
                {(programOwnerLabel) &&
                    <Select
                        label="Owner Detail"
                        placeholder="Option"
                        options={ownerDetailOption.data}
                        optionLabel="name"
                        value={programOwnerDetail}
                        handleChange={setProgramOwnerDetail}
                    />
                }
                {/*<Select*/}
                {/*    label="Keyword Registration"*/}
                {/*    placeholder="Option"*/}
                {/*    options={keywordRegisterOption.data}*/}
                {/*    value={keywordRegistration}*/}
                {/*    optionLabel="name"*/}
                {/*    handleChange={setKeywordRegistration}*/}
                {/*/>*/}
                <Select
                    label="Whitelist Counter"
                    placeholder="Option"
                    options={BooleanOption}
                    value={whiteListCounter}
                    handleChange={setWhiteListCounter}
                />
                <Select
                    label="Segmentation Logic"
                    placeholder="Option"
                    options={logicOption}
                    value={logicValue}
                    handleChange={setLogicValue}
                />
                <Select
                    label="Program Time Zone"
                    placeholder="Option"
                    options={programTimeZoneOption}
                    value={programTimeZone}
                    handleChange={setProgramTypeZone}
                />
                <Select
                    label="Alarm Pic Type"
                    placeholder="Option"
                    options={PicTypeOption}
                    value={alarmPicType}
                    handleChange={setAlarmPicType}
                />
                {
                    (alarmPicType) &&
                    <> <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Grid container>
                                            <Grid xs={7}>
                                                {"Alarm " + alarmPicType}
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

                            <TableBody>
                                {
                                    (alarmPicType === 'PIC' ? alarmPicList.data : alarmRoleList.data).map((row, idx) =>
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
                                                        label={alarmPicType === 'PIC' ? row.phone : row.name}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={(alarmPicType === 'PIC' ? alarmPicList.data : alarmRoleList.data).length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                }

                <Select
                    label="Threshold Alarm Experied"
                    placeholder="Option"
                    value={thresholdAlarmExpired}
                    options={ThresholdAlarmExpiredOption}
                    handleChange={setThresholdAlarmExpired}
                />
                <OutlinedTextField
                    InputProps={{inputProps: {min: 70, max: 100}}}
                    type={"number"}
                    label="Threshold Alarm Voucher"
                    placeholder="Threshold Alrm Voucher"
                    value={thresholdAlarmVoucher}
                    handleChange={setThresholdAlarmVoucher}
                    variant={"outlined"}
                />
            </Stack>
        </Box>
    );
};

export default MainInfo;
