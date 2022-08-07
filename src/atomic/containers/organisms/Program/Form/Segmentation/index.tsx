import React, {FC} from 'react'
import FormCard from "../../../../../components/atoms/FormCard";
import {Box, Checkbox, FormControl, Grid, Paper, Tab, Tabs, Typography} from "@mui/material";
import TextFieldApp from "../../../../../components/atoms/TextFieldApp";
import useSegmentationLogic from "./useSegmentationLogic";
import CType from "./CType";
import ButtonApp from "../../../../../components/atoms/ButtonApp";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGeneralProgramRegistration from "../../../../pages/GeneralProgramRegistration/useGeneralProgramRegistration";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {SegmentationProps} from "./Segmentation.type";

const Segmentation: FC<SegmentationProps> = ({step,setStep}) => {
    const {tab, changeTab} = useSegmentationLogic()

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

                <Grid container justifyContent={"center"} alignContent={'center'} alignItems={'center'}>
                    <Box mt={2} component={Grid} xs={11} pb={2}>
                        <Grid container justifyContent={"space-between"}>
                            <Box component={Grid} item xs={2}>
                                <ButtonApp onClick={() => {step > 0 && setStep(step - 1)}} icon={<ArrowBackIcon />} label={"Back"}/>
                            </Box>
                            <Box component={Grid} item xs={2}>
                                <ButtonApp onClick={() => {step < 4 && setStep(step + 1)}} icon={<ArrowForwardIcon />} label={"Next"}/>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </>
        </FormCard>
    )
}

export default Segmentation