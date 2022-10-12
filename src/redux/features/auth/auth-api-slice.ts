import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IAuthSignIn, IData } from "./interface";
import omit from "lodash/omit";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const authSlice = createApi({
	reducerPath: "authApi",
	baseQuery: API_HEADER(baseUrl + "/v1/oauth", false),
	endpoints(builder) {
		const oauthLogin = () =>
			builder.mutation<any, void>({
				query: () => ({
					url: "https://api.developer.wegiv.co/gateway/v3.0/oauth/signin",
					method: "POST",
					body: {
						type: "client",
						client_id: process.env.REACT_APP_CLIENT_ID,
						client_secret: process.env.REACT_APP_CLIENT_SECRET
					}
				})
			});
		const postHandler = (endpoint: string) =>
			builder.mutation<any, any>({
				query: body => ({
					url: endpoint,
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${body?.coreToken}`
					},
					body: { ...omit(body, ["coreToken"]), type: "user" }
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
			oauthLogin: oauthLogin(),
			signIn: postHandler("/signin"),
			signOut: queryHandler("/signout")
		};
	}
});

export const { useSignInMutation, useSignOutQuery, useOauthLoginMutation } =
	authSlice;
