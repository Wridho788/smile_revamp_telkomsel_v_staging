import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse, IData, DetailResponse } from "./interface";
import { IParams, IParamsPrime } from "../../utils/IGeneral";
import { ICreateProgram } from "../../../pages/CreateProgram/interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const notificationSlice = createApi({
  reducerPath: "notificationApi",
  baseQuery: API_HEADER(baseUrl + "/notification"),
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
      notificationTemplate: responseHandler("/template"),
      notificationTemplateDetail: detailHandler("/template/"),

      // POST
      addNotification: postHandler("/template"),

      // PUT
      updateNotification: putHandler("/template/"),

      // DELETE
      deleteNotification: deleteHandler("/template/"),
    };
  },
});

export const {
  useNotificationTemplateQuery,
  useNotificationTemplateDetailQuery,

  // lazy
  useLazyNotificationTemplateQuery,

  //   Post
  useAddNotificationMutation,

  // PUT
  useUpdateNotificationMutation,

  // Delete
  useDeleteNotificationMutation,
} = notificationSlice;
