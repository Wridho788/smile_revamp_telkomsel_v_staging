export interface IKeywordBonus {
    _id: string
    keyword: string
    bonus_type: string
    location:string
    limit: number
    stock: number
    bucket: string
    qty_denom: number
    payment: string
    granular: string
    bid: string
    bonus_id: string
    bonus_name: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    __v: number
    bonus_type_detail: any[]
    location_detail: any[],
    bucket_detail: any[]
}
export interface IDetail {
    name: string
    start_period: Date
    end_period: Date
    point_type: any[]
    point_value: string
    for_new_redeemer: boolean
    max_mode: string
    max_redeem_counter: number
    max_redeem_per_msisdn: number
    channel_validation: string[]
    merchandise_keyword: boolean
    merchant: string
    merchant_name: string
    telkomsel_los_type: string
    telkomsel_los_operator: string
    telkomsel_los_value: number
    telkomsel_los_range_min: number
    telkomsel_los_range_max: number
    enable_coorporate: boolean
    customer_tier: string[]
    "comment_approval": string
    "__v": 0
}
export interface IData {
    _id: string
    name: string,
    start_period: Date
    end_period: Date
    merchant:string
    merchant_name:string
    foreign_collection: string
    foreign_id: string
    keyword_approval: string
    created_at: Date
    updated_at: Date
    deleted_at: Date
    detail: IDetail
    "keyword_bonus": Array<IKeywordBonus>
    __v: 0
}
export interface IResponse {
    data: Array<IData>
    total: number
}

