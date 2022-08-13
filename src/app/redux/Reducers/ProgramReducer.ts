import {
    CreateProgramInitial, ProgramItemInitial,
    ProgramListInitial,
    ProgramPageDataInitial
} from "../Utils/InitialState/ProgramInitial";
import {
    ICreateProgramReducer, IProgramDetailReducer,
    IProgramListReducer,
    IProgramReducer
} from "../Utils/Interface/IProgram";
import {ActionTypes, Types} from "../Types/Types";

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

const initialCreateProgramState: ICreateProgramReducer = {
    result: CreateProgramInitial,
    loading: false,
    error: null
}
export const CreateProgramdReducer = (state: ICreateProgramReducer = initialCreateProgramState, action: Types): ICreateProgramReducer => {
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
const initialProgramList: IProgramListReducer = {
    result: ProgramListInitial,
    loading: false,
    error: null
}
export const ProgramListReducer = (state: IProgramListReducer = initialProgramList, action: Types): IProgramListReducer => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: ProgramListInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: ProgramListInitial}
        default:
            return state;
    }
}
const initialProgramDetail: IProgramDetailReducer = {
    result: ProgramItemInitial,
    loading: false,
    error: null
}
export const ProgramDetailReducer = (state: IProgramDetailReducer = initialProgramDetail, action: Types): IProgramDetailReducer => {
    switch (action.type) {
        case ActionTypes.FETCH_DATA:
            return {loading: true, error: null, result: ProgramItemInitial}
        case ActionTypes.FETCH_DATA_SUCCESS:
            return {loading: false, error: null, result: action.payload}
        case ActionTypes.FETCH_DATA_ERROR:
            return {loading: true, error: action.payload, result: ProgramItemInitial}
        default:
            return state;
    }
}
