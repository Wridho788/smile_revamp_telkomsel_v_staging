import {Box, Stack} from "@mui/material";
import * as React from "react";
import {BodyCopy, Subtitle} from "../../../atoms";
import {IProgramPageData} from "../../../../app/redux/Utils/Interface/IProgram";
import {
    CreateProgramInitial,
    ProgramSegmentationInitial
} from "../../../../app/redux/Utils/InitialState/ProgramInitial";
import H3 from "../../../atoms/Typography/H3";

interface ISummaryProps {
}

const Summary: React.FunctionComponent<ISummaryProps> = () => {
    const titles = ["Main Info", "Segmentation", "Notification"];

    const result = CreateProgramInitial
    const segmentation = ProgramSegmentationInitial
    return (
        <Box pt="1vw" pl="1vw">
            <Stack spacing={"3vw"} maxWidth={"100%"}>
                {titles.map((title, idx) => (
                    <Stack key={`summaryTitle__${idx}`} spacing="1vw">
                        <Subtitle>{title} Summary</Subtitle>
                        <Stack
                            key={`summaryDescription`}
                            direction="row"
                            spacing="1vw"
                        >
                            <BodyCopy>Summary Item:</BodyCopy>
                            <H3> {result.name}</H3>
                        </Stack>
                        <Stack
                            key={`summaryDescription`}
                            direction="row"
                            spacing="1vw"
                        >
                            <BodyCopy>Summary Item:</BodyCopy>
                            <H3> {segmentation.customer_msisdn}</H3>
                        </Stack>
                        <Stack
                            key={`summaryDescription`}
                            direction="row"
                            spacing="1vw"
                        >
                            <BodyCopy>Summary Item:</BodyCopy>
                            <H3> {segmentation.customer_point_balance}</H3>
                        </Stack>

                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

export default Summary;
