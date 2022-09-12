import {IProgram} from "../../redux/features/program-primedt/interface";

export const ProgramInitial: IProgram = {
    name: "",
    desc: "",
    start_period: "",
    end_period: "",
    program_time_zone: "",
    threshold_alarm_expired: 0,
    threshold_alarm_voucher: 0,
    status: [],
}
