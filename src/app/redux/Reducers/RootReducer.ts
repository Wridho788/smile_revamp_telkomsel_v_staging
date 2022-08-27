import {combineReducers} from "redux";
import {CreateKeywordReducer, KeywordReducer} from "./KeywordReducer";
import {DefaultListReducer} from "./DefaultListReducer";
import { ProgramReducer} from "./ProgramReducer";

export const rootReducer = combineReducers({
    keyword: KeywordReducer,
    createKeyword: CreateKeywordReducer,
    program:ProgramReducer,
    defaultList: DefaultListReducer
})

export type RootState = ReturnType<typeof rootReducer>;
