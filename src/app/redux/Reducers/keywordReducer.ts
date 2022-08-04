import { KeywordState, KeywordAction, KeywordActionTypes } from "../Types/keyword"

const initialState: KeywordState = {
    keywords: [],
    loading: false,
    error: null
}
 
export const keywordReducer = (state: KeywordState = initialState, action: KeywordAction): KeywordState=> {
    switch(action.type){
        case KeywordActionTypes.FETCH_KEYWORDS:
            return {loading: true, error: null, keywords: []}
        case KeywordActionTypes.FETCH_KEYWORDS_SUCCESS:
            return {loading: false, error: null, keywords: action.payload}
        case KeywordActionTypes.FETCH_KEYWORDS_ERROR:
            return {loading: true, error: action.payload, keywords: []}
        default:
            return state;
    }
}