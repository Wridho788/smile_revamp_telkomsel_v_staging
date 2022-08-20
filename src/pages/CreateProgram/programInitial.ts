import {ICreateProgram, IProgramItem, IProgramNotification} from "./interface";
import {IProgramSegmentation} from "../../app/redux/Utils/Interface/IProgram";


export const ProgramNotificationInitial: IProgramNotification =
    {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: ""
    }

export const ProgramSegmentationInitial: IProgramSegmentation =
    {
        customer_msisdn: "",
        customer_tier: "",
        customer_los_enable: false,
        customer_los_type: "",
        customer_los_value: "",
        customer_point_balance: 0,
        customer_type: "",
        customer_badges: "",
        customer_location: "",
        customer_brand: "",
        customer_preferences: "",
        customer_ARPU: ""
    }


export const CreateProgramInitial: ICreateProgram = {
    name: "",
    desc: "",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    point_type: "",
    program_notification: [ProgramNotificationInitial],
    program_mechanism: "",
    program_owner: "",
    program_owner_detail: "",
    logic: "",
    c_los_enable: false,
    c_los_value: 0,
    c_point_balance: 0,
    program_parent: "",
}
export const ProgramItemInitial: IProgramItem = {
    _id: "",
    name: "",
    start_period: new Date(),
    end_period: new Date(),
    point_type: "",
    program_mechanism: "",
    program_owner: "",
    logic: "",
    program_parent: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    __v: 0,
    program_bonus: []
}
