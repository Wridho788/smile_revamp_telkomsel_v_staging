interface IData {
    _id: string
    code: string
    ip: string
    name: string
    __v:number
}
export interface IResponse {
    data: Array<IData>
    total: number
}

