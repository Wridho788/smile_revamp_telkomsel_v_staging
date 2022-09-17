import {BaseQueryFn, createApi} from "@reduxjs/toolkit/query/react";
import axios, {AxiosError, AxiosRequestConfig} from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
        > =>
        async ({ url, method, data, params }) => {
            try {
                const result = await axios({ url: baseUrl + url, method, data, params })
                return { data: result.data }
            } catch (axiosError) {
                let err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }
export const uploadFIleSlice = createApi({
    reducerPath: "uploadFIleApi",
    baseQuery:  axiosBaseQuery({
        baseUrl: baseUrl + "/v2/program" ?? '',
    }),
    tagTypes: ["Program"],
    endpoints(builder) {
        return {
            uploadFileBulkDataSegmentation: builder.mutation({
                query: (body) => ({
                    url: '/segmentation',
                    method: 'post',
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: body
                }),
            }),
        };
    },
});

export const {
    useUploadFileBulkDataSegmentationMutation
} = uploadFIleSlice;
