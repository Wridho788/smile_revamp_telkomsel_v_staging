import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Autocomplete, Button, Grid, IconButton, Stack } from '@mui/material'
import {
	Select,
	OutlinedTextField,
	ResponsiveDateTimePicker,
	Subtitle,
	BodyCopy,
	ResponsiveTimePicker,
	ResponsiveDatePicker
} from '../../../../atoms'
// import { useCustomerBadgeListQuery } from "../../../../../redux/features/customer/customer-api-slice";
import {
	useGetPointTypeQuery,
	useGetProgramExperienceQuery
} from '../../../../../redux/features/lov/lov-api-slice'
import { FilterInitial } from '../../../../../redux/utils/initial-general'
import { useChannelListQuery } from '../../../../../redux/features/channel/channel-api-slice'
import {
	ICreateKeyword,
	IKeywordNotificationEligibility
} from '../../interfaces'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import {
	BooleanOptions,
	KeywordScheduleTypeOptions,
	MaxModeOptions,
	PoinValueOptions
} from '../../options'
import { useProgramListQuery } from '../../../../../redux/features/program/program-api-slice'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InputAdornment from '@mui/material/InputAdornment'
import { parseISO } from 'date-fns'
import { strToInt, thousandSeparator } from '../../../../../utils'
import TextArea from 'components/atoms/TextArea'
import moment from 'moment'
import Channel from './Channel'
import { useKeywordNameExistingQuery } from 'redux/features/keyword/keyword-api-slice'
import { useAppDispatch, useAppSelector } from 'service/hooks'
import { SET_KEYWORD_VALIDATION } from 'redux/features/keyword/create-keyword-validation-slice'
import Swal from 'sweetalert2'
import { KeywordNotificationEligibility } from '../../initial'

interface IGeneralProps {
	keywordCreateState: ICreateKeyword
	keywordCreate: ICreateKeyword
	stateTrigger: boolean
	setStateTrigger: Dispatch<SetStateAction<boolean>>
}

const General: React.FunctionComponent<IGeneralProps> = ({
	keywordCreateState,
	keywordCreate,
	stateTrigger,
	setStateTrigger
}) => {
	const [programListLimit, setProgramListLimit] = useState<number>(100)

	const dispatch = useAppDispatch()
	const [expanded, setExpanded] = React.useState<boolean>(true)
	const { data: pointTypeOptions = { data: [] } } = useGetPointTypeQuery()
	const {
		data: programListOptions = { data: [] },
		refetch: programListRefetch
	} = useProgramListQuery({
		...FilterInitial,
		limit: programListLimit
	})
	const { data: channelOptions = { data: [] } } =
		useChannelListQuery(FilterInitial)
	const { data: programExperienceOptions = { data: [] } } =
		useGetProgramExperienceQuery()
	const keywordName = useAppSelector(
		state => state.createKeywordValidationSlice.keywordName
	)
	const keywordNotificationEligibility: IKeywordNotificationEligibility[] =
		KeywordNotificationEligibility
	// const { data: customerBadgeOptions = { data: [] } } =
	//   useCustomerBadgeListQuery(FilterInitial);

	useEffect(() => {
		if (programListLimit !== 100) {
			programListRefetch()
		}
	}, [programListLimit, programListRefetch])

	return (
		<Accordion
			id="createKeywordGeneralMainInfo"
			expanded={expanded}
			onChange={() => setExpanded(!expanded)}
			sx={{ p: '1vw' }}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon fontSize="large" />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Subtitle textTransform="uppercase">
					general redeem eligibility
				</Subtitle>
			</AccordionSummary>
			<AccordionDetails>
				<Stack spacing="1vw" px="2vw" py="0.5vw">
					{/* <OutlinedTextField
            label="Keyword Group"
            placeholder="Keyword Group"
            variant="outlined"
            value={keywordCreateState.eligibility.keyword_parent}
            handleChange={(value: string) => {
              keywordCreate.eligibility.keyword_parent = value;
              setStateTrigger(!stateTrigger);
            }}
          /> */}

					<OutlinedTextField
						label={
							programExperienceOptions.data
								.find(
									e =>
										e['_id'] ===
										keywordCreateState.eligibility.program_experience[0]
								)
								?.set_value?.includes('Auction')
								? 'Keyword Bid Name'
								: 'Keyword Redeem Name'
						}
						error={keywordName === '' ? false : true}
						helperText={keywordName === '' ? '' : keywordName}
						placeholder="Merdeka2000"
						variant="outlined"
						inputProps={{ maxLength: 16 }}
						value={keywordCreateState.eligibility.name}
						handleChange={(value: string) => {
							keywordCreate.eligibility.name = value
								.replace(/[^a-zA-Z0-9]/g, '')
								.toUpperCase()
							keywordNotificationEligibility[1].keyword_name = value
								.replace(/[^a-zA-Z0-9]/g, '')
								.toUpperCase()
							keywordNotificationEligibility[2].keyword_name = value
								.replace(/[^a-zA-Z0-9]/g, '')
								.toUpperCase()
							keywordNotificationEligibility[3].keyword_name = value
								.replace(/[^a-zA-Z0-9]/g, '')
								.toUpperCase()
							setStateTrigger(!stateTrigger)
						}}
					/>
					<OutlinedTextField
						isRequired={false}
						label="Program Name to be Expose"
						placeholder="Program Name to be Expose"
						variant="outlined"
						value={keywordCreateState.eligibility.program_title_expose}
						handleChange={(value: string) => {
							keywordCreate.eligibility.program_title_expose = value
							setStateTrigger(!stateTrigger)
						}}
					/>
					<ResponsiveDateTimePicker
						label="Start Period"
						placeholder="Start Period"
						minDateTime={parseISO(
							programListOptions.data.find(
								e => e['_id'] === keywordCreateState.eligibility.program_id
							)?.start_period
						)}
						value={keywordCreateState.eligibility.start_period}
						handleChange={(value: string) => {
							keywordCreate.eligibility.start_period = value
							if (
								Date.parse(keywordCreateState.eligibility.end_period) <=
								Date.parse(value)
							) {
								keywordCreate.eligibility.end_period = value
							}
							setStateTrigger(!stateTrigger)
						}}
					/>
					<ResponsiveDateTimePicker
						label="End Period"
						placeholder="End Period"
						minDateTime={keywordCreateState.eligibility.start_period}
						maxDateTime={parseISO(
							programListOptions.data.find(
								e => e['_id'] === keywordCreateState.eligibility.program_id
							)?.end_period
						)}
						value={keywordCreateState.eligibility.end_period}
						handleChange={(value: string) => {
							keywordCreate.eligibility.end_period = value
							setStateTrigger(!stateTrigger)
						}}
					/>
					{/* <Select
            label="POIN Type"
            placeholder="Option"
            options={pointTypeOptions.data}
            value={keywordCreateState.eligibility.point_type}
            handleChange={(value: string) => {
              keywordCreate.eligibility.point_type = value;
              setStateTrigger(!stateTrigger);
            }}
          /> */}
					<Select
						label="POIN Value"
						placeholder="Option"
						options={PoinValueOptions}
						value={keywordCreateState.eligibility.poin_value}
						handleChange={(value: string) => {
							keywordCreate.eligibility.poin_value = value
							setStateTrigger(!stateTrigger)
						}}
					/>
					{!programExperienceOptions.data
						.find(
							e =>
								e['_id'] ===
								keywordCreateState.eligibility.program_experience[0]
						)
						?.set_value?.includes('Auction') && (
						<OutlinedTextField
							type="number"
							label="POIN Redeemed"
							variant="outlined"
							InputProps={{ inputProps: { min: 0 } }}
							value={keywordCreateState.eligibility.poin_redeemed.toString()}
							handleChange={(value: number) => {
								keywordCreate.eligibility.poin_redeemed = Number(value)
								setStateTrigger(!stateTrigger)
							}}
						/>
					)}
					{!programExperienceOptions.data
						.find(
							e =>
								e['_id'] ===
								keywordCreateState.eligibility.program_experience[0]
						)
						?.set_value?.includes('Auction') && (
						<Select
							isRequired={false}
							label="Max Mode"
							placeholder="Option"
							options={MaxModeOptions}
							value={keywordCreateState.eligibility.max_mode}
							handleChange={(value: string) => {
								keywordCreate.eligibility.max_mode = value
								setStateTrigger(!stateTrigger)
							}}
						/>
					)}
					<OutlinedTextField
						type="number"
						label="Max Redeem Counter"
						variant="outlined"
						InputProps={{ inputProps: { min: 0 } }}
						value={keywordCreateState.eligibility.max_redeem_counter.toString()}
						handleChange={(value: number) => {
							keywordCreate.eligibility.max_redeem_counter = Number(value)
							setStateTrigger(!stateTrigger)
						}}
					/>
					{!programExperienceOptions.data
						.find(
							e =>
								e['_id'] ===
								keywordCreateState.eligibility.program_experience[0]
						)
						?.set_value?.includes('Auction') && (
						<Select
							label="Merchandise Keyword"
							placeholder="Option"
							options={BooleanOptions}
							value={keywordCreateState.eligibility.merchandise_keyword}
							handleChange={(value: boolean) => {
								keywordCreate.eligibility.merchandise_keyword = value
								setStateTrigger(!stateTrigger)
							}}
						/>
					)}
					<Select
						label="SMS Masking"
						placeholder="Option"
						options={BooleanOptions}
						value={keywordCreateState.eligibility.enable_sms_masking}
						handleChange={(value: boolean) => {
							keywordCreate.eligibility.enable_sms_masking = value
							setStateTrigger(!stateTrigger)
						}}
					/>
					{keywordCreateState.eligibility.enable_sms_masking !== false && (
						<TextArea
							label="SMS Masking Content"
							rows={4}
							min={10}
							max={100}
							value={keywordCreateState.eligibility.sms_masking}
							onChange={e => {
								keywordCreate.eligibility.sms_masking = e.target.value
								setStateTrigger(!stateTrigger)
							}}
						/>
					)}
					<Select
						label={
							programExperienceOptions.data
								.find(
									e =>
										e['_id'] ===
										keywordCreateState.eligibility.program_experience[0]
								)
								?.set_value?.includes('Auction')
								? 'Auction Phase'
								: 'Keyword Schedule'
						}
						placeholder="Option"
						options={KeywordScheduleTypeOptions}
						value={keywordCreateState.eligibility.keyword_schedule}
						handleChange={(value: string) => {
							keywordCreate.eligibility.keyword_schedule = value
							keywordCreate.eligibility.keyword_shift = [
								{
									from: new Date(),
									to: new Date()
								}
							]
							setStateTrigger(!stateTrigger)
						}}
					/>
					{keywordCreateState.eligibility.keyword_schedule === 'Shift' && (
						<Grid container columns={10}>
							<Grid item xs={4}>
								<BodyCopy>Shift</BodyCopy>
							</Grid>
							<Grid item xs={6}>
								<Stack gap="1vw">
									{keywordCreate.eligibility.keyword_shift.map((_, idx) => (
										<Grid
											key={`keywordScheduleShift__item__${idx}`}
											container
											columns={7}
											spacing="1vw"
										>
											<Grid item xs={3}>
												<ResponsiveTimePicker
													direction="column"
													label="From"
													placeholder="From"
													value={
														keywordCreateState.eligibility.keyword_shift[idx]
															.from
													}
													handleChange={(value: any) => {
														keywordCreate.eligibility.keyword_shift[idx].from =
															value
														if (
															Date.parse(
																keywordCreateState.eligibility.keyword_shift[
																	idx
																].to
															) <= Date.parse(value)
														) {
															keywordCreate.eligibility.keyword_shift[idx].to =
																value
														}
														setStateTrigger(!stateTrigger)
													}}
												/>
											</Grid>
											<Grid item xs={3}>
												<ResponsiveTimePicker
													direction="column"
													label="To"
													placeholder="To"
													minTime={
														keywordCreateState.eligibility.keyword_shift[idx]
															.from
													}
													value={
														keywordCreateState.eligibility.keyword_shift[idx].to
													}
													handleChange={(value: any) => {
														keywordCreate.eligibility.keyword_shift[idx].to =
															value
														setStateTrigger(!stateTrigger)
													}}
												/>
											</Grid>
											<Grid
												item
												xs={1}
												display="flex"
												justifyContent="end"
												alignItems="center"
												mt="1.3vw"
											>
												<IconButton
													onClick={() => {
														keywordCreate.eligibility.keyword_shift.length >
															1 &&
															keywordCreate.eligibility.keyword_shift.splice(
																idx,
																1
															)
														setStateTrigger(!stateTrigger)
													}}
													aria-label="delete"
													size="large"
													sx={{ color: 'primary.main' }}
												>
													<DeleteIcon fontSize="inherit" />
												</IconButton>
											</Grid>
										</Grid>
									))}
									<Button
										onClick={() => {
											keywordCreate.eligibility.keyword_shift.push({
												from: new Date(),
												to: new Date()
											})
											setStateTrigger(!stateTrigger)
										}}
										color="primary"
										startIcon={<AddBoxIcon fontSize="large" />}
										sx={{
											paddingInline: '1.5vw',
											paddingBlock: '0.5vw'
										}}
									>
										Add Shift Time
									</Button>
								</Stack>
							</Grid>
						</Grid>
					)}
					{/* {keywordCreateState.eligibility.keyword_schedule === "Daily" && (
            <Grid container columns={10}>
              <Grid item xs={4}>
                <BodyCopy>Daily</BodyCopy>
              </Grid>
              <Grid item xs={6}>
                <Stack gap="1vw">
                  {keywordCreate.eligibility.keyword_shift.map((_, idx) => (
                    <Grid
                      key={`keywordScheduleShift__item__${idx}`}
                      container
                      columns={7}
                      spacing="1vw"
                    >
                      <Grid item xs={3}>
                        <ResponsiveDatePicker
                          direction="column"
                          label="From"
                          placeholder="From"
                          value={
                            keywordCreateState.eligibility.keyword_shift[idx]
                              .from
                          }
                          handleChange={(value: any) => {
                            keywordCreate.eligibility.keyword_shift[idx].from =
                              value;
                            if (
                              Date.parse(
                                keywordCreateState.eligibility.keyword_shift[
                                  idx
                                ].to
                              ) <= Date.parse(value)
                            ) {
                              keywordCreate.eligibility.keyword_shift[idx].to =
                                value;
                            }
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ResponsiveDatePicker
                          direction="column"
                          label="To"
                          placeholder="To"
                          minDate={
                            keywordCreateState.eligibility.keyword_shift[idx]
                              .from
                          }
                          value={
                            keywordCreateState.eligibility.keyword_shift[idx].to
                          }
                          handleChange={(value: any) => {
                            keywordCreate.eligibility.keyword_shift[idx].to =
                              value;

                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        mt="1.3vw"
                      >
                        <IconButton
                          onClick={() => {
                            keywordCreate.eligibility.keyword_shift.length >
                              1 &&
                              keywordCreate.eligibility.keyword_shift.splice(
                                idx,
                                1
                              );
                            setStateTrigger(!stateTrigger);
                          }}
                          aria-label="delete"
                          size="large"
                          sx={{ color: "primary.main" }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    onClick={() => {
                      keywordCreate.eligibility.keyword_shift.push({
                        from: new Date(),
                        to: new Date(),
                      });
                      setStateTrigger(!stateTrigger);
                    }}
                    color="primary"
                    startIcon={<AddBoxIcon fontSize="large" />}
                    sx={{
                      paddingInline: "1.5vw",
                      paddingBlock: "0.5vw",
                    }}
                  >
                    Add Daily Time
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )} */}
					{/* {keywordCreateState.eligibility.keyword_schedule === "Hourly" && (
            <Grid container columns={10}>
              <Grid item xs={4}>
                <BodyCopy>Hourly</BodyCopy>
              </Grid>
              <Grid item xs={6}>
                <Stack gap="1vw">
                  {keywordCreate.eligibility.keyword_shift.map((_, idx) => (
                    <Grid
                      key={`keywordScheduleShift__item__${idx}`}
                      container
                      columns={7}
                      spacing="1vw"
                    >
                      <Grid item xs={3}>
                        <ResponsiveTimePicker
                          direction="column"
                          label="From"
                          placeholder="From"
                          value={
                            keywordCreateState.eligibility.keyword_shift[idx]
                              .from
                          }
                          handleChange={(value: any) => {
                            keywordCreate.eligibility.keyword_shift[idx].from =
                              value;
                            if (
                              Date.parse(
                                keywordCreateState.eligibility.keyword_shift[
                                  idx
                                ].to
                              ) <= Date.parse(value)
                            ) {
                              keywordCreate.eligibility.keyword_shift[idx].to =
                                value;
                            }
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <ResponsiveTimePicker
                          direction="column"
                          label="To"
                          placeholder="To"
                          minTime={
                            keywordCreateState.eligibility.keyword_shift[idx]
                              .from
                          }
                          value={
                            keywordCreateState.eligibility.keyword_shift[idx].to
                          }
                          handleChange={(value: any) => {
                            keywordCreate.eligibility.keyword_shift[idx].to =
                              value;
                            setStateTrigger(!stateTrigger);
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        mt="1.3vw"
                      >
                        <IconButton
                          onClick={() => {
                            keywordCreate.eligibility.keyword_shift.length >
                              1 &&
                              keywordCreate.eligibility.keyword_shift.splice(
                                idx,
                                1
                              );
                            setStateTrigger(!stateTrigger);
                          }}
                          aria-label="delete"
                          size="large"
                          sx={{ color: "primary.main" }}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    onClick={() => {
                      keywordCreate.eligibility.keyword_shift.push({
                        from: new Date(),
                        to: new Date(),
                      });
                      setStateTrigger(!stateTrigger);
                    }}
                    color="primary"
                    startIcon={<AddBoxIcon fontSize="large" />}
                    sx={{
                      paddingInline: "1.5vw",
                      paddingBlock: "0.5vw",
                    }}
                  >
                    Add Hourly Time
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          )} */}
					<Select
						isRequired={false}
						label="Subsidized Program"
						placeholder="Option"
						options={BooleanOptions}
						value={keywordCreateState.eligibility.program_bersubsidi}
						handleChange={(value: boolean) => {
							keywordCreate.eligibility.program_bersubsidi = value
							setStateTrigger(!stateTrigger)
						}}
					/>
					<OutlinedTextField
						isRequired={false}
						label="Total Budget"
						variant="outlined"
						InputProps={{
							inputProps: { min: 0 },
							startAdornment: (
								<InputAdornment position="start">Rp</InputAdornment>
							)
						}}
						value={thousandSeparator(
							keywordCreateState.eligibility.total_budget
						)}
						handleChange={(value: string) => {
							const res = strToInt(value)
							keywordCreate.eligibility.total_budget = Number(res)
							setStateTrigger(!stateTrigger)
						}}
					/>
					<OutlinedTextField
						isRequired={false}
						type="number"
						label="Customer Value"
						variant="outlined"
						InputProps={{ inputProps: { min: 0 } }}
						value={keywordCreateState.eligibility.customer_value.toString()}
						handleChange={(value: number) => {
							keywordCreate.eligibility.customer_value = Number(value)
							setStateTrigger(!stateTrigger)
						}}
					/>
					{!programExperienceOptions.data
						.find(
							e =>
								e['_id'] ===
								keywordCreateState.eligibility.program_experience[0]
						)
						?.set_value?.includes('Auction') && (
						<Select
							isRequired={false}
							label="Multiwhitelist"
							placeholder="Option"
							options={BooleanOptions}
							value={keywordCreateState.eligibility.multiwhitelist}
							handleChange={(value: boolean) => {
								keywordCreate.eligibility.multiwhitelist = value
								setStateTrigger(!stateTrigger)
							}}
						/>
					)}
					{!programExperienceOptions.data
						.find(
							e =>
								e['_id'] ===
								keywordCreateState.eligibility.program_experience[0]
						)
						?.set_value?.includes('Auction') &&
						keywordCreateState.eligibility.multiwhitelist !== false && (
							<>
								<Autocomplete
									disablePortal
									getOptionLabel={option => option.name}
									options={[
										...programListOptions.data.filter(
											e =>
												e.approval_log?.length > 0 &&
												e.approval_log[e.approval_log.length - 1].status
													?.length > 0 &&
												e.approval_log[e.approval_log.length - 1].status[0]
													.set_value === 'Approved by Manager HQ' &&
												moment(e?.end_period).isAfter(moment())
										)
									]}
									disableClearable
									value={
										programListOptions.data?.find(
											programList =>
												programList?._id ===
												keywordCreateState.eligibility.multiwhitelist_program
										) ||
										keywordCreateState.eligibility.multiwhitelist_program ||
										undefined
									}
									onChange={(_, value) => {
										if (value) {
											keywordCreate.eligibility.multiwhitelist_program =
												value?._id
											setStateTrigger(!stateTrigger)
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
													previousProgramListLimit =>
														previousProgramListLimit + 10
												)
											}
										}
									}}
									renderInput={params => (
										<OutlinedTextField
											{...params}
											isRequired
											label="Multiwhitelist Destination"
											placeholder="Multiwhitelist Destination"
											variant="outlined"
										/>
									)}
								/>

								{/* <Select
                isRequired={false}
                label="Multiwhitelist Destination"
                placeholder="Option"
                options={programListOptions.data}
                optionLabel="name"
                value={keywordCreateState.eligibility.multiwhitelist_program}
                handleChange={(value: string) => {
                  keywordCreate.eligibility.multiwhitelist_program = value;
                  setStateTrigger(!stateTrigger);
                }}
              /> */}
							</>
						)}
					<Select
						isRequired={false}
						label="Channel Validation"
						placeholder="Option"
						options={BooleanOptions}
						value={keywordCreateState.eligibility.channel_validation}
						handleChange={(value: boolean) => {
							keywordCreate.eligibility.channel_validation = value
							setStateTrigger(!stateTrigger)
						}}
					/>
					{keywordCreateState.eligibility.channel_validation !== false && (
						<Channel keywordCreate={keywordCreate} />
					)}
					{/* {keywordCreateState.eligibility.channel_validation !== false && (
            <Select
              isRequired={false}
              multiple
              label="Channel List"
              placeholder="Option"
              options={channelOptions.data}
              optionLabel="name"
              value={keywordCreateState.eligibility.channel_validation_list}
              handleChange={(value: []) => {
                keywordCreate.eligibility.channel_validation_list = value;
                setStateTrigger(!stateTrigger);
              }}
            />
          )} */}
					{/* <Select
            multiple
            label="Program Experience"
            placeholder="Option"
            options={customerBadgeOptions.data}
            optionLabel="name"
            value={keywordCreateState.eligibility.program_experience}
            handleChange={(value: []) => {
              keywordCreate.eligibility.program_experience = value;
              setStateTrigger(!stateTrigger);
            }}
          /> */}
				</Stack>
			</AccordionDetails>
		</Accordion>
	)
}

export default General
