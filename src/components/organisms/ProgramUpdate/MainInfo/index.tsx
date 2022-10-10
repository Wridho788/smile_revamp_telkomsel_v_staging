/**
 * Form Program Main Info Update : ./src/components/organisms/ProgramUpdate/MainInfo/index.tsx
 * **/

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
	H2,
	OutlinedTextField,
	ResponsiveDateTimePicker,
	Select
} from "../../../../components";
import {
	Box,
	Button,
	ButtonGroup,
	Stack,
	Paper,
	Divider,
	CircularProgress,
	Alert
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

// import { KeywordAuctionProvider } from "../../../../app/context/KeywordAuction/Provider";
import {
	useLazyDetailProgramQuery,
	useUpdateProgramMainInfoMutation
} from "../../../../redux/features/program/program-api-slice";

import {
	BooleanOption,
	logicOption,
	programTimeZoneOption,
	ThresholdAlarmExpiredOption
} from "../../../../redux/utils/initial-general";
import { useLocationRebaseMutation } from "../../../../redux/features/location/location-api-slice";
import {
	useGetLocationTypeQuery,
	useGetMechanismQuery,
	useGetPointTypeQuery
} from "../../../../redux/features/lov/lov-api-slice";
import { ProgramDetailInitial } from "../../../../pages/CreateProgram/programInitial";

import Swal from "sweetalert2";

// lodash
import pick from "lodash/pick";
import onlyNumber from "utils/onlyNumber";
import SwitchCustom from "atomic/components/atoms/Switch";

const MainInfo: React.FunctionComponent = () => {
	const { _id } = useParams();
	const navigate = useNavigate();

	const [fetchProgramDetail, { isLoading, isFetching }] =
		useLazyDetailProgramQuery();

	const [programDetail, setProgramDetail] = useState<any>(
		ProgramDetailInitial.data
	);

	useEffect(() => {
		(async () => {
			const programDetailResponse = await fetchProgramDetail(_id ?? "");
			const data = programDetailResponse?.data as any;

			setProgramDetail((previousProgramDetail: any) => ({
				...previousProgramDetail,
				...pick(data, [
					"name",
					"desc",
					"start_period",
					"point_type",
					"program_mechanism",
					"program_owner",
					"program_owner_detail",
					"keyword_registration",
					"whitelist_counter",
					"logic",
					"program_time_zone",
					"program_parent",
					"alarm_pic_type",
					"alarm_pic",
					"threshold_alarm_expired",
					"threshold_alarm_voucher",
					"is_draft"
				]),
				_id: data?._id,
				name: data?.name || "",
				desc: data?.desc || "",
				start_period: data?.start_period || new Date(),
				end_period: data?.end_period || new Date(),
				point_type: data?.point_type || "",
				program_mechanism: data?.program_mechanism || "",
				program_owner: data?.program_owner || "",
				program_owner_detail: data?.program_owner_detail || "",
				whitelist_counter: data?.whitelist_counter || false,
				logic: data?.logic || "",
				program_time_zone: data?.program_time_zone || "",
				threshold_alarm_expired: data?.threshold_alarm_expired || 0,
				threshold_alarm_voucher: data?.threshold_alarm_voucher || 0,
				is_draft: data?.is_draft || false
			}));
		})();

		// eslint-disable-next-line
	}, []);

	// Owner Detail, Owner, Program Mechanism, Point Type
	const { data: pointTypeOption = { data: [] } } = useGetPointTypeQuery();
	const { data: mechanismOption = { data: [] } } = useGetMechanismQuery();
	const { data: ownerOption = { data: [] } } = useGetLocationTypeQuery();

	const [getOwnerDetail, { data: ownerDetailOption }] =
		useLocationRebaseMutation();

	useEffect(() => {
		if (programDetail.program_owner_detail !== "") {
			getOwnerDetail({ type: programDetail.program_owner });
		}
	}, [programDetail.program_owner_detail]);

	const [updateProgramMainInfo] = useUpdateProgramMainInfoMutation();

	const onChangeProgramDetail = (name: string, value: any) => {
		setProgramDetail((previousProgramDetail: any) => ({
			...previousProgramDetail,
			[name]: value
		}));
	};

	const onSave = async () => {
		Swal.fire({
			icon: "info",
			title: "Do you want to update data?",
			showDenyButton: true,
			confirmButtonText: `Yes`,
			denyButtonText: "No"
		}).then(res => {
			// Confirmed
			if (res.isConfirmed) {
				updateProgramMainInfo(programDetail).then((res: any) => {
					if (res?.error) {
						Swal.fire(res.error.data.message, "", "warning");
					} else {
						if (res?.data.status === 200) {
							Swal.fire("Updated Program Data!", "", "success").then(() => {
								navigate("/program-management");
							});
						}
					}
				});
			}

			// Denied
			if (res.isDenied) {
				Swal.fire("Data aren't updated", "", "info");
			}
		});
	};

	return (
		<Box display="block" sx={{ paddingInline: "20vw" }}>
			<Paper elevation={3}>
				<Box>
					{isLoading || isFetching ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								minHeight: "100vh"
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						<>
							<Box
								sx={{
									paddingX: 8,
									paddingY: 4
								}}
							>
								<Box>
									<Box display="flex" justifyContent="space-between">
										<Box>
											<H2>Edit Main Info Program {programDetail.name}</H2>
											<small>
												Make sure you input correct data before store it
											</small>
										</Box>

										{/* TODO: Action "Cancel" */}
										<IconButton href={"/program-management"}>
											<Close></Close>
										</IconButton>
									</Box>
									<Divider color="#000" sx={{ height: 2, marginTop: 2 }} />
								</Box>
							</Box>
							<Box
								display="flex"
								py="1vw"
								sx={{
									paddingInline: "10vw",
									paddingBottom: 6
								}}
							>
								<Stack spacing="1vw" width="100%">
									{/* Draft Switcher */}
									<Box>
										<Alert icon={false} severity={"info"}>
											<SwitchCustom
												color={"info"}
												checked={programDetail?.is_draft || false}
												handleChange={() => {
													onChangeProgramDetail(
														"is_draft",
														!programDetail?.is_draft
													);
												}}
												label={
													"Switch this toggle on to save this program as Draft when you finish update!"
												}
											/>
										</Alert>
									</Box>
									{programDetail?.is_draft && (
										<Box>
											<Alert severity="info" color={"warning"}>
												This program will be stored as <b>Draft</b>. Please note
												that program draft will not request for Approval
											</Alert>
										</Box>
									)}
									{/* End Draft Switcher */}

									{/* Program Group Not Found */}
									{/* <OutlinedTextField
                                        label="Program Group"
                                        placeholder="Program Group"
                                        variant={"outlined"}
                                        value=""
                                    /> */}
									<OutlinedTextField
										label="Program Name"
										placeholder="Program Name"
										variant={"outlined"}
										value={programDetail.name}
										handleChange={(value: string) => {
											onChangeProgramDetail("name", value);
										}}
									/>
									<OutlinedTextField
										label="Description"
										placeholder="Description"
										variant={"outlined"}
										value={programDetail.desc}
										handleChange={(value: any) => {
											onChangeProgramDetail("desc", value);
										}}
										multiline
										rows={4}
										isRequired={false}
									/>
									<ResponsiveDateTimePicker
										label="Start Period"
										placeholder="Start Period"
										value={programDetail.start_period}
										handleChange={(value: any) => {
											onChangeProgramDetail("start_period", value);
										}}
									/>
									<ResponsiveDateTimePicker
										label="End Period"
										placeholder="End Period"
										value={programDetail.end_period}
										handleChange={(value: any) => {
											onChangeProgramDetail("end_period", value);
										}}
									/>
									<Select
										label="Point Type"
										placeholder="Option"
										optionLabel="set_value"
										value={programDetail.point_type}
										handleChange={(value: any) => {
											onChangeProgramDetail("point_type", value);
										}}
										options={pointTypeOption?.data}
									/>
									<Select
										label="Program Mechanism"
										placeholder="Option"
										optionLabel="set_value"
										value={programDetail.program_mechanism}
										handleChange={(value: any) => {
											onChangeProgramDetail("program_mechanism", value);
										}}
										options={mechanismOption?.data}
									/>
									<Select
										label="Owner"
										placeholder="Option"
										optionLabel="set_value"
										value={programDetail.program_owner}
										handleChange={(value: any) => {
											onChangeProgramDetail("program_owner", value);
											getOwnerDetail({ type: value });
										}}
										options={ownerOption?.data}
									/>
									<Select
										label="Owner Detail"
										placeholder="Option"
										optionLabel="name"
										value={programDetail.program_owner_detail}
										handleChange={(value: any) => {
											onChangeProgramDetail("program_owner_detail", value);
										}}
										options={ownerDetailOption}
									/>
									{/*}*/}
									<Select
										label="Whitelist Counter"
										placeholder="Option"
										value={programDetail.whitelist_counter}
										handleChange={(value: any) => {
											onChangeProgramDetail("whitelist_counter", value);
										}}
										options={BooleanOption}
									/>

									<Select
										label="Segmentation Logic"
										placeholder="Option"
										value={programDetail.logic}
										handleChange={(value: any) => {
											onChangeProgramDetail("logic", value);
										}}
										options={logicOption}
									/>

									<Select
										label="Program Time Zone"
										placeholder="Option"
										value={programDetail.program_time_zone}
										handleChange={(value: any) => {
											onChangeProgramDetail("program_time_zone", value);
										}}
										options={programTimeZoneOption}
									/>

									<Select
										label="Threshold Alarm Expired"
										placeholder="Option"
										value={programDetail.threshold_alarm_expired}
										handleChange={(value: any) => {
											if (onlyNumber(value)) {
												onChangeProgramDetail(
													"threshold_alarm_expired",
													Number(value)
												);
											}
										}}
										options={ThresholdAlarmExpiredOption}
									/>

									<OutlinedTextField
										InputProps={{ inputProps: { min: 70, max: 100 } }}
										label="Threshold Alarm Voucher"
										placeholder="Threshold Alarm Voucher"
										value={programDetail.threshold_alarm_voucher}
										handleChange={(value: any) => {
											if (onlyNumber(value)) {
												onChangeProgramDetail(
													"threshold_alarm_voucher",
													Number(value)
												);
											}
										}}
										variant={"outlined"}
									/>
								</Stack>
							</Box>

							{/* TODO: Action "Cancel" | "Save" */}
							<ButtonGroup
								sx={{
									backgroundColor: "#D9D9D9",
									height: 60
								}}
								fullWidth
							>
								<Button
									sx={{ border: 0, color: "#000" }}
									href={"/program-management"}
								>
									Cancel
								</Button>
								<Divider orientation="vertical" light></Divider>
								<Button sx={{ border: 0 }} onClick={onSave}>
									Save
								</Button>
							</ButtonGroup>
						</>
					)}
				</Box>
			</Paper>
		</Box>
	);
};

export default MainInfo;
