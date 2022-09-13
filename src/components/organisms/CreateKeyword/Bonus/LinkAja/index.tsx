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
    ResponsiveDateTimePicker,
    SmallCopy,
} from "../../../../atoms";
import {FilterInitial} from "../../../../../redux/utils/initial-general";
import {
    ICreateKeyword,
    IKeywordBonusLuckyDraw,
    IKeywordNotificationLuckyDraw,
    IKeywordNotificationLuckyDrawHelper,
} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
    useGetNotifViaQuery,
    useLazyGetKeywordNotificationQuery,
} from "../../../../../redux/features/lov/lov-api-slice";
import {useNotificationTemplateQuery} from "../../../../../redux/features/notification/notification-api-slice";
import {
    KeywordNotificationLuckyDrawHelper,
    KeywordNotificationLuckyDraw,
    KeywordBonusLuckyDraw, CreateKeywordGeneral,
} from "../../initial";
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
    const location = CreateKeywordGeneral.eligibility.locations
    useEffect(() => {

    }, [bonusTypeLinkAja]);

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
                    <Select
                        direction="column"
                        label="Bonus Type"
                        placeholder="Option"
                        options={viaOptions.data}
                        value={bonusTypeLinkAja.bonus_type}
                        handleChange={(value: string) => {
                            bonusTypeLinkAja.bonus_type = value;
                            setStateTrigger(!stateTrigger);
                        }}
                    />
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
                        {location.map((currItem, idx) => {
                            return (
                                <Grid key={`location__${idx}`} container>
                                    <Grid
                                        item
                                        xs={5}
                                        border="0.1vw solid rgba(0,0,0,0.1)"
                                        p="0.8vw"
                                    >
                                        <BodyCopy textTransform="uppercase">
                                            {currItem}
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
