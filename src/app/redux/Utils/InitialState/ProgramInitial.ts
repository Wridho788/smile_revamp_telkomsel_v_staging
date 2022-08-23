import { ICreateProgram } from "../../../../pages/CreateProgram/interface";
import {
     IFindProgram,
    IMainInfo,
    INotification, IProgramItem, IProgramList,
    IProgramNotification,
    IProgramSegmentation, ISegmentation
} from "../Interface/IProgram";
import {IProgramPageData} from "../Interface/IProgram";

export const MainInfoInitial: IMainInfo = {
    program_type: [],
    point_type: [],
    mechanism: [],
    owner: [],
}

export const SegmentationInitial: ISegmentation = {
    customer_msisdn: [],
    customer_tier: [],
    customer_los_enable: [],
    customer_los_type: [],
    customer_los_value: [],
    customer_point_balance: [],
    customer_type: [],
    customer_badges: [],
    customer_location: [],
    customer_brand: [],
    customer_preferences: [],
    customer_ARPU: [],
}
export const NotificationInitial: INotification = {
    notification: [],
    via: [],
    receiver: [],
    transactionType: []
}
export const ProgramNotificationInitial = [
    {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: ""
    },
    {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: ""
    },
]

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
export const ProgramPageDataInitial: IProgramPageData = {
    main_info: MainInfoInitial,
    segmentation: SegmentationInitial,
    notification: NotificationInitial,
}
export const CreateProgramInitial: ICreateProgram = {
    _id: "",
    name: "",
    desc: "",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    point_type: "",
    program_notification: ProgramNotificationInitial,
    program_mechanism: "",
    program_owner: "",
    program_owner_detail: "",
    logic: "",
    c_los_enable: false,
    c_los_value: 0,
    c_point_balance: 0,
    program_parent: "62f1436fbbdf15809f92c01c",
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
export const ProgramListInitial : IProgramList= {
    data:[ProgramItemInitial],
    total:0
}
export const ProgramDetailInitial : IFindProgram= {
    data:CreateProgramInitial,
}
