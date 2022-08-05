import {useSelector, TypedUseSelectorHook} from "react-redux";
import { RootState } from "../redux/Reducers/rootReducer";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;