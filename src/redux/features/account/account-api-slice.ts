import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IData, IProgramImportFile, IResponse} from "./interface";
import {IParamDetail, IParams} from "../../utils/IGeneral";
import {ICreateProgram} from "../../../pages/CreateProgram/interface";

const baseUrl = process.env.REACT_APP_BASE_URL

export const accountSlice = createApi({
    reducerPath: 'accountApi',
    baseQuery: API_HEADER(baseUrl + '/v1/account'),
    endpoints(builder) {

        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: endpoint,
                    params: params
                }),
            });
        const detailHandler = (endpoint: string) =>
            builder.query<ICreateProgram, string>({
                query: (_id:string) => ({
                    url: endpoint + _id + '/detail',
                }),
            });
        const postHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; body: any }, any>({
                query: (body) => ({
                    url: endpoint,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                }),
            });
        const putHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; body: any }, any>({
                query: (body) => ({
                    url: endpoint + body['_id'] + '/edit',
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                }),
            });
        const deleteHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; _id: string }, string>({
                query: (_id) => ({
                    url: endpoint + _id + '/delete',
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            });
        return {
            // get
            accountList: responseHandler(baseUrl + '/v1/account'),
            accountRole: responseHandler('/role'),
            // post

            // put

            // delete

        };
    },
});

export const {
    useLazyAccountListQuery,
    useLazyAccountRoleQuery
} = accountSlice;
