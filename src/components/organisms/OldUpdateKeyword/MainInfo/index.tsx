import * as React from "react";
import { Box, Stack } from "@mui/material";
import { UpdateKeywordGeneral } from "../initial";
import { IUpdateKeyword } from "../interfaces";
import Program from "./Program";
import General from "./General";
import Location from "./Location";
import Merchant from "./Merchant";
import Segmentation from "./Segmentation";
import Notification from "./Notification";

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

	return (
		<Box display="flex" justifyContent="center" px="5%" py="1vw">
			<Stack spacing="1vw" width="100%">
				<Stack spacing="1vw" px="4vw">
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
