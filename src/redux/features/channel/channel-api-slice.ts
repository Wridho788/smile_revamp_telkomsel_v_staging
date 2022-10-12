import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IResponse } from "./interface";
import { IParams } from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const channelSlice = createApi({
  reducerPath: "channelApi",
  baseQuery: API_HEADER(baseUrl + "/channel"),
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IResponse, IParams>({
        query: (params: IParams) => ({
          url: endpoint,
          params: params,
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
      builder.mutation<{ success: boolean; id: number }, number>({
        query: (id) => ({
          url: endpoint + id + "/delete",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      });
    return {
      channelList: responseHandler(baseUrl + "/channel"),
      channelListPrime: responseHandler("/prime"),
      deleteChannel: deleteHandler(baseUrl + "/channel/"),
      createChannel: postHandler(baseUrl + "/channel"),
      updateChannel: putHandler(baseUrl + "/channel/")

    };
  },
});

export const {
  useChannelListQuery,
  useChannelListPrimeQuery,
  useLazyChannelListPrimeQuery,
  useLazyChannelListQuery,
  useDeleteChannelMutation,
  useCreateChannelMutation,
  useUpdateChannelMutation
} = channelSlice;
