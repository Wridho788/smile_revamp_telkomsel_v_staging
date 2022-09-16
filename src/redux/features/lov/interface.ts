export interface IData {
    _id: string
    group_name?: string
    set_value?:string
    template?: string
    __v?:number
}
export interface IResponse {
    data: Array<IData>
    total: number
}

