import * as React from "react";
import { Alert, Box, Stack } from "@mui/material";
import { CreateKeywordGeneral } from "../initial";
import { ICreateKeyword } from "../interfaces";
import Program from "./Program";
import General from "./General";
import Location from "./Location";
import Merchant from "./Merchant";
import Segmentation from "./Segmentation";
import Notification from "./Notification";
import SwitchCustom from "atomic/components/atoms/Switch";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = props => {
	const keywordCreate = CreateKeywordGeneral;
	const [keywordCreateState, setKeywordCreateState] =
		React.useState<ICreateKeyword>(keywordCreate);

	const [stateTrigger, setStateTrigger] = React.useState<boolean>(true);

	React.useEffect(() => {
		setKeywordCreateState(keywordCreate);
	}, [keywordCreate]);

	return (
		<Box display="flex" justifyContent="center" px="5%" py="1vw">
			<Stack spacing="1vw" width="100%">
				<Stack spacing="1vw" px="4vw">
					{/*  Draft Switcher */}
					<Box>
						<Alert
							severity="info"
							color={keywordCreate?.is_draft ? "success" : "warning"}
						>
							{keywordCreate?.is_draft
								? "Keyword will be drafted"
								: "Keyword will not be drafted"}
						</Alert>
					</Box>

					<Box>
						<SwitchCustom
							color={"success"}
							checked={keywordCreate?.is_draft || false}
							handleChange={() => {
								keywordCreate.is_draft = !keywordCreate.is_draft;
								setStateTrigger(!stateTrigger);
							}}
							label={"Draft Keyword"}
						/>
					</Box>

					<Program
						keywordCreateState={keywordCreateState}
						keywordCreate={keywordCreate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>

					{keywordCreate?.eligibility?.program_id !== "" &&
						keywordCreate?.eligibility?.program_experience?.length > 0 && (
							<>
								<General
									keywordCreateState={keywordCreateState}
									keywordCreate={keywordCreate}
									stateTrigger={stateTrigger}
									setStateTrigger={setStateTrigger}
								/>
								<Location
									keywordCreateState={keywordCreateState}
									keywordCreate={keywordCreate}
									stateTrigger={stateTrigger}
									setStateTrigger={setStateTrigger}
								/>
								<Merchant
									keywordCreate={keywordCreate}
									stateTrigger={stateTrigger}
									setStateTrigger={setStateTrigger}
								/>
								<Segmentation
									keywordCreateState={keywordCreateState}
									keywordCreate={keywordCreate}
									stateTrigger={stateTrigger}
									setStateTrigger={setStateTrigger}
								/>
								<Notification
									keywordCreateState={keywordCreateState}
									keywordCreate={keywordCreate}
									stateTrigger={stateTrigger}
									setStateTrigger={setStateTrigger}
								/>
							</>
						)}
				</Stack>
			</Stack>
		</Box>
	);
};

export default MainInfo;
