import { configureStore } from '@reduxjs/toolkit';
import {rootReducer} from "./RootReducer";
import { createListenerMiddleware, addListener } from '@reduxjs/toolkit'

export const listenerMiddleware = createListenerMiddleware()
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
