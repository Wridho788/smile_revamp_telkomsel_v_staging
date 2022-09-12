import React, {useEffect, useState} from "react";
import {Alert, Box, Snackbar} from "@mui/material";
import {DrawerNav, H2, Stepper, StepperPaper} from "../../components";
import {
    MainInfo,
    Notification,
    Segmentation,
} from "../../components/organisms/CreateProgram";
import { CreateProgramProvider } from "../../app/context/CreateProgram/Provider";


const CreateProgram = () => {
    const [messageError, setMessageError] = useState('');
    const [open, setOpen] = useState(false);
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const steps = ["Main Info", "Notification"];
    useEffect(() => {
        if (messageError) {
            setOpen(true)
        }
    }, [messageError])
    const stepsItem = [
        <MainInfo slug={"insert"}/>,
        <Notification/>,
    ];

    return (
        <DrawerNav>
            <Box px="3vw"
                sx={{
                    paddingBlock: "3vw",
                    paddingInline: "20vw",
                }}
            >
                <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                    <Alert onClose={() => setOpen(false)} severity="error" sx={{width: '100%'}}>
                        {messageError}
                    </Alert>
                </Snackbar>
                <StepperPaper sx={{paddingTop: "4vw"}}>
                    <H2 textAlign="center" mb="2vw">
                        Create Program
                    </H2>
                    <Stepper
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        slug={"insert"}
                        type={"program"}
                        messageErrorHandler={setMessageError}
                    >
                        {stepsItem[activeStep]}
                    </Stepper>
                </StepperPaper>
            </Box>
        </DrawerNav>
    );
};

export default CreateProgram;
