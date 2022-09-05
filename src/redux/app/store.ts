import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./RootReducer";
import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import { lovSlice } from "../features/lov/lov-api-slice";
import { notificationSlice } from "../features/notification/notification-api-slice";
import { customerSlice } from "../features/customer/customer-api-slice";
import { programSlice } from "../features/program/program-api-slice";
import { keywordSlice } from "../features/keyword/keyword-api-slice";
import { merchantSlice } from "../features/merchant/merchant-api-slice";
import { channelSlice } from "../features/channel/channel-api-slice";
import { productSlice } from "../features/product/product-api-slice";
import { locationSlice } from "../features/location/location-api-slice";
import { appConfigSlice } from "../features/app-config/app-config-api-slice";
import { accountSlice } from "../features/account/account-api-slice";

export const listenerMiddleware = createListenerMiddleware();
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(
        lovSlice.middleware,
        notificationSlice.middleware,
        customerSlice.middleware,
        programSlice.middleware,
        keywordSlice.middleware,
        merchantSlice.middleware,
        channelSlice.middleware,
        accountSlice.middleware,
        productSlice.middleware,
        locationSlice.middleware,
        appConfigSlice.middleware
      ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
