import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

const TOKEN = localStorage.getItem('access_token')
export const API_HEADER = (baseUrl: string | undefined, isAuth:boolean = true) =>
    fetchBaseQuery({
        baseUrl: baseUrl,

        prepareHeaders(headers) {
            headers.set("accept", "*/*");
            if (isAuth) {
                headers.set("authorization", `Bearer ${TOKEN}`);
            }
            return headers;
        },
    });
