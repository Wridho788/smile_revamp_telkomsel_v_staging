import {SegmentationProps} from "./types";
import {FC} from "react";
import * as React from "react";
import {useLazyProgramSegmentationListQuery} from "../../../../../redux/features/program/program-api-slice";


import SegmentationList from "./list";
import {Box, Divider, Grid, IconButton, Stack} from "@mui/material";
import {Edit} from "@mui/icons-material";
import {BodyCopy, StepperPaper} from "../../../../atoms";

const Segmentation: FC<SegmentationProps> = ({...props}) => {
    return (

        <StepperPaper sx={{padding: "1vw"}}>
            <Grid>
                <Stack spacing={"1vw"}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                    >
                        <BodyCopy><b>Segmentation</b></BodyCopy>
                        <IconButton
                            href={"/edit-program/segmentation/".concat(props.programId)}
                        >
                            <Edit sx={{fontSize: 14}}></Edit>
                        </IconButton>
                    </Stack>
                    <Divider/>
                    <Grid container columns={12.3}>
                        <Grid xs={6}>
                            <SegmentationList programId={props.programId} type={"whitelist"}/>
                        </Grid>
                        <Grid xs={0.3}/>
                        <Grid xs={6}>
                            <SegmentationList programId={props.programId} type={"blacklist"}/>
                        </Grid>
                    </Grid>
                </Stack>
            </Grid>
        </StepperPaper>
    )
}
export default Segmentation
