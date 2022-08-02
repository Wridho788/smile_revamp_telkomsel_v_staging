import {Breadcrumb, Stepper} from "../../../components";
import React, {useState, useEffect} from "react";
import {Box, Button} from "@mui/material";
import {keywordStep} from "../../../mocks/keywordStep";

const Index = () => {
    const [intervalValue, setInterval] = useState(0);
    const [isDone, setDone] = useState(false);
    const handleClick = () => {
        const length = keywordStep.length
        if (length == intervalValue) {
            return setDone(true)
        }
        setInterval(intervalValue + 1)
    }
    return (
        <Box>

            <Stepper intervalActive={intervalValue} dataStep={keywordStep}/>
            <Button variant="contained" onClick={() => handleClick()}>Back</Button>
            {isDone ?
                <Button variant="contained" onClick={() => handleClick()}>Done</Button>
                :
                <Button variant="contained" onClick={() => handleClick()}>Next</Button>
            }
        </Box>
    );
};

export default Index;
