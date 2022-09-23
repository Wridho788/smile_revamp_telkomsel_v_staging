import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Stack,
    Box,
    Grid,
} from "@mui/material";
import {
    BodyCopy,
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
import LocationManagement from "../LocationManagement";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import { KeywordBonusLinkAja } from "../../initial";

interface INotificationLinkAjaProps {
    bonusType: string;
    keywordCreateState: ICreateKeyword;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const LinkAja: React.FunctionComponent<INotificationLinkAjaProps> = ({
   keywordCreateState,
   keywordCreate,
   stateTrigger,
   setStateTrigger,
}) => {
    const { data: locationOptions, isFetching } =
        useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

    const [index, setIndex] = useState<number>(-1);

    useEffect(() => {
        // Initial Keyword Bonus Link Aja
        const index = keywordCreate.bonus.findIndex(
            ({bonus_type}) => bonus_type === "link_aja"
        );

        if (index === -1) {
            keywordCreate.bonus.push(KeywordBonusLinkAja);
            const bonusIdx = keywordCreate.bonus.findIndex(
                ({ bonus_type }) => bonus_type === "link_aja"
            );
            setIndex(bonusIdx);

            if (locationOptions) {
                keywordCreateState.eligibility.locations.map((location) =>
                    keywordCreateState.bonus[bonusIdx].stock_location.push({
                        name: locationOptions.find((e: any) => e["_id"] === location).name,
                        location_id: location,
                        stock: 0,
                    })
                );

                setStateTrigger(!stateTrigger);
            }
        }
    }, [isFetching]);


    return (
        <Accordion sx={{p: "1vw"}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large"/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Subtitle textTransform="uppercase">Link Aja</Subtitle>
            </AccordionSummary>
            <AccordionDetails>
                {index !== -1 && (<Stack spacing="2vw" px="0.5vw">
                    <Box>
                        <Grid container columns={4} spacing={2}>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    direction="column"
                                    label="Nominal"
                                    variant="outlined"
                                    value={keywordCreate.bonus[index].nominal}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].nominal = value;
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
                                    value={keywordCreate.bonus[index].external_api_config}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].external_api_config = value;
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
                                    value={keywordCreate.bonus[index].location}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].location = value;
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
                                    value={keywordCreate.bonus[index].bucket}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].bucket = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Stack>
                        {/* Stock Location Management */}
                        {(locationOptions) && (
                            keywordCreateState.bonus[index].stock_location.map((location: any, idx: any) => {
                                return (
                                    <Grid key={`location__${idx}`} container>
                                        <Grid
                                            item
                                            xs={5}
                                            border="0.1vw solid rgba(0,0,0,0.1)"
                                            p="0.8vw"
                                        >
                                            <BodyCopy textTransform="uppercase">
                                                {location.name}
                                            </BodyCopy>
                                        </Grid>
                                        <Grid
                                            item
                                            xs={7}
                                            border="0.1vw solid rgba(0,0,0,0.1)"
                                            p="0.8vw"
                                        >
                                            <OutlinedTextField
                                                isRequired={false}
                                                type="number"
                                                variant="outlined"
                                                InputProps={{ inputProps: { min: 0 } }}
                                                value={keywordCreateState.bonus[index].stock_location[
                                                    idx
                                                    ].stock.toString()}
                                                handleChange={(value: number) => {
                                                    keywordCreateState.bonus[index].stock_location[idx].stock =
                                                        Number(value);
                                                    setStateTrigger(!stateTrigger);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                );
                            })
                        )}
                    </Stack>
                </Stack>)}
            </AccordionDetails>
        </Accordion>
    );
};

export default LinkAja;
