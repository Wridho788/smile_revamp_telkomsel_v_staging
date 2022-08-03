import * as React from "react";
import {Box} from "@mui/material";
import {SelectHorizontal} from "../../../../components";

interface IMainInfo {
}

const Index: React.FunctionComponent<IMainInfo> = (props) => {
    const typeOptions = ["Type 1", "Type 2", "Type 3"];
    const typeOptions2 = ["Type 3", "Type 2", "Type 1"];
    return (
        <Box>
            <SelectHorizontal
                minWidthSelect={"70%"}
                label="Type"
                placeholder="Option"
                options={typeOptions}
                sx={{paddingTop: 2}}
            />
            <SelectHorizontal
                minWidthSelect={"70%"}
                label="Parent"
                placeholder="Option"
                options={typeOptions2}
                sx={{paddingTop: 2}}
            />
        </Box>
    );
};

export default Index;
