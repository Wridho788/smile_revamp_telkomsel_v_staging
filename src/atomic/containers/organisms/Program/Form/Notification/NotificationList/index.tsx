import React, {FC} from 'react'
import {Box, Grid, Paper, Typography} from "@mui/material";
import SelectField from "../../../../../../components/atoms/SelectField";
import {NotificationListProps} from "./NotificationList.type";

const NotificationList: FC<NotificationListProps> = ({data, index}) => {
    return (
        <Paper>
            <Grid container justifyContent={'space-around'}>
                <Box component={Grid} item xs={3} p={1}>
                    <SelectField onChange={(e: any) => {
                        data[index].via.id = e.target.value
                    }} label={"Via"} data={[{id: 1, value: "SMS"}]}/>
                </Box>
                <Box component={Grid} item xs={3} p={1}>
                    <SelectField onChange={(e: any) => {
                        data[index].type.id = e.target.value
                    }} label={"Type"} data={[{id: 1, value: "SMS"}]}/>
                </Box>
                <Box component={Grid} item xs={3} p={1}>
                    <SelectField onChange={(e: any) => {
                        data[index].template.id = e.target.value
                    }} label={"Template"} data={[{id: 1, value: "SMS"}]}/>
                </Box>
                <Box component={Grid} item xs={3} p={1}>
                    <SelectField onChange={(e: any) => {
                        data[index].transactionType.id = e.target.value
                    }} label={"Transaction Type"} data={[{id: 1, value: "SMS"}]}/>
                </Box>
            </Grid>
        </Paper>
    )
}

export default NotificationList