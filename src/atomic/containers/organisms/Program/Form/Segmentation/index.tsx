import React, {FC} from 'react'
import FormCard from "../../../../../components/atoms/FormCard";
import {Box, Checkbox, FormControl, Grid, Paper, Tab, Tabs, Typography} from "@mui/material";
import TextFieldApp from "../../../../../components/atoms/TextFieldApp";
import useSegmentationLogic from "./useSegmentationLogic";
import CType from "./CType";
import ButtonApp from "../../../../../components/atoms/ButtonApp";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGeneralProgramRegistration from "../../../../pages/GeneralProgramRegistration/useGeneralProgramRegistration";

const Segmentation: FC = () => {
    const {tab, changeTab} = useSegmentationLogic()
    const {setStep} = useGeneralProgramRegistration()

    const SegmentationTabToBeRendered = () => {
        switch (tab) {
            case "c-type":
                return <CType/>
            default:
                return <CType/>
        }
    }
    return (
        <FormCard>
            <>
                <Grid container>
                    <Box component={Grid} xs={12} p={2}>
                        <Paper variant={'outlined'}>
                            <Tabs
                                value={tab}
                                onChange={changeTab}
                                variant={"scrollable"}
                                textColor="primary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                            >
                                <Tab value="c-type" label="Type"/>
                                <Tab value="c-tier" label="Tier"/>
                                <Tab value="c-badges" label="Badges"/>
                                <Tab value="c-location" label="Location"/>
                                <Tab value="c-brand" label="Brand"/>
                                <Tab value="c-ARPU" label="ARPU"/>
                                <Tab value="c-outlet" label="Outlet"/>
                                <Tab value="c-msisdn" label="MSISDN"/>
                            </Tabs>
                        </Paper>

                        <Box mt={3}>
                            {
                                SegmentationTabToBeRendered()
                            }
                        </Box>
                    </Box>
                </Grid>
            </>
        </FormCard>
    )
}

export default Segmentation