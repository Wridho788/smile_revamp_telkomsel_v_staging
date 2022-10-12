/**
 * TODO: Create Keyword
 * **/

import React from "react";
import { Box } from "@mui/material";
import { DrawerNav, H2, Stepper, StepperPaper } from "../../components";
import { MainInfo, Bonus } from "../../components/organisms/CreateKeyword";
import { CreateKeywordGeneral } from "components/organisms/CreateKeyword/initial";
import { ICreateKeyword } from "components/organisms/CreateKeyword/interfaces";

const CreateKeyword = () => {
	const keywordCreate = CreateKeywordGeneral;
	const [keywordCreateState, setKeywordCreateState] =
		React.useState<ICreateKeyword>(keywordCreate);
	const [stateTrigger, setStateTrigger] = React.useState<boolean>(true);
	const [activeStep, setActiveStep] = React.useState<number>(0);
	const steps = ["Main Info", "Bonus"];
	const stepsItem = [
		<MainInfo
			keywordCreateState={keywordCreateState}
			keywordCreate={keywordCreate}
			stateTrigger={stateTrigger}
			setStateTrigger={setStateTrigger}
		/>,
		<Bonus />
	];

	React.useEffect(() => {
		setKeywordCreateState(keywordCreate);
	}, [keywordCreate]);

	return (
		<DrawerNav>
			<Box
				sx={{
					paddingBlock: "3vw",
					paddingInline: "20vw"
				}}
			>
				<StepperPaper sx={{ paddingTop: "4vw" }}>
					<H2 textAlign="center" mb="2vw">
						Create Keyword
					</H2>
					<Stepper
						steps={steps}
						activeStep={activeStep}
						setActiveStep={setActiveStep}
						slug={"insert"}
						type={"keyword"}
						keywordCreateState={keywordCreateState}
					>
						{stepsItem[activeStep]}
					</Stepper>
				</StepperPaper>
			</Box>
		</DrawerNav>
	);
};

export default CreateKeyword;
