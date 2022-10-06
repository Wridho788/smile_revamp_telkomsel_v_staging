import {
	Alert,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Grid,
	Input,
	InputAdornment,
	Stack,
	Tooltip,
	Typography
} from "@mui/material";
import * as React from "react";
import {
	Select,
	OutlinedTextField,
	ResponsiveDateTimePicker,
	BodyCopy
} from "../../../atoms";
import { useEffect, useState, Fragment } from "react";
import {
	useGetDetailLovMutation,
	useGetLovListQuery,
	useGetMechanismQuery,
	useGetOwnerQuery,
	useGetPointTypeQuery,
	useGetProgramGroupQuery,
	useLazyGetProgramGroupQuery,
	useLazyGetOwnerQuery
} from "../../../../redux/features/lov/lov-api-slice";
import {
	BooleanOption,
	logicOption,
	PayloadInitial,
	PicTypeOption,
	programTimeZoneOption,
	ThresholdAlarmExpiredOption
} from "../../../../redux/utils/initial-general";
import { ProgramDetailInitial } from "../../../../pages/CreateProgram/programInitial";
import {
	useLocationLocRebaseQuery,
	useLocationTemplateQuery,
	useLocationRebaseMutation,
	useLocationTemplateForPrimeQuery
} from "../../../../redux/features/location/location-api-slice";
import { IParams } from "../../../../redux/utils/IGeneral";
import {
	useAccountAuthenticateQuery,
	useLazyAccountAuthenticateQuery,
	useLazyPicPrimeQuery
} from "../../../../redux/features/account/account-api-slice";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Delete } from "@mui/icons-material";
import TablePagination from "@mui/material/TablePagination";
import { useParams } from "react-router-dom";
import {
	useDetailProgramQuery,
	useProgramListQuery
} from "../../../../redux/features/program/program-api-slice";
import { ICreateProgram } from "../../../../pages/CreateProgram/interface";
import CachedIcon from "@mui/icons-material/Cached";
import SwitchCustom from "../../../../atomic/components/atoms/Switch";
import BulkData from "../Segmentation/BulkData";
import SingleData from "../Segmentation/SingleData";
import onlyNumber from "utils/onlyNumber";

interface IMainInfoProps {
	slug: string;
	handleShowModalPic?: any;
	isRefetchPic?: boolean;
}

