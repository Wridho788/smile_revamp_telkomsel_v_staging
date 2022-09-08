/**
 * Form Program Main Info Update : ./src/components/organisms/ProgramUpdate/Notification/index.tsx
 * **/

import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";

import {H2, OutlinedTextField, Select} from "../../../../components";
import {Box, Button, ButtonGroup, CircularProgress, Divider, Grid, ListItem, Paper, Stack} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import {AddBox, Close} from "@mui/icons-material";

// import { KeywordAuctionProvider } from "../../../../app/context/KeywordAuction/Provider";
import {useDetailProgramQuery, useUpdateProgramNotificationMutation} from "../../../../redux/features/program/program-api-slice";

import {FilterInitial} from "../../../../redux/utils/initial-general";
import {useGetNotifViaQuery} from "../../../../redux/features/lov/lov-api-slice";
import {ProgramDetailInitial} from "../../../../pages/CreateProgram/programInitial";

import Swal from "sweetalert2";
import H3 from "../../../atoms/Typography/H3";
import BodyCopy from "../../../atoms/Typography/BodyCopy";
import SmallCopy from "../../../atoms/Typography/SmallCopy";
import ListItemButton from "@mui/material/ListItemButton";
import {useNotificationTemplateQuery} from "../../../../redux/features/notification/notification-api-slice";
import Moment from "moment/moment";
import {cloneDeep} from "lodash";

const Notification: React.FunctionComponent = () => {
    const { _id } = useParams();

    const navigate = useNavigate();

    const {data: viaOption = {data: []}} = useGetNotifViaQuery();
    const {data: notificationTemplateList = {data: []}} = useNotificationTemplateQuery(FilterInitial);

    const [poinTypeSuggestion, setPoinTypeSuggestion] = useState('');
    const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);
    const [listNotification, setListNotification] = React.useState<any>([]);

    const changeListNotification = (list: any, i: number, field: string, value: any) => {
        let temp: any = cloneDeep(list);
        let clone: any = cloneDeep(fetchDetail?.program_notification);

        if (typeof temp[`${field}`] === 'string') {
            temp[`${field}`] = value;
        } else {
            temp[`${field}`][0]._id = value;
        }

        clone[i] = temp;
        programDetail.program_notification = clone;
        setListNotification(programDetail.program_notification);
    }

    // TODO: Get Detail Program
    const { data: fetchDetail, isLoading } = useDetailProgramQuery(_id ?? '');
    let initial: any = fetchDetail, programDetail: any = ProgramDetailInitial.data;

    useEffect(() => {
        if (initial) {
            programDetail._id = initial?._id;
            programDetail.name = initial?.name;
            programDetail.start_period = initial?.start_period;
            if (initial?.program_notification.length) {
                programDetail.program_notification = initial?.program_notification;
                setStateTrigger(!stateTrigger);
            }
        }
    }, [initial]);

    useEffect(() => {
    }, [stateTrigger]);

    const variableList = [programDetail.name, Moment(programDetail.start_period).format("d-m-Y"), poinTypeSuggestion]
    const [updateProgramNotification] = useUpdateProgramNotificationMutation();

    const onSave = async () => {
        Swal.fire({
            icon: "info",
            title: "Do you want to update data?",
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: 'No'
        }).then((res) => {
            const payload: any = { data: [] };
            listNotification.map((item: any) => {
               payload.data.push({
                   _id: item.notif_type,
                   via: item.via_detail.length ? item.via_detail[0]._id : '',
                   template: item.template,
                   template_content: item.template_content
               })
            });

            // Confirmed
            if (res.isConfirmed) {
                if (listNotification.length) {
                    updateProgramNotification(payload).then((res: any) => {
                        if (res?.error) {
                            Swal.fire(res.error.data.message, "", "warning");
                        } else {
                            Swal.fire("Updated Program Data!", "", "success").then(() => {
                                navigate('/program-management');
                            });
                        }
                    });
                } else {
                    Swal.fire("Updated Program Data!", "", "success").then(() => {
                        navigate('/program-management');
                    });
                }
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
                                            <H2>Edit Notification Program {programDetail.name}</H2>
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
                                display="block"
                                marginBottom={4}
                            >
                                {/* For while set "any" */}
                                {programDetail.program_notification.length ? (
                                    programDetail.program_notification.map((item: any, i: any) => (
                                        <Box display="flex" px="10%" py="1vw">
                                            <Grid
                                                key={`rowItem__${i}`}
                                                container
                                                border="0.1vw solid rgba(0, 0, 0, 0.1)"
                                                borderRadius="0.3vw"
                                                p="3vw"
                                            >
                                                <Stack spacing={"1vw"} width={"100%"}>
                                                    <Grid container>
                                                        <H3 color={"primary"}>{item.set_value}</H3>
                                                    </Grid>
                                                    <Select
                                                        variant={"outlined"}
                                                        label="Via"
                                                        placeholder="Option"
                                                        options={viaOption.data}
                                                        value={item.via_detail.length ? item.via_detail[0]._id : ''}
                                                        handleChange={(value: string) => {
                                                            changeListNotification(item, i, "via_detail", value);
                                                            setStateTrigger(!stateTrigger);
                                                        }}
                                                    />
                                                    <Select
                                                        variant={"outlined"}
                                                        label="Template"
                                                        placeholder="Option"
                                                        optionLabel={"notif_name"}
                                                        options={notificationTemplateList.data}
                                                        value={item.template}
                                                        disabled
                                                    />
                                                    <Grid container>
                                                        <OutlinedTextField
                                                            isRequired={false}
                                                            multiline
                                                            rows={4}
                                                            label="Template Content"
                                                            placeholder="Template Content"
                                                            variant={"outlined"}
                                                            value={item.template_content}
                                                            handleChange={(value: string) => {
                                                                changeListNotification(item, i, "template_content", value);
                                                                setStateTrigger(!stateTrigger);
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid container columns={11}>
                                                        <Grid item xs={4}>
                                                            <BodyCopy>Variable</BodyCopy>
                                                            <SmallCopy fontSize={10} color={"orange"}>You can add this
                                                                variable when
                                                                editing template content</SmallCopy>
                                                        </Grid>
                                                        <Grid item xs={7}>
                                                            <Grid container columns={12}>
                                                                {
                                                                    variableList.map((item) => (
                                                                        <Grid>
                                                                            <ListItem disablePadding>
                                                                                <ListItemButton>
                                                                                    <AddBox color={"primary"}/>
                                                                                    <BodyCopy>{item}</BodyCopy>
                                                                                </ListItemButton>
                                                                            </ListItem>
                                                                        </Grid>
                                                                    ))
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                        </Box>
                                    )
                                )) : (<Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        minHeight: "100vh",
                                    }}
                                >
                                    <CircularProgress />
                                </Box>)}
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

export default Notification;