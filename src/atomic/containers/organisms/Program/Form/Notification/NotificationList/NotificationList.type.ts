import {SetStateAction} from "react";

interface NotificationListProps{
    data:any,
    setData: SetStateAction<any>,
    index:number
}

export type {
    NotificationListProps
}