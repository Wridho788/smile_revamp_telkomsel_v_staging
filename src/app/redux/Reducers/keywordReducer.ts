import {
    KeywordState,
    KeywordAction,
    KeywordActionTypes,
    KeywordPageData,
    MainInfo,
    Segmentation,
    Notification
} from "../Types/keyword"

const MainInfoInitial: MainInfo = {
    keyword_type: [],
    program_type: []
}

const SegmentationInitial: Segmentation = {
    keyword_type: [],
    program_type: []
}

const NotificationInitial: Notification = {
    keyword_type: [],
    program_type: []
}

export const KeywordPageDataInitial: KeywordPageData = {
    main_info : MainInfoInitial,
    segmentation :SegmentationInitial,
    notification: NotificationInitial

}
const initialState: KeywordState = {
    keywords: KeywordPageDataInitial,
    loading: false,
    error: null
}

export const keywordReducer = (state: KeywordState = initialState, action: KeywordAction): KeywordState => {
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