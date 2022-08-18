import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IResponse} from "./interface";
import {IParams} from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL

export const locationSlice = createApi({
    reducerPath: 'locationApi',
    baseQuery: API_HEADER(baseUrl + '/location'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: endpoint,
                    params: params
                }),
            });
        return {
            locationTemplate: responseHandler( baseUrl + '/location'),
        };
    },
});

export const {
    useLocationTemplateQuery
} = locationSlice;
