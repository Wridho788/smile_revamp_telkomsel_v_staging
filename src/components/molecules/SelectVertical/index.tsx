import {
    Grid,
    SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import {GridProps} from "@mui/material/Grid/Grid";
import {BodyCopy, Select} from "../../../components";

interface IIndexProps extends GridProps {
    label?: string;
    placeholder?: string;
    options?: string[];
}

const Index: React.FunctionComponent<IIndexProps> = ({
                                                         label,
                                                         placeholder,
                                                         options,
                                                         ...props
                                                     }) => {

    const [type, setType] = React.useState("");
    return (
        <Grid container alignItems={"center"} {...props}>
            <Grid item xs={12}>
                <BodyCopy>{label}</BodyCopy>
            </Grid>
            <Grid item xs={12}>
                <Select
                    placeholder="Option"
                    options={options}
                    returnedValue={type}
                    setReturnedValue={setType}
                />
            </Grid>
        </Grid>
    );
};

export default Index;
