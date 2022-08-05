
export interface MainInfo{
    keyword_type:any[]
    program_type:any[]
}
export interface Segmentation{
    keyword_type:any[]
    program_type:any[]
}
export interface Notification{
    keyword_type:any[]
    program_type:any[]
}
export interface KeywordPageData{
    main_info: MainInfo,
    segmentation : Segmentation,
    notification : Notification
}
export interface KeywordState {
    keywords: KeywordPageData
    loading: boolean
    error: null | string
} 
export enum KeywordActionTypes {
    FETCH_KEYWORDS = 'FETCH_KEYWORDS',
    FETCH_KEYWORDS_SUCCESS = 'FETCH_KEYWORDS_SUCCESS',
    FETCH_KEYWORDS_ERROR = 'FETCH_KEYWORDS_ERROR'
}
interface FetchKeywordsAction {
    type: KeywordActionTypes.FETCH_KEYWORDS;
}
interface FetchKeywordsSuccessAction {
    type: KeywordActionTypes.FETCH_KEYWORDS_SUCCESS;
    payload: KeywordPageData;
}
interface FetchKEYWORDsErrorAction {
    type: KeywordActionTypes.FETCH_KEYWORDS_ERROR;
    payload: string;
}
export type KeywordAction = FetchKeywordsAction | FetchKeywordsSuccessAction | FetchKEYWORDsErrorAction;
