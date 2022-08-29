import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse } from "./interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const appConfigSlice = createApi({
  reducerPath: "appConfigApi",
  baseQuery: API_HEADER(baseUrl),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<any[], void>({
        query: () => endpoint,
      });
    return {
      appConfig: responseHandler("/v1/configuration"),
    };
  },
});

export const { useAppConfigQuery } = appConfigSlice;
