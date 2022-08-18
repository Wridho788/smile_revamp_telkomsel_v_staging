interface  IBucket {
    __id:string
    location:string
    name: string
    balance:number
}
interface IData {
    _id: string
    name: string
    type: string
    bucket: Array<IBucket>
    __v:number
}
export interface IResponse {
    data: Array<IData>
    total: number
}

