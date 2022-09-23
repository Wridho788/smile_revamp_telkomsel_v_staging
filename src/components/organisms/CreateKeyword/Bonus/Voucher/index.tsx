import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    Stack,
    Box,
    Grid,
} from "@mui/material";
import {
    OutlinedTextField,
    Subtitle,
    ResponsiveDateTimePicker, BodyCopy,
} from "../../../../atoms";
import {
    ICreateKeyword,
} from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SwitchCustom from "../../../../../atomic/components/atoms/Switch";
import LocationManagement from "../LocationManagement";
import {useLocationTemplateQuery} from "../../../../../redux/features/location/location-api-slice";
import { KeywordBonusVoucher } from "../../initial";

interface INotificationVoucherProps {
    bonusType: string;
    keywordCreateState: ICreateKeyword;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Voucher: React.FunctionComponent<INotificationVoucherProps> = ({
  keywordCreateState,
  keywordCreate,
  stateTrigger,
  setStateTrigger,
}) => {
    const { data: locationOptions, isFetching } =
        useLocationTemplateQuery({ type: keywordCreate.eligibility.location_type });

    const [switchState, setSwitchState] = useState<boolean>(false);
    const handleSwitch = () => {
        setSwitchState(!switchState);
        if (switchState) {
            keywordCreate.bonus[index].exp_voucher = "";
        }
    }

    const [index, setIndex] = useState<number>(-1);

    useEffect(() => {
        // Initial Keyword Bonus Link Aja
        const index = keywordCreate.bonus.findIndex(
            ({bonus_type}) => bonus_type === "discount_voucher"
        );

        if (index === -1) {
            keywordCreate.bonus.push(KeywordBonusVoucher);
            const bonusIdx = keywordCreate.bonus.findIndex(
                ({ bonus_type }) => bonus_type === "discount_voucher"
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
                <Subtitle textTransform="uppercase">Voucher Discount</Subtitle>
            </AccordionSummary>
            <AccordionDetails>
                {index !== -1 && (<Stack spacing="2vw" px="0.5vw">
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
                                    value={switchState ? "0" : keywordCreate.bonus[index].exp_voucher}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].exp_voucher = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <OutlinedTextField
                                    direction="column"
                                    label="Voucher Type"
                                    variant="outlined"
                                    value={keywordCreate.bonus[index].voucher_type}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].voucher_type = value;
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
                                    value={keywordCreate.bonus[index].voucher_combination}
                                    handleChange={(value: string) => {
                                        keywordCreate.bonus[index].voucher_combination = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2} sx={{visibility: switchState ? "visible" : "hidden"}}>
                                <ResponsiveDateTimePicker
                                    direction={"column"}
                                    label="Start Period"
                                    placeholder="Start Period"
                                    value={keywordCreate.bonus[index].exp_voucher}
                                    minDateTime={new Date()}
                                    handleChange={(value: any) => {
                                        keywordCreate.bonus[index].exp_voucher = value;
                                        setStateTrigger(!stateTrigger);
                                    }}
                                />
                            </Grid>

                        </Grid>
                    </Box>

                    <Stack>
                        <Grid container>
                            <Grid
                                item
                                xs={5}
                                border="0.1vw solid rgba(0,0,0,0.1)"
                                p="0.8vw"
                            >
                                <BodyCopy
                                    align="center"
                                    textTransform="uppercase"
                                    fontWeight="bold"
                                >
                                    Location
                                </BodyCopy>
                            </Grid>
                            <Grid
                                item
                                xs={7}
                                border="0.1vw solid rgba(0,0,0,0.1)"
                                p="0.8vw"
                            >
                                <BodyCopy
                                    align="center"
                                    textTransform="uppercase"
                                    fontWeight="bold"
                                >
                                    Stock Per Location
                                </BodyCopy>
                            </Grid>
                        </Grid>

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

export default Voucher;
