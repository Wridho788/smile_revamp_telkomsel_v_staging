import React, {FC} from 'react'
import {Box, Grid, MenuItem, Paper} from "@mui/material";
import FormCard from "../../../../../components/atoms/FormCard";
import SelectField from "../../../../../components/atoms/SelectField";
import DatePicker from "../../../../../components/atoms/Datepicker";
import TextFieldApp from "../../../../../components/atoms/TextFieldApp";
import ButtonApp from "../../../../../components/atoms/ButtonApp";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {MainInfoSummaryProps} from "./MainInfoSummary.type";

const MainInfoSummary: FC<MainInfoSummaryProps> = ({
                                                       step,
                                                       setStep,
                                                       data,
                                                       mainInfoSummaryInput,
                                                       setMainInfoSummaryInput
                                                   }) => {
    const Dummy = [
        {
            id: 1,
            value: "Dummy 1"
        },
        {
            id: 1,
            value: "Dummy 2"
        }
    ]


    const setStartPeriod = (value:string) => {
        setMainInfoSummaryInput((prev: any) => ({
            ...prev,
            start_period: value
        }))
    }
    const setEndPeriod = (value:string) => {
        setMainInfoSummaryInput((prev: any) => ({
            ...prev,
            end_period: value
        }))
    }
    return (
        <FormCard>
            <>
                <Grid container>
                    <Box onClick={() => {
                        console.log(mainInfoSummaryInput)
                    }} component={Grid} item xs={12} p={2} mt={2}>
                        <TextFieldApp label="Specific Program Name"
                                      onChange={(e: any) => {
                                          setMainInfoSummaryInput((prev: any) => ({
                                              ...prev,
                                              name: e.target.value
                                          }))
                                      }}
                        />
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <SelectField data={data.main_info.point_type} label={'Point Type'}
                                     onChange={(e: any) => {
                                         setMainInfoSummaryInput((prev: any) => ({
                                             ...prev,
                                             point_type: e.target.value
                                         }))
                                     }}
                        />
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <SelectField data={data.main_info.mechanism} label={'Mechanism'}
                                     onChange={(e: any) => {
                                         setMainInfoSummaryInput((prev: any) => ({
                                             ...prev,
                                             mechanism: e.target.value
                                         }))
                                     }}
                        />
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <SelectField data={data.main_info.owner} label={'Owner'}
                                     onChange={(e: any) => {
                                         setMainInfoSummaryInput((prev: any) => ({
                                             ...prev,
                                             owner: e.target.value
                                         }))
                                     }}
                        />
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <TextFieldApp label="Owner Detail"
                                      onChange={(e:any) => {
                                          setMainInfoSummaryInput((prev:any) => ({
                                              ...prev,
                                              owner_detail: e.target.value
                                          }))
                                      }}
                        />
                    </Box>
                    <Box component={Grid} item xs={6} p={2}>
                        <DatePicker label="Start Period" setExternalValue={setStartPeriod}/>
                    </Box>
                    <Box component={Grid} item xs={6} p={2}>
                        <DatePicker label="End Period" setExternalValue={setEndPeriod}/>
                    </Box>

                    {/*<Box component={Grid} item xs={4} p={2}>*/}
                    {/*    <SelectField data={Dummy} label={'C. Poin Balance'}/>*/}
                    {/*</Box>*/}
                    {/*<Box component={Grid} item xs={4} p={2}>*/}
                    {/*    <TextFieldApp label="Start Numeric"/>*/}
                    {/*</Box>*/}
                    <Box component={Grid} item xs={4} p={2}>
                        <TextFieldApp label="Customer Poin Balance"
                                      onChange={(e:any) => {
                                          setMainInfoSummaryInput((prev:any) => ({
                                              ...prev,
                                              c_point_balance: e.target.value
                                          }))
                                      }}
                        />
                    </Box>

                    <Box component={Grid} item xs={4} p={2}>
                        <SelectField data={data.main_info.c_los_enable} label={'C. LOS Enabled'}
                                     onChange={(e:any) => {
                                         setMainInfoSummaryInput((prev:any) => ({
                                             ...prev,
                                             c_point_balance: e.target.value
                                         }))
                                     }}
                        />
                    </Box>
                    <Box component={Grid} item xs={4} p={2}>
                        <SelectField data={data.main_info.los_type} label={'C. LOS Type'}/>
                    </Box>
                    <Box component={Grid} item xs={4} p={2}>
                        <TextFieldApp label="C Los Value"
                                      onChange={(e: any) => {
                                          setMainInfoSummaryInput((prev: any) => ({
                                              ...prev,
                                              c_los_value: e.target.value
                                          }))
                                      }}
                        />
                    </Box>
                </Grid>

                <Grid container justifyContent={"center"} alignContent={'center'} alignItems={'center'}>
                    <Box mt={2} component={Grid} xs={11} pb={2}>
                        <Grid container justifyContent={"space-between"}>
                            <Box component={Grid} item xs={2}>
                                {
                                    step !== 0 &&
                                    <ButtonApp onClick={() => {
                                        step > 0 && setStep(step - 1)
                                    }} icon={<ArrowBackIcon/>} label={"Back"}/>
                                }
                            </Box>
                            <Box component={Grid} item xs={2}>
                                <ButtonApp onClick={() => {
                                    step < 4 && setStep(step + 1)
                                }} icon={<ArrowForwardIcon/>} label={"Next"}/>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </>
        </FormCard>
    )
}

export default MainInfoSummary
