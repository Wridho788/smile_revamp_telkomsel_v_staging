import * as React from "react";
import {
    Box, Stack,
} from "@mui/material";
import {useEffect, useState} from "react";
import SwitchCustom from "../../../../atomic/components/atoms/Switch";
import BulkData from "./BulkData";
import SingleData from "./SingleData";
import DrawerNav from "../../../templates/drawer-nav";
import StepperPaper from "../../../atoms/StepperPaper";
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {BodyCopy, H2} from "../../../atoms";
import {ProgramDetailInitial} from "../../../../pages/CreateProgram/programInitial";
import {useDetailProgramQuery} from "../../../../redux/features/program/program-api-slice";

interface ISegmentationProps {
}

const Segmentation: React.FunctionComponent<ISegmentationProps> = () => {
    const nav = useNavigate();
    let {programId} = useParams();
    const [bulkUpload, setBulkUpload] = useState(false);
    const {data : programDetail = ProgramDetailInitial.data, isLoading} = useDetailProgramQuery(programId ?? '')

    return (
        <DrawerNav>
            <Box
                sx={{
                    paddingBlock: "3vw",
                    paddingInline: "10vw",
                }}
            >
                <StepperPaper sx={{paddingTop: "4vw"}}>

                    <Box px="3vw" sx={{marginBottom: "3vw"}}>
                        <H2>Edit Segmentation Program <b>{programDetail.name}</b></H2>
                        <BodyCopy>Delete single data or reupload file for segmentation</BodyCopy>
                    </Box>
                    <Stack spacing={"2vw"}>
                        <SwitchCustom checked={bulkUpload} handleChange={setBulkUpload} label={"Bulk Upload"}/>
                        {
                            bulkUpload ? <BulkData/> : <SingleData/>
                        }
                    </Stack>
                    <Box sx={{display: "flex", flexDirection: "row", mt: "3vw"}}>
                        <Button
                            onClick={() => nav('/program-management')}
                            color="inherit"
                            sx={{
                                width: "50%",
                                borderTop: "3px solid",
                                borderRight: "1.5px solid",
                                borderColor: "secondary.main",
                                borderRadius: 0,
                                paddingBlock: "1vw",
                            }}
                        >Back To Program Management
                        </Button>
                        <Box sx={{flex: "1 1 auto"}}/>
                        <Button
                            onClick={() => nav('/program-management')}
                            color="primary"
                            sx={{
                                width: "50%",
                                borderTop: "3px solid",
                                borderLeft: "1.5px solid",
                                borderColor: "secondary.main",
                                borderRadius: 0,
                                paddingBlock: "1vw",
                            }}
                        >Save
                        </Button>
                    </Box>
                </StepperPaper>
            </Box>
        </DrawerNav>
    )
        ;
};

export default Segmentation;
