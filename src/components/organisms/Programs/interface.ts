export interface IFilter {
    program_approval: {
        _id: string;
        name: string;
    };
    program_experience: {
        _id: string;
        name: string;
    };
}

export interface IProgramApproval {
    _id: string;
    group_name: string;
    set_value: string;
    created_by: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    __v: number;
}
