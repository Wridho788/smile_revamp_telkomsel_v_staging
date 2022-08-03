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
    minWidthSelect?: string
}

const Index: React.FunctionComponent<IIndexProps> = ({
                                                         label,
                                                         placeholder,
                                                         options,
                                                         minWidthSelect="100%",
                                                         ...props
                                                     }) => {

    const [type, setType] = React.useState("");
    return (
        <Grid container columns={10} alignItems={"center"} {...props}>
            <Grid item xs={3}>
                <BodyCopy>{label}</BodyCopy>
            </Grid>
            <Grid item xs={7}>
                <Select
                    minWidth={minWidthSelect}
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
