export interface IData {
    _id: string
    user_id:string
    first_name:string
    last_name:string
    job_title:string
    job_level:string
    phone:string
    name:string
}
export interface IResponse {
    data: Array<IData>
    total: number
}

export interface IProgramImportFile {
    file: any
    type: string
}
