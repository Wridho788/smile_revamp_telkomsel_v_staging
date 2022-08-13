import {combineReducers} from "redux";
import {CreateKeywordReducer, KeywordReducer} from "./KeywordReducer";
import {DefaultListReducer} from "./DefaultListReducer";
import {CreateProgramdReducer, ProgramDetailReducer, ProgramListReducer, ProgramReducer} from "./ProgramReducer";

export const rootReducer = combineReducers({
    keyword: KeywordReducer,
    createKeyword: CreateKeywordReducer,
    program:ProgramReducer,
    programList:ProgramListReducer,
    programDetail:ProgramDetailReducer,
    createProgram: CreateProgramdReducer,
    defaultList: DefaultListReducer
})

export type RootState = ReturnType<typeof rootReducer>;
