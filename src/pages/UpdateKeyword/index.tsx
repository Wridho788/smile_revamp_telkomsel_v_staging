/**
 * TODO: Update Keyword
 * **/

import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { H2, Stepper, StepperPaper } from "../../components";
import {
    MainInfo,
    Bonus
} from "../../components/organisms/UpdateKeyword";
import { KeywordAuctionProvider } from "../../app/context/KeywordAuction/Provider";
import {useKeywordGeneralDetailQuery} from "../../redux/features/keyword/keyword-api-slice";

const UpdateKeyword = () => {
    const [activeStep, setActiveStep] = React.useState<number>(0);
    const steps = ["Main Info", "Bonus"];
    const stepsItem = [<MainInfo />, <Bonus />];

    /* TODO: Get params url of _id */
    const { _id } = useParams();
    const { data, isLoading } = useKeywordGeneralDetailQuery(_id ?? "");

    console.log('keyword', data);

    return (
        <KeywordAuctionProvider>
            <Box
                sx={{
                    paddingBlock: "3vw",
                    paddingInline: "20vw",
                }}
            >
                <StepperPaper sx={{ paddingTop: "4vw" }}>
                    <H2 textAlign="center" mb="2vw">
                        Update Keyword
                    </H2>
                    <Stepper
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                        slug={"update"}
                        type={"keyword"}
                    >
                        {stepsItem[activeStep]}
                    </Stepper>
                </StepperPaper>
            </Box>
        </KeywordAuctionProvider>
    );
};

export default UpdateKeyword;
