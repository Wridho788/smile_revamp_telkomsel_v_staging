/**
 * Form Program Main Info Update : ./src/components/organisms/ProgramUpdate/MainInfo/index.tsx
 * **/

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    H2,
    OutlinedTextField,
    ResponsiveDateTimePicker,
    Select
} from "../../../../components";
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    Paper,
    Divider, CircularProgress
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

// import { KeywordAuctionProvider } from "../../../../app/context/KeywordAuction/Provider";
import {
    useDetailProgramQuery,
    useUpdateProgramMainInfoMutation
} from "../../../../redux/features/program/program-api-slice";

import {
    BooleanOption,
    logicOption,
    programTimeZoneOption,
    ThresholdAlarmExpiredOption
} from "../../../../redux/utils/initial-general";
import { useLocationTemplateQuery } from "../../../../redux/features/location/location-api-slice";
import {
    useGetLocationTypeQuery,
    useGetMechanismQuery,
    useGetPointTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";
import { ProgramDetailInitial } from "../../../../pages/CreateProgram/programInitial";

import Swal from "sweetalert2";

const MainInfo: React.FunctionComponent = () => {
    let programDetail = ProgramDetailInitial.data;

    const { _id } = useParams();
    const navigate = useNavigate();

    // TODO: Get Detail Program
    const { data: fetchDetail, isLoading } = useDetailProgramQuery(_id ?? '');
    useEffect(() => {
        programDetail._id = fetchDetail?._id;
        programDetail.name = fetchDetail?.name || '';
        programDetail.desc = fetchDetail?.desc || '';
        programDetail.start_period = fetchDetail?.start_period || new Date();
        programDetail.point_type = fetchDetail?.point_type || '';
        programDetail.program_mechanism = fetchDetail?.program_mechanism || '';
        programDetail.program_owner = fetchDetail?.program_owner || '';
        programDetail.program_owner_detail = fetchDetail?.program_owner_detail || '';
        programDetail.whitelist_counter = fetchDetail?.whitelist_counter || false;
        programDetail.logic = fetchDetail?.logic || '';
        programDetail.program_time_zone = fetchDetail?.program_time_zone || '';
        programDetail.threshold_alarm_expired = fetchDetail?.threshold_alarm_expired || 0;
        programDetail.threshold_alarm_voucher = fetchDetail?.threshold_alarm_voucher || 0;
    });


    // Owner Detail, Owner, Program Mechanism, Point Type
    const {data: pointTypeOption = {data: []}} = useGetPointTypeQuery();
    const {data: mechanismOption = {data: []}} = useGetMechanismQuery();
    const {data: ownerOption = {data: []}} = useGetLocationTypeQuery();

    const { data: ownerDetailOption } = useLocationTemplateQuery({
        limit: 100,
        skip: 0,
        filter: `{"type":"${programDetail?.program_owner}"}`,
        sort: "{}",
    });

    const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);
    useEffect(() => {}, [programDetail, stateTrigger]);

    const [updateProgramMainInfo] = useUpdateProgramMainInfoMutation();

    const onSave = async () => {
        Swal.fire({
            icon: "info",
            title: "Do you want to update data?",
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: 'No'
        }).then((res) => {
            // Confirmed
            if (res.isConfirmed) {
                updateProgramMainInfo(programDetail).then((res: any) => {
                    if (res?.error) {
                        Swal.fire(res.error.data.message, "", "warning");
                    } else {
                        if (res?.data.status === 200) {
                            Swal.fire("Updated Program Data!", "", "success").then(() => {
                                navigate('/program-management');
                            });
                        }
                    }
                })
            }

            // Denied
            if (res.isDenied) {
                Swal.fire("Data aren't updated", "", "info");
            }
        })
    };

    return (
        <Box display="block" sx={{ paddingInline: '20vw' }}>
            <Paper elevation={3}>
                <Box>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "100vh",
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box sx={{
                                paddingX: 8,
                                paddingY: 4
                            }}>
                                <Box>
                                    <Box display="flex" justifyContent="space-between">
                                        <Box>
                                            <H2>Edit Main Info Program {programDetail.name}</H2>
                                            <small>Make sure you input correct data before store it</small>
                                        </Box>

                                        {/* TODO: Action "Cancel" */}
                                        <IconButton href={"/program-management"}>
                                            <Close></Close>
                                        </IconButton>
                                    </Box>
                                    <Divider color="#000" sx={{ height: 2, marginTop: 2 }} />
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                py="1vw"
                                sx={{
                                    paddingInline: "10vw",
                                    paddingBottom: 6
                                }}
                            >
                                <Stack spacing="1vw" width="100%">
                                    {/* Program Group Not Found */}
                                    {/* <OutlinedTextField
                                        label="Program Group"
                                        placeholder="Program Group"
                                        variant={"outlined"}
                                        value=""
                                    /> */}
                                    <OutlinedTextField
                                        label="Program Name"
                                        placeholder="Program Name"
                                        variant={"outlined"}
                                        value={programDetail.name}
                                        handleChange={(value: string) => {
                                            programDetail.name = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                    />
                                    <OutlinedTextField
                                        label="Description"
                                        placeholder="Description"
                                        variant={"outlined"}
                                        value={programDetail.desc}
                                        handleChange={(value: any) => {
                                            programDetail.desc = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        multiline
                                        rows={4}
                                        isRequired={false}
                                    />
                                    <ResponsiveDateTimePicker
                                        label="Start Period"
                                        placeholder="Start Period"
                                        value={programDetail.start_period}
                                        handleChange={(value: any) => {
                                            programDetail.start_period = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                    />
                                    <ResponsiveDateTimePicker
                                        label="End Period"
                                        placeholder="End Period"
                                        value={programDetail.end_period}
                                        handleChange={(value: any) => {
                                            programDetail.end_period = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                    />
                                    <Select
                                        label="Point Type"
                                        placeholder="Option"
                                        optionLabel="set_value"
                                        value={programDetail.point_type}
                                        handleChange={(value: any) => {
                                            programDetail.point_type = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={pointTypeOption?.data}
                                    />
                                    <Select
                                        label="Program Mechanism"
                                        placeholder="Option"
                                        optionLabel="set_value"
                                        value={programDetail.program_mechanism}
                                        handleChange={(value: any) => {
                                            programDetail.program_mechanism = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={mechanismOption?.data}
                                    />
                                    <Select
                                        label="Owner"
                                        placeholder="Option"
                                        optionLabel="set_value"
                                        value={programDetail.program_owner}
                                        handleChange={(value: any) => {
                                            programDetail.program_owner = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={ownerOption?.data}
                                    />
                                    {/*{*/}
                                    {/*    (programDetail.program_owner) &&*/}
                                    <Select
                                        label="Owner Detail"
                                        placeholder="Option"
                                        optionLabel="name"
                                        value={programDetail.program_owner_detail}
                                        handleChange={(value: any) => {
                                            programDetail.program_owner_detail = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={ownerDetailOption?.data}
                                    />
                                    {/*}*/}
                                    <Select
                                        label="Whitelist Counter"
                                        placeholder="Option"
                                        value={programDetail.whitelist_counter}
                                        handleChange={(value: any) => {
                                            programDetail.whitelist_counter = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={BooleanOption}
                                    />

                                    <Select
                                        label="Segmentation Logic"
                                        placeholder="Option"
                                        value={programDetail.logic}
                                        handleChange={(value: any) => {
                                            programDetail.logic = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={logicOption}
                                    />

                                    <Select
                                        label="Program Time Zone"
                                        placeholder="Option"
                                        value={programDetail.program_time_zone}
                                        handleChange={(value: any) => {
                                            programDetail.program_time_zone = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={programTimeZoneOption}
                                    />

                                    <Select
                                        label="Threshold Alarm Expired"
                                        placeholder="Option"
                                        value={programDetail.threshold_alarm_expired}
                                        handleChange={(value: any) => {
                                            programDetail.threshold_alarm_expired = Number(value);
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        options={ThresholdAlarmExpiredOption}
                                    />

                                    <OutlinedTextField
                                        InputProps={{inputProps: {min: 70, max: 100}}}
                                        label="Threshold Alarm Voucher"
                                        placeholder="Threshold Alarm Voucher"
                                        value={programDetail.threshold_alarm_voucher}
                                        handleChange={(value: any) => {
                                            programDetail.threshold_alarm_voucher = Number(value);
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        variant={"outlined"}
                                    />
                                </Stack>
                            </Box>

                            {/* TODO: Action "Cancel" | "Save" */}
                            <ButtonGroup
                                sx={{
                                    backgroundColor: '#D9D9D9',
                                    height: 60
                                }}
                                fullWidth
                            >
                                <Button sx={{ border: 0, color: '#000' }} href={"/program-management"}>Cancel</Button>
                                <Divider orientation="vertical" light></Divider>
                                <Button sx={{ border: 0 }} onClick={onSave}>Save</Button>
                            </ButtonGroup>
                        </>
                    )}
                </Box>
            </Paper>
        </Box>
    )
}

export default MainInfo;