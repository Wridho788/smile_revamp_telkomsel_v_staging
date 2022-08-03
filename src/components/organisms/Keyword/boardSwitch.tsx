import {FC} from "react";
import {Box, Button, Grid, IconButton} from "@mui/material";
import React from 'react';
import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import {SmallCopy} from "../../../components";
import Bonus from "./Bonus";
import MainInfo from "./MainInfo";
import Notification from "./Notification";
import Sumary from "./Sumary";


interface IBoardSwitch {
    intervalValue: number
}

const BoardSwitch: FC<IBoardSwitch> = ({intervalValue}: IBoardSwitch) => {
    const renderSwitch = () => {
        switch (intervalValue) {
            case 0 :
                return <MainInfo/>
            case 1 :
                return <Bonus/>
            case 2:
                return <Notification/>
            case 3:
                return <Sumary/>
        }
    }
    return (
        <>
            {renderSwitch()}
        </>

    )

};

export default BoardSwitch;
