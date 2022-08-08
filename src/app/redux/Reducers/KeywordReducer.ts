import {KeywordPageDataInitial, CreateKeywordInitial} from "../Utils/InitialState/KeywordInitial";
import {IKeywordState, ICreateKeywordState} from "../Utils/Interface/IKeyword";
import {ActionTypes, Types} from "../Types/Types";

const initialState: IKeywordState = {
    result: KeywordPageDataInitial,
    loading: false,
    error: null
}

export const KeywordReducer = (state: IKeywordState = initialState, action: Types): IKeywordState => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: KeywordPageDataInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: KeywordPageDataInitial}
        default:
            return state;
    }
}

const initialCreateKeywordState: ICreateKeywordState = {
    result: CreateKeywordInitial,
    loading: false,
    error: null
}

export const CreateKeywordReducer = (state: ICreateKeywordState = initialCreateKeywordState, action: Types): ICreateKeywordState => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: CreateKeywordInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: CreateKeywordInitial}
        default:
            return state;
    }
}
