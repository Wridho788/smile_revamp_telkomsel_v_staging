import {
    ICreateProgram,
    IMainInfo,
    INotification,
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
export const ProgramNotificationInitial: IProgramNotification =
    {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: ""
    }

export const ProgramSegmentationInitial: IProgramSegmentation =
    {
        customer_msisdn: "62e8bd5415a463e4709ab5a0",
        customer_tier: "62e8bd5415a463e4709ab5a0",
        customer_los_enable: true,
        customer_los_type: "string",
        customer_los_value: "string",
        customer_type: "62e8bd5415a463e4709ab5a0",
        customer_badges: "62e8bd5415a463e4709ab5a0",
        customer_location: "62e8bd5415a463e4709ab5a0",
        customer_brand: "62e8bd5415a463e4709ab5a0",
        customer_point_balance: 0,
        customer_preferences: "string",
        customer_ARPU: "string"
    }
export const ProgramPageDataInitial: IProgramPageData = {
    main_info: MainInfoInitial,
    segmentation : SegmentationInitial,
    notification: NotificationInitial,
}
export const CreateProgramInitial: ICreateProgram = {
    name: "",
    program: "",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    program_type: "",
    point_type: "",
    program_notification: [ProgramNotificationInitial],
    program_segmentation: [ProgramSegmentationInitial],
    program_mechanism: "",
    program_owner: "",
    program_owner_detail: "",
    logic: "",
    c_los_enable : false,
    c_los_value: 0,
    c_point_balance :0,
    program_parent: "62f1436fbbdf15809f92c01c",
}
