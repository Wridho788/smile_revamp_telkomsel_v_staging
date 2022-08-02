import {Breadcrumb, Stepper} from "../../../components";
import React, {useState, useEffect} from "react";
import {Box, Button} from "@mui/material";
import {keywordStep} from "../../../mocks/keywordStep";

const Index = () => {
    const [intervalValue, setInterval] = useState(0);
    const [isDone, setDone] = useState(false);

    const length = keywordStep.length - 1
    const handleNext = () => {
        if (intervalValue == length) {
            setDone(true)
        }
        return setInterval(intervalValue == length ? intervalValue : intervalValue + 1)
    }
    const handleBack = () => {
        setDone(false)
        return setInterval(intervalValue == 0 ? 0 : intervalValue - 1)
    }
    return (
        <Box>

            <Stepper intervalActive={intervalValue} dataStep={keywordStep}/>
            <Button variant="contained" onClick={() => handleBack()}>Back</Button>
            {isDone ?
                <Button variant="contained" onClick={() => handleNext()}>Done</Button>
                :
                <Button variant="contained" onClick={() => handleNext()}>Next</Button>
            }
        </Box>
    );
};

export default Index;
