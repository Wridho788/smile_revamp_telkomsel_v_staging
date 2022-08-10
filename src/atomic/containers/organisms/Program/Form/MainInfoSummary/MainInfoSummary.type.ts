import {SetStateAction} from "react";

interface MainInfoSummaryProps{
    step:number,
    setStep: SetStateAction<any>,
    data:any,
    mainInfoSummaryInput:any,
    setMainInfoSummaryInput:any
}

export type {
    MainInfoSummaryProps
}
