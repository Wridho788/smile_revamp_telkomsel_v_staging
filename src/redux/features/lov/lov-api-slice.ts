import {createApi} from "@reduxjs/toolkit/query/react";
import {API_HEADER} from "../../utils/header";
import {IParams} from "../../utils/IGeneral";
import {IData, IResponse} from "./interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const lovSlice = createApi({
    reducerPath: "lovApi",
    baseQuery: API_HEADER(baseUrl + "/v1/lov"),
    endpoints(builder) {
        const responseHandler = (endpoint: string, params?: string) =>
            builder.query<IResponse, number | void>({
                query() {
                    return endpoint;
                },
            });

        const detailHandler = (endpoint: string) =>
            builder.query<IData, string>({
                query: (_id: string) => ({
                    url: endpoint + _id + "/detail",
                }),
            });

        return {
            getLovList: builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: baseUrl + "/lov",
                    params: params,
                }),
            }),

            getBonusType: responseHandler("/bonus_type"),
            getCustomerType: responseHandler("/bonus_type"),
            getKeywordType: responseHandler("/keyword_type"),
            getLocationType: responseHandler("/location_type"),
            getMechanism: responseHandler("/mechanism"),
            getNotifVia: responseHandler("/notif_via"),
            getNotifType: responseHandler("/notif_type"),
            getNotifReceiver: responseHandler("/notif_receiver"),
            getPointType: responseHandler("/point_type"),
            getOwner: responseHandler("/owner"),
            getPointBalance: responseHandler("/c_point_balance"),
            getProgramType: responseHandler("/program_type"),
            getTransactionType: responseHandler("/transaction_type"),
            getProgramNotification: responseHandler("/program/notification"),
            getProgramExperience: responseHandler("/program/experience"),
            getDetailLov: detailHandler(baseUrl + "/v1/lov/"),
            getProgramGroup: responseHandler("/program/group?limit=1000&skip=0&filter=%7B%7D&sort=%7B%7D")
        };
    },
});

export const {
    useGetLovListQuery,
    useGetBonusTypeQuery,
    useGetCustomerTypeQuery,
    useGetKeywordTypeQuery,
    useGetLocationTypeQuery,
    useGetMechanismQuery,
    useGetNotifViaQuery,
    useGetNotifTypeQuery,
    useGetNotifReceiverQuery,
    useGetPointTypeQuery,
    useGetOwnerQuery,
    useGetPointBalanceQuery,
    useGetProgramTypeQuery,
    useGetTransactionTypeQuery,
    useGetProgramNotificationQuery,
    useGetProgramExperienceQuery,
    useGetDetailLovQuery,
    useLazyGetDetailLovQuery,
    useGetProgramGroupQuery
} = lovSlice;
