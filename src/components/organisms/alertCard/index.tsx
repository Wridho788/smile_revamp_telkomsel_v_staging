import * as React from 'react';
import {Subtitle} from '../../../components'
import {SuccessAlert} from '../../../assets'
import {Button, Card, Box, Grid, IconButton, Avatar} from "@mui/material";
import Theme from "../../../style/Material-UI/theme";
import {Close} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

const activeStyle = {
    borderRadius: '8px',
    backgroundColor: Theme.palette.primary.main,
    color: Theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: Theme.palette.secondary.light,
        color: Theme.palette.secondary.main,
    },
}

interface alertCardProps {
    label?: string
    title?: string
    description?: string
}

const Index: React.FC<alertCardProps> = ({label, title, description}: alertCardProps) => {

    const navigate = useNavigate();
    return (

        <Card style={{
            width: 500,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Grid container justifyContent="flex-end">
                <IconButton aria-label="close"
                            onClick={() => navigate(1)}>
                    <Close/>
                </IconButton>
            </Grid>
            <Box
                display="grid"
                justifyContent="center"
                alignItems="center"
            >
                <Grid container justifyContent="center" sx={{paddingTop: "17px"}}>
                    <Avatar alt="Remy Sharp" src={SuccessAlert} sx={{width: 74, height: 74}}/>
                </Grid>
                <Subtitle sx={{
                    paddingTop: "20px",
                    paddingBottom: "70px",
                }}>Login Success</Subtitle>
            </Box>
            <Button fullWidth
                    onClick={() => navigate(-1)}
                    sx={activeStyle}>
                <Subtitle>Ok</Subtitle>
            </Button>
        </Card>
    )
}
export default Index