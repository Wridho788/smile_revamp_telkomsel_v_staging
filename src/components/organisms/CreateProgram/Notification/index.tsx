import * as React from "react";
import {Grid, Stack, IconButton, Box, Button, CircularProgress} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {OutlinedTextField, Select} from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {options} from "../../../../mocks/options";
import {INotification} from "../../../../app/redux/Utils/Interface/IProgram";
import {
    useGetNotifReceiverQuery,
    useGetNotifTypeQuery,
    useGetNotifViaQuery,
    useGetPointTypeQuery, useGetProgramNotificationQuery, useGetTransactionTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";
import {
    useNotificationTemplateDetailQuery,
    useNotificationTemplateQuery
} from "../../../../redux/features/notification/notification-api-slice";
import {FilterInitial} from "../../../../redux/utils/initial-general";
import {useEffect, useState} from "react";
import {
    NotificationTemplateInitial,
    ProgramDetailInitial
} from "../../../../pages/CreateProgram/programInitial";
import {useDetailProgramQuery} from "../../../../redux/features/program/program-api-slice";

interface INotificationProps {
}

const Notification: React.FunctionComponent<INotificationProps> = ({}: INotificationProps) => {
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
        <Box pt="1vw">
            {
                isLoading && <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <CircularProgress/>
                </Box>
            }
            <Stack maxWidth={"100%"} spacing="3vw">
                {programNotificationOption.data.map((item, i) => (
                    <>
                        <Grid
                            key={`rowItem__${i}`}
                            container
                            columns={21}
                            border="0.1vw solid rgba(0, 0, 0, 0.1)"
                            borderRadius="0.3vw"
                            p="3vw"
                        >
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                alignItems="center"
                            >
                                {item.set_value}
                            </Grid>
                            <Grid item xs={4} pr={"1.5vw"}>
                                <Select
                                    direction="column"
                                    label="Via"
                                    placeholder="Option"
                                    options={viaOption.data}
                                    value={i == 0 ? via0 : via1}
                                    handleChange={i === 0 ? setVia0 : setVia1}
                                />
                            </Grid>
                            <Grid item xs={4} pr={"1.5vw"}>
                                <Select
                                    direction="column"
                                    label="Receiver"
                                    placeholder="Option"
                                    options={receiverOption.data}
                                    value={i == 0 ? notif_type0 : notif_type1}
                                    handleChange={i === 0 ? setReceiver0 : setReceiver1}
                                />
                            </Grid>
                            <Grid item xs={4} pr={"1.5vw"}>
                                <Select
                                    direction="column"
                                    label="Template"
                                    placeholder="Option"
                                    optionLabel={"notif_name"}
                                    options={notificationTemplateList.data}
                                    value={i == 0 ? template0 : template1}
                                    handleChange={i === 0 ? setTemplate0 : setTemplate1}
                                />
                            </Grid>
                            <Grid
                                sx={{marginTop: 2}}
                                container
                            >
                                <OutlinedTextField
                                    leftColumn={2}
                                    rightColumn={5}
                                    label="Template Content"
                                    placeholder="Template Content"
                                    variant={"outlined"}
                                    value={i === 0 ? templateContent0 : templateContent1}
                                    handleChange={i === 0 ? setTemplateContent0 : setTemplateContent1}
                                />
                            </Grid>
                        </Grid>

                    </>
                ))}
            </Stack>
        </Box>
    );
};

export default Notification;
