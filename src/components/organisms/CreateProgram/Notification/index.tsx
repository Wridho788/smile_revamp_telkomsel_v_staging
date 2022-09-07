import * as React from "react";
import {Grid, Stack, IconButton, Box, Button, CircularProgress, ListItem, Typography} from "@mui/material";
import {OutlinedTextField, Select} from "../../../atoms";
import {
    useGetNotifViaQuery,
    useGetProgramNotificationQuery,
} from "../../../../redux/features/lov/lov-api-slice";
import {useEffect, useState} from "react";
import {
    CreateProgramInitial, variableInitial
} from "../../../../pages/CreateProgram/programInitial";
import {AddBox} from "@mui/icons-material";
import BodyCopy from "../../../atoms/Typography/BodyCopy";
import ListItemButton from "@mui/material/ListItemButton";
import SmallCopy from "../../../atoms/Typography/SmallCopy";
import H3 from "../../../atoms/Typography/H3";
import {IProgramNotification} from "../../../../pages/CreateProgram/interface";


interface INotificationProps {
}

const Notification: React.FunctionComponent<INotificationProps> = ({}: INotificationProps) => {

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

    return (
        <>
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
        </>
    );
};

export default Notification;
