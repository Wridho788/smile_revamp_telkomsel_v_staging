export interface IMainInfo {
    program_type: any[]
    point_type: any[]
    mechanism: any[]
    owner: any[]
}


export interface INotification {
    via: any[]
    type: any[]
    template: any[]
    transactionType: any[]
}

export interface IProgramPageData {
    main_info: IMainInfo,
    notification: INotification
}

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
    notification: string,
    via: string
    receiver: number
    transaction_type: number
}

export interface ICreateProgram {
    name: string,
    start_period: string,
    end_period: string,
    max_redeem_per_msisdn: number,
    max_redeem_per_msisdn_type: number,
    max_redeem_per_msisdn_from: string,
    max_redeem_per_msisdn_to: string,
    channel_validation: string,
    telkomsel_los: boolean,
    telkomsel_los_value: number,
    enable_coorporate: boolean,
    customer_tier: string,
    point_type: string,
    comment_approval: string,
    status_approval: string,
    notification_type: string,
    Program_parent: string,
    Program_bonus: IProgramBonus,
    Program_notification: IProgramNotification,
    program_type:string
}
export interface IDefaultListResult {
    total: number,
    data: any[],
}


export interface IProgramState {
    result: IProgramPageData
    loading: boolean
    error: null | string
}

export interface IDefaultListState {
    result: IDefaultListResult
    loading: boolean
    error: null | string
}

export interface ICreateProgramState {
    Programs: ICreateProgram
    loading: boolean
    error: null | string
}


