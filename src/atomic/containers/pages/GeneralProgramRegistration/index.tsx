import React, {FC} from 'react'
import AppLayout from "../../../components/layouts";
import MainInfoSummary from "../../organisms/Program/Form/MainInfoSummary";
import {Box, Grid} from "@mui/material";
import useGeneralProgramRegistration from "./useGeneralProgramRegistration";
import CustomStepper from "../../../components/moleculs/CustomStepper";
import Segmentation from "../../organisms/Program/Form/Segmentation";
import ButtonApp from "../../../components/atoms/ButtonApp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Notification from "../../organisms/Program/Form/Notification";

const GeneralProgramCreation: FC = () => {
    const {step, setStep, notification, setNotification, mainInfoSummaryInput, setMainInfoSummaryInput, result} = useGeneralProgramRegistration()
    const steps = ['Main Info', 'Segmentation', 'Notification', 'Summary'];

    const childrenToBeRendered = () => {
        switch (step) {
            case 0:
                return <MainInfoSummary mainInfoSummaryInput={mainInfoSummaryInput} setMainInfoSummaryInput={setMainInfoSummaryInput} step={step} setStep={setStep} data={result}/>
            case 1:
                return <Segmentation step={step} setStep={setStep}/>
            case 2:
                return <Notification step={step} setStep={setStep} notification={notification} setNotification={setNotification}/>
            default:
                return <MainInfoSummary mainInfoSummaryInput={mainInfoSummaryInput} setMainInfoSummaryInput={setMainInfoSummaryInput} step={step} setStep={setStep} data={result}/>
        }
    }
    return (
        <AppLayout title={"Program Templating"}>
            <>
                <Grid container justifyContent={'center'} alignContent={'center'} alignItems={'center'} mb={5} mt={5}>
                    <Box component={Grid} item xs={10}>
                        <CustomStepper steps={steps} activeSteps={step}/>
                    </Box>
                    <span onClick={() => {console.log(notification)}}>testing</span>
                </Grid>
                {
                    childrenToBeRendered()
                }
            </>
        </AppLayout>
    )
}

export default GeneralProgramCreation
