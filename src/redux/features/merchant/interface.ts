interface IData {
    _id: string
    partner_id: string
    partner_code: string
    company_name: string
    __v:number
}
export interface IResponse {
    data: Array<IData>
    total: number
}

