import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IKeywordNameExistingHandler, IResponse } from "./interface";
import { IParams } from "../../utils/IGeneral";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const keywordSlice = createApi({
  reducerPath: "keywordApi",
  baseQuery: API_HEADER(baseUrl + "/v2/keyword"),
  tagTypes: ["Keyword"],
  endpoints(builder) {
    const responseHandler = (endpoint: string) =>
      builder.query<IResponse, IParams>({
        query: (params: IParams) => ({
          url: endpoint,
          params: params,
        }),
        providesTags: ["Keyword"],
      });
    const detailHandler = (endpoint: string) =>
      builder.query<any, any>({
        query: (_id: string) => ({
          url: endpoint + _id + "/detail",
        }),
        providesTags: ["Keyword"],
      });
    const approvalHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, any>({
        query: (body) => ({
          url: `/${body._id}/${endpoint}`,
          method: "PATCH",
          params: { reason_approve: body.reason_approve },
        }),
        invalidatesTags: ["Keyword"],
      });
    const rejectionHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; body: any }, any>({
        query: (body) => ({
          url: `/${body._id}/${endpoint}`,
          method: "PATCH",
          params: { reason_reject: body.reason_reject },
        }),
        invalidatesTags: ["Keyword"],
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
    const putHandler = (
      endpoint: string,
      step: string = "",
      isId: boolean = false
    ) =>
      builder.mutation<{ success: boolean; body: any }, any>({
        query: (body) => ({
          url: isId ? endpoint + body["_id"] + step || "/edit" : endpoint,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }),
      });
    const deleteHandler = (endpoint: string) =>
      builder.mutation<{ success: boolean; id: string }, string>({
        query: (id) => ({
          url: endpoint + id + "/delete",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }),
        invalidatesTags: ["Keyword"],
      });
    const postImgHandler = () =>
      builder.mutation<{}, FormData>({
        query: (formData) => ({
          url: "/image-auction",
          method: "POST",
          body: formData,
        }),
      });
    const programHandler = () =>
      builder.query<any[], string>({
        query: (programId) => ({
          url: programId,
        }),
        providesTags: ["Keyword"],
      });

    const draftHandler = (endpoint: string) =>
      builder.mutation<
        { success: boolean; body: any },
        { _id: string; is_draft: boolean }
      >({
        query: (payload) => ({
          url: `${endpoint}${payload._id}/edit/draft`,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            is_draft: payload.is_draft,
          },
        }),
      });

    const keywordNameExistingHandler = (endpoint: string) =>
      builder.query<IKeywordNameExistingHandler, string>({
        query: (name: string) => `${endpoint}/${name}/check-existing`,
      });

    return {
      // all function
      keywordList: responseHandler(baseUrl + "/v1/keyword"),
      keywordDelete: deleteHandler(baseUrl + "/v1/keyword"),
      keywordNotificationDelete: deleteHandler("/notification"),
      keywordApprove: approvalHandler("approve"),
      keywordReject: rejectionHandler("reject"),
      keywordListPrime: responseHandler(baseUrl + "/v2/keyword"),

      // action
      keywordActionList: responseHandler("/action"),
      keywordActionCreate: postHandler("/action"),
      keywordActionUpdate: putHandler("/action"),
      keywordActionDelete: deleteHandler("/action"),

      // core product
      keywordCoreProductList: responseHandler("/core_product"),
      keywordCoreProductCreate: postHandler("/core_product"),
      keywordCoreProductUpdate: putHandler("/core_product"),
      keywordCoreProductDelete: deleteHandler("/core_product"),

      // direct redeem
      keywordCoreDirectRedeemList: responseHandler("/direct_redeem"),
      keywordRedeemCreate: postHandler("/redeem"),
      keywordRedeemUpdate: putHandler("/redeem"),
      keywordRedeemDelete: deleteHandler("/redeem"),

      // donation
      keywordCoreDonationList: responseHandler("/donation"),

      keywordDonationCreate: postHandler("/donation"),
      keywordDonationUpdate: putHandler("/donation"),
      keywordDonationDelete: deleteHandler("/donation"),

      // general
      keywordGeneralList: responseHandler("/general"),
      keywordGeneralDelete: deleteHandler("/general/"),
      keywordGeneralCreate: postHandler(baseUrl + "/v1/keyword"),
      keywordGeneralUpdate: putHandler(baseUrl + "/v1/keyword/", "/edit"),
      keywordGeneralDetail: detailHandler(baseUrl + "/v1/keyword/"),
      keywordNameExisting: keywordNameExistingHandler(baseUrl + "/v2/keyword"),

      // lucky draw
      keywordCoreLuckyDrawList: responseHandler("/lucky_draw"),
      keywordLuckyDrawCreate: postHandler("/lucky_draw"),
      keywordLuckyDrawUpdate: putHandler("/lucky_draw"),
      keywordLuckyDrawDelete: deleteHandler("/lucky_draw"),

      // post : image/file
      keywordUploadAuction: postImgHandler(),

      // program detail
      keywordProgramDetail: programHandler(),

      // Draft
      draftKeyword: draftHandler(`${baseUrl}/v2/keyword/`),
    };
  },
});

export const {
  useKeywordListQuery,
  useLazyKeywordListQuery,
  useLazyKeywordListPrimeQuery,
  useKeywordApproveMutation,
  useKeywordRejectMutation,
  useKeywordActionListQuery,
  useKeywordCoreProductListQuery,
  useKeywordDeleteMutation,
  useKeywordGeneralListQuery,
  useLazyKeywordGeneralListQuery,
  useKeywordGeneralDeleteMutation,
  useKeywordGeneralCreateMutation,
  useKeywordGeneralUpdateMutation,
  useKeywordUploadAuctionMutation,
  useKeywordGeneralDetailQuery,
  useLazyKeywordGeneralDetailQuery,
  useKeywordProgramDetailQuery,
  useDraftKeywordMutation,
  useKeywordNameExistingQuery,
  useLazyKeywordNameExistingQuery,
} = keywordSlice;
