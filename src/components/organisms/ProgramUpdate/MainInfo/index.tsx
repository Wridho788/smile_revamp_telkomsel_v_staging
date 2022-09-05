/**
 * Form Program Main Info Update : ./src/components/organisms/ProgramUpdate/MainInfo/index.tsx
 * **/

import {
    H2,
    OutlinedTextField,
    ResponsiveDateTimePicker,
    Select
} from "../../../../components";
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    Paper, Divider
} from "@mui/material";
import * as React from "react";

import { KeywordAuctionProvider } from "../../../../app/context/KeywordAuction/Provider";
import IconButton from "@mui/material/IconButton";
import {Close} from "@mui/icons-material";

// import {
//     BooleanOption,
//     logicOption,
//     programTimeZoneOption,
//     ThresholdAlarmExpiredOption
// } from "../../../../redux/utils/initial-general";

export default function MainInfo() {
    return (
        <KeywordAuctionProvider>
            <Box display="block" sx={{ paddingInline: '20vw' }}>
                <Paper elevation={3}>
                    <Box>
                        <Box sx={{
                            paddingX: 8,
                            paddingY: 4
                        }}>
                            <Box>
                                <Box display="flex" justifyContent="space-between">
                                    <Box>
                                        <H2>Edit Main Info Program "Your Program"</H2>
                                        <small>Make sure you input correct data before store it</small>
                                    </Box>

                                    {/* TODO: Action "Cancel" */}
                                    <IconButton>
                                        <Close></Close>
                                    </IconButton>
                                </Box>
                                <Divider color="#000" sx={{ height: 2, marginTop: 2 }} />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            py="1vw"
                            sx={{
                                paddingInline: "10vw",
                                paddingBottom: 6
                            }}
                        >
                            <Stack spacing="1vw" width="100%">
                                <OutlinedTextField
                                    label="Program Group"
                                    placeholder="Program Group"
                                    variant={"outlined"}
                                    value=""
                                />
                                <OutlinedTextField
                                    label="Program Name"
                                    placeholder="Program Name"
                                    variant={"outlined"}
                                    value=""
                                />
                                <OutlinedTextField
                                    label="Description"
                                    placeholder="Description"
                                    variant={"outlined"}
                                    value=""
                                    multiline
                                    rows={4}
                                    isRequired={false}
                                />
                                <ResponsiveDateTimePicker
                                    label="Start Period"
                                    placeholder="Start Period"
                                    value=""
                                />
                                <ResponsiveDateTimePicker
                                    label="End Period"
                                    placeholder="End Period"
                                    value=""
                                />
                                <Select
                                    label="Point Type"
                                    placeholder="Option"
                                    optionLabel="set_value"
                                    value=""
                                    options={[]}
                                />
                                <Select
                                    label="Program Mechanism"
                                    placeholder="Option"
                                    optionLabel="set_value"
                                    value=""
                                    options={[]}
                                />
                                <Select
                                    label="Owner"
                                    placeholder="Option"
                                    optionLabel="set_value"
                                    value=""
                                    options={[]}
                                />
                                {/*{*/}
                                {/*    (programData.program_owner) &&*/}
                                <Select
                                    label="Owner Detail"
                                    placeholder="Option"
                                    optionLabel="name"
                                    value=""
                                    options={[]}
                                />
                                {/*}*/}
                                <Select
                                    label="Whitelist Counter"
                                    placeholder="Option"
                                    value=""
                                    options={[]}
                                />
                                <Select
                                    label="Segmentation Logic"
                                    placeholder="Option"
                                    value=""
                                    options={[]}
                                />
                                <Select
                                    label="Program Time Zone"
                                    placeholder="Option"
                                    value=""
                                    options={[]}
                                />

                                <Select
                                    label="Threshold Alarm Experied"
                                    placeholder="Option"
                                    value=""
                                    options={[]}
                                />
                                <OutlinedTextField
                                    InputProps={{inputProps: {min: 70, max: 100}}}
                                    label="Threshold Alarm Voucher"
                                    placeholder="Threshold Alrm Voucher"
                                    value=""
                                    variant={"outlined"}
                                />
                            </Stack>
                        </Box>

                        {/* TODO: Action "Cancel" | "Save" */}
                        <ButtonGroup
                            sx={{
                                backgroundColor: '#D9D9D9',
                                height: 60
                            }}
                            fullWidth
                        >
                            <Button sx={{ border: '1px solid #000', color: '#000' }}>Cancel</Button>
                            <Button sx={{ border: '1px solid #000' }}>Save</Button>
                        </ButtonGroup>
                    </Box>
                </Paper>
            </Box>
        </KeywordAuctionProvider>
    )
}