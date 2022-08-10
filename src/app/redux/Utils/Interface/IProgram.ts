export interface IMainInfo {
    program_type: any[]
    point_type: any[]
    mechanism: any[]
    owner: any[]
}


export interface INotification {
    notification: any[]
    via: any[]
    receiver: any[]
    transactionType: any[]
}

export interface ISegmentation {
    customer_msisdn: any,
    customer_tier: any
    customer_los_enable: any
    customer_los_type: any
    customer_los_value: any
    customer_type: any
    customer_badges: any
    customer_location: any
    customer_brand: any
    customer_point_balance: any
    customer_preferences: any
    customer_ARPU: any

}

export interface IProgramPageData {
    main_info: IMainInfo,
    segmentation: ISegmentation
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
    receiver: string
    transaction_type: string
}

export interface IProgramSegmentation {
    customer_msisdn: string
    customer_tier: string
    customer_los_enable: true
    customer_los_type: string
    customer_los_value: string
    customer_type: string
    customer_badges: string
    customer_location: string
    customer_brand: string
    customer_point_balance: number
    customer_preferences: string
    customer_ARPU: string
}

export interface ICreateProgram {
    name: string,
    program: string,
    start_period: string,
    end_period: string,
    program_type: string,
    point_type: string,
    program_notification: Array<IProgramNotification>,
    program_segmentation: Array<IProgramSegmentation>,
    program_mechanism: string,
    program_owner: string,
    program_owner_detail: string,
    logic: string,
    program_parent: string,
    c_los_enable: boolean,
    c_los_value: number,
    c_point_balance: number,

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
    result: ICreateProgram
    loading: boolean
    error: null | string
}


