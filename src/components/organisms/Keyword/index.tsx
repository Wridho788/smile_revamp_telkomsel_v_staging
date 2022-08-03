import {Breadcrumb, Stepper, StepperPaper} from "../../../components";
import React, {useState,} from "react";
import {Box, Button} from "@mui/material";
import {keywordStep} from "../../../mocks/keywordStep";
import Bonus from "./Bonus";
import ButtonAction from "./buttonAction";
import BoardSwitch from "./boardSwitch";


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
        <>
            <Breadcrumb title={"Dashboard"} subtitle={"Keyword"} active={"Create Keyword"} linkTo={"/"}/>
            <StepperPaper sx={{padding: 2}}>
                <Box>
                    <Stepper intervalActive={intervalValue} dataStep={keywordStep}/>
                    <div style={{padding: 60}}>
                        <Box sx={{
                            border: 1,
                            padding: 5,
                        }}>
                            <BoardSwitch intervalValue={intervalValue}/>
                            <ButtonAction btnBack={() => handleBack()} btnNext={() => handleNext()} isDone={isDone}
                                          isCancel={isCancel}
                                          sx={{paddingTop: 5}}/>
                        </Box>
                    </div>
                </Box>
            </StepperPaper>
        </>
    );
};

export default Index;
