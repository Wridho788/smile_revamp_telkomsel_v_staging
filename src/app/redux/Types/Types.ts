import {IKeywordPageData} from "../Utils/Interface/IKeyword";


export enum ActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_ERROR = 'FETCH_DATA_ERROR'
}

interface IFetchKeywordsAction {
    type: ActionTypes.FETCH_DATA;
}

interface IFetchKeywordsSuccessAction {
    type: ActionTypes.FETCH_DATA_SUCCESS;
    payload: any;
}

interface IFetchKEYWORDsErrorAction {
    type: ActionTypes.FETCH_DATA_ERROR;
    payload: string;
}

export type Types = IFetchKeywordsAction | IFetchKeywordsSuccessAction | IFetchKEYWORDsErrorAction;
