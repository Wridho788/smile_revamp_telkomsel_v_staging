import {
	BaseQueryFn,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError
} from "@reduxjs/toolkit/dist/query/react";

// Interfaces
import { RootState } from "redux/app/store";
import { IData } from "redux/features/auth/interface";

// Mutations
import { AUTH_SET_TOKEN, AUTH_CLEAR } from "../features/auth/auth-store-slice";

// Swal
import Swal from "sweetalert2";

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

	const baseQueryWithReauth: BaseQueryFn<
		string | FetchArgs,
		unknown,
		FetchBaseQueryError
	> = async (args, api, extraOptions) => {
		let result = await baseQuery(args, api, extraOptions);

		// Refresh token
		if (result.error && result.error.status === 401) {
			const rootState = api.getState() as RootState;

			// // try to get a new token
			const refreshResult = await baseQuery(
				{
					url: `${process.env.REACT_APP_BASE_URL}/v1/oauth/refresh-token`,
					method: "POST",
					body: {
						locale: "id-ID",
						refresh_token: rootState.auth.refresh_token,
						client_id: process.env.REACT_APP_CLIENT_ID,
						client_secret: process.env.REACT_APP_CLIENT_SECRET
					}
				},
				api,
				extraOptions
			);

			if (refreshResult.data) {
				// Force type to "any"
				const _refreshResult = refreshResult?.data as any;

				// store the new token
				api.dispatch(AUTH_SET_TOKEN(_refreshResult?.payload as IData));

				// retry the initial query
				result = await baseQuery(args, api, extraOptions);
			} else {
				// Clear store
				api.dispatch(AUTH_CLEAR());

				// Show toast
				Swal.fire("Session Expired", "", "info");
			}
		}

		return result;
	};

	return baseQueryWithReauth;
};
