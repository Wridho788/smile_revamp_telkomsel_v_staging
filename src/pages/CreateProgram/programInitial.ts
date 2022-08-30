import {ICreateProgram, IFindProgram, IProgramItem, IProgramNotification, IProgramList} from "./interface";
import {DetailResponse, IData} from "../../redux/features/notification/interface";

export const ProgramNotificationInitial = [
    {
        template: "",
        via: "",
        notif_type: "",
        template_content: ""
    },
    {
        template: "",
        via: "",
        notif_type: "",
        template_content: ""
    },
]

export const CreateProgramInitial: ICreateProgram = {
    _id: "",
    program_group: "",
    name: "",
    desc: "",
    start_period: new Date,
    end_period: new Date,
    point_type: "",
    program_mechanism: "",
    program_owner: "",
    program_owner_detail: "",
    keyword_registration: "",
    whitelist_counter: true,
    logic: "",
    program_time_zone: "",
    program_parent: "",
    alarm_pic_type: "",
    alarm_pic: [],
    threshold_alarm_expired: 0,
    threshold_alarm_voucher: 0,
    program_notification: ProgramNotificationInitial
}

export const ProgramItemInitial: IProgramItem = {
    _id: "",
    program_group: "",
    name: "",
    desc: "",
    start_period: new Date,
    end_period: new Date,
    point_type: "",
    program_mechanism: "",
    program_owner: "",
    program_owner_detail: "",
    keyword_registration: "",
    whitelist_counter: true,
    logic: "",
    program_time_zone: "",
    program_parent: "",
    alarm_pic_type: "",
    alarm_pic: [],
    threshold_alarm_expired: 0,
    threshold_alarm_voucher: 0,
    program_notification: ProgramNotificationInitial
}


export const ProgramListInitial: IProgramList = {
    data: [ProgramItemInitial],
    total: 0
}
export const ProgramDetailInitial: IFindProgram = {
    data: CreateProgramInitial,
}
export const NotificationTemplateInitial: IData = {
        _id: "",
        notif_type: "",
        notif_via: "",
        notif_content: "",
    }

export const notificationTemplateDetailInitial: DetailResponse = {
    data: NotificationTemplateInitial
}
