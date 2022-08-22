export interface IData {
    _id: string
    name: string
    desc: string
    start_period: string
    end_period: string
    point_type: string
    program_mechanism: string
    program_owner: string
    logic: string
    c_los_enable: string
    c_los_value: string
    c_los_balance: string
    program_owner_detail: string
    createdAt: string
    deletedAt: string
    __v:number
    program_notification : any[]
    msisdn?:string
}
export interface IResponse {
    data: Array<IData>
    total: number
}

export interface IProgramImportFile {
    file: any
    type: string
}
