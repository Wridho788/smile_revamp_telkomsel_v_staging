export interface IResponse {
    data: any[];
    totalRecords: number
}

export interface IPm {
    _id: string;
    name: string;
    msisdn: string;
    email: string;
    created_by: ICreatedBy;
    created_at: string;
    updated_at: string;
    deleted_at: string;

}

export interface ICreatedBy {
    _id: string;
    user_id: string;
    user_name: string;
    first_name: string;
    last_name: string;
    job_title: string;
    job_level: string;
    phone: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
    _v: number;
    role_detail: IRoleDetail;
    account_location: IAccountLocation;
}

export interface IRoleDetail {
    _id: string;
    rode_id: string;
    name: string;
    status: string;
    desc: string;
    authorizes: any[]
}

export interface IAccountLocation {
    location: string;
    _v: string;
    location_detail: ILocationDetail
}

export interface ILocationDetail {
    code: string;
    name: string
}
