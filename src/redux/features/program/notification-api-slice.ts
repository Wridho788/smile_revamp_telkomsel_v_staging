import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IResponse} from "./interface";
import {IParams} from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL

export const programSlice = createApi({
    reducerPath: 'programApi',
    baseQuery: API_HEADER(baseUrl + '/program'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParams>({
                query: (params: IParams) => ({
                    url: endpoint,
                    params: params
                }),
            });
        return {
            programList: responseHandler( baseUrl +'/program'),
            programTempList: responseHandler( '/temp_list'),
            programSegmentationList: responseHandler( '/segmentation'),
            detailProgram: responseHandler( '/detail'),
        };
    },
});

export const {
    useProgramListQuery
} = programSlice;
