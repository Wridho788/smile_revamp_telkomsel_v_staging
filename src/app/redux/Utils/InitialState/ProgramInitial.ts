import {IMainInfo, INotification} from "../Interface/IProgram";
import {IProgramPageData} from "../Interface/IProgram";

const MainInfoInitial: IMainInfo = {
    program_type:[],
    point_type:[],
    mechanism:[],
    owner:[],
    c_point_balance:[],
    c_los_enable:[],
    los_type:[],
}

export const NotificationInitial: INotification = {
    via: [],
    type: [],
    template: [],
    transactionType: []
}

export const ProgramPageDataInitial: IProgramPageData = {
    main_info: MainInfoInitial,
    notification: NotificationInitial
}
