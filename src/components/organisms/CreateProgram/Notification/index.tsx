import * as React from "react";
import {Grid, Stack, IconButton, Box, Button, CircularProgress, ListItem, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {OutlinedTextField, Select} from "../../../atoms";
import {
    useGetDetailLovQuery,
    useGetNotifReceiverQuery,
    useGetNotifTypeQuery,
    useGetNotifViaQuery,
    useGetPointTypeQuery, useGetProgramNotificationQuery, useLazyGetDetailLovQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import {
    useNotificationTemplateDetailQuery,
    useNotificationTemplateQuery
} from "../../../../redux/features/notification/notification-api-slice";
import {FilterInitial} from "../../../../redux/utils/initial-general";
import {useEffect, useState} from "react";
import {
    NotificationTemplateInitial,
    ProgramDetailInitial, variableInitial
} from "../../../../pages/CreateProgram/programInitial";
import {AddBox, Gif, Girl, Warning} from "@mui/icons-material";
import BodyCopy from "../../../atoms/Typography/BodyCopy";
import ListItemButton from "@mui/material/ListItemButton";
import SmallCopy from "../../../atoms/Typography/SmallCopy";
import H2 from "../../../atoms/Typography/H2";
import H3 from "../../../atoms/Typography/H3";
import {useParams} from "react-router-dom";
import {useDetailProgramQuery} from "../../../../redux/features/program/program-api-slice";
import Moment from "moment";


interface INotificationProps {
}

const Notification: React.FunctionComponent<INotificationProps> = ({}: INotificationProps) => {

    let programData = ProgramDetailInitial.data;
    const programNotification = ProgramDetailInitial.data

    const [via0, setVia0] = React.useState<string>(programNotification.program_notification[0].via);
    const [via1, setVia1] = React.useState<string>(programNotification.program_notification[1].via);
    const [notif_type0, setReceiver0] = React.useState<string>(programNotification.program_notification[0].notif_type);
    const [notif_type1, setReceiver1] = React.useState<string>(programNotification.program_notification[1].notif_type);
    const [template0, setTemplate0] = React.useState<string>(programNotification.program_notification[0].template);
    const [template1, setTemplate1] = React.useState<string>(programNotification.program_notification[1].template);
    const [templateContent0, setTemplateContent0] = useState<string>((programNotification.program_notification[0].template_content));
    const [templateContent1, setTemplateContent1] = useState<string>((programNotification.program_notification[1].template_content));

    const {data: viaOption = {data: []}} = useGetNotifViaQuery()
    const {data: receiverOption = {data: []}} = useGetNotifReceiverQuery()
    const {data: programNotificationOption = {data: []}} = useGetProgramNotificationQuery()
    const {data: notificationTemplateList = {data: []}, isLoading} = useNotificationTemplateQuery(FilterInitial)

    const {data: notificationTemplateDetail0 = NotificationTemplateInitial} = useNotificationTemplateDetailQuery(template0)
    const {data: notificationTemplateDetail1 = NotificationTemplateInitial} = useNotificationTemplateDetailQuery(template1)
    const [variableAppend0, setVariableAppend0] = useState('');
    const [variableAppend1, setVariableAppend1] = useState('');
    useEffect(() => {
        programNotification.program_notification[0].template = template0
        if (JSON.stringify(notificationTemplateDetail0.notif_content)) {
            setTemplateContent0(JSON.stringify(notificationTemplateDetail0.notif_content).replaceAll('"', ''))
        }
    }, [template0, notificationTemplateDetail0]);

    useEffect(() => {
        programNotification.program_notification[1].template = template1
        if (JSON.stringify(notificationTemplateDetail1.notif_content)) {
            setTemplateContent1(JSON.stringify(notificationTemplateDetail1.notif_content).replaceAll('"', ''))
        }
    }, [template1, notificationTemplateDetail1]);
    const variableHandle0 = (variable: string) => {
        setTemplateContent0(`${templateContent0} ${variable}`)
    }
    const variableHandle1 = (variable: string) => {
        setTemplateContent1(`${templateContent1} ${variable}`)
    }
    React.useEffect(() => {
        programNotification.program_notification[0].via = via0
        programNotification.program_notification[1].via = via1
        programNotification.program_notification[0].notif_type = notif_type0
        programNotification.program_notification[1].notif_type = notif_type1
        programNotification.program_notification[0].template_content = templateContent0
        programNotification.program_notification[1].template_content = templateContent1
        return;
    }, [
        programNotification,
        via0,
        via1,
        template1,
        notif_type0,
        notif_type1,
        templateContent0,
        templateContent1
    ]);
    return (
        <>
            {programNotificationOption.data.length > 0 ? programNotificationOption.data.map((item, i) => (
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
                                    variant={"outlined"}
                                    label="Via"
                                    placeholder="Option"
                                    options={viaOption.data}
                                    value={i == 0 ? via0 : via1}
                                    handleChange={i === 0 ? setVia0 : setVia1}
                                />
                                <Select
                                    variant={"outlined"}
                                    label="Template"
                                    placeholder="Option"
                                    optionLabel={"notif_name"}
                                    options={notificationTemplateList.data}
                                    value={i == 0 ? template0 : template1}
                                    handleChange={i === 0 ? setTemplate0 : setTemplate1}
                                />
                                <Grid container>
                                    <OutlinedTextField
                                        isRequired={false}
                                        multiline
                                        rows={4}
                                        label="Template Content"
                                        placeholder="Template Content"
                                        variant={"outlined"}
                                        value={i === 0 ? templateContent0 : templateContent1}
                                        handleChange={i === 0 ? setTemplateContent0 : setTemplateContent1}
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
                                                                onClick={() => i == 0 ? variableHandle0(item) : variableHandle1(item)}>
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
                ))
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
        </>
    );
};

export default Notification;
