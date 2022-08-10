import {CreateProgramInitial, ProgramPageDataInitial} from "../Utils/InitialState/ProgramInitial";
import {ICreateProgramState, IProgramState} from "../Utils/Interface/IProgram";
import {ActionTypes, Types} from "../Types/Types";
import {ICreateKeywordState} from "../Utils/Interface/IKeyword";

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

const initialCreateProgramState: ICreateProgramState = {
    result: CreateProgramInitial,
    loading: false,
    error: null
}
export const CreateProgramdReducer = (state: ICreateProgramState = initialCreateProgramState, action: Types): ICreateProgramState => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: CreateProgramInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: CreateProgramInitial}
        default:
            return state;
    }
}
