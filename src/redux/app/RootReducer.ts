import { combineReducers } from "@reduxjs/toolkit";
import { lovSlice } from "../features/lov/lov-api-slice";
import { notificationSlice } from "../features/notification/notification-api-slice";
import { customerSlice } from "../features/customer/customer-api-slice";
import { programSlice } from "../features/program/program-api-slice";
import { locationSlice } from "../features/location/location-api-slice";
import { keywordSlice } from "../features/keyword/keyword-api-slice";
import { merchantSlice } from "../features/merchant/merchant-api-slice";
import { channelSlice } from "../features/channel/channel-api-slice";
import { accountSlice } from "../features/account/account-api-slice";
import { productSlice } from "../features/product/product-api-slice";
import { appConfigSlice } from "../features/app-config/app-config-api-slice";
import { partnerSlice } from "../features/partner/partner-api-slice";
import { outletSlice } from "../features/outlet/outlet-api-slice";
import { programPrimedtSlice } from "../features/program-primedt/program-primedt-api-slice";
import { uploadFIleSlice } from "../upload_file/upload-file-api-slice";
import { picSlice } from "../features/pic/pic-api-slice";
// Store
import auth from "../features/auth/auth-store-slice";

export const rootReducer = combineReducers({
	auth,
	[lovSlice.reducerPath]: lovSlice.reducer,
	[notificationSlice.reducerPath]: notificationSlice.reducer,
	[customerSlice.reducerPath]: customerSlice.reducer,
	[locationSlice.reducerPath]: locationSlice.reducer,
	[programSlice.reducerPath]: programSlice.reducer,
	[keywordSlice.reducerPath]: keywordSlice.reducer,
	[merchantSlice.reducerPath]: merchantSlice.reducer,
	[channelSlice.reducerPath]: channelSlice.reducer,
	[accountSlice.reducerPath]: accountSlice.reducer,
	[productSlice.reducerPath]: productSlice.reducer,
	[appConfigSlice.reducerPath]: appConfigSlice.reducer,
	[partnerSlice.reducerPath]: partnerSlice.reducer,
	[outletSlice.reducerPath]: outletSlice.reducer,
	[programPrimedtSlice.reducerPath]: programPrimedtSlice.reducer,
	[uploadFIleSlice.reducerPath]: uploadFIleSlice.reducer,
	[picSlice.reducerPath]: picSlice.reducer
});
