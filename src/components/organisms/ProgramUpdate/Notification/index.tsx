/**
 * Form Program Main Info Update : ./src/components/organisms/ProgramUpdate/Notification/index.tsx
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
    const { _id } = useParams();
    const isLoading = false;

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
                // Swal.fire(res.error.data.message, "", "warning");
                // Swal.fire("Updated Program Data!", "", "success").then(() => {
                //     navigate('/program-management');
                // });
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
                                            <H2>Edit Main Info Program</H2>
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