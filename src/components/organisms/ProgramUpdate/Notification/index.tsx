/**
 * Form Program Main Info Update : ./src/components/organisms/ProgramUpdate/Notification/index.tsx
 * **/

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { H2, OutlinedTextField, Select } from "../../../../components";
import {
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Divider,
    Grid,
    ListItem,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import {AddBox, Close} from "@mui/icons-material";

import { useDetailProgramQuery, useUpdateProgramNotificationMutation } from "../../../../redux/features/program/program-api-slice";
import { useGetNotifViaQuery, useGetProgramNotificationQuery } from "../../../../redux/features/lov/lov-api-slice";
import {
    CreateProgramInitial,
    variableInitial
} from "../../../../pages/CreateProgram/programInitial";

import Swal from "sweetalert2";
import H3 from "../../../atoms/Typography/H3";
import BodyCopy from "../../../atoms/Typography/BodyCopy";
import SmallCopy from "../../../atoms/Typography/SmallCopy";
import ListItemButton from "@mui/material/ListItemButton";
import { IProgramNotification } from "../../../../pages/CreateProgram/interface";

const Notification: React.FunctionComponent = () => {
    const { _id } = useParams();

    const navigate = useNavigate();

    // TODO: Get Detail Program
    const { data: fetchDetail, isLoading } = useDetailProgramQuery(_id ?? '');

    const programNotification = CreateProgramInitial.program_notification
    const {data: viaOption = {data: []}} = useGetNotifViaQuery()
    const {data: programNotificationOption = {data: []}} = useGetProgramNotificationQuery()
    const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);
    let list = programNotificationOption.data
    useEffect(() => {
        if (list.length > 0) {
            if (list.length !== programNotification.length) {
                for (let i = 0; i < list.length; i++) {
                    const obj: IProgramNotification = {
                        template: "63008b6c746163c934b99aa2",
                        template_content: "",
                        via: "",
                        notif_type: list[i]._id
                    }
                    programNotification.push(obj)
                    setStateTrigger(!stateTrigger)
                }
            }
        }
    }, [programNotificationOption.data]);

    useEffect(() => {
        console.log(programNotification)
    }, [programNotification, stateTrigger]);

    const [updateProgramNotification] = useUpdateProgramNotificationMutation();

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
                updateProgramNotification({ data: programNotification }).then((res: any) => {
                    if (res?.error) {
                        Swal.fire(res.error.data.message, "", "warning");
                    } else {
                        Swal.fire("Updated Program Data!", "", "success").then(() => {
                            navigate('/program-management');
                        });
                    }
                });
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
                                            <H2>Edit Notification Program {fetchDetail?.name}</H2>
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
                                {programNotification.length > 0 ? programNotificationOption.data.map((item, i) => (
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
                                                            <H3 color={"primary"}> {item.set_value}</H3>
                                                        </Grid>
                                                        <Select
                                                            isRequired={false}
                                                            variant={"outlined"}
                                                            label="Via"
                                                            placeholder="Option"
                                                            options={viaOption.data}
                                                            value={programNotification[i].via}
                                                            handleChange={(value: any) => {
                                                                programNotification[i].via = value
                                                                setStateTrigger(!stateTrigger);
                                                            }}
                                                        />
                                                        <Grid container>
                                                            <OutlinedTextField
                                                                isRequired={false}
                                                                multiline
                                                                rows={4}
                                                                label="Template Content"
                                                                placeholder="Template Content"
                                                                variant={"outlined"}
                                                                value={programNotification[i].template_content}
                                                                handleChange={(value: any) => {
                                                                    programNotification[i].template_content = value
                                                                    setStateTrigger(!stateTrigger);
                                                                }}
                                                            />
                                                        </Grid>
                                                        <Grid container columns={11}>
                                                            <Grid item xs={4}>
                                                                <BodyCopy>Variable</BodyCopy>
                                                                <SmallCopy fontSize={10} color={"orange"}>You can add this variable when
                                                                    editing template content</SmallCopy>
                                                            </Grid>
                                                            <Grid item xs={7}>
                                                                <Grid container columns={12}>
                                                                    {
                                                                        variableInitial.map((item) => (
                                                                            <Grid>
                                                                                <ListItem disablePadding>
                                                                                    <ListItemButton
                                                                                        onClick={() => {
                                                                                            programNotification[i].template_content = `${programNotification[i].template_content} ${item}`
                                                                                            setStateTrigger(!stateTrigger);
                                                                                        }}
                                                                                    >
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
                                    )
                                    :
                                    <>
                                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                                            <CircularProgress/>
                                        </Box>
                                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}
                                             mt={5}>
                                            <Typography variant={"h3"}>
                                                Generating notification, please wait...
                                            </Typography>
                                        </Box>
                                    </>
                                }
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