import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IResponse, IData, DetailResponse} from "./interface";
import {IParams} from "../../utils/IGeneral";
import {ICreateProgram} from "../../../pages/CreateProgram/interface";

const baseUrl = process.env.REACT_APP_BASE_URL

export const notificationSlice = createApi({
    reducerPath: 'notificationApi',
    baseQuery: API_HEADER(baseUrl + '/notification'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: endpoint,
                    params: params,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            });
        const detailHandler = (endpoint: string) =>
            builder.query<IData, string>({
                query: (_id:string) => ({
                    url: endpoint + _id + '/detail',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            });
        return {
            notificationTemplate: responseHandler( '/template'),
            notificationTemplateDetail: detailHandler( '/template/'),
        };
    },
});

export const {
    useNotificationTemplateQuery,
    useNotificationTemplateDetailQuery
} = notificationSlice;
