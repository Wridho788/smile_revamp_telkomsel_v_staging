import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IParams } from "../../utils/IGeneral";
import { IProductSelectBox } from "./interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const productSlice = createApi({
  reducerPath: "productApi",
  baseQuery: API_HEADER(baseUrl),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IProductSelectBox[], IParams>({
        query: (params: IParams) => ({
          url: endpoint,
          params: params,
        }),
      });
    return {
      productSelectBox: responseHandler("/product/selectbox"),
    };
  },
});

export const { useProductSelectBoxQuery } = productSlice;
