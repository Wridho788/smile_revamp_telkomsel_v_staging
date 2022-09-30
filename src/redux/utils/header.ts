import {
    fetchBaseQuery,
    FetchBaseQueryMeta
} from "@reduxjs/toolkit/dist/query/react";

const TOKEN = localStorage.getItem('access_token');
export const API_HEADER = (baseUrl: string | undefined, isAuth: boolean = true) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders(headers) {
            headers.set("accept", "*/*");
            if (isAuth) {
                headers.set("authorization", `Bearer ${TOKEN}`);
            }
            return headers;
        },
    });

    // For While set "any"
    const baseQueryWithReauth: (args: any, api: any, extraOptions: any) => Promise<{ error: { status: number; data: unknown } | { status: "FETCH_ERROR"; data?: undefined; error: string } | { status: "PARSING_ERROR"; originalStatus: number; data: string; error: string } | { status: "CUSTOM_ERROR"; data?: unknown; error: string }; data?: undefined; meta?: FetchBaseQueryMeta } | { error?: undefined; data: unknown; meta?: FetchBaseQueryMeta }> = async (args, api, extraOptions) => {
        let result = await baseQuery(args, api, extraOptions);

        if (result.error && result.error.status === 401) {
            // For while set "any"
            const baseQueryRefresh: any = fetchBaseQuery({
                baseUrl: process.env.REACT_APP_BASE_URL,
                prepareHeaders(headers) {
                    headers.set("accept", "*/*");

                    return headers;
                }
            });

            const refresh = await baseQueryRefresh("/v1/oauth/refresh-token", api, extraOptions);
            console.log("Refresh", refresh)

            if (refresh?.data) {
                localStorage.setItem("access_token", refresh?.data.access_token);
                localStorage.setItem("refresh_token", refresh?.data.refresh_token);

                result = await baseQuery(args, api, extraOptions);
            } else {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
            }
        }

        return result;
    }

    return baseQueryWithReauth;
}