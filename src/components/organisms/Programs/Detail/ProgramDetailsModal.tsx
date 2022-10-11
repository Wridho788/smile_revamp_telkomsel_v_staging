import React, { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ModalCustom from "@mui/material/Modal";
import {
	Button,
	Grid,
	IconButton,
	Stack,
	Card,
	Typography,
	Chip,
	Alert,
	Divider,
	Paper
} from "@mui/material";
import {
	useApproveProgramMutation,
	useDetailProgramQuery,
	useDraftProgramMutation,
	useRejectProgramMutation
} from "../../../../redux/features/program/program-api-slice";
import { BodyCopy, H2 } from "../../../../components";
import { Edit, WarningAmber } from "@mui/icons-material";
import Moment from "moment";
import {
	useGetPointTypeQuery,
	useGetMechanismQuery,
	useGetLocationTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";
import Swal from "sweetalert2";
import { IProgramDetailsModalProps } from "../../../../atomic/components/atoms/Modal/Modal.type";
import Segmentation from "./Segmentation";
import OutlinedTextField from "../../../atoms/OutlinedTextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import moment from "moment";
import KeywordLink from "./KeywordLink";
import {
	useLocationLocRebaseQuery,
	useLocationRebaseMutation
} from "../../../../redux/features/location/location-api-slice";
import useApprovalService from "../../../../service/approval";
import {useNavigate} from "react-router-dom";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 800,
	bgcolor: "background.paper",
	height: "80vh",
	overflowX: "scroll",
	boxShadow: 24,
	p: 4
};

const fontContentTitle = {
	fontSize: 14,
	color: "#001A41",
	overflowWrap: "break-word"
};

const fontContentIcon = {
	fontSize: 14,
	color: "#001A41"
};

const fontContent = {
	fontSize: 12,
	overflowWrap: "break-word"
};

const ProgramDetailsModal: FC<IProgramDetailsModalProps> = ({
	open,
	handleClose,
	data,
	roleAccess,
	isHqLogin,
	refetchProgram,
	userLoginId
}) => {
	const router = useNavigate();
	const [approveProgram, { isLoading: isLoadingApprove }] =
		useApproveProgramMutation();
	const [rejectProgram, { isLoading: isLoadingReject }] =
		useRejectProgramMutation();

	const [reasonApproval, setReasonApproval] = useState("");

	let approveBody = {
		_id: data._id,
		reason_approve: reasonApproval
	};

	let rejectBody = {
		_id: data._id,
		reason_reject: reasonApproval
	};

	const { data: pointTypeOptions } = useGetPointTypeQuery();
	const { data: mechanismOptions } = useGetMechanismQuery();
	const { data: ownerOption } = useGetLocationTypeQuery();
	const [getOwnerDetail, { data: ownerDetailOption }] =
		useLocationRebaseMutation();

	const [draftProgram] = useDraftProgramMutation();

	const pointType = pointTypeOptions?.data.find(
		({ _id }: any) => _id === data.point_type
	);

	const mechanism = mechanismOptions?.data.find(
		({ _id }: any) => _id === data.program_mechanism
	);

	const owner = ownerOption?.data.find(
		({ _id }: any) => _id === data.program_owner
	);

	useEffect(() => {
		if (data?.program_owner) {
			getOwnerDetail({ type: data.program_owner });
		}
	}, [data.program_owner]);

	// Call Approval Service
	const { AlertApproveInfo, CheckToRenderApprovalSection } = useApprovalService();

	const approveHandler = async () => {
		approveProgram(approveBody).then((res: any) => {
			if (res?.error) {
				handleClose();
				Swal.fire(res.error.data.message, "Failed!", "warning");
			} else {
				if (res?.data.status === 200) {
					handleClose();
					Swal.fire(res?.data.message, "Approved", "success");

					if (refetchProgram) {
						refetchProgram();
					}
				}
			}
		});
	};

	const rejectHandler = async () => {
		rejectProgram(rejectBody).then((res: any) => {
			if (res?.error) {
				handleClose();
				Swal.fire(res.error.data.message, "Failed!", "warning");
			} else {
				if (res?.data.status === 200) {
					handleClose();
					Swal.fire(res?.data.message, "Rejected!", "success");

					if (refetchProgram) {
						refetchProgram();
					}
				}
			}
		});
	};

	const renderApproveSection = (text: string) => {
		return (
			<>
				{roleAccess && (
					<>
						<Stack
							spacing="2vw"
							ml="1vw"
							mr="1vw"
							sx={{backgroundColor: "#fff", borderRadius: 2}}
						>
							<Box>
								<Alert severity="success">{text}</Alert>
							</Box>
							<Stack direction="row" sx={{flex: 1}}>
								<OutlinedTextField
									isRequired={false}
									direction="column"
									label=""
									placeholder="Leave comment of your approval action ..."
									variant={"outlined"}
									value={reasonApproval}
									handleChange={setReasonApproval}
									multiline
									rows={3}
								/>
							</Stack>
							<Stack
								direction="row"
								sx={{
									justifyContent: "flex-end"
								}}
								spacing="1vw"
							>
								<Button
									disabled={isLoadingApprove || isLoadingReject}
									onClick={rejectHandler}
									variant={"contained"}
									color="error"
								>
									Reject
								</Button>
								<Button
									disabled={isLoadingApprove || isLoadingReject}
									onClick={approveHandler}
									variant={"contained"}
									color="success"
									sx={{color: "white"}}
								>
									Approve
								</Button>
							</Stack>
						</Stack>
					</>
				)
				}
			</>
		);
	};

	const checkToRenderApprovalSection = () => {
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
		}else{
			if (
				(data.approval_log && data.approval_log.length > 0) ||
				approval_status_value === "Rejected by ManagerHQ" || approval_status_value === "Rejected by Manager Non HQ"
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

	const onRemoveFromDraft = (): void => {
		Swal.fire({
			icon: "info",
			title: "Remove program from draft?",
			showDenyButton: true,
			confirmButtonText: `Yes`,
			denyButtonText: "No"
		}).then(res => {
			// Confirmed
			if (res.isConfirmed) {
				draftProgram({ _id: data?._id, is_draft: false }).then((res: any) => {
					if (res?.error) {
						Swal.fire(res.error.data.message, "", "warning");
					} else {
						if (res?.data.status === 200) {
							handleClose();

							Swal.fire("Program removed from draft", "", "success").then(
								() => {
									if (refetchProgram) {
										refetchProgram();
									}
								}
							);
						}
					}
				});
			}

			// Denied
			if (res.isDenied) {
				Swal.fire("Program not removed from draft", "", "info");
			}
		});
	};

	return (
		<ModalCustom
			keepMounted
			open={open}
			onClose={handleClose}
			aria-labelledby="keep-mounted-modal-title"
			aria-describedby="keep-mounted-modal-description"
			sx={{ overflow: "scroll" }}
		>
			<Box sx={style}>
				<Box px={2}>
					<H2
						onClick={() => {
							console.log(data.approval_log);
							console.log(userLoginId);
						}}
					>
						{data.name ?? "Title"}
					</H2>
					<BodyCopy>Program ID : {data["_id"] ?? "Description"}</BodyCopy>
				</Box>
				{/* Check if data is drafted */}
				{data?.is_draft ? (
					<>
						<Alert sx={{ margin: 2 }} severity="error">
							This program is stored as Draft, Click <b style={{cursor:'pointer'}} onClick={onRemoveFromDraft}>Here</b> to remove it from draft and request for Approval
						</Alert>
					</>
				) : (
					<>
						{/* TODO: Checking status "Approval" of Detail Program */}
						{AlertApproveInfo(data)}
						{/*{checkToRenderApprovalSection()}*/}
						{CheckToRenderApprovalSection(data, renderApproveSection, userLoginId, roleAccess)}
					</>
				)}

				<Grid sx={{ flexGrow: 1, marginTop: 3 }}>
					<Grid container mt={2}>
						<Grid item md={6} px={2}>
							<Stack direction="row" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									gutterBottom
									sx={fontContentTitle}
								>
									Program Main Information
								</Typography>
								{!roleAccess &&
									<IconButton
										// href={"/edit-program/main-info/".concat(data._id)}
										sx={fontContentIcon}
										onClick={() => {router("/edit-program/main-info/".concat(data._id))}}
									>
										<Edit sx={{fontSize: 14}}></Edit>
									</IconButton>
								}
							</Stack>

							<Stack direction="column" mt={1}>
								<Grid container columnSpacing={2} rowSpacing={2}>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Program Name</b>
										</Typography>
										<Typography sx={fontContent}>{data.name}</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Start Period</b>
										</Typography>
										<Typography sx={fontContent}>
											{Moment(data.start_period).format("YYYY-MM-DD")}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>End Period</b>
										</Typography>
										<Typography sx={fontContent}>
											{Moment(data.end_period).format("YYYY-MM-DD")}
										</Typography>
									</Grid>
									<Grid item zeroMinWidth xs={4}>
										<Typography sx={fontContent}>
											<b>Point Type</b>
										</Typography>
										<Typography sx={fontContent}>
											{pointType?.set_value}
										</Typography>
									</Grid>
									<Grid item xs={8}>
										<Typography sx={fontContent}>
											<b>Program Mechanism</b>
										</Typography>
										<Typography sx={fontContent}>
											{mechanism?.set_value}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Owner</b>
										</Typography>
										<Typography sx={fontContent}>{owner?.set_value}</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Owner Detail</b>
										</Typography>
										<Typography sx={fontContent}>
											{ownerDetailOption
												? ownerDetailOption.filter(
														(item: any) =>
															item["_id"] === data.program_owner_detail
												  ).length
													? ownerDetailOption.filter(
															(item: any) =>
																item["_id"] === data.program_owner_detail
													  )[0].name
													: "-"
												: "-"}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Time Zone</b>
										</Typography>
										<Typography sx={fontContent}>
											{data.program_time_zone}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Threshold Alarm Exp</b>
										</Typography>
										<Typography sx={fontContent}>
											{data.threshold_alarm_expired}
										</Typography>
									</Grid>
									<Grid item xs={8}>
										<Typography sx={fontContent}>
											<b>Threshold Alarm Quota</b>
										</Typography>
										<Typography sx={fontContent}>
											{data.threshold_alarm_voucher}
										</Typography>
									</Grid>
									<Grid item xs={4}>
										<Typography sx={fontContent}>
											<b>Whitelist Counter</b>
										</Typography>
										<Typography sx={fontContent}>
											{data.whitelist_counter || 0}
										</Typography>
									</Grid>
								</Grid>
							</Stack>
						</Grid>
						<Grid item md={6} px={2}>
							<Stack direction="row" justifyContent="space-between">
								<Typography
									variant="subtitle1"
									gutterBottom
									sx={fontContentTitle}
									onClick={() => {
										console.log(data);
									}}
								>
									Program Notification
								</Typography>
								{!roleAccess &&
									<IconButton
										href={"/edit-program/notification/".concat(data._id)}
										sx={fontContentIcon}
									>
										<Edit sx={{fontSize: 14}}></Edit>
									</IconButton>
								}
							</Stack>

							<Stack spacing={2}>
								{data.program_notification &&
									data.program_notification.map(
										(_item: any, _index: number) => (
											<Card
												sx={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
													padding: 1
												}}
												key={_index}
											>
												<Box sx={{ display: "flex", flexDirection: "column" }}>
													<Typography sx={fontContent}>
														<b>{_item.template.notif_name}</b>
													</Typography>
													<Typography sx={fontContent}>
														{_item.template.notif_content}
													</Typography>
												</Box>
												<Chip label={_item.via.set_value} size="small" />
											</Card>
										)
									)}
							</Stack>
						</Grid>
						<Box sx={{ paddingTop: "3vw" }} width="100%">
							<KeywordLink data={data} />
						</Box>
						<Box
							sx={{ paddingTop: "3vw" }}
							onClick={() => {
								console.log("data open", data);
							}}
						>
							<Segmentation programId={data._id} />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</ModalCustom>
	);
};
export default ProgramDetailsModal;
