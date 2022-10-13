/**
 * TODO: Create Keyword
 * **/

import React from 'react'
import { Box, CircularProgress } from '@mui/material'
import { DrawerNav, H2, Stepper, StepperPaper } from '../../components'
import { MainInfo, Bonus } from '../../components/organisms/UpdateKeyword'
import {
	CreateKeywordGeneral,
	KeywordBonusHelper
} from 'components/organisms/UpdateKeyword/initial'
import { ICreateKeyword } from 'components/organisms/UpdateKeyword/interfaces'
import { useParams } from 'react-router-dom'
import usePayloadToInitial from 'components/organisms/UpdateKeyword/hooks/usePayloadToInitial'

const CreateKeyword = () => {
	const { _id } = useParams()
	const [isPayload, setIsPayload] = React.useState<boolean>(false)
	const { onPayloadToInitial, approvalLog } = usePayloadToInitial()
	const keywordCreate = CreateKeywordGeneral
	const [keywordCreateState, setKeywordCreateState] =
		React.useState<ICreateKeyword>(keywordCreate)
	const [stateTrigger, setStateTrigger] = React.useState<boolean>(true)
	const [activeStep, setActiveStep] = React.useState<number>(0)
	const steps = ['Main Info', 'Bonus']
	const stepsItem = [
		<MainInfo
			keywordCreateState={keywordCreateState}
			keywordCreate={keywordCreate}
			stateTrigger={stateTrigger}
			setStateTrigger={setStateTrigger}
			approvalLog={approvalLog}
		/>,
		<Bonus />
	]

	React.useEffect(() => {
		if (_id && !isPayload) {
			onPayloadToInitial(_id, setIsPayload)
		}
	}, [_id, isPayload, onPayloadToInitial])

	React.useEffect(() => {
		setKeywordCreateState(keywordCreate)
	}, [keywordCreate])

	return (
		<DrawerNav>
			<Box
				sx={{
					paddingBlock: '3vw',
					paddingInline: '20vw'
				}}
			>
				<StepperPaper sx={{ paddingTop: '4vw' }}>
					<H2 textAlign="center" mb="2vw">
						Update Keyword
					</H2>
					{!isPayload ? (
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: '50vh'
							}}
						>
							<CircularProgress />
						</Box>
					) : (
						<Stepper
							steps={steps}
							activeStep={activeStep}
							setActiveStep={setActiveStep}
							slug={'update'}
							type={'keyword'}
							keywordCreateState={keywordCreateState}
						>
							{stepsItem[activeStep]}
						</Stepper>
					)}
				</StepperPaper>
			</Box>
		</DrawerNav>
	)
}

export default CreateKeyword
