import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { Select, Subtitle } from "../../../../atoms";
import { useGetLocationTypeQuery } from "../../../../../redux/features/lov/lov-api-slice";
import { FilterInitial } from "../../../../../redux/utils/initial-general";
import {
	ICreateKeyword,
	IKeywordEligibilityLocationHelper
} from "../../interfaces";
import { BooleanOptions } from "../../options";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
	useLocationRebaseMutation,
	useLocationTemplateQuery
} from "../../../../../redux/features/location/location-api-slice";
import { KeywordEligibilityLocationHelper } from "../../initial";
import { useAccountAuthenticateQuery } from "../../../../../redux/features/account/account-api-slice";

interface ILocationProps {
	keywordCreateState: ICreateKeyword;
	keywordCreate: ICreateKeyword;
	stateTrigger: boolean;
	setStateTrigger: Dispatch<SetStateAction<boolean>>;
}

const Location: React.FunctionComponent<ILocationProps> = ({
	keywordCreateState,
	keywordCreate,
	stateTrigger,
	setStateTrigger
}) => {
	const { data: locationTypeOptions = { data: [] } } =
		useGetLocationTypeQuery();

	const [getOwnerDetail, { data: locationOptions }] =
		useLocationRebaseMutation();

	const { data: accountAuth } = useAccountAuthenticateQuery();

	const keywordEligibilityLocationHelper = KeywordEligibilityLocationHelper;
	const [
		keywordEligibilityLocationHelperState,
		setKeywordEligibilityLocationHelperState
	] = useState<IKeywordEligibilityLocationHelper>(
		keywordEligibilityLocationHelper
	);

	useEffect(() => {
		setKeywordEligibilityLocationHelperState(keywordEligibilityLocationHelper);
	}, [keywordEligibilityLocationHelper, stateTrigger]);

	useEffect(() => {
		if (
			accountAuth?.account_location.location_detail.type &&
			!keywordCreate?.eligibility?.location_type
		) {
			keywordCreateState.eligibility.location_type =
				accountAuth?.account_location.location_detail.type;
			setStateTrigger(!stateTrigger);
		}
	}, [keywordCreateState.eligibility?.eligibility_locations]);

	useEffect(() => {
		if (keywordCreate?.eligibility?.location_type)
			getOwnerDetail({ type: keywordCreate?.eligibility?.location_type });
	}, []);

	return (
		<Accordion sx={{ p: "1vw" }}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon fontSize="large" />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Subtitle textTransform="uppercase">
					location redeem eligibility
				</Subtitle>
			</AccordionSummary>
			<AccordionDetails>
				<Stack spacing="1vw" px="2vw" py="0.5vw">
					<Select
						label="Eligibility Location"
						placeholder="Option"
						options={BooleanOptions}
						value={keywordCreateState.eligibility.eligibility_locations}
						handleChange={(value: boolean) => {
							keywordCreate.eligibility.eligibility_locations = value;
							getOwnerDetail({
								type: accountAuth?.account_location.location_detail.type
							});
							setStateTrigger(!stateTrigger);
						}}
					/>
					{keywordCreateState.eligibility.eligibility_locations && (
						<Select
							label="Location Type"
							placeholder="Option"
							options={locationTypeOptions.data.filter(item => {
								if (
									accountAuth?.account_location.location_detail.type ===
									"62ffc0fc8a01008799e785be"
								) {
									const scope: any = [
										"62ffc0fc8a01008799e785bc",
										"62ffc0fc8a01008799e785bd"
									];
									if (!scope.includes(item._id)) {
										return item;
									}
								} else {
									return item;
								}
							})}
							value={keywordCreateState.eligibility.location_type}
							handleChange={(value: string) => {
								keywordCreate.eligibility.location_type = value;
								getOwnerDetail({ type: value });
								setStateTrigger(!stateTrigger);
							}}
						/>
					)}
					{keywordCreateState.eligibility.eligibility_locations && (
						<Grid item xs={3}>
							<Select
								multiple
								label="Location"
								placeholder="Option"
								options={locationOptions}
								optionLabel={"name"}
								value={keywordCreateState.eligibility.locations}
								handleChange={(value: any) => {
									keywordCreate.eligibility.locations = value;
									setStateTrigger(!stateTrigger);
								}}
							/>
						</Grid>
					)}
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default Location;
