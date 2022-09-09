import {createApi} from "@reduxjs/toolkit/query/react";
import {API_HEADER} from "../../utils/header";
import {IParams, IParamsPrime} from "../../utils/IGeneral";
import {IResponse} from "./interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const programPrimedtSlice = createApi({
    reducerPath: "programPrimedtApi",
    baseQuery: API_HEADER(baseUrl + "/v2/program"),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParamsPrime | IParams>({
                query: (params: IParamsPrime | IParams) => ({
                    url: endpoint,
                    params: params,
                }),
            });

        return {
            programPrimeList: responseHandler('/prime')
        }
    }
})

export const {
    useLazyProgramPrimeListQuery
} = programPrimedtSlice
