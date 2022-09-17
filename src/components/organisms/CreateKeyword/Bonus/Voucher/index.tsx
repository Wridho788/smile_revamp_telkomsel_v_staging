import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Stack,
    Box,
    Grid,
} from "@mui/material";
import {
    OutlinedTextField,
    Subtitle,
    ResponsiveDateTimePicker,
} from "../../../../atoms";
import {
    ICreateKeyword,
} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {BonusTypeVoucherInitial} from "./initial";
import SwitchCustom from "../../../../../atomic/components/atoms/Switch";
import LocationManagement from "../LocationManagement";

interface INotificationLuckyDrawProps {
    bonusType: string;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Voucher: React.FunctionComponent<INotificationLuckyDrawProps> = ({
                                                                           bonusType,
                                                                           keywordCreate,
                                                                           stateTrigger,
                                                                           setStateTrigger,
                                                                       }) => {
    const voucher = BonusTypeVoucherInitial
    const locations = keywordCreate.eligibility.locations
    const [switchState, setSwitchState] = useState<boolean>(false);
    const handleSwitch = () => {
        setSwitchState(!switchState)
        if (switchState) {
            voucher.exp_voucher = ""
        }
    }
    useEffect(() => {
        const index: number = keywordCreate.bonus.findIndex(
            ({bonus_type}) => bonus_type === "discount_voucher"
        );
        if (index === -1) {
            keywordCreate.bonus.push(voucher);
            locations.map((location) =>
                voucher.stock_location.push({
                    location_id: location,
                    stock: 0,
                }))
        }
    }, []);
    useEffect(() => {
        voucher.stock_location = []
        locations.map((location) => {
                voucher.stock_location.push({
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
                    <SwitchCustom checked={switchState} handleChange={handleSwitch} label={"By Date"}/>
                    <Box>
                        <Grid container columns={4} spacing={2}>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    type={"number"}
                                    disabled={switchState}
                                    direction="column"
                                    label="Voucher Expired Days After Redeem"
                                    variant="outlined"
                                    value={switchState ? "0" : voucher.exp_voucher}
                                    handleChange={(value: string) => {
                                        voucher.exp_voucher = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    direction="column"
                                    label="Voucher Type"
                                    variant="outlined"
                                    value={voucher.voucher_type}
                                    handleChange={(value: string) => {
                                        voucher.voucher_type = value;
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
                                    direction="column"
                                    label="Voucher Combination"
                                    variant="outlined"
                                    value={voucher.voucher_combination}
                                    handleChange={(value: string) => {
                                        voucher.voucher_combination = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} sx={{visibility: switchState ? "visible" : "hidden"}}>
                                <ResponsiveDateTimePicker
                                    direction={"column"}
                                    label="Start Period"
                                    placeholder="Start Period"
                                    value={voucher.exp_voucher}
                                    minDateTime={new Date()}
                                    handleChange={(value: any) => {
                                        voucher.exp_voucher = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Box>
                    <LocationManagement
                        initialName={voucher.stock_location}
                        stateTrigger={stateTrigger}
                        setStateTrigger={setStateTrigger}
                    />
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default Voucher;
