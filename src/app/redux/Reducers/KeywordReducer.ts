import {KeywordPageDataInitial} from "../Utils/InitialState/KeywordInitial";
import {IKeywordState} from "../Utils/Interface/IKeyword";
import {ActionTypes, Types} from "../Types/Types";

const initialState: IKeywordState = {
    keywords: KeywordPageDataInitial,
    loading: false,
    error: null
}

export const KeywordReducer = (state: IKeywordState = initialState, action: Types): IKeywordState => {
    switch (action.type) {
        case ActionTypes.FETCH_KEYWORDS:
            return {loading: true, error: null, keywords: KeywordPageDataInitial}
        case ActionTypes.FETCH_KEYWORDS_SUCCESS:
            return {loading: false, error: null, keywords: action.payload}
        case ActionTypes.FETCH_KEYWORDS_ERROR:
            return {loading: true, error: action.payload, keywords: KeywordPageDataInitial}
        default:
            return state;
    }
}
