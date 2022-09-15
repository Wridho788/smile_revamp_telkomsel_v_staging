export interface IData {
    _id: string;
    name?: string;
    desc?: string;
    start_period?: string;
    end_period?: string;
    point_type?: string;
    program_approval?: string;
    program_mechanism?: string;
    program_owner?: string;
    logic?: string;
    c_los_enable?: string;
    c_los_value?: string;
    c_los_balance?: string;
    program_owner_detail?: string;
    createdAt?: string;
    deletedAt?: string;
    __v?: number;
    status: {
        _id: string;
        set_value: string;
    };
    program_notification?: any[];
    msisdn?: string;
}

export interface IResponse {
    data: any[];
    total?: number;
    totalRecords?: number;
}

export interface IPayload {
    payload: IResponse
}

export interface IProgramImportFile {
    file: any;
    type: string;
}
