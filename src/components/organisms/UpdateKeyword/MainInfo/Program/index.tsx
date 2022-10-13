import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Autocomplete, Box, Chip, CircularProgress, Stack } from '@mui/material'
import { BodyCopy, OutlinedTextField, Select } from '../../../../atoms'
import { useGetProgramExperienceQuery } from '../../../../../redux/features/lov/lov-api-slice'
import { FilterInitial } from '../../../../../redux/utils/initial-general'
import { ICreateKeyword } from '../../interfaces'
import {
	useDetailProgramQuery,
	useProgramListQuery
} from '../../../../../redux/features/program/program-api-slice'
import Information from './Information'
import CancelIcon from '@mui/icons-material/Cancel'
import _without from 'lodash/without'
import moment from 'moment'

interface IProgramProps {
	keywordCreateState: ICreateKeyword
	keywordCreate: ICreateKeyword
	stateTrigger: boolean
	setStateTrigger: Dispatch<SetStateAction<boolean>>
}

const Program: React.FunctionComponent<IProgramProps> = ({
	keywordCreateState,
	keywordCreate,
	stateTrigger,
	setStateTrigger
}) => {
	const [programListLimit, setProgramListLimit] = useState<number>(100)

	const {
		data: programListOptions = { data: [] },
		isLoading: isProgramListLoading,
		refetch: refetchProgramList
	} = useProgramListQuery({ ...FilterInitial, limit: programListLimit })
	const {
		data: programExperienceOptions = { data: [] },
		isFetching: isProgramExperienceFetching
	} = useGetProgramExperienceQuery()

	const { data: programDetail, isLoading: isProgramDetailLoading } =
		useDetailProgramQuery(keywordCreateState.eligibility.program_id)

	useEffect(() => {
		if (programListLimit !== 100) {
			refetchProgramList()
		}
	}, [programListLimit, refetchProgramList])

	return (
		<Box sx={{ px: '2vw' }}>
			<Stack spacing="2vw" px="2vw" py="0.5vw">
				{isProgramListLoading ||
				isProgramExperienceFetching ||
				isProgramDetailLoading ? (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							minHeight: '100px'
						}}
					>
						<CircularProgress />
					</Box>
				) : (
					<>
						<Autocomplete
							disablePortal
							getOptionLabel={option => option.name}
							options={[
								programDetail,
								...programListOptions.data.filter(
									e =>
										e.approval_log?.length > 0 &&
										e.approval_log[e.approval_log.length - 1].status?.length >
											0 &&
										e.approval_log[e.approval_log.length - 1].status[0]
											.set_value === 'Approved by Manager HQ' &&
										moment(e?.end_period).isAfter(moment()) &&
										e?._id !== keywordCreateState.eligibility.program_id
								)
							]}
							value={
								programListOptions?.data?.find(
									programList =>
										programList?._id ===
										keywordCreateState.eligibility.program_id
								) || programDetail
							}
							disableClearable
							isOptionEqualToValue={(option, value) => {
								return option?._id === value?._id
							}}
							onChange={(_, value) => {
								if (value) {
									keywordCreate.eligibility.program_id = value?._id
									setStateTrigger(!stateTrigger)

									//set default start period and end period
									let program = programListOptions.data.find(
										e => e['_id'] === value?._id
									)
									keywordCreateState.eligibility.start_period =
										program?.start_period
									keywordCreate.eligibility.end_period = program?.end_period
								}
							}}
							ListboxProps={{
								onScroll: (event: React.SyntheticEvent) => {
									const listboxNode = event.currentTarget
									if (
										Math.round(
											listboxNode.scrollTop + listboxNode.clientHeight
										) === Math.round(listboxNode.scrollHeight)
									) {
										setProgramListLimit(
											previousProgramListLimit => previousProgramListLimit + 10
										)
									}
								}
							}}
							renderInput={params => (
								<OutlinedTextField
									{...params}
									isRequired
									label="Choose Program"
									placeholder="Choose Program"
									variant="outlined"
								/>
							)}
						/>

						{/* <Select
              label="Choose Program"
              placeholder="Option"
              options={programListOptions.data.filter(
                (e) =>
                  e.approval_log?.length > 0 &&
                  e.approval_log[e.approval_log.length - 1].status?.length >
                    0 &&
                  e.approval_log[e.approval_log.length - 1].status[0]
                    .set_value === "Approved by Manager HQ" &&
                  moment(e?.end_period).isAfter(moment())
              )}
              // options={programListOptions.data}
              optionLabel="name"
              value={keywordCreateState.eligibility.program_id}
              handleChange={(value: string) => {
                keywordCreate.eligibility.program_id = value;
                setStateTrigger(!stateTrigger);

                //set default start period and end period
                let program = programListOptions.data.find(
                  (e) => e["_id"] === value
                );
                keywordCreateState.eligibility.start_period =
                  program?.start_period;
                keywordCreate.eligibility.end_period = program?.end_period;
              }}
            /> */}

						{keywordCreateState.eligibility.program_id !== '' && (
							<Stack spacing="1vw">
								<BodyCopy color="primary" align="center">
									{`This Keyword must be follow program [${
										programListOptions.data.find(
											e =>
												e['_id'] === keywordCreateState.eligibility.program_id
										)?.name
									}] Information`}
								</BodyCopy>
								<Information
									program={programListOptions.data.find(
										e => e['_id'] === keywordCreateState.eligibility.program_id
									)}
								/>
							</Stack>
						)}

						<Select
							label="Program Experience"
							placeholder="Option"
							options={programExperienceOptions.data}
							value={keywordCreateState.eligibility.program_experience}
							handleChange={(value: string) => {
								keywordCreate.eligibility.program_experience = [value]
								setStateTrigger(!stateTrigger)
							}}
						/>
					</>
				)}
			</Stack>
		</Box>
	)
}

export default Program
