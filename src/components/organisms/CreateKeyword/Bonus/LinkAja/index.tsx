import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Stack,
    Button,
    Switch,
    Box,
    CircularProgress,
    Grid,
    Divider,
} from "@mui/material";
import {
    Select,
    OutlinedTextField,
    Subtitle,
    BodyCopy,
    SmallCopy,
} from "../../../../atoms";
import {FilterInitial} from "../../../../../redux/utils/initial-general";
import {
    ICreateKeyword,
} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    useGetNotifViaQuery,
} from "../../../../../redux/features/lov/lov-api-slice";
import {useLocationTemplateQuery} from "../../../../../redux/features/location/location-api-slice";
import {BonusTypeLinkAjaInitial} from "./initial";

interface INotificationLuckyDrawProps {
    bonusType: string;
    keywordCreateState: ICreateKeyword;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LinkAja: React.FunctionComponent<INotificationLuckyDrawProps> = ({
                                                                           bonusType,
                                                                           keywordCreateState,
                                                                           keywordCreate,
                                                                           stateTrigger,
                                                                           setStateTrigger,
                                                                       }) => {
    const {data: viaOptions = {data: []}} = useGetNotifViaQuery();
    const bonusTypeLinkAja = BonusTypeLinkAjaInitial
    const locations = keywordCreate.eligibility.locations
    const {data: locationOptions = {data: []}} =
        useLocationTemplateQuery(FilterInitial);

    useEffect(() => {
        // Initial Keyword Bonus Loyalty Poin
        const index: number = keywordCreate.bonus.findIndex(
            ({bonus_type}) => bonus_type === "LinkAja Main & Bonus Balance"
        );
        console.log(index)
        if (index === -1) {
            console.log(bonusTypeLinkAja)
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
                    <Grid alignItems="center" container columns={4.1}>
                        <Grid item xs={1.5}>
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
                        <Grid xs={0.1}/>
                        <Grid item xs={1.5}>
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
                    <Grid alignItems="center" container columns={4.1}>
                        <Grid item xs={1.5}>
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
                        <Grid xs={0.1}/>
                        <Grid item xs={1.5}>
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
                    <Divider textAlign="left" sx={{pt: "1vw"}}>
                        <Subtitle textTransform="uppercase">
                            stock per location management
                        </Subtitle>
                    </Divider>
                    <Stack>
                        <Grid container>
                            <Grid item xs={5} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">
                                <BodyCopy
                                    align="center"
                                    textTransform="uppercase"
                                    fontWeight="bold"
                                >
                                    Location
                                </BodyCopy>
                            </Grid>
                            <Grid item xs={7} border="0.1vw solid rgba(0,0,0,0.1)" p="0.8vw">
                                <BodyCopy
                                    align="center"
                                    textTransform="uppercase"
                                    fontWeight="bold"
                                >
                                    Stock Per Location
                                </BodyCopy>
                            </Grid>
                        </Grid>
                        {bonusTypeLinkAja.stock_location.map((currItem, idx) => {
                            const locationName = locationOptions.data.find(
                                (e) => e["_id"] === currItem.location_id
                            )?.name;
                            return (
                                <Grid key={`location__${idx}`} container>
                                    <Grid
                                        item
                                        xs={5}
                                        border="0.1vw solid rgba(0,0,0,0.1)"
                                        p="0.8vw"
                                    >
                                        <BodyCopy textTransform="uppercase">
                                            {locationName}
                                        </BodyCopy>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={7}
                                        border="0.1vw solid rgba(0,0,0,0.1)"
                                        p="0.8vw"
                                    >
                                        <OutlinedTextField
                                            type="number"
                                            variant="outlined"
                                            InputProps={{inputProps: {min: 0}}}
                                            value={String(bonusTypeLinkAja.stock_location[idx].stock)}
                                            handleChange={(value: string) => {
                                                bonusTypeLinkAja.stock_location[idx].stock = Number(value);
                                                setStateTrigger(!stateTrigger);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            );
                        })}
                        <SmallCopy color="primary" mt="1vw">
                            ** If you don't want set stock, please leave it blank
                        </SmallCopy>
                    </Stack>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default LinkAja;
