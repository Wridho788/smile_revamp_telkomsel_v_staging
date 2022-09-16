import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse } from "./interface";
import { IParams, IParamsPrime } from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const merchantSlice = createApi({
  reducerPath: "merchantApi",
  baseQuery: API_HEADER(baseUrl + "/v2/merchant"),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IResponse, IParamsPrime | IParams>({
        query: (params: IParamsPrime | IParams) => ({
          url: endpoint,
          params: params,
        }),
      });
    const importFileHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, FormData>({
        query: (body) => ({
          url: endpoint,
          method: "POST",
          body: body,
        }),
      });
    const postHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, any>({
        query: (body) => ({
          url: endpoint,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }),
      });
    const putHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, any>({
        query: (body) => ({
          url: endpoint + body["_id"] + "/edit",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }),
      });
    const putFileHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, FormData | any>({
        query: (body) => ({
          url: endpoint + "/" + body["_id"] + "/edit",
          method: "PUT",
          body: body,
        }),
      });
    const deleteHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; id: string }, string>({
        query: (id) => ({
          url: endpoint + "/" + id + "/delete",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      });
    return {
      merchantManagementList: responseHandler("/prime"),
      merchantBulkItem: responseHandler("/bulk/"),
      merchantPartnerList: responseHandler(baseUrl + "/v1/merchant-patner"),

      // post
      addMerchantManagement: postHandler("/"),
      addMerchantPartner: importFileHandler(baseUrl + "/v1/merchant-patner"),
      merchantOutletLink: postHandler(baseUrl + "/v1/merchant-outlet"),

      // put
      updateMerchantManagement: putHandler("/"),
      updateMerchantPartner: putFileHandler(baseUrl + "/v1/merchant-patner"),
      // delete
      deleteMerchantManagement: deleteHandler(""),
      deleteMerchantPartner: deleteHandler(baseUrl + "/v1/merchant-patner"),
    };
  },
});

export const {
  useMerchantManagementListQuery,
  useLazyMerchantPartnerListQuery,
  useLazyMerchantManagementListQuery,
  useMerchantOutletLinkMutation,
  useAddMerchantManagementMutation,
  useAddMerchantPartnerMutation,
  useUpdateMerchantPartnerMutation,
  useUpdateMerchantManagementMutation,
  useDeleteMerchantManagementMutation,
  useDeleteMerchantPartnerMutation,
} = merchantSlice;
