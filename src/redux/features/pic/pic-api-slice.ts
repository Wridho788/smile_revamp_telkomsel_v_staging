import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse, IPm } from "./interface";
import { IParams, IParamsPrime } from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const picSlice = createApi({
    reducerPath: 'picApi',
    baseQuery: API_HEADER(baseUrl + '/v1/pic'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse | any, IParamsPrime | IParams>({
                query: (params: IParamsPrime | IParams) => ({
                    url: endpoint,
                    params: params
                }),
            });
        const detailHandler = (endpoint: string) =>
            builder.query<IPm, string>({
                query: (_id: string) => ({
                    url: endpoint + _id + "/detail",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            })
        const postHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; body: any }, any>({
                query: (body) => ({
                    url: endpoint,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                })
            });
        const putHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; body: any }, any>({
                query: (body) => ({
                    url: endpoint + body["_id"],
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: body,
                }),
            });
        const deleteHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; _id: string }, string>({
                query: (_id) => ({
                    url: endpoint + _id,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }),
            });
        return {
            picDetail: detailHandler(baseUrl + '/v1/pic'),
            // POST
            addPic: postHandler(baseUrl + '/v1/pic/'),
            // PUT 
            updatePic: putHandler(baseUrl + '/v1/pic/'),
            // Delete
            deletePic: deleteHandler(baseUrl + '/v1/pic/'),
            picTemplateForPrime: responseHandler("/prime"),
        };
    },
});

export const {
    usePicDetailQuery,
    usePicTemplateForPrimeQuery,
    // prime datatable
    useLazyPicTemplateForPrimeQuery,
    // put
    useUpdatePicMutation,

    //post
    useAddPicMutation,
    //delete
    useDeletePicMutation
} = picSlice;