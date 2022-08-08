import {IMainInfo, INotification} from "../Interface/IProgram";
import {IProgramPageData} from "../Interface/IProgram";

const MainInfoInitial: IMainInfo = {
    program_type: [],
    point_type: [],
    mechanism: [],
    owner: [],
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
