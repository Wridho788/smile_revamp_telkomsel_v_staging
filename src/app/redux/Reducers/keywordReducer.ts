import {
   IKeywordState,
    ICreateKeywordState,
    KeywordAction,
    KeywordActionTypes,
    IKeywordPageData,
    IMainInfo,
    ISegmentation,
    INotification
} from "../Types/keyword"

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
    main_info : MainInfoInitial,
    segmentation :SegmentationInitial,
    notification: NotificationInitial

}
const initialState: IKeywordState = {
    keywords: KeywordPageDataInitial,
    loading: false,
    error: null
}

export const keywordReducer = (state: IKeywordState = initialState, action: KeywordAction): IKeywordState => {
    switch (action.type) {
        case KeywordActionTypes.FETCH_KEYWORDS:
            return {loading: true, error: null, keywords: KeywordPageDataInitial}
        case KeywordActionTypes.FETCH_KEYWORDS_SUCCESS:
            return {loading: false, error: null, keywords: action.payload}
        case KeywordActionTypes.FETCH_KEYWORDS_ERROR:
            return {loading: true, error: action.payload, keywords: KeywordPageDataInitial}
        default:
            return state;
    }
}