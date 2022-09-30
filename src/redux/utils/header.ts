import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta
} from "@reduxjs/toolkit/dist/query/react";

// Interfaces
import { RootState } from "redux/app/store";

export const API_HEADER = (
	baseUrl: string | undefined,
	isAuth: boolean = true
) => {
	const baseQuery = fetchBaseQuery({
		baseUrl: baseUrl,
		prepareHeaders(headers, { getState }) {
			const rootState = getState() as RootState;

			headers.set("accept", "*/*");

			if (isAuth) {
				headers.set("authorization", `Bearer ${rootState.auth.access_token}`);
			}

			return headers;
		}
	});

	// For While set "any"
	// const baseQueryWithReauth: (
	// 	args: any,
	// 	api: any,
	// 	extraOptions: any
	// ) => Promise<
	// 	| {
	// 			error:
	// 				| { status: number; data: unknown }
	// 				| { status: "FETCH_ERROR"; data?: undefined; error: string }
	// 				| {
	// 						status: "PARSING_ERROR";
	// 						originalStatus: number;
	// 						data: string;
	// 						error: string;
	// 				  }
	// 				| { status: "CUSTOM_ERROR"; data?: unknown; error: string };
	// 			data?: undefined;
	// 			meta?: FetchBaseQueryMeta;
	// 	  }
	// 	| { error?: undefined; data: unknown; meta?: FetchBaseQueryMeta }
	// > = async (args, api, extraOptions) => {
	// 	let result = await baseQuery(args, api, extraOptions);

	// 	if (result.error && result.error.status === 401) {
	// 		console.log("UNAUTHORIZED");
	// 		// const refreshResult = await baseQuery

	// 		// const refresh = baseQueryRefresh(
	// 		// 	"/oauth/refresh-token",
	// 		// 	api,
	// 		// 	extraOptions
	// 		// );

	// 		// if (refresh?.data) {
	// 		// 	localStorage.setItem("access_token", refresh?.data.access_token);
	// 		// 	localStorage.setItem("refresh_token", refresh?.data.refresh_token);

	// 		// 	result = await baseQuery(args, api, extraOptions);
	// 		// } else {
	// 		// 	localStorage.removeItem("access_token");
	// 		// 	localStorage.removeItem("refresh_token");
	// 		// }
	// 	}

	// 	return result;
	// };

	const baseQueryWithReauth: BaseQueryFn<
		string | FetchArgs,
		unknown,
		FetchBaseQueryError
	> = async (args, api, extraOptions) => {
		let result = await baseQuery(args, api, extraOptions);
		// if (result.error && result.error.status === 401) {
		// 	// try to get a new token
		// 	const refreshResult = await baseQuery("/refreshToken", api, extraOptions);
		// 	if (refreshResult.data) {
		// 		// store the new token
		// 		api.dispatch(tokenReceived(refreshResult.data));
		// 		// retry the initial query
		// 		result = await baseQuery(args, api, extraOptions);
		// 	} else {
		// 		api.dispatch(loggedOut());
		// 	}
		// }
		return result;
	};

	return baseQueryWithReauth;
};
