<<<<<<< HEAD
import { createApi } from '@reduxjs/toolkit/query/react';
import { API_HEADER } from "../../utils/header";
import { IResponse } from "./interface";
// import { IParams } from "../../utils/IGeneral";
import { IParams, IParamsPrime } from "../../utils/IGeneral";

=======
import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse } from "./interface";
import { IParams } from "../../utils/IGeneral";
>>>>>>> develop

const baseUrl = process.env.REACT_APP_BASE_URL;

export const locationSlice = createApi({
<<<<<<< HEAD
    reducerPath: 'locationApi',
    baseQuery: API_HEADER(baseUrl + '/location'),
    endpoints(builder) {
        const responseHandler = (endpoint: string) =>
            builder.query<IResponse, IParamsPrime | IParams>({
                query: (params: IParamsPrime | IParams) => ({
                    url: endpoint,
                    params: params,
                }),
            });
        return {
            locationTemplate: responseHandler(baseUrl + '/location'),
            locationBucket: responseHandler('/bucket'),

            locationTemplateForPrime: responseHandler('/prime'),

        };
    },
});

export const {
    useLocationTemplateQuery,
    useLocationTemplateForPrimeQuery,
    useLazyLocationTemplateForPrimeQuery,
    useLocationBucketQuery
=======
  reducerPath: "locationApi",
  baseQuery: API_HEADER(baseUrl + "/location"),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IResponse, IParams>({
        query: (params: IParams) => ({
          url: endpoint,
          params: params,
        }),
      });
    return {
      locationTemplate: responseHandler(baseUrl + "/location"),
      locationBucket: responseHandler("/bucket"),
    };
  },
});

export const {
  useLocationTemplateQuery,
  useLazyLocationTemplateQuery,
  useLocationBucketQuery,
>>>>>>> develop
} = locationSlice;
