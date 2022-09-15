export interface IResponse {
    data: Array<any>;
    total: number;
}

export interface IProgram {
    name: string;
    desc: string;
    start_period: string;
    end_period: string;
    program_time_zone: string;
    threshold_alarm_expired: number;
    threshold_alarm_voucher: number;
    status: any;
    approval_log: any;
}
