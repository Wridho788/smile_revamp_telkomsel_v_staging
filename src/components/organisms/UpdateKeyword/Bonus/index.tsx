import * as React from "react";

import { Box, Chip, CircularProgress, Stack } from "@mui/material";
import { Select, SmallCopy } from "../../../atoms";
import { useGetBonusTypeQuery } from "../../../../redux/features/lov/lov-api-slice";
import { UpdateKeywordGeneral, KeywordBonusHelper } from "../initial";
import { IUpdateKeyword, IKeywordBonusHelper } from "../interfaces";
import CancelIcon from "@mui/icons-material/Cancel";
import _without from "lodash/without";
import _find from "lodash/find";

// Sub Component of Bonus
import Auction from "./Auction";
import LuckyDraw from "./LuckyDraw";
import DirectRedeem from "./DirectRedeem";
import LoyaltyPoin from "./LoyaltyPoin";
import Voucher from "./Voucher";
import LinkAja from "./LinkAja";
import TelcoProductPrepaid from "./TelcoProductPrepaid";
import TelcoProductPostpaid from "./TelcoProductPostpaid";
import Donation from "./Donation";
import MobileBanking from "./MobileBanking";

// Sub Component of Bonus without "configuration"
import Void from "./Void";
import Voting from "./Voting";
import Other from "./Other";

interface IBonusProps {}

const Bonus: React.FunctionComponent<IBonusProps> = props => {
	let keywordUpdate = UpdateKeywordGeneral;
	const { data: bonusTypeOptions = { data: [] }, isFetching } =
		useGetBonusTypeQuery();

	const [keywordUpdateState, setKeywordUpdateState] =
		React.useState<IUpdateKeyword>(keywordUpdate);

	let keywordBonusHelper = KeywordBonusHelper;
	const [keywordBonusHelperState, setKeywordBonusHelperState] =
		React.useState<IKeywordBonusHelper>(keywordBonusHelper);

	const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

	React.useEffect(() => {
		// Initial existing bonus
		keywordUpdate.bonus.map(({ bonus_type }) => {
			if (
				!keywordBonusHelper.bonus_type.some(currentBonusType =>
					currentBonusType.includes(bonus_type)
				)
			) {
				keywordBonusHelper.bonus_type.push(bonus_type);
			}
		});

		setKeywordUpdateState(keywordUpdate);
	}, [keywordUpdate, stateTrigger]);

	React.useEffect(() => {
		// Filter Condition for Bonus / Notification
		keywordUpdate.bonus = keywordUpdate.bonus.filter(item => {
			if (keywordBonusHelper.bonus_type.includes(item.bonus_type)) {
				return item;
			}
		});

		setKeywordBonusHelperState(keywordBonusHelper);
	}, [keywordBonusHelper, stateTrigger]);

	React.useEffect(() => {
		let list: any = [];

		keywordBonusHelper.bonus_type.map((type: string) => {
			list.push(
				_find(bonusTypeOptions.data, ({ template }) => template === type)?._id
			);
		});

		keywordUpdate.notification = keywordUpdate.notification.filter(
			(item, i) =>
				list.includes(keywordUpdate.notification[i].bonus_type_id) ||
				item.bonus_type_id === ""
		);

		setKeywordUpdateState(keywordUpdate);
	}, [keywordBonusHelperState.bonus_type]);

	console.log("HELPER", keywordBonusHelper);
	console.log("KEYWORD UPDATE", keywordUpdate);

	React.useEffect(() => {
		console.log(keywordUpdate);
	}, [keywordUpdate, stateTrigger]);

	return (
		<Box display="flex" justifyContent="center" px="5%" py="1vw">
			{!isFetching ? (
				<Stack spacing="2vw" width="100%" px="4vw">
					<Select
						multiple
						direction="column"
						label="Bonus Type"
						placeholder="Option"
						options={bonusTypeOptions.data}
						optionValue="template"
						renderValue={(selected: any) => (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{selected.map((value: any) => {
									return (
										<Chip
											key={value}
											label={
												bonusTypeOptions.data.find(e => e["template"] === value)
													?.template
											}
											clickable
											deleteIcon={
												<CancelIcon
													onMouseDown={(event: any) => event.stopPropagation()}
												/>
											}
											onDelete={e => {
												e.preventDefault();
												keywordBonusHelper.bonus_type =
													keywordBonusHelper.bonus_type?.filter(
														bonusType => bonusType !== value
													);
												keywordUpdate.bonus = keywordUpdate.bonus.filter(
													bonus => bonus?.bonus_type !== value
												);

												setStateTrigger(!stateTrigger);
											}}
											onClick={() => console.log("clicked chip")}
										/>
									);
								})}
							</Box>
						)}
						value={keywordBonusHelperState.bonus_type}
						handleChange={(value: Array<string>) => {
							keywordBonusHelper.bonus_type = value;
							setStateTrigger(!stateTrigger);
						}}
					/>
					<>
						{keywordBonusHelperState.bonus_type.length > 0 &&
							keywordBonusHelperState.bonus_type.map((bonusType, idx) => {
								switch (bonusType) {
									case "lucky_draw":
										return (
											<Box key={`bonusType__${idx}`}>
												<LuckyDraw
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ template }) => template === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "auction":
										return (
											<Box key={`bonusType__${idx}`}>
												<Auction
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ template }) => template === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "direct_redeem":
										return (
											<Box key={`bonusType__${idx}`}>
												<DirectRedeem
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ template }) => template === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "loyalty_poin":
										return (
											<Box key={`bonusType__${idx}`}>
												<LoyaltyPoin
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ template }) => template === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "telco_postpaid":
										return (
											<Box key={`bonusType__${idx}`}>
												<TelcoProductPostpaid
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ template }) => template === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "telco_prepaid":
										return (
											<Box key={`bonusType__${idx}`}>
												<TelcoProductPrepaid
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ template }) => template === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "link_aja":
										return (
											<Box key={`bonusType__${idx}`}>
												<LinkAja
													bonusType={bonusType}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "discount_voucher":
										return (
											<Box key={`bonusType__${idx}`}>
												<Voucher
													bonusType={bonusType}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "donation":
										return (
											<Box key={`bonusType__${idx}`}>
												<Donation
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ set_value }) => set_value === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "mbp":
										return (
											<Box key={`bonusType__${idx}`}>
												<MobileBanking
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ set_value }) => set_value === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "void":
										return (
											<Box key={`bonusType__${idx}`}>
												<Void
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ set_value }) => set_value === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "voting":
										return (
											<Box key={`bonusType__${idx}`}>
												<Voting
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ set_value }) => set_value === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
									case "other":
										return (
											<Box key={`bonusType__${idx}`}>
												<Other
													bonusType={bonusType}
													bonusTypeId={
														_find(
															bonusTypeOptions.data,
															({ set_value }) => set_value === bonusType
														)?._id
													}
													keywordCreateState={keywordUpdateState}
													keywordCreate={keywordUpdate}
													stateTrigger={stateTrigger}
													setStateTrigger={setStateTrigger}
												/>
											</Box>
										);
								}
							})}
					</>
				</Stack>
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						padding: "24px 0"
					}}
				>
					<Stack
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
						direction="column"
						spacing="2vh"
					>
						<SmallCopy>Preparing Bonus ...</SmallCopy>
						<CircularProgress />
					</Stack>
				</Box>
			)}
		</Box>
	);
};

export default Bonus;
