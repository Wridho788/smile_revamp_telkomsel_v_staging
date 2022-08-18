interface IData {
    _id: string
    name: string
    description:string
    createdAt:Date
    updatedAt:Date
    deletedAt:Date
    __v:number
}
export interface IResponse {
    data: Array<IData>
    total: number
}

