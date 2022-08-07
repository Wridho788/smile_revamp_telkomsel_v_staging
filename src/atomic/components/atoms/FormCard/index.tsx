import React, {FC} from 'react'
import {FormCardProps} from "./FormCard.type";
import {Box, Grid, Paper} from "@mui/material";

const FormCard: FC<FormCardProps> = ({children}) => {
    return (
        <Grid container justifyContent={"center"} alignContent={"center"}>
            <Box component={Grid} item xs={7}>
                <Paper>
                    {children}
                </Paper>
            </Box>
        </Grid>
    )
}
export default FormCard