import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from "react";
import { Stack, Box, Grid, Button } from "@mui/material";
import {
	OutlinedTextField,
	Subtitle,
	ResponsiveDateTimePicker,
	Select
} from "../../../../atoms";
import { IUpdateKeyword } from "../../interfaces";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SwitchCustom from "../../../../../atomic/components/atoms/Switch";
import LocationManagement from "../LocationManagement";
import { useLocationTemplateQuery } from "../../../../../redux/features/location/location-api-slice";
import { KeywordBonusVoucher } from "../../initial";
import {
	VOUCHER_COMBINATIONS,
	VOUCHER_TYPES,
	VOUCHER_TYPE_GENERATE,
	VOUCHER_TYPE_UPLOAD
} from "service/helpers/voucher-constant";
import onlyNumber from "utils/onlyNumber";
import moment from "moment";

interface INotificationVoucherProps {
	bonusType: string;
	keywordCreateState: IUpdateKeyword;
	keywordCreate: IUpdateKeyword;
	stateTrigger: boolean;
	setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Voucher: React.FunctionComponent<INotificationVoucherProps> = ({
	keywordCreateState,
	keywordCreate,
	stateTrigger,
	setStateTrigger
}) => {
	const fileRef = useRef<any>(null);
	const { data: locationOptions, isFetching } = useLocationTemplateQuery({
		type: keywordCreate.eligibility.location_type
	});

	const [switchState, setSwitchState] = useState<boolean>(false);
	const handleSwitch = () => {
		setSwitchState(!switchState);
		if (switchState) {
			keywordCreate.bonus[index].exp_voucher = "";
		}
	};

	const [index, setIndex] = useState<number>(-1);

	// Watch for switch
	// useEffect(() => {
	// 	const voucherDate = keywordCreate.bonus.find(
	// 		bonus => bonus?.bonus_type === "discount_voucher"
	// 	)?.exp_voucher;

	// 	setSwitchState(() => moment(voucherDate)?.toString() !== "Invalid date");
	// }, [isFetching]);

	useEffect(() => {
		// Initial Keyword Bonus Link Aja
		const bonusIndex = keywordCreate.bonus.findIndex(
			(bonus: any) => bonus?.bonus_type === "discount_voucher"
		);

		if (bonusIndex === -1 || bonusIndex !== -1) {
			if (bonusIndex === -1) {
				keywordCreate.bonus.push(KeywordBonusVoucher);
			}
			const bonusIdx = keywordCreate.bonus.findIndex(
				({ bonus_type }) => bonus_type === "discount_voucher"
			);
			setIndex(bonusIdx);

			if (locationOptions) {
				keywordCreateState.eligibility.locations.map(location => {
					const selectedLocation = locationOptions.find(
						(e: any) => e["_id"] === location
					);
					if (
						selectedLocation &&
						!keywordCreateState.bonus[bonusIdx].stock_location.some(
							(stockLocation: any) => stockLocation.location_id === location
						)
					) {
						keywordCreateState.bonus[bonusIdx].stock_location.push({
							name: selectedLocation?.name,
							location_id: location,
							stock: 0
						});
					}

					// Always Remove if stock location not selected
					keywordCreateState.bonus[bonusIdx].stock_location =
						keywordCreateState.bonus[bonusIdx].stock_location.filter(
							(stockLocation: any) =>
								keywordCreateState.eligibility.locations?.includes(
									stockLocation?.location_id
								)
						);
				});
			}

			// Check if eligibility locations is empty
			if (keywordCreateState.eligibility.locations?.length === 0) {
				keywordCreateState.bonus[bonusIdx].stock_location.length = 0;
			}

			setStateTrigger(!stateTrigger);
		}
	}, [isFetching]);

	const onChangeVoucherType = (value: string) => {
		if (value !== VOUCHER_TYPE_GENERATE) {
			keywordCreate.bonus[index].voucher_combination = "";
			keywordCreate.bonus[index].voucher_prefix = "";
			keywordCreate.bonus[index].jumlah_total_voucher = 0;
			setStateTrigger(!stateTrigger);
		}
	};

	const onClickUploadFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};

	return (
		<Accordion sx={{ p: "1vw" }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon fontSize="large" />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Subtitle textTransform="uppercase">Voucher Discount</Subtitle>
			</AccordionSummary>
			<AccordionDetails>
				{index !== -1 && (
					<Stack spacing="2vw" px="0.5vw">
						<SwitchCustom
							checked={switchState}
							handleChange={handleSwitch}
							label={"By Date"}
						/>
						<Box>
							<Grid container columns={4} spacing={2}>
								<Grid item xs={2}>
									{switchState ? (
										<ResponsiveDateTimePicker
											direction={"column"}
											label="Voucher Expired By Date"
											placeholder="Voucher Expired By Date"
											value={keywordCreate.bonus[index].exp_voucher}
											minDateTime={new Date()}
											handleChange={(value: any) => {
												keywordCreate.bonus[index].exp_voucher = value;
												setStateTrigger(!stateTrigger);
											}}
										/>
									) : (
										<OutlinedTextField
											type={"number"}
											disabled={switchState}
											direction="column"
											label="Voucher Expired Days After Redeem"
											variant="outlined"
											value={
												switchState
													? "0"
													: keywordCreate.bonus[index].exp_voucher
											}
											handleChange={(value: string) => {
												keywordCreate.bonus[index].exp_voucher = value;
												setStateTrigger(!stateTrigger);
											}}
										/>
									)}
								</Grid>
								<Grid item xs={2}>
									<Select
										direction="column"
										label="Voucher Type"
										placeholder="Option"
										options={VOUCHER_TYPES?.map(voucherType => ({
											_id: voucherType,
											set_value: voucherType
										}))}
										value={keywordCreate.bonus[index].voucher_type}
										handleChange={(value: string) => {
											keywordCreate.bonus[index].voucher_type = value;
											setStateTrigger(!stateTrigger);
											onChangeVoucherType(value);
										}}
									/>
								</Grid>
							</Grid>
						</Box>

						{/* Voucher Upload */}
						{keywordCreate.bonus[index].voucher_type ===
							VOUCHER_TYPE_UPLOAD && (
							<Box>
								<Grid container columns={4} spacing={2}>
									<Grid item xs={2}>
										<input
											type="file"
											style={{ display: "none" }}
											ref={fileRef}
										/>
										<Button
											variant="contained"
											size="small"
											onClick={onClickUploadFile}
										>
											Upload File
										</Button>
									</Grid>
								</Grid>
							</Box>
						)}

						{/* Voucher Generate */}
						{keywordCreate.bonus[index].voucher_type ===
							VOUCHER_TYPE_GENERATE && (
							<>
								<Box>
									<Grid container columns={4} spacing={2}>
										<Grid item xs={2}>
											<Select
												direction="column"
												label="Voucher Combination"
												placeholder="Option"
												options={VOUCHER_COMBINATIONS?.map(voucherType => ({
													_id: voucherType,
													set_value: voucherType
												}))}
												value={keywordCreate.bonus[index].voucher_combination}
												handleChange={(value: string) => {
													keywordCreate.bonus[index].voucher_combination =
														value;
													setStateTrigger(!stateTrigger);
												}}
											/>
										</Grid>
									</Grid>
								</Box>

								<Box>
									<Grid container columns={4} spacing={2}>
										<Grid item xs={2}>
											<OutlinedTextField
												direction="column"
												label="Prefix Voucher"
												variant="outlined"
												value={keywordCreate.bonus[index]?.voucher_prefix}
												handleChange={(value: string) => {
													keywordCreate.bonus[index].voucher_prefix = value;
													setStateTrigger(!stateTrigger);
												}}
											/>
										</Grid>
										<Grid item xs={2}>
											<OutlinedTextField
												direction="column"
												label="Voucher Digit Amount"
												variant="outlined"
												value={keywordCreate.bonus[index]?.jumlah_total_voucher}
												handleChange={(value: string) => {
													if (onlyNumber(value)) {
														keywordCreate.bonus[index].jumlah_total_voucher =
															Number(value);
														setStateTrigger(!stateTrigger);
													}
												}}
											/>
										</Grid>
									</Grid>
								</Box>
							</>
						)}

						{/* Stock Location Management */}
						<Stack>
							{keywordCreateState.eligibility.locations?.length > 0 && (
								<LocationManagement
									bonusType="discount_voucher"
									keywordCreateState={keywordCreateState}
									keywordCreate={keywordCreate}
									stateTrigger={stateTrigger}
									setStateTrigger={setStateTrigger}
								/>
							)}
						</Stack>
					</Stack>
				)}
			</AccordionDetails>
		</Accordion>
	);
};

export default Voucher;
