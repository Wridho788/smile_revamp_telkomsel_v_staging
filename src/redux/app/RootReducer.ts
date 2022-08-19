import { combineReducers } from '@reduxjs/toolkit'
import {lovSlice} from "../features/lov/lov-api-slice";
import {notificationSlice} from "../features/notification/notification-api-slice";
import {customerSlice} from "../features/customer/customer-api-slice";
import {programSlice} from "../features/program/notification-api-slice";
import {locationSlice} from "../features/location/notification-api-slice";
import {keywordSlice} from "../features/keyword/notification-api-slice";

export const rootReducer = combineReducers({
    [lovSlice.reducerPath]: lovSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [customerSlice.reducerPath]: customerSlice.reducer,
    [locationSlice.reducerPath]: locationSlice.reducer,
    [programSlice.reducerPath]: programSlice.reducer,
    [keywordSlice.reducerPath]: keywordSlice.reducer,
})

