import {
    ICreateProgram,
    IMainInfo,
    INotification,
    IProgramNotification,
    IProgramSegmentation
} from "../Interface/IProgram";
import {IProgramPageData} from "../Interface/IProgram";

const MainInfoInitial: IMainInfo = {
    program_type: [],
    point_type: [],
    mechanism: [],
    owner: [],
}

export const NotificationInitial: INotification = {
    via: [],
    type: [],
    template: [],
    transactionType: []
}
export const ProgramNotificationInitial: IProgramNotification =
    {
        notification: "Notification template id",
        via: "LOV NOTIF_VIA",
        receiver: "LOV NOTIF_RECEIVER",
        transaction_type: "LOV TRANSACTION_TYPE"
    }

export const ProgramSegmentationInitial: IProgramSegmentation =
    {
        customer_msisdn: "62e8bd5415a463e4709ab5a0",
        customer_tier: "62e8bd5415a463e4709ab5a0",
        customer_los_enable: true,
        customer_los_type: "string",
        customer_los_value: "string",
        customer_type: "62e8bd5415a463e4709ab5a0",
        customer_bedges: "62e8bd5415a463e4709ab5a0",
        customer_location: "62e8bd5415a463e4709ab5a0",
        customer_brand: "62e8bd5415a463e4709ab5a0",
        customer_point_balance: 0,
        customer_preferences: "string",
        customer_ARPU: "string"
    }
export const ProgramPageDataInitial: IProgramPageData = {
    main_info: MainInfoInitial,
    notification: NotificationInitial
}
export const CreateProgramInitial: ICreateProgram = {
    name: "PRG001",
    program: "This program description",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    point_type: "62e928517569a65dd3f50c50",
    program_notification: [ProgramNotificationInitial],
    program_segmentation: [ProgramSegmentationInitial],
    program_mechanism: "62e96b6ed390cec33fbc9941",
    program_owner: "62ebf2a43058d812df93ed47",
    logic: "Just type the program segmentation logic",
    program_parent: "62f1436fbbdf15809f92c01c"
}
