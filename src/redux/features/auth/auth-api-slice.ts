import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IAuthSignIn, IData } from "./interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authSlice = createApi({
	reducerPath: "authApi",
	baseQuery: API_HEADER(baseUrl + "/v1/oauth", false),
	endpoints(builder) {
		const postHandler = (endpoint: string) =>
			builder.mutation<{ success: IData; body: IAuthSignIn }, any>({
				query: body => ({
					url: endpoint,
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: body
				})
			});
		const queryHandler = (endpoint: string) =>
			builder.query<any, any>({
				query: () => ({
					url: endpoint,
					method: "POST"
				})
			});

		return {
			signIn: postHandler("/signin"),
			signOut: queryHandler("/signout")
		};
	}
});

export const { useSignInMutation, useSignOutQuery } = authSlice;
