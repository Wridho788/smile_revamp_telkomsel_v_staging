export interface IMainInfo {
    keyword_type: any[]
    point_type: any[]
    mechanism: any[]
    owner: any[]
    c_point_balance: any[]
    c_los_enable: any[]
    los_type: any[]
}

export interface ISegmentation {
    keyword_type: any[]
    program_type: any[]
}

export interface INotification {
    keyword_type: any[]
    program_type: any[]
}

export interface IKeywordPageData {
    main_info: IMainInfo,
    segmentation: ISegmentation,
    notification: INotification
}

export interface IKeywordBonus {
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

export interface IKeywordNotification {
    notification: string,
    via: string
    receiver: number
    transaction_type: number
}

export interface ICreateKeyword {
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
    keyword_parent: string,
    keyword_bonus: IKeywordBonus,
    keyword_notification: IKeywordNotification,
    keyword_type:string
}
export interface IDefaultListResult {
    total: number,
    data: any[],
}


export interface IKeywordState {
    result: IKeywordPageData
    loading: boolean
    error: null | string
}

export interface IDefaultListState {
    result: IDefaultListResult
    loading: boolean
    error: null | string
}

export interface ICreateKeywordState {
    keywords: ICreateKeyword
    loading: boolean
    error: null | string
}

