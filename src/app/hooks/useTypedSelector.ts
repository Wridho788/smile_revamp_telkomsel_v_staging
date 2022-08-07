import {useSelector, TypedUseSelectorHook} from "react-redux";
import { RootState } from "../redux/Reducers/RootReducer";

export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;
