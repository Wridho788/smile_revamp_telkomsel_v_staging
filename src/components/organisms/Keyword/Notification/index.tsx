import * as React from "react";
import {Box, Grid} from "@mui/material";
import {INotificationProps} from "./type";
import NotificationItem from "./NotificationItem";
import {keywordCreateNotification} from "../../../../mocks/keywordCreate"

const Index: React.FunctionComponent<INotificationProps> = (props) => {
    const tes = [1, 2, 3, 4, 5, 6, 7];
    return (
        <Box >
            {tes.map(() =>
                (
                    <Grid sx={{paddingBottom:2}} >
                        <NotificationItem data={keywordCreateNotification}/>
                    </Grid>
                )
            )}
        </Box>
    );
};

export default Index;
