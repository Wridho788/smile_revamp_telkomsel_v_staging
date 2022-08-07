import {ProgramPageDataInitial} from "../Utils/InitialState/ProgramInitial";
import {IProgramState} from "../Utils/Interface/IProgram";
import {ActionTypes, Types} from "../Types/Types";

const initialState: IProgramState = {
    result: ProgramPageDataInitial,
    loading: false,
    error: null
}

export const ProgramReducer = (state: IProgramState = initialState, action: Types): IProgramState => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: ProgramPageDataInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: ProgramPageDataInitial}
        default:
            return state;
    }
}
