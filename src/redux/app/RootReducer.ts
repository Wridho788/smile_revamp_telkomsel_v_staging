import { combineReducers } from '@reduxjs/toolkit'
import {lovSlice} from "../features/lov/lov-api-slice";
import {notificationSlice} from "../features/notification/notification-api-slice";
import {customerSlice} from "../features/customer/customer-api-slice";

export const rootReducer = combineReducers({
    [lovSlice.reducerPath]: lovSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [customerSlice.reducerPath]: customerSlice.reducer,
})

