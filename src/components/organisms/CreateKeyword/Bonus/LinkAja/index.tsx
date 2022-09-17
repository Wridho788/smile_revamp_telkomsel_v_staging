import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Stack,
    Box,
    Grid,
} from "@mui/material";
import {
    OutlinedTextField,
    Subtitle,
} from "../../../../atoms";
import {
    ICreateKeyword,
} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {BonusTypeLinkAjaInitial} from "./initial";
import LocationManagement from "../LocationManagement";

interface INotificationLuckyDrawProps {
    bonusType: string;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LinkAja: React.FunctionComponent<INotificationLuckyDrawProps> = ({
                                                                           bonusType,
                                                                           keywordCreate,
                                                                           stateTrigger,
                                                                           setStateTrigger,
                                                                       }) => {
    const bonusTypeLinkAja = BonusTypeLinkAjaInitial
    const locations = keywordCreate.eligibility.locations

    useEffect(() => {
        const index: number = keywordCreate.bonus.findIndex(
            ({bonus_type}) => bonus_type === "link_aja"
        );
        if (index === -1) {
            keywordCreate.bonus.push(bonusTypeLinkAja);
            locations.map((location) =>
                bonusTypeLinkAja.stock_location.push({
                    location_id: location,
                    stock: 0,
                }))
        }
    }, []);
    useEffect(() => {
        bonusTypeLinkAja.stock_location = []
        locations.map((location) => {
                bonusTypeLinkAja.stock_location.push({
                    location_id: location,
                    stock: 0,
                })
            }
        )
        setStateTrigger(!stateTrigger);
    }, [locations]);


    return (
        <Accordion sx={{p: "1vw"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large"/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Subtitle textTransform="uppercase">{bonusType}</Subtitle>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing="2vw" px="0.5vw">
                    <Box>
                        <Grid container columns={4} spacing={2}>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    direction="column"
                                    label="Nominal"
                                    variant="outlined"
                                    value={bonusTypeLinkAja.nominal}
                                    handleChange={(value: string) => {
                                        bonusTypeLinkAja.nominal = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    type={"number"}
                                    direction="column"
                                    label="External API Configuration"
                                    variant="outlined"
                                    value={bonusTypeLinkAja.external_api_config}
                                    handleChange={(value: string) => {
                                        bonusTypeLinkAja.external_api_config = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container columns={4} spacing={2}>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    type={"number"}
                                    direction="column"
                                    label="Location"
                                    variant="outlined"
                                    value={bonusTypeLinkAja.location}
                                    handleChange={(value: string) => {
                                        bonusTypeLinkAja.location = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    type={"number"}
                                    direction="column"
                                    label="Bucket"
                                    variant="outlined"
                                    value={bonusTypeLinkAja.bucket}
                                    handleChange={(value: string) => {
                                        bonusTypeLinkAja.bucket = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <LocationManagement
                        initialName={bonusTypeLinkAja.stock_location}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                    />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default LinkAja;
