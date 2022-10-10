import * as React from "react";
import { Alert, Box, Stack } from "@mui/material";
import { UpdateKeywordGeneral } from "../initial";
import { IUpdateKeyword } from "../interfaces";
import Program from "./Program";
import General from "./General";
import Location from "./Location";
import Merchant from "./Merchant";
import Segmentation from "./Segmentation";
import Notification from "./Notification";
import SwitchCustom from "atomic/components/atoms/Switch";
import { useDraftKeywordMutation } from "redux/features/keyword/keyword-api-slice";
import { useParams } from "react-router-dom";

interface IMainInfoProps {}

const MainInfo: React.FunctionComponent<IMainInfoProps> = props => {
	let keywordUpdate = UpdateKeywordGeneral;

	const [keywordUpdateState, setKeywordUpdateState] =
		React.useState<IUpdateKeyword>(keywordUpdate);

	const [stateTrigger, setStateTrigger] = React.useState<boolean>(false);

	React.useEffect(() => {
		setKeywordUpdateState(keywordUpdate);
	}, [keywordUpdate]);

	React.useEffect(() => {
		console.log(keywordUpdate);
	}, [keywordUpdate, stateTrigger]);

	const { _id } = useParams();
	const [draftKeyword] = useDraftKeywordMutation();

	return (
		<Box display="flex" justifyContent="center" px="5%" py="1vw">
			<Stack spacing="1vw" width="100%">
				<Stack spacing="1vw" px="4vw">
					{/*  Draft Switcher */}
					<Box>
						<Alert
							severity="info"
							color={keywordUpdate?.is_draft ? "success" : "warning"}
						>
							{keywordUpdate?.is_draft
								? "Keyword will be drafted"
								: "Keyword will not be drafted"}
						</Alert>
					</Box>
					<Box>
						<SwitchCustom
							color={"success"}
							checked={keywordUpdate?.is_draft || false}
							handleChange={() => {
								if (_id) {
									draftKeyword({ _id, is_draft: !keywordUpdate.is_draft });
								}

								keywordUpdate.is_draft = !keywordUpdate.is_draft;
								setStateTrigger(!stateTrigger);
							}}
							label={"Draft Keyword"}
						/>
					</Box>

					<Program
						keywordCreateState={keywordUpdateState}
						keywordCreate={keywordUpdate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>
					<General
						keywordCreateState={keywordUpdateState}
						keywordCreate={keywordUpdate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>
					<Location
						keywordCreateState={keywordUpdateState}
						keywordCreate={keywordUpdate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>
					<Merchant
						keywordCreate={keywordUpdate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>
					<Segmentation
						keywordCreateState={keywordUpdateState}
						keywordCreate={keywordUpdate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>
					<Notification
						keywordCreateState={keywordUpdateState}
						keywordCreate={keywordUpdate}
						stateTrigger={stateTrigger}
						setStateTrigger={setStateTrigger}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default MainInfo;
