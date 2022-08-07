import {SetStateAction} from "react";

interface NotificationProps{
    step:number,
    setStep: SetStateAction<any>,
    notification: any,
    setNotification: SetStateAction<any>
}

export type {
    NotificationProps
}