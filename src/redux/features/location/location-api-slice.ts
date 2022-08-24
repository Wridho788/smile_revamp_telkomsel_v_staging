import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IParams } from "../../utils/IGeneral";
import { ILocation } from "./interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const locationSlice = createApi({
  reducerPath: "locationApi",
  baseQuery: API_HEADER(baseUrl),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<ILocation, IParams>({
        query: (params: IParams) => ({
          url: endpoint,
          params: params,
        }),
      });
    return {
      location: responseHandler("/location"),
    };
  },
});

export const { useLocationQuery } = locationSlice;
