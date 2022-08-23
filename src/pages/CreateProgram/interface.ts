

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

export interface ICreateProgram {
    _id?: string
    name: string,
    desc: string,
    start_period: string,
    end_period: string,
    point_type: string,
    program_notification: Array<IProgramNotification>,
    program_mechanism: string,
    program_owner: string,
    program_owner_detail: string,
    logic: string,
    program_parent: string,
    c_los_enable: boolean,
    c_los_value: number,
    c_point_balance: number,

}

export interface IProgramItem {
    _id: string
    name: string
    start_period: Date
    end_period: Date
    point_type: string
    program_mechanism: string
    program_owner: string
    logic: string
    program_parent: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    __v: 0,
    program_bonus: any[]
}


export interface IFindProgram {
    data: ICreateProgram
}
