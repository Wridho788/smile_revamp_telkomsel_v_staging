import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const API_HEADER = (baseUrl: string) =>
    fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders(headers) {
            headers.set('authorization', `Bearer ${process.env.TOKEN}`);
            return headers;
        },
    })
