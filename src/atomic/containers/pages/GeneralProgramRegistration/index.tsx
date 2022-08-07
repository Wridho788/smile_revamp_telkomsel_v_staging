import React, { FC } from 'react'
import AppLayout from "../../../components/layouts";
import MainInfoSummary from "../../organisms/Program/Form/MainInfoSummary";
import {Box, Grid} from "@mui/material";
import useGeneralProgramRegistration from "./useGeneralProgramRegistration";
import CustomStepper from "../../../components/moleculs/CustomStepper";
import Segmentation from "../../organisms/Program/Form/Segmentation";
import ButtonApp from "../../../components/atoms/ButtonApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GeneralProgramCreation: FC = () => {
    const { step, setStep } = useGeneralProgramRegistration()
    const steps = ['Main Info', 'Segmentation', 'Notification', 'Summary'];

    const childrenToBeRendered = () => {
        switch (step) {
            case 0:
                return <MainInfoSummary/>
            case 1:
                return <Segmentation />
            default:
                return <MainInfoSummary/>
        }
    }
    return (
        <AppLayout title={"Program Templating"}>
            <>
                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} mb={5} mt={5}>
                    <Box component={Grid} item xs={10}>
                        <CustomStepper steps={steps} activeSteps={step}/>
                    </Box>
                </Grid>
                {
                    childrenToBeRendered()
                }

                <Grid container justifyContent={"center"} alignContent={'center'} alignItems={'center'}>
                    <Box mt={2} component={Grid} xs={7}>
                        <Grid container justifyContent={"space-between"}>
                            <Box component={Grid} item xs={2} p={1}>
                                <ButtonApp onClick={() => {step > 0 && setStep(step - 1)}} icon={<ArrowBackIcon />} label={"Back"}/>
                            </Box>
                            <Box component={Grid} item xs={2} p={1}>
                                <ButtonApp onClick={() => {step < 4 && setStep(step + 1)}} icon={<ArrowForwardIcon />} label={"Next"}/>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </>
        </AppLayout>
    )
}

export default GeneralProgramCreation