import { createApi } from "@reduxjs/toolkit/query/react";
import { API_HEADER } from "../../utils/header";
import { IData, IPayload, IProgramImportFile, IResponse } from "./interface";
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
					params: params
				}),
				providesTags: ["Program"]
			});
		const detailHandler = (endpoint: string) =>
			builder.query<ICreateProgram, string>({
				query: (_id: string) => ({
					url: endpoint + _id + "/detail"
				})
			});
		const approvalHandler = (endpoint: string) =>
			builder.mutation<{ success: boolean; body: any }, any>({
				query: body => ({
					url: `/${body._id}/${endpoint}`,
					method: "PATCH",
					params: { reason_approve: body.reason_approve }
				}),
				invalidatesTags: ["Program"]
			});
		const rejectionHandler = (endpoint: string) =>
			builder.mutation<{ success: boolean; body: any }, any>({
				query: body => ({
					url: `/${body._id}/${endpoint}`,
					method: "PATCH",
					params: { reason_reject: body.reason_reject }
				}),
				invalidatesTags: ["Program"]
			});
		const importFileHandler = (endpoint: string) =>
			builder.mutation<{ success: boolean; body: any }, any>({
				query: body => ({
					url: endpoint,
					method: "POST",
					body: body
				})
			});
		const postHandler = (endpoint: string) =>
			builder.mutation<{ success: boolean; body: any }, any>({
				query: body => ({
					url: endpoint,
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: body
				})
			});
		const putHandler = (
			endpoint: string,
			step: string = "",
			isId: boolean = true
		) =>
			builder.mutation<{ success: boolean; body: any }, any>({
				query: body => ({
					url: isId ? endpoint + body["_id"] + step || "/edit" : endpoint,
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: body
				})
			});
		const deleteHandler = (endpoint: string) =>
			builder.mutation<{ success: boolean; _id: string }, string>({
				query: _id => ({
					url: endpoint + _id + "/delete",
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
			});
		const draftHandler = (endpoint: string) =>
			builder.mutation<
				{ success: boolean; body: any },
				{ _id: string; is_draft: boolean }
			>({
				query: payload => ({
					url: `${endpoint}${payload._id}/edit/draft`,
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: {
						is_draft: payload.is_draft
					}
				})
			});
		return {
			// get
			programList: responseHandler(baseUrl + "/v2/program"),
			programTempList: responseHandler("/temp_list"),
			programSegmentationList: builder.query<IPayload, IParams>({
				query: (params: IParams) => ({
					url: "/segmentation",
					params: params
				})
			}),
			detailProgram: detailHandler(baseUrl + "/v2/program/"),
			approveProgram: approvalHandler("approve"),
			rejectProgram: rejectionHandler("reject"),

			// import file
			importList: importFileHandler("/segmentation"),

			// post
			createProgram: postHandler(baseUrl + "/v2/program"),
			createProgramSegmentationAdd: postHandler("/segmentation/add"),
			createPicManagement: postHandler(baseUrl + "/v1/pic"),

			// put
			updateProgram: putHandler(baseUrl + "/v2/program/"),
			updateProgramMainInfo: putHandler(
				baseUrl + "/v2/program/",
				"/edit/main-info"
			),
			updateProgramNotification: putHandler(
				baseUrl + "/v2/program/edit/notification",
				"",
				false
			),

			// delete
			deleteProgram: deleteHandler(baseUrl + "/v2/program/"),
			deleteProgramSegmentation: deleteHandler(
				baseUrl + "/v2/program/segmentation/"
			),

			// Draft
			draftProgram: draftHandler(`${baseUrl}/v2/program/`)
		};
	}
});

export const {
	useProgramListQuery,
	useLazyProgramListQuery,
	// useProgramTempListQuery,
	useLazyProgramTempListQuery,
	useCreateProgramMutation,
	useImportListMutation,
	useDeleteProgramMutation,
	useDeleteProgramSegmentationMutation,
	useDetailProgramQuery,
	useLazyDetailProgramQuery,
	useApproveProgramMutation,
	useRejectProgramMutation,
	useUpdateProgramMutation,
	useCreateProgramSegmentationAddMutation,
	useUpdateProgramMainInfoMutation,
	useUpdateProgramNotificationMutation,
	useLazyProgramSegmentationListQuery,
	useCreatePicManagementMutation,
	useDraftProgramMutation
} = programSlice;
