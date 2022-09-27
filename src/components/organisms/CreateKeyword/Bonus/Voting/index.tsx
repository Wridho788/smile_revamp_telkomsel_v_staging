import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
    Stack,
    Box,
    Grid,
    Switch
} from "@mui/material";
import {
    OutlinedTextField,
    Subtitle,
    SmallCopy,
} from "../../../../atoms";

import { ICreateKeyword } from "../../interfaces";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import LocationManagement from "../LocationManagement";
import { KeywordBonusVoting } from "../../initial";

interface INotificationVotingProps {
    bonusType: string;
    bonusTypeId: any;
    keywordCreateState: ICreateKeyword;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationVoting: React.FunctionComponent<
    INotificationVotingProps
> = ({
    keywordCreateState,
    keywordCreate,
    stateTrigger,
    setStateTrigger,
}) => {
        const { data: locationOptions, isFetching } =
            useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

        const [index, setIndex] = useState<number>(-1);

        useEffect(() => {
            // Initial Keyword Voting
            const index = keywordCreate.bonus.findIndex(
                ({ bonus_type }) => bonus_type === "voting"
            );

            if (index === -1) {
                keywordCreate.bonus.push(KeywordBonusVoting);
                const bonusIdx = keywordCreate.bonus.findIndex(
                    ({ bonus_type }) => bonus_type === "voting"
                );
                setIndex(bonusIdx);
            }
        }, []);

        console.log(`key`, keywordCreate)

        return (
            <Accordion sx={{ p: "1vw" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon fontSize="large" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Subtitle textTransform="uppercase">Voting</Subtitle>
                </AccordionSummary>

                <AccordionDetails>
                    {index !== -1 && (<Stack spacing="2vw" px="0.5vw">
                        <Box>
                            <Grid container columns={4} spacing={2}>
                                <Grid item xs={2}>
                                    <OutlinedTextField
                                        direction="column"
                                        label="Target Redemeer"
                                        variant="outlined"
                                        value={keywordCreate.bonus[index].target_redeemer}
                                        handleChange={(value: string) => {
                                            keywordCreate.bonus[index].target_redeemer = value;
                                            setStateTrigger(!stateTrigger);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2} pt={4}>
                                    <Stack
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Switch
                                            checked={
                                                keywordCreateState.bonus[index]
                                                    .redeem_after_verification
                                            }
                                            onChange={(e) => {
                                                keywordCreate.bonus[index].redeem_after_verification =
                                                    e.target.checked;
                                                setStateTrigger(!stateTrigger);
                                            }}
                                            inputProps={{ "aria-label": "controlled" }}
                                        />
                                        <SmallCopy>Redeem After Verification</SmallCopy>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>


                        {/* Stock Location Management */}
                        <Stack>
                            {locationOptions && <LocationManagement
                                bonusType="voting"
                                keywordCreateState={keywordCreateState}
                                keywordCreate={keywordCreate}
                                stateTrigger={stateTrigger}
                                setStateTrigger={setStateTrigger}
                            />}
                        </Stack>
                    </Stack>)}
                </AccordionDetails>
            </Accordion>
        );
    };

export default NotificationVoting;
