import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
    Subtitle,
} from "../../../../atoms";

import { ICreateKeyword } from "../../interfaces";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
             keywordCreate,
         }) => {

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

    return (
        <Accordion sx={{ p: "1vw" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Subtitle textTransform="uppercase">Voting</Subtitle>
            </AccordionSummary>
        </Accordion>
    );
};

export default NotificationVoting;
