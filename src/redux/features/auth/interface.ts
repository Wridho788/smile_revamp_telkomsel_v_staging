export interface IData {
    access_token: string
    expires_in: number
    refresh_token: string
    token_type: string
}
export interface IResponse {
    data: Array<IData>
}
export interface IAuthSignIn {
    username:string
    password:string
    client_id:string
    client_secret:string
}
