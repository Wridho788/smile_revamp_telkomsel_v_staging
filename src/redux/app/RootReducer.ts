import { combineReducers } from "@reduxjs/toolkit";
import { lovSlice } from "../features/lov/lov-api-slice";
import { notificationSlice } from "../features/notification/notification-api-slice";
import { customerSlice } from "../features/customer/customer-api-slice";
import { programSlice } from "../features/program/program-api-slice";
import { keywordSlice } from "../features/keyword/keyword-api-slice";
import { merchantSlice } from "../features/merchant/merchant-api-slice";
import { channelSlice } from "../features/channel/merchant-api-slice";
import { productSlice } from "../features/product/product-api-slice";
import { locationSlice } from "../features/location/location-api-slice";

export const rootReducer = combineReducers({
  [lovSlice.reducerPath]: lovSlice.reducer,
  [notificationSlice.reducerPath]: notificationSlice.reducer,
  [customerSlice.reducerPath]: customerSlice.reducer,
  [programSlice.reducerPath]: programSlice.reducer,
  [keywordSlice.reducerPath]: keywordSlice.reducer,
  [merchantSlice.reducerPath]: merchantSlice.reducer,
  [channelSlice.reducerPath]: channelSlice.reducer,
  [productSlice.reducerPath]: productSlice.reducer,
  [locationSlice.reducerPath]: locationSlice.reducer,
});
