import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
    Subtitle,
} from "../../../../atoms";

import { ICreateKeyword } from "../../interfaces";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { KeywordBonusOther } from "../../initial";

interface INotificationOtherProps {
    bonusType: string;
    bonusTypeId: any;
    keywordCreateState: ICreateKeyword;
    keywordCreate: ICreateKeyword;
    stateTrigger: boolean;
    setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const NotificationOther: React.FunctionComponent<
    INotificationOtherProps
    > = ({
             keywordCreate,
         }) => {

    const [index, setIndex] = useState<number>(-1);

    useEffect(() => {
        // Initial Keyword Other
        const index = keywordCreate.bonus.findIndex(
            ({ bonus_type }) => bonus_type === "other"
        );

        if (index === -1) {
            keywordCreate.bonus.push(KeywordBonusOther);
            const bonusIdx = keywordCreate.bonus.findIndex(
                ({ bonus_type }) => bonus_type === "other"
            );
            setIndex(bonusIdx);
        }
    }, []);

    return (
        <Accordion sx={{ p: "1vw" }}>
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Subtitle textTransform="uppercase">Other</Subtitle>
            </AccordionSummary>
        </Accordion>
    );
};

export default NotificationOther;
