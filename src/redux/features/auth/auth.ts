import {createApi} from '@reduxjs/toolkit/query/react';
import {API_HEADER} from "../../utils/header";
import {IAuthSignIn, IResponse} from "./interface";
import {IParams} from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL

export const authSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: API_HEADER(baseUrl + '/oauth'),
    endpoints(builder) {

        const postHandler = (endpoint: string) =>
            builder.mutation<{ success: boolean; body: IAuthSignIn }, any>({
                query: (body) => ({
                    url: endpoint,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                }),
            });
        return {
            signIn: postHandler( '/signin'),

        };
    },
});

export const {
    useSignInMutation,
} = authSlice;
