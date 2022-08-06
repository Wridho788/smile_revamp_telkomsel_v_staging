import {combineReducers} from "redux";
import { keywordReducer } from "./keywordReducer";

export const rootReducer = combineReducers({
    keyword: keywordReducer,
})

export type RootState = ReturnType<typeof rootReducer>;