import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IProgramImportFile, IResponse} from "./interface";
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
        const importFileHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; body: any }, any>({
                query: (body) => ({
                    url: endpoint,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: body
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
        const deleteHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; id: number }, number>({
                query: (id) => ({
                    url: endpoint  + id + '/delete',
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }),
            });
        return {
            // get
            programList: responseHandler(baseUrl + '/program'),
            programTempList: responseHandler('/temp_list'),
            programSegmentationList: responseHandler('/segmentation'),
            detailProgram: responseHandler('/detail'),

            // import file
            importList: importFileHandler('/import_list'),

            // post
            createProgram: postHandler(baseUrl + '/program'),

            // delete
            deleteProgram: postHandler(baseUrl + '/program/'),

        };
    },
});

export const {
    useProgramListQuery,
    useProgramTempListQuery,
    useLazyProgramTempListQuery,
    useCreateProgramMutation,
    useImportListMutation,
    useDeleteProgramMutation
} = programSlice;
