import {combineReducers} from "redux";
import { KeywordReducer } from "./KeywordReducer";

export const rootReducer = combineReducers({
    keyword: KeywordReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
