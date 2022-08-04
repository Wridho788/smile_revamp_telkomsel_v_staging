export interface KeywordState {
    keywords: any[];
    loading: boolean;
    error: null | string;
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
    payload: any[];
}
interface FetchKEYWORDsErrorAction {
    type: KeywordActionTypes.FETCH_KEYWORDS_ERROR;
    payload: string;
}
export type KeywordAction = FetchKeywordsAction | FetchKeywordsSuccessAction | FetchKEYWORDsErrorAction;
