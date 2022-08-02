import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {FC} from "react";
import {IStepProps} from "../../../mocks/keywordStep";

interface MerchantProps {
    intervalActive: number;
    dataStep : IStepProps[];
}

const Index: FC<MerchantProps> = ({intervalActive, dataStep}: MerchantProps) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={intervalActive} alternativeLabel>
                {dataStep.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default Index;
