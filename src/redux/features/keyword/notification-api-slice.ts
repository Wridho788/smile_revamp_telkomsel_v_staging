import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IResponse} from "./interface";
import {IParams} from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL

export const keywordSlice = createApi({
    reducerPath: 'keywordApi',
    baseQuery: API_HEADER(baseUrl + '/v1/keyword'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: endpoint,
                    params: params
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
                    url: endpoint,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                }),
            });
        const deleteHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; id: string }, string>({
                query: (id) => ({
                    url: endpoint + id + '/delete',
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            });
        return {
            // all function
            keywordList: responseHandler(baseUrl + '/v1/keyword'),
            keywordDelete: deleteHandler(baseUrl + '/v1/keyword'),
            keywordNotificationDelete: deleteHandler('/notification'),

            // action
            keywordActionList: responseHandler('/action'),
            keywordActionCreate: postHandler('/action'),
            keywordActionUpdate: putHandler('/action'),
            keywordActionDelete: deleteHandler('/action'),

            // core product
            keywordCoreProductList: responseHandler('/core_product'),
            keywordCoreProductCreate: postHandler('/core_product'),
            keywordCoreProductUpdate: putHandler('/core_product'),
            keywordCoreProductDelete: deleteHandler('/core_product'),

            //direct redeem
            keywordCoreDirectRedeemList: responseHandler('/direct_redeem'),
            keywordRedeemCreate: postHandler('/redeem'),
            keywordRedeemUpdate: putHandler('/redeem'),
            keywordRedeemDelete: deleteHandler('/redeem'),

            //donation
            keywordCoreDonationList: responseHandler('/donation'),

            keywordDonationCreate: postHandler('/donation'),
            keywordDonationUpdate: putHandler('/donation'),
            keywordDonationDelete: deleteHandler('/donation'),

            // general
            keywordGeneralList: responseHandler('/general'),
            keywordGeneralCreate: postHandler('/general'),
            keywordGeneralUpdate: putHandler('/general'),
            keywordGeneralDelete: deleteHandler('/general/'),

            //lucky draw
            keywordCoreLuckyDrawList: responseHandler('/lucky_draw'),
            keywordLuckyDrawCreate: postHandler('/lucky_draw'),
            keywordLuckyDrawUpdate: putHandler('/lucky_draw'),
            keywordLuckyDrawDelete: deleteHandler('/lucky_draw'),
        };
    },
});

export const {
    useKeywordListQuery,
    useLazyKeywordListQuery,
    useKeywordActionListQuery,
    useKeywordCoreProductListQuery,
    useKeywordDeleteMutation,
    useKeywordGeneralListQuery,
    useLazyKeywordGeneralListQuery,
    useKeywordGeneralDeleteMutation

} = keywordSlice;
