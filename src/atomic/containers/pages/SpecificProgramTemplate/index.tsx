import React, { FC } from 'react'
import AppLayout from "../../../components/layouts";
import MainInfoSummary from "../../organisms/Program/Form/MainInfoSummary";
import useSpecificProgramTemplateService from "./useSpecificProgramTemplateService";
import CustomStepper from "../../../components/moleculs/CustomStepper";
import {Box, Grid} from "@mui/material";

const SpecificProgramTemplate: FC = () => {
    const { step } = useSpecificProgramTemplateService()
    const steps = ['Main Info', 'Segmentation', 'Notification', 'Summary'];

    const childrenToBeRendered = () => {
        switch (step) {
            case 1:
                return <MainInfoSummary/>
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
            </>
        </AppLayout>
    )
}

export default SpecificProgramTemplate