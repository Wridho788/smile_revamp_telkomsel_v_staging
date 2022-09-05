import * as React from "react";
import {
    Box, Stack,
} from "@mui/material";
import {useEffect, useState} from "react";
import SwitchCustom from "../../../../atomic/components/atoms/Switch";
import BulkData from "./BulkData";
import SingleData from "./SingleData";

interface ISegmentationProps {
}

const Segmentation: React.FunctionComponent<ISegmentationProps> = () => {
    const [bulkUpload, setBulkUpload] = useState(false);
    return (
        <Box px="3vw">
            <Stack spacing={"2vw"} >
            <SwitchCustom checked={bulkUpload} handleChange={setBulkUpload} label={"Bulk Upload"}/>
            {
                bulkUpload ? <BulkData/> : <SingleData/>
            }
            </Stack>
        </Box>
    );
};

export default Segmentation;
