import {IMainInfo, INotification, ISegmentation} from "../Interface/IKeyword";
import {IKeywordPageData} from "../Interface/IKeyword";

const MainInfoInitial: IMainInfo = {
    keyword_type:[],
    point_type:[],
    mechanism:[],
    owner:[],
    c_point_balance:[],
    c_los_enable:[],
    los_type:[],
}

const SegmentationInitial: ISegmentation = {
    keyword_type: [],
    program_type: []
}

const NotificationInitial: INotification = {
    keyword_type: [],
    program_type: []
}

export const KeywordPageDataInitial: IKeywordPageData = {
    main_info: MainInfoInitial,
    segmentation: SegmentationInitial,
    notification: NotificationInitial
}
