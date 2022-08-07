


import {IMainInfo, INotification, ISegmentation} from "../Interface/IProgram";
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

const SegmentationInitial: ISegmentation = {
    program_type: [],
    point_type: []
}

const NotificationInitial: INotification = {
    program_type: [],
    point_type: []
}

export const ProgramPageDataInitial: IProgramPageData = {
    main_info: MainInfoInitial,
    segmentation: SegmentationInitial,
    notification: NotificationInitial
}
