

export interface IProgramBonus {
    bonus_type: string,
    location: string
    limit: number
    stock: number
    bucket: string
    qty_denom: string
    payment: string
    granular: string
    bid: string
    bonus_id: string
    bonus_name: string
}

export interface IProgramNotification {
    template: string,
    via: string
    notif_type: string
    template_content: string
}
export interface ICreateProgram {
    _id?: string,
    program_group:string,
    name: string,
    desc: string,
    start_period: Date,
    end_period: Date,
    point_type: string,
    program_mechanism: string,
    program_owner: string,
    program_owner_detail: string,
    keyword_registration: string,
    point_registration: string,
    whitelist_counter: boolean,
    logic: string,
    program_time_zone: string,
    program_parent: string,
    alarm_pic_type: string,
    alarm_pic: string[],
    threshold_alarm_expired: number,
    threshold_alarm_voucher: number,
    program_notification: Array<IProgramNotification>,
}

export interface IProgramItem {
    _id?: string,
    program_group:string,
    name: string,
    desc: string,
    start_period: Date,
    end_period: Date,
    point_type: string,
    program_mechanism: string,
    program_owner: string,
    program_owner_detail: string,
    keyword_registration: string,
    point_registration: string,
    whitelist_counter: boolean,
    logic: string,
    program_time_zone: string,
    program_parent: string,
    alarm_pic_type: string,
    alarm_pic: string[],
    threshold_alarm_expired: number,
    threshold_alarm_voucher: number,
    program_notification: Array<IProgramNotification>,
}

export interface IProgramList {
    data: Array<IProgramItem>
    total: number
}
export interface IFindProgram {
    data: ICreateProgram
}
