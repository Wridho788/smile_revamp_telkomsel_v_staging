import * as React from "react";
import {Grid, Stack, IconButton, Box, Button, CircularProgress} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Select} from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {options} from "../../../../mocks/options";
import {INotification} from "../../../../app/redux/Utils/Interface/IProgram";
import {
    CreateProgramInitial, ProgramDetailInitial,
    ProgramNotificationInitial
} from "../../../../app/redux/Utils/InitialState/ProgramInitial";
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
import {useState} from "react";

interface INotificationProps {
}

const Notification: React.FunctionComponent<INotificationProps> = ({}: INotificationProps) => {
    const programNotification = ProgramDetailInitial.data
    const [via0, setVia0] = React.useState<string>(programNotification.program_notification[0].via);
    const [via1, setVia1] = React.useState<string>(programNotification.program_notification[1].via);
    const [receiver0, setReceiver0] = React.useState<string>(programNotification.program_notification[0].receiver);
    const [receiver1, setReceiver1] = React.useState<string>(programNotification.program_notification[1].receiver);
    const [template0, setTemplate0] = React.useState<string>(programNotification.program_notification[0].receiver);
    const [template1, setTemplate1] = React.useState<string>(programNotification.program_notification[1].receiver);
    const {data: viaOption = {data: []}} = useGetNotifViaQuery()
    const {data: receiverOption = {data: []}} = useGetNotifReceiverQuery()
    const {data: programNotificationOption = {data: []}} = useGetProgramNotificationQuery()


    const {data: notificationTemplateList = {data: []}, isLoading} =  useNotificationTemplateQuery(FilterInitial)
    React.useEffect(() => {
        programNotification.program_notification[0].via = via0
        programNotification.program_notification[1].via = via1
        programNotification.program_notification[0].receiver = receiver0
        programNotification.program_notification[1].receiver = receiver1
        programNotification.program_notification[0].notification = template0
        programNotification.program_notification[1].notification = template1
console.log(programNotification.program_notification)
        return;
    }, [
        programNotification,
        via0,
        via1,
        template0,
        template1,
        receiver0,
        receiver1,
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
                                handleChange={i == 0 ? setVia0 : setVia1}
                            />
                        </Grid>
                        <Grid item xs={4} pr={"1.5vw"}>
                            <Select
                                direction="column"
                                label="Receiver"
                                placeholder="Option"
                                options={receiverOption.data}
                                value={i == 0 ? receiver0 : receiver1}
                                handleChange={i == 0 ? setReceiver0 : setReceiver1}
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
                                handleChange={i == 0 ? setTemplate0 : setTemplate1}
                            />
                        </Grid>
                    </Grid>
                ))}
            </Stack>
        </Box>
    );
};

export default Notification;
