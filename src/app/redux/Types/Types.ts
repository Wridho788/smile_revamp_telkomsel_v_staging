import {IKeywordPageData} from "../Utils/Interface/IKeyword";


export enum ActionTypes {
    FETCH_KEYWORDS = 'FETCH_KEYWORDS',
    FETCH_KEYWORDS_SUCCESS = 'FETCH_KEYWORDS_SUCCESS',
    FETCH_KEYWORDS_ERROR = 'FETCH_KEYWORDS_ERROR'
}

interface IFetchKeywordsAction {
    type: ActionTypes.FETCH_KEYWORDS;
}

interface IFetchKeywordsSuccessAction {
    type: ActionTypes.FETCH_KEYWORDS_SUCCESS;
    payload: IKeywordPageData;
}

interface IFetchKEYWORDsErrorAction {
    type: ActionTypes.FETCH_KEYWORDS_ERROR;
    payload: string;
}

export type Types = IFetchKeywordsAction | IFetchKeywordsSuccessAction | IFetchKEYWORDsErrorAction;
