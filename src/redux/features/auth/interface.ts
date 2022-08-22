interface IData {
    _id: string
    username:string
    password:string
    token:string
    refresh_token:string
}
export interface IResponse {
    data: Array<IData>
    total: number
}
export interface IAuthSignIn {
    username:string
    password:string
    client_id:string
    client_secret:string
}
