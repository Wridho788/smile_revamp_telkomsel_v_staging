import {combineReducers} from "redux";
import {CreateKeywordReducer, KeywordReducer} from "./KeywordReducer";
import {DefaultListReducer} from "./DefaultListReducer";
import {CreateProgramdReducer, ProgramListReducer, ProgramReducer} from "./ProgramReducer";

export const rootReducer = combineReducers({
    keyword: KeywordReducer,
    createKeyword: CreateKeywordReducer,
    program:ProgramReducer,
    programList:ProgramListReducer,
    createProgram: CreateProgramdReducer,
    defaultList: DefaultListReducer
})

export type RootState = ReturnType<typeof rootReducer>;
