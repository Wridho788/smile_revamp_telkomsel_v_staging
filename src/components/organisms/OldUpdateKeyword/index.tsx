import { useState } from "react";
import { Box, Button } from "@mui/material";
import { keywordStep } from "../../../mocks/keywordStep";

const Index = () => {
    const [intervalValue, setInterval] = useState(0);
    const [isCancel, setCancel] = useState(true);
    const [isDone, setDone] = useState(false);

    const length = keywordStep.length - 1
    const handleNext = () => {
        setCancel(false)
        if (intervalValue === length) {
            setDone(true)
        }
        return setInterval(intervalValue === length ? intervalValue : intervalValue + 1)
    }
    const handleBack = () => {
        setDone(false)
        setInterval(intervalValue === 0 ? 0 : intervalValue - 1)
        if (intervalValue === 1) {
            setCancel(true)
        }
    }
    return (
        <Box>
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
