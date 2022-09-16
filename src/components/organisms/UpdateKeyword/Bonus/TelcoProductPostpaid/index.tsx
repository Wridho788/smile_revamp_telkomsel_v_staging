import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Stack, Grid } from "@mui/material";

import {
    BodyCopy,
    OutlinedTextField, Select,
    SmallCopy,
    Subtitle
} from "../../../../atoms";

import {
    IUpdateKeyword
} from "../../interfaces";

import { FilterInitial } from "../../../../../redux/utils/initial-general";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
    KeywordBonusTelcoProductPostpaid
} from "../../initial";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";

interface INotificationTelcoProductPostpaidProps {
    bonusType: string;
    bonusTypeId: any;
    keywordCreateState: IUpdateKeyword;
    keywordCreate: IUpdateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationTelcoProductPostpaid: React.FunctionComponent<INotificationTelcoProductPostpaidProps> = ({
   bonusType,
   bonusTypeId,
   keywordCreateState,
   keywordCreate,
   stateTrigger,
   setStateTrigger
}) => {
    const { data: locationOptions = { data: [] } } =
        useLocationTemplateQuery(FilterInitial);

    const options: any = [
        { _id: 'True', set_value: 'True' },
        { _id: 'False', set_value: 'False' }
    ]
    const [index, setIndex] = useState<number>(-1);

    // TODO: Get Auction Notification
    useEffect(() => {
        // Initial Keyword Telco Product Postpaid
        const index = keywordCreate.bonus.findIndex(({ bonus_type }) => bonus_type === 'Telco Product Postpaid');

        if (index === -1) {
            keywordCreate.bonus.push(KeywordBonusTelcoProductPostpaid);
            setIndex(keywordCreate.bonus.findIndex(({ bonus_type }) => bonus_type === 'Telco Product Postpaid'));
        }
    }, []);

    return(
        <Accordion sx={{ p: "1vw" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Subtitle textTransform="uppercase">{bonusType}</Subtitle>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing="1vw" px="2vw" py="0.5vw">
                    <>
                        {index !== -1 && (<Stack spacing={4}>
                            <Stack spacing={2} direction="row">
                                <OutlinedTextField
                                    direction="column"
                                    label="Product Name"
                                    variant="outlined"
                                    value={keywordCreate.bonus[index]["telco_post_product_name"]}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index]["telco_post_product_name"] = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                                <OutlinedTextField
                                    type="number"
                                    direction="column"
                                    label="BID"
                                    variant="outlined"
                                    value={keywordCreate.bonus[index]["telco_post_bid"]}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index]["telco_post_bid"] = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2}>
                                <Select
                                    direction="column"
                                    label="External API Configuration"
                                    placeholder="Option"
                                    options={options}
                                    value={keywordCreateState.bonus[index]
                                        .telco_post_api_config}
                                    handleChange={(value: string) => {
                                        keywordCreateState.bonus[index]
                                            .telco_post_api_config = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Stack>
                            <Stack spacing={2}>
                                <Subtitle color="warning.main">STOCK PER LOCATION MANAGEMENT</Subtitle>
                                {keywordCreate.bonus[index].stock_location.map((location: any, idx: any) => {
                                    const locationName = locationOptions.data.find(
                                        (e) => e["_id"] === location.location_id
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
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                    value={keywordCreate.bonus[index].stock_location[
                                                        idx
                                                        ].stock.toString()}
                                                    handleChange={(value: number) => {
                                                        keywordCreate.bonus[index].stock_location[idx].stock =
                                                            Number(value);
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
                        </Stack>)}
                    </>
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default NotificationTelcoProductPostpaid;