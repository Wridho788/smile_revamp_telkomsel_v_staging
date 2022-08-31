import {
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    OutlinedInput,
    Grid, Box,
} from "@mui/material";
import * as React from "react";
import {BodyCopy} from "../Typography";
import {ISelectProps} from "./types";

const Index: React.FunctionComponent<ISelectProps> = ({
                                                          label,
                                                          placeholder,
                                                          options,
                                                          optionLabel = "set_value",
                                                          optionValue = "_id",
                                                          value,
                                                          handleChange,
                                                          totalColumn = 11,
                                                          leftColumn = 4,
                                                          rightColumn = 7,
                                                          direction = "row",
                                                          isRequired = true,
                                                          ...props
                                                      }) => {
    return (
        <Grid
            container
            columns={!label || direction === "column" ? rightColumn : totalColumn}
            alignItems={"center"}
        >
            <Grid
                item
                xs={!label ? 0 : direction === "column" ? rightColumn : leftColumn}
            >
                <Grid container>
                    <Grid>
                        <BodyCopy>{label}</BodyCopy>
                    </Grid>
                    {
                        (isRequired) &&
                        <Grid>
                            <BodyCopy color={"red"} sx={{marginLeft:"5px"}}>*</BodyCopy>
                        </Grid>
                    }
                </Grid>
            </Grid>
            <Grid item xs={rightColumn} mt={direction === "column" ? "0.3vw" : 0}>
                <FormControl sx={{width: "100%"}}>
                    <Select
                        value={value}
                        onChange={(event: SelectChangeEvent) => {
                            handleChange(event.target.value);
                        }}
                        displayEmpty
                        size="small"
                        input={<OutlinedInput/>}
                        inputProps={{"aria-label": "Without label"}}
                        {...props}
                    >
                        <MenuItem disabled value="">
                            {placeholder}
                        </MenuItem>
                        {typeof options !== "undefined" &&
                            options.map((data: any, idx: number) => (
                                <MenuItem
                                    key={`option__item__${idx}`}
                                    value={data[optionValue]}
                                >
                                    {data[optionLabel]}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Index;
