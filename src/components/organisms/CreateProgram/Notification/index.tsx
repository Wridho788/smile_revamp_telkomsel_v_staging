import * as React from "react";
import {Grid, Stack, IconButton, Box, Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Select} from "../../../atoms";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {options} from "../../../../mocks/options";
import {INotification} from "../../../../app/redux/Utils/Interface/IProgram";
import {
    CreateProgramInitial,
    ProgramNotificationInitial
} from "../../../../app/redux/Utils/InitialState/ProgramInitial";

interface INotificationProps {
}

const Notification: React.FunctionComponent<INotificationProps> = ({}: INotificationProps) => {
    const programNotification = ProgramNotificationInitial
    const [via, setVia] = React.useState<string>(programNotification.via);
    const [receiver, setReceiver] = React.useState<string>(programNotification.receiver);
    const [template, setTemplate] = React.useState<string>(programNotification.notification);
    const [transactionType, setTransactionType] = React.useState<string>(programNotification.transaction_type);

    const [totalRow, setTotalRow] = React.useState<number[]>([1]);

    React.useEffect(() => {
        programNotification.via = via
        programNotification.notification = template
        programNotification.receiver = receiver
        programNotification.transaction_type =transactionType

        return;
    }, [
        programNotification,
        via,
        template,
        receiver,
        transactionType
    ]);

    return (
        <Box pt="1vw">
            <Stack maxWidth={"100%"} spacing="3vw">
                {totalRow.map((_, idx) => (
                    <Grid
                        key={`rowItem__${idx}`}
                        container
                        columns={21}
                        border="0.1vw solid rgba(0, 0, 0, 0.1)"
                        borderRadius="0.3vw"
                        p="3vw"
                    >
                        {/*<Grid item xs={5} pr={"1.5vw"}>*/}
                        {/*    <Select*/}
                        {/*        direction="column"*/}
                        {/*        label="Via"*/}
                        {/*        placeholder="Option"*/}
                        {/*        options={notification.via}*/}
                        {/*        value={via}*/}
                        {/*        handleChange={setVia}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={5} pr={"1.5vw"}>*/}
                        {/*    <Select*/}
                        {/*        direction="column"*/}
                        {/*        label="Receiver"*/}
                        {/*        placeholder="Option"*/}
                        {/*        options={notification.receiver}*/}
                        {/*        value={receiver}*/}
                        {/*        handleChange={setReceiver}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={5} pr={"1.5vw"}>*/}
                        {/*    <Select*/}
                        {/*        direction="column"*/}
                        {/*        label="Template"*/}
                        {/*        placeholder="Option"*/}
                        {/*        optionLabel={"notif_type"}*/}
                        {/*        options={notification.notification}*/}
                        {/*        value={template}*/}
                        {/*        handleChange={setTemplate}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={5} pr={"1.5vw"}>*/}
                        {/*    <Select*/}
                        {/*        direction="column"*/}
                        {/*        label="Transaction Type"*/}
                        {/*        placeholder="Option"*/}
                        {/*        options={notification.transactionType}*/}
                        {/*        value={transactionType}*/}
                        {/*        handleChange={setTransactionType}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        <Grid
                            item
                            xs={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton
                                aria-label="delete"
                                size="large"
                                sx={{color: "primary.main"}}
                            >
                                <DeleteIcon fontSize="inherit"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
                <Box display="flex" justifyContent="center">
                    <Button
                        onClick={() =>
                            setTotalRow((prevState) => [...prevState, prevState.length])
                        }
                        color="primary"
                        variant="contained"
                        startIcon={<AddBoxIcon fontSize="large"/>}
                        sx={{
                            borderRadius: "0.3vw",
                            paddingInline: "1.5vw",
                            paddingBlock: "0.5vw",
                        }}
                    >
                        Add
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default Notification;
