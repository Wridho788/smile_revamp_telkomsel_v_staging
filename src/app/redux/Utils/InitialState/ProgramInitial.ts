// import {ICreateProgram} from "../../../../pages/CreateProgram/interface";
import {
    IFindProgram,
    IMainInfo,
    INotification, IProgramItem, IProgramList,
    ICreateProgram,
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
// export const CreateProgramInitial: ICreateProgram = {
//     _id: "",
//     name: "",
//     desc: "",
//     start_period: new Date,
//     end_period: new Date,
//     point_type: "",
//     program_experience: "",
//     program_mechanism: "",
//     program_owner: "",
//     program_owner_detail: "",
//     whitelist_counter: true,
//     logic: "",
//     program_time_zone: "",
//     program_parent: "",
//     alarm_pic_type: "",
//     alarm_pic: [],
//     threshold_alarm_expired: 0,
//     threshold_alarm_voucher: 0,
//     program_notification: []
// }
//
// export const ProgramItemInitial: IProgramItem = {
//     _id: "",
//     name: "",
//     desc: "",
//     start_period: new Date,
//     end_period: new Date,
//     point_type: "",
//     program_experience: "",
//     program_mechanism: "",
//     program_owner: "",
//     program_owner_detail: "",
//     whitelist_counter: true,
//     logic: "",
//     program_time_zone: "",
//     program_parent: "",
//     alarm_pic_type: "",
//     alarm_pic: [],
//     threshold_alarm_expired: 0,
//     threshold_alarm_voucher: 0,
//     program_notification: []
// }
// export const ProgramListInitial: IProgramList = {
//     data: [ProgramItemInitial],
//     total: 0
// }
// export const ProgramDetailInitial: IFindProgram = {
//     data: CreateProgramInitial,
// }