const MainInfo: React.FunctionComponent<IMainInfoProps> = ({
	slug,
	handleShowModalPic,
	isRefetchPic
}: IMainInfoProps) => {
	let programData = ProgramDetailInitial.data;
	// let {_id} = useParams();
	// const {data: fetchDetail = programData, isLoading} = useDetailProgramQuery(
	//     _id ?? ""
	// );
	// useEffect(() => {
	//     programData._id = fetchDetail._id;
	// }, [fetchDetail]);

	const { data: pointTypeOption = { data: [] } } = useGetPointTypeQuery();
	const { data: mechanismOption = { data: [] } } = useGetMechanismQuery();
	const [getGroupOption, { data: groupOption = { data: [] } }] =
		useLazyGetProgramGroupQuery();

	const [searchInput, setSearchInput] = useState<string>("");
	const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);
	const [filterOwnerFinish, setFilterOwnerFinish] =
		React.useState<boolean>(false);

	// TODO LOGIC DATATABLE
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [customizeOwner, setCustomizeOwner] = useState(false);
	const [getOwnerDetail, { data: ownerDetailOption }] =
		useLocationRebaseMutation();
	const [ownerList, setTess] = useState();
	const [locationDetailName, setLocationDetailName] = useState();
	const [locationTypeName, setLocationTypeName] = useState("");

	const [getLovDetail] = useGetDetailLovMutation();

	const [getAuthenticatedUser, { data: accountAuth }] =
		useLazyAccountAuthenticateQuery();
	let [getOwner] = useLazyGetOwnerQuery();
	const ownerArray: any = [];
	useEffect(() => {
		(async () => {
			const authenticatedUserResponse = await getAuthenticatedUser();
			const ownerOptionResponse = await getOwner();
			await getGroupOption();

			const locationTypeId: string =
				authenticatedUserResponse?.data?.account_location.location_detail.type;
			setLocationDetailName(
				authenticatedUserResponse?.data?.account_location.location_detail.name
			);
			programData.program_owner = locationTypeId;
			programData.program_owner_detail =
				authenticatedUserResponse?.data?.account_location.location;
			getLovDetail(locationTypeId).then((res: any) => {
				setLocationTypeName(res.data.set_value);
			});

			setStateTrigger(!stateTrigger);

			// TODO still continue
			const index = ownerOptionResponse?.data?.data?.findIndex(
				(e: any) => e["_id"] === locationTypeId
			);

			try {
				for (let i = 0; i < ownerOptionResponse?.data?.data?.length; i++) {
					if (i > index) {
						ownerArray.push(ownerOptionResponse?.data?.data[i]);
					}
				}
			} catch (error) {
				console.log(error);
			}

			setFilterOwnerFinish(() => true);

			setTess(ownerArray);
		})();
	}, []);
	// TODO change default programOwner if notCustomizeOwner
	useEffect(() => {
		if (!customizeOwner) {
			const programOwner: string =
				accountAuth?.account_location.location_detail.type;
			programData.program_owner = programOwner;
			programData.program_owner_detail = accountAuth?.account_location.location;
		}
	}, [customizeOwner]);

	useEffect(() => {
		programData.threshold_alarm_expired = Number(
			ThresholdAlarmExpiredOption[0]._id
		);
		programData.program_time_zone = programTimeZoneOption[0]._id;
		programData.whitelist_counter = BooleanOption[1]._id;
		programData.logic = logicOption[1]._id;
	}, [programData, stateTrigger]);

	useEffect(() => {
		programData.point_type = pointTypeOption?.data[0]?._id;
	}, [pointTypeOption]);

	const picLazyParam: IParams = {
		lazyEvent: JSON.stringify({
			first: page,
			rows: rowsPerPage,
			filters: { msisdn: { value: searchInput } }
		})
		// lazyEvent: `{"first" : ${page}, "rows" : ${rowsPerPage} }`,
	};
	const [
		getPicLazy,
		{ data: picLazy = PayloadInitial, isFetching: fetchingPIC }
	] = useLazyPicPrimeQuery();

	useEffect(() => {
		getPicLazy(picLazyParam);
	}, [page, rowsPerPage, searchInput, isRefetchPic]);

	const handleChangeCheckbox = (event: any) => {
		let isChecked = event.target.checked;
		let _id = event.target.value;
		if (isChecked) {
			programData.alarm_pic.push(_id);
		} else {
			const index = programData.alarm_pic.indexOf(_id);
			programData.alarm_pic.splice(index, 1);
		}
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	if (!filterOwnerFinish) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					alignContent: "center"
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Fragment>
			<Stack mx={2} spacing={2}>
				{/*  Draft Switcher */}
				<Box>
					<Alert
						severity="info"
						color={programData?.is_draft ? "success" : "warning"}
					>
						{programData?.is_draft
							? "Program will be drafted"
							: "Program will not be drafted"}
					</Alert>
				</Box>

				<Box>
					<SwitchCustom
						color={"success"}
						checked={programData?.is_draft || false}
						handleChange={() => {
							programData.is_draft = !programData.is_draft;
							setStateTrigger(!stateTrigger);
						}}
						label={"Draft Program"}
					/>
				</Box>

				{/*<OutlinedTextField*/}
				{/*    label="Program Group"*/}
				{/*    placeholder="Program Group"*/}
				{/*    variant={"outlined"}*/}
				{/*    value={programData.program_group}*/}
				{/*    handleChange={(value: any) => {*/}
				{/*        programData.program_group = value;*/}
				{/*        setStateTrigger(!stateTrigger);*/}
				{/*    }}*/}
				{/*/>*/}

				<Select
					label="Program Group"
					isRequired={false}
					placeholder="Option"
					options={groupOption.data}
					optionLabel="group_name"
					value={programData.program_group}
					handleChange={(value: any) => {
						programData.program_group = value;
						setStateTrigger(!stateTrigger);
					}}
					handleRefetch={() => getGroupOption()}
				/>

				<OutlinedTextField
					isRequired={false}
					label="Keyword Registration"
					placeholder="Keyword Registration"
					variant={"outlined"}
					value={programData.keyword_registration}
					handleChange={(value: any) => {
						programData.keyword_registration = value
							.replace(/[^a-zA-Z0-9]/g, "")
							.toUpperCase();
						setStateTrigger(!stateTrigger);
					}}
				/>

				<OutlinedTextField
					isRequired={false}
					label="Point Registration"
					placeholder="Point Registration"
					variant={"outlined"}
					value={programData.point_registration}
					handleChange={(value: any) => {
						programData.point_registration = Number(value);
						setStateTrigger(!stateTrigger);
					}}
				/>
				<OutlinedTextField
					label="Program Name"
					placeholder="Program Name"
					variant={"outlined"}
					value={programData.name}
					handleChange={(value: any) => {
						programData.name = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				<OutlinedTextField
					label="Description"
					placeholder="Description"
					variant={"outlined"}
					value={programData.desc}
					handleChange={(value: any) => {
						programData.desc = value;
						setStateTrigger(!stateTrigger);
					}}
					multiline
					rows={4}
					isRequired={false}
				/>
				<ResponsiveDateTimePicker
					label="Start Period"
					placeholder="Start Period"
					value={programData.start_period}
					handleChange={(value: any) => {
						programData.start_period = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				<ResponsiveDateTimePicker
					label="End Period"
					placeholder="End Period"
					minDateTime={programData.start_period}
					value={programData.end_period}
					handleChange={(value: any) => {
						programData.end_period = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				<Select
					label="Point Type"
					options={pointTypeOption.data}
					optionLabel="set_value"
					value={programData.point_type}
					handleChange={(value: any) => {
						programData.point_type = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				<Select
					label="Program Mechanism"
					placeholder="Option"
					options={mechanismOption.data}
					optionLabel="set_value"
					value={programData.program_mechanism}
					handleChange={(value: any) => {
						programData.program_mechanism = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				{!customizeOwner && (
					<Box>
						<Alert severity="info" color={"success"}>
							The owner area of this program supposed to be{" "}
							<b>
								[{locationTypeName}] - [{locationDetailName}]
							</b>
						</Alert>
					</Box>
				)}
				<Tooltip
					placement="top-start"
					title="Please wait until the owner data finished"
				>
					<Box>
						<SwitchCustom
							color={"success"}
							checked={customizeOwner}
							handleChange={setCustomizeOwner}
							label={"Customize Owner Area"}
						/>
					</Box>
				</Tooltip>
				{customizeOwner && (
					<Select
						label="Owner"
						placeholder="Option"
						options={ownerList}
						optionLabel="set_value"
						value={programData.program_owner}
						handleChange={(value: any) => {
							programData.program_owner = value;
							programData.program_owner_detail = "";
							getOwnerDetail({ type: value });
							setStateTrigger(!stateTrigger);
						}}
					/>
				)}
				{programData.program_owner && customizeOwner && (
					<Select
						label="Owner Detail"
						placeholder="Option"
						options={ownerDetailOption}
						optionLabel="name"
						value={programData.program_owner_detail}
						handleChange={(value: any) => {
							programData.program_owner_detail = value;
							setStateTrigger(!stateTrigger);
						}}
					/>
				)}
				<Select
					label="Whitelist Counter"
					options={BooleanOption}
					value={programData.whitelist_counter}
					handleChange={(value: any) => {
						programData.whitelist_counter = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				<Select
					label="Segmentation Logic"
					options={logicOption}
					value={programData.logic}
					handleChange={(value: any) => {
						programData.logic = value;
						setStateTrigger(!stateTrigger);
					}}
				/>
				<Select
					label="Program Time Zone"
					options={programTimeZoneOption}
					value={programData.program_time_zone}
					handleChange={(value: any) => {
						programData.program_time_zone = value;
						setStateTrigger(!stateTrigger);
					}}
				/>

				<Select
					label="Threshold Alarm Expired"
					value={Number(programData.threshold_alarm_expired)}
					options={ThresholdAlarmExpiredOption}
					handleChange={(value: any) => {
						programData.threshold_alarm_expired = Number(value);
						setStateTrigger(!stateTrigger);
					}}
				/>
				<OutlinedTextField
					InputProps={{
						inputProps: {
							min: 70,
							max: 100
						},
						endAdornment: <InputAdornment position="end">%</InputAdornment>
					}}
					label="Threshold Quota"
					placeholder="Threshold Quota"
					value={programData.threshold_alarm_voucher}
					handleChange={(value: any) => {
						if (onlyNumber(value)) {
							programData.threshold_alarm_voucher = Number(value);
							setStateTrigger(!stateTrigger);
						}
					}}
					variant={"outlined"}
				/>
				{/*<Select*/}
				{/*    label="Alarm Pic Type"*/}
				{/*    placeholder="Option"*/}
				{/*    options={PicTypeOption}*/}
				{/*    value={programData.alarm_pic_type}*/}
				{/*    handleChange={(value: any) => {*/}
				{/*        programData.alarm_pic_type = value;*/}
				{/*        setStateTrigger(!stateTrigger);*/}
				{/*    }}*/}
				{/*/>*/}
			</Stack>

			<Box pt={5} mx={2}>
				<Box>
					<Stack sx={{ width: "100%" }} spacing={2}>
						<Alert
							action={
								<Tooltip
									placement="top"
									title="This will redirect you to PIC Management page, all data you insert will be discard"
									arrow
								>
									<Button
										onClick={handleShowModalPic}
										size="small"
										sx={{
											background: "#001A41",
											color: "#FFF",
											"&:hover": { color: "inherit" }
										}}
									>
										PIC Management
									</Button>
								</Tooltip>
							}
							severity="info"
						>
							Don't find PIC ? Click button on the right corner
						</Alert>
					</Stack>
				</Box>
				<>
					{" "}
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>
										<Grid container>
											<Grid xs={7}>
												<Button
													onClick={() => {
														getPicLazy(picLazyParam);
													}}
													variant="outlined"
													color="inherit"
													size="small"
												>
													<CachedIcon />
													<Typography ml={2} variant="body1">
														Refresh PIC Data
													</Typography>
												</Button>

												<Typography mt={1}>
													<b style={{ color: "#888" }}>
														Choose PIC to alert them about this Program
													</b>
												</Typography>
											</Grid>
											<Grid xs={5}>
												<Input
													fullWidth
													placeholder="Search..."
													onChange={e => setSearchInput(e.target.value)}
												/>
											</Grid>
										</Grid>
									</TableCell>
								</TableRow>
							</TableHead>
							{fetchingPIC ? (
								<Box p={5}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											alignContent: "center"
										}}
									>
										<CircularProgress />
									</Box>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											alignContent: "center"
										}}
										mt={5}
									>
										<Typography variant={"h3"}>
											Loading PIC Data, please wait...
										</Typography>
									</Box>
								</Box>
							) : picLazy.payload.data.length > 0 ? (
								<TableBody>
									{picLazy.payload.data.map((row, idx) => (
										<TableRow
											key={row._id}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												<FormControlLabel
													key={`checkBox__${row._id}`}
													control={
														<Checkbox
															onChange={handleChangeCheckbox}
															value={row._id}
														/>
													}
													label={`${row.msisdn} | ${row.name} | ${row.email}`}
												/>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							) : (
								<Box
									sx={{
										display: "flex",
										justifyContent: "center"
									}}
								>
									<BodyCopy>No PIC Data ..</BodyCopy>
								</Box>
							)}
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={picLazy.payload.totalRecords ?? 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</>
			</Box>
		</Fragment>
	);
};

export default MainInfo;
