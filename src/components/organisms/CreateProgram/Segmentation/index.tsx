import * as React from "react";
import {
    Box,
} from "@mui/material";
import {useEffect, useState} from "react";
import SwitchCustom from "../../../../atomic/components/atoms/Switch";
import BulkData from "./bulk_data";
import SingleData from "./single_data";

interface ISegmentationProps {
}

const Segmentation: React.FunctionComponent<ISegmentationProps> = () => {
    const [bulkUpload, setBulkUpload] = useState(false);
    return (
        <Box px="3vw">
            <SwitchCustom checked={bulkUpload} handleChange={setBulkUpload} sx={{marginBottom : 5}}/>
            {
                bulkUpload ? <BulkData/> : <SingleData/>
            }
        </Box>
    );
};

export default Segmentation;
