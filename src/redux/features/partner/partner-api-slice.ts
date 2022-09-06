import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse, IData, DetailResponse } from "./interface";
import { IParams, IParamsPrime } from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const partnerSlice = createApi({
  reducerPath: "notificationApi",
  baseQuery: API_HEADER(baseUrl + "/v2/partner"),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IResponse, IParams | IParamsPrime>({
        query: (params: IParams | IParamsPrime) => ({
          url: endpoint,
          params: params,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      });
    const detailHandler = (endpoint: string) =>
      builder.query<IData, string>({
        query: (_id: string) => ({
          url: endpoint + _id + "/detail",
          headers: {
            "Content-Type": "application/json",
          },
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
    const deleteHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; _id: string }, string>({
        query: (_id) => ({
          url: endpoint + _id + "/delete",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      });
    return {
      partnerList: responseHandler("/v2/partner"),

      // POST
      addPartner: postHandler("/v2/partner"),

      // PUT
      updatePartner: putHandler("/v2/partner/"),

      // DELETE
      deletePartner: deleteHandler("/v2/partner/"),
    };
  },
});

export const {
  usePartnerListQuery,

  // lazy
  useLazyPartnerListQuery,

  //   Post
  useAddPartnerMutation,

  // PUT
  useUpdatePartnerMutation,

  // Delete
  useDeletePartnerMutation,
} = partnerSlice;
