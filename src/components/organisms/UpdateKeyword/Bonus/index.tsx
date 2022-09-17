import * as React from "react";

import { Box, Chip, Stack } from "@mui/material";
import { Select } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import { UpdateKeywordGeneral, KeywordBonusHelper } from "../initial";
import { IUpdateKeyword, IKeywordBonusHelper } from "../interfaces";

import CancelIcon from "@mui/icons-material/Cancel";

import _without from "lodash/without";
import _find from "lodash/find";

// Sub Component of Bonus
import TelcoProductPostpaid from "./TelcoProductPostpaid";
import TelcoProductPrepaid from "./TelcoProductPrepaid";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = (props) => {
    const { data: bonusTypeOptions = { data: [] } } = useGetBonusTypeQuery();

    const keywordUpdate = UpdateKeywordGeneral;
    const [keywordUpdateState, setKeywordUpdateState] =
        React.useState<IUpdateKeyword>(keywordUpdate);

    let keywordBonusHelper = KeywordBonusHelper;
    const [keywordBonusHelperState, setKeywordBonusHelperState] =
        React.useState<IKeywordBonusHelper>(keywordBonusHelper);

    const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

    React.useEffect(() => {
        setKeywordUpdateState(keywordUpdate);
    }, [keywordUpdate, stateTrigger]);

    React.useEffect(() => {
        // Filter Condition for Bonus / Notification
        keywordUpdate.bonus = keywordUpdate.bonus.filter((item) => {
            if (keywordBonusHelper.bonus_type.includes(item.bonus_type)) {
                return item;
            }
        });

        setKeywordBonusHelperState(keywordBonusHelper);
    }, [keywordBonusHelper, stateTrigger]);

    React.useEffect(() => {
        let list: any = [];

        keywordBonusHelper.bonus_type.map((type: string) => {
            list.push(
                _find(bonusTypeOptions.data, ({ template }) => template === type)?._id
            );
        });

        keywordUpdate.notification = keywordUpdate.notification.filter(
            (item, i) => list.includes(keywordUpdate.notification[i].bonus_type_id) || item.bonus_type_id === '');

        setKeywordUpdateState(keywordUpdate);
    }, [keywordBonusHelperState.bonus_type]);

    React.useEffect(() => {
        console.log(keywordUpdate);
    }, [keywordUpdate, stateTrigger]);

    return (
        <Box display="flex" justifyContent="center" px="5%" py="1vw">
            <Stack spacing="2vw" width="100%" px="4vw">
                <Select
                    multiple
                    direction="column"
                    label="Bonus Type"
                    placeholder="Option"
                    options={bonusTypeOptions.data}
                    optionValue="template"
                    renderValue={(selected: any) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value: any) => {
                                return (
                                    <Chip
                                        key={value}
                                        label={
                                            bonusTypeOptions.data.find(
                                                (e) => e["template"] === value
                                            )?.template
                                        }
                                        clickable
                                        deleteIcon={
                                            <CancelIcon
                                                onMouseDown={(event: any) => event.stopPropagation()}
                                            />
                                        }
                                        onDelete={(e) => {
                                            e.preventDefault();
                                            keywordBonusHelper.bonus_type = _without(
                                                [...keywordBonusHelper.bonus_type],
                                                value
                                            );
                                            setStateTrigger(!stateTrigger);
                                        }}
                                        onClick={() => console.log("clicked chip")}
                                    />
                                );
                            })}
                        </Box>
                    )}
                    value={keywordBonusHelperState.bonus_type}
                    handleChange={(value: Array<string>) => {
                        keywordBonusHelper.bonus_type = value;
                        setStateTrigger(!stateTrigger);
                    }}
                />
                <>
                    {keywordBonusHelperState.bonus_type.length > 0 &&
                        keywordBonusHelperState.bonus_type.map((bonusType: any, idx: any) => {
                            switch (bonusType) {
                                case "telco_postpaid":
                                    return (
                                        <Box key={`bonusType__${idx}`}>
                                            <TelcoProductPostpaid
                                                bonusType={bonusType}
                                                bonusTypeId={
                                                    _find(
                                                        bonusTypeOptions.data,
                                                        ({ template }) => template === bonusType
                                                    )?._id
                                                }
                                                keywordCreateState={keywordUpdateState}
                                                keywordCreate={keywordUpdate}
                                                stateTrigger={stateTrigger}
                                                setStateTrigger={setStateTrigger}
                                            />
                                        </Box>
                                    );
                                case "telco_prepaid":
                                    return (
                                        <Box key={`bonusType__${idx}`}>
                                            <TelcoProductPrepaid
                                                bonusType={bonusType}
                                                bonusTypeId={
                                                    _find(
                                                        bonusTypeOptions.data,
                                                        ({ template }) => template === bonusType
                                                    )?._id
                                                }
                                                keywordCreateState={keywordUpdateState}
                                                keywordCreate={keywordUpdate}
                                                stateTrigger={stateTrigger}
                                                setStateTrigger={setStateTrigger}
                                            />
                                        </Box>
                                    );
                            }
                        })}
                </>
            </Stack>
        </Box>
    );
};

export default Bonus;
