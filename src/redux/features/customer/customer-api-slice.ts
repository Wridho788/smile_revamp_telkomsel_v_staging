import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IResponse} from "./interface";
import {IParams} from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL

export const customerSlice = createApi({
    reducerPath: 'customerApi',
    baseQuery: API_HEADER(baseUrl + '/customer'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: endpoint,
                    params: params
                }),
            });
        return {
            customerList: responseHandler(baseUrl + '/customer'),
            customerTierList: responseHandler('/tier'),
            customerBadgeList: responseHandler('/badge'),
            customerBrandList: responseHandler('/brand'),
        };
    },
});

export const {
    useCustomerListQuery,
    useCustomerTierListQuery,
    useCustomerBadgeListQuery,
    useCustomerBrandListQuery
} = customerSlice;
