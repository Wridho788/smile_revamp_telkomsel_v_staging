import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IData, IProgramImportFile, IResponse } from "./interface";
import { IParamDetail, IParams } from "../../utils/IGeneral";
import { ICreateProgram } from "../../../pages/CreateProgram/interface";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const programSlice = createApi({
  reducerPath: "programApi",
  baseQuery: API_HEADER(baseUrl + "/v2/program"),
  tagTypes: ["Program"],
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IResponse, IParams>({
        query: (params: IParams) => ({
          url: endpoint,
          params: params,
        }),
        providesTags: ["Program"],
      });
    const detailHandler = (endpoint: string) =>
      builder.query<ICreateProgram, string>({
        query: (_id: string) => ({
          url: endpoint + _id + "/detail",
        }),
      });
    const approvalHandler = (endpoint: string) =>
      builder.mutation<any, string>({
        query: (_id: string) => ({
          url: `/${_id}/${endpoint}`,
          method: "PATCH",
        }),
        invalidatesTags: ["Program"],
      });
    const importFileHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, any>({
        query: (body) => ({
          url: endpoint,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data;application/json",
          },
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
      // get
      programList: responseHandler(baseUrl + "/v2/program"),
      programTempList: responseHandler("/temp_list"),
      programSegmentationList: responseHandler("/segmentation"),
      detailProgram: detailHandler(baseUrl + "/v2/program/"),
      approveProgram: approvalHandler("approve"),
      rejectProgram: approvalHandler("reject"),

      // import file
      importList: importFileHandler("/import_list"),

      // post
      createProgram: postHandler(baseUrl + "/v2/program"),

      // put
      updateProgram: putHandler(baseUrl + "/v2/program/"),

      // delete
      deleteProgram: deleteHandler(baseUrl + "/v2/program/"),
      deleteProgramTempList: deleteHandler(baseUrl + "/v2/program/temp_list/"),
    };
  },
});

export const {
  useProgramListQuery,
  useLazyProgramListQuery,
  useProgramTempListQuery,
  useLazyProgramTempListQuery,
  useCreateProgramMutation,
  useImportListMutation,
  useDeleteProgramMutation,
  useDeleteProgramTempListMutation,
  useDetailProgramQuery,
  useApproveProgramMutation,
  useRejectProgramMutation,
  useUpdateProgramMutation,
} = programSlice;
