import {ICreateProgram, IFindProgram, IProgramItem, IProgramNotification} from "./interface";

export const ProgramNotificationInitial = [
    {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: ""
    },
    {
        notification: "",
        via: "",
        receiver: "",
        transaction_type: ""
    },
]

export const CreateProgramInitial: ICreateProgram = {
    name: "",
    desc: "",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    point_type: "",
    program_notification: ProgramNotificationInitial,
    program_mechanism: "",
    program_owner: "",
    program_owner_detail: "",
    logic: "",
    c_los_enable: false,
    c_los_value: 0,
    c_point_balance: 0,
    program_parent: "62f1436fbbdf15809f92c01c",
}

export const ProgramItemInitial: IProgramItem = {
    _id: "",
    name: "",
    start_period: new Date(),
    end_period: new Date(),
    point_type: "",
    program_mechanism: "",
    program_owner: "",
    logic: "",
    program_parent: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
    __v: 0,
    program_bonus: []
}
export const ProgramDetailInitial : IFindProgram= {
    data:CreateProgramInitial,
}

