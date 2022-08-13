import {IDefaultListState} from "../Utils/Interface/IKeyword";
import {ActionTypes, Types} from "../Types/Types";
import {DefaultListInitial} from "../Utils/InitialState/DefaultListInitial";

const initialState: IDefaultListState = {
    result: DefaultListInitial,
    loading: false,
    error: null
}

export const DefaultListReducer = (state: IDefaultListState = initialState, action: Types): IDefaultListState => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: DefaultListInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: DefaultListInitial}
        default:
            return state;
    }
}
