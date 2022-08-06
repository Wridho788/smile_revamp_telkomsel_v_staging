import {IDefaultListState} from "../Utils/Interface/IKeyword";
import {ActionTypes, Types} from "../Types/Types";
import {IDefaultListInitial} from "../Utils/InitialState/DefaultListInitial";

const initialState: IDefaultListState = {
    result: IDefaultListInitial,
    loading: false,
    error: null
}

export const DefaultListReducer = (state: IDefaultListState = initialState, action: Types): IDefaultListState => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: IDefaultListInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: IDefaultListInitial}
        default:
            return state;
    }
}
