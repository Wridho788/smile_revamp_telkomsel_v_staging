import React from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import OutlinedTextField from "../../components/atoms/OutlinedTextField";

const useApprovalService = () => {
	// Status Approval in Prime Datatable
	const StatusApprovalRender = (data: any) => {
		var approval_status_value: string = "";
		if (data.approval_log && data.approval_log.length > 0) {
			approval_status_value =
				data.approval_log[data.approval_log.length - 1].status[0].set_value;
		}

		if(data?.need_review_after_edit){
			if(data?.isHQ){
				return (
					<Alert severity="info" icon={false}>
						Waiting approval 2 <b>( HQ )</b>
						<br/> - Requested for Review after rejection
					</Alert>
				)
			}
			return (
				<Alert severity="info" icon={false}>
					Waiting approval 1 <b>( {data.created_by && data.created_by.superior_local?.first_name} )</b>
					<br/> - Requested for Review after rejection
				</Alert>
			)
		}

		return (
			<Box
				sx={{
					textAlign: "center",
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					alignContent: "center"
				}}
			>
				{/* Check if status is draft */}
				{data?.is_draft && (
					<Alert severity="error">
						DRAFT
					</Alert>
				)}

				{!data?.is_draft && data.approval_log && data.approval_log.length > 0 && (
					<>
						{approval_status_value === "Approved by Manager Non HQ" && (
							<Alert severity="warning" icon={false}>
								Approved by{" "}
								<b>
									{data.created_by &&
										data.created_by.superior_local?.first_name}
								</b>
								<br />
								<Typography variant={"body1"}>
									Waiting for Approver 2
									{/*<b>({data.created_by && data.created_by.superior_hq?.first_name})</b>*/}
								</Typography>
							</Alert>
						)}
						{approval_status_value === "Rejected by Manager Non HQ" && (
							<Alert severity="error" icon={false}>
								Rejected by{" "}
								<b>
									{data.created_by &&
										data.created_by.superior_local?.first_name}
								</b>
								{/*<br/> <Typography variant={"body1"}>Waiting for Approver*/}
								{/*1 <b>({data.created_by && data.created_by.superior_local?.first_name})</b></Typography>*/}
							</Alert>
						)}
						{approval_status_value === "Rejected by Manager HQ" && (
							<Alert severity="error" icon={false}>
								Rejected by{" "}
								<b>
									{data.created_by && data.created_by.superior_hq?.first_name}
								</b>
								{/*<br/>*/}
								{/*/!*<Typography variant={"body1"}>Waiting for Approver 2 <b>( HQ )</b>*!/*/}
								{/*/!*    /!*<b>({data.created_by && data.created_by.superior_hq?.first_name})</b>*!/*!/*/}
								{/*/!*</Typography>*!/*/}
							</Alert>
						)}
						{approval_status_value === "Approved by Manager HQ" && (
							<Alert severity="success">
								{/*<b>Approved by {data.created_by && data.created_by.superior_hq?.first_name}</b>*/}
								<b>Approved by Manager HQ</b>
							</Alert>
						)}
					</>
				)}

				{!data?.is_draft && data.approval_log && data.approval_log.length < 1 && (
					<>
						{!data.isHQ ? (
							<Alert severity="info" icon={false}>
								Waiting approval 1{" "}
								<b>
									{data.created_by &&
										data.created_by.superior_local?.first_name}
								</b>
								{/*<br/> <Typography variant={"body1"}>Program is <b>NEW</b></Typography>*/}
							</Alert>
						) : (
							<Alert severity="info" icon={false}>
								Waiting approval 2 <b>( HQ )</b>
								{/*2 <b>{data.created_by && data.created_by.superior_hq?.first_name}</b>*/}
								{/*<br/> <Typography variant={"body1"}>Program is <b>NEW</b></Typography>*/}
							</Alert>
						)}
					</>
				)}
			</Box>
		);
	};


	// Status Approval in Modal Detail
	const AlertApproveInfo = (data: any) => {
		var approval_status_value: string = "";
		var approval_reason_value: string = "";
		if (data.approval_log && data.approval_log.length > 0) {
			approval_status_value =
				data.approval_log[data.approval_log.length - 1].status[0].set_value;
			approval_reason_value =
				data.approval_log[data.approval_log.length - 1].reason;
		}
		return (
			<>
				{!data.isHQ && data.approval_log && data.approval_log.length < 1 && (
					<Alert sx={{ margin: 2 }} severity="error">
						Waiting for approval 1 ({data.created_by.superior_local?.first_name}
						) - <b>This Program is NEW</b>
					</Alert>
				)}
				{!data.isHQ && data.approval_log && data.approval_log.length > 0 && (
					<>
						{approval_status_value === "Rejected by Manager Non HQ" && (
							<Alert sx={{ margin: 2 }} severity="error">
								Waiting for approval 1 (
								{data.created_by.superior_local?.first_name}) -{" "}
								<b>This Program is {approval_status_value}</b>
								<br /> Approver Message :{" "}
								<b>
									{" "}
									{approval_reason_value ??
										"No Message Sent from Approver"}{" "}
								</b>
							</Alert>
						)}
						{/*{approval_status_value === "Approved by Manager Non HQ"&& (*/}
						{/*		<Alert sx={{ margin: 2 }} severity="error">*/}
						{/*			Waiting for approval 2 - {" "}*/}
						{/*			/!*({data.created_by.superior_hq?.first_name}) -{" "}*!/*/}
						{/*			<b>This Program is {approval_status_value}</b>*/}
						{/*			<br /> Approver Message :{" "}*/}
						{/*			<b>*/}
						{/*				{" "}*/}
						{/*				{approval_reason_value ??*/}
						{/*					"No Message Sent from Approver"}{" "}*/}
						{/*			</b>*/}
						{/*		</Alert>*/}
						{/*	)}*/}

						{approval_status_value === "Rejected by Manager HQ" && (
								<Alert sx={{ margin: 2 }} severity="error">
									Waiting for approval 1 - {" "}
									({data.created_by.superior_local?.first_name}) -{" "}
									<b>This Program is {approval_status_value}</b>
									<br /> Approver Message :{" "}
									<b>
										{" "}
										{approval_reason_value ??
											"No Message Sent from Approver"}{" "}
									</b>
								</Alert>
							)}

						{approval_status_value === "Approved by Manager Non HQ" && (
							<Alert sx={{ margin: 2 }} severity="success">
								Approved by {data.created_by.superior_local?.first_name} -{" "}
								<b>
									{" "}
									Waiting Approval from HQ
									{/*{data.created_by.superior_hq?.first_name}{" "}*/}
								</b>
								<br /> Approver 1 {data.created_by.superior_local?.first_name}{" "}
								Message :{" "}
								<b>
									{" "}
									{approval_reason_value ??
										"No Message Sent from Approver"}{" "}
								</b>
							</Alert>
						)}
						{approval_status_value === "Approved by Manager HQ" && (
							<Alert sx={{ margin: 2 }} severity="success">
								This Program is {approval_status_value}{" "}
								{/*<b>({data.created_by.superior_hq?.first_name})</b>*/}
								<br /> Approver Message :{" "}
								<b>
									{" "}
									{approval_reason_value ??
										"No Message Sent from Approver"}{" "}
								</b>
							</Alert>
						)}
					</>
				)}

				{/*  Untuk Data HQ  */}
				{data.isHQ && data.approval_log && data.approval_log.length < 1 && (
					<Alert sx={{ margin: 2 }} severity="error">
						Waiting for approval 2{/*<b>This Program is NEW</b>*/}
					</Alert>
				)}
				{data.isHQ && data.approval_log && data.approval_log.length > 0 && (
					<>
						{approval_status_value === "Rejected by Manager HQ" && (
							<Alert sx={{ margin: 2 }} severity="error">
								Waiting for approval 2 - {" "}
								{/*({data.created_by.superior_hq?.first_name}) -{" "}*/}
								<b>{" "} This Program is {approval_status_value}</b>
								<br /> Approver Message :{" "}
								<b>
									{" "}
									{approval_reason_value ??
										"No Message Sent from Approver"}{" "}
								</b>
							</Alert>
						)}
						{approval_status_value === "Approved by Manager HQ" && (
							<Alert sx={{ margin: 2 }} severity="success">
								This Program is {approval_status_value}{" "}
								{/*<b>({data.created_by.superior_hq?.first_name})</b>*/}
								<br /> Approver Message :{" "}
								<b>
									{" "}
									{approval_reason_value ??
										"No Message Sent from Approver"}{" "}
								</b>
							</Alert>
						)}
					</>
				)}
			</>
		);
	};

	// Logic before render Approval Section
	const CheckToRenderApprovalSection = (data:any, renderApproveSection:(a:any) => void, userLoginId:string, roleAccess:boolean) => {
		var approval_status_value: string = "";
		if (data.approval_log && data.approval_log.length > 0) {
			approval_status_value =
				data.approval_log[data.approval_log.length - 1].status[0].set_value;
		}
		if(data?.need_review_after_edit){
			if (!data.isHQ && data.created_by){
				if(userLoginId === data.created_by.superior_local?._id) {
					return (
						<>
							{renderApproveSection(
								`Hi, ${data.created_by.superior_local?.first_name}. We're happy to see you in, This program need your approval`
							)}
						</>
					);
				}else{
					return ""
				}
			}else{
				if (userLoginId !== data.created_by.superior_local?._id && roleAccess) {
					return (
						<>
							{renderApproveSection(
								`Hi, HQ Manager. We're happy to see you in, This program need your approvalo`
							)}
						</>
					);
				}
			}
		}
		else{
			if (
				(data.approval_log && data.approval_log.length > 0) &&
				approval_status_value === "Rejected by Manager HQ" || approval_status_value === "Rejected by Manager Non HQ"
			){
				return ""
			}
		}
		if (!data.isHQ && data.created_by) {
			if (userLoginId === data.created_by.superior_local?._id) {
				if (
					(data.approval_log && data.approval_log.length < 1) ||
					approval_status_value === "Rejected by Manager Non HQ"
				) {
					return (
						<>
							{renderApproveSection(
								`Hi, ${data.created_by.superior_local?.first_name}. We're happy to see you in, This program need your approval`
							)}
						</>
					);
				}
			}
			if (userLoginId !== data.created_by.superior_local?._id && roleAccess) {
				if (
					(data.approval_log &&
						data.approval_log.length > 1 &&
						approval_status_value === "Rejected by Manager HQ") ||
					approval_status_value === "Approved by Manager Non HQ"
				) {
					return (
						<>
							{renderApproveSection(
								`Hi, HQ Manager. We're happy to see you in, This program need your approval`
							)}
						</>
					);
				}
			}
		}

		if (data.isHQ && data.created_by) {
			if (userLoginId !== data.created_by.superior_local?._id && roleAccess) {
				if (
					(data.approval_log &&
						data.approval_log.length > 1 &&
						approval_status_value === "Rejected by Manager HQ") ||
					approval_status_value !== "Approved by Manager HQ"
				) {
					return (
						<>
							{renderApproveSection(
								`Hi, HQ Manager. We're happy to see you in, This program need your approval`
							)}
						</>
					);
				}
			}
		}
	};

	return {
		StatusApprovalRender,
		AlertApproveInfo,
		CheckToRenderApprovalSection

	};
};

export default useApprovalService;
