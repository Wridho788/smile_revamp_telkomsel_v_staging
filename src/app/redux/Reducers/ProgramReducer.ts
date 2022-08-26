import {

    ProgramPageDataInitial
} from "../Utils/InitialState/ProgramInitial";
import {
    ICreateProgramReducer,
    IProgramListReducer,
    IProgramReducer
} from "../Utils/Interface/IProgram";
import {ActionTypes, Types} from "../Types/Types";
import {CreateProgramInitial, ProgramListInitial} from "../../../pages/CreateProgram/programInitial";

const initialState: IProgramReducer = {
    result: ProgramPageDataInitial,
    loading: false,
    error: null
}

export const ProgramReducer = (state: IProgramReducer = initialState, action: Types): IProgramReducer => {
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
