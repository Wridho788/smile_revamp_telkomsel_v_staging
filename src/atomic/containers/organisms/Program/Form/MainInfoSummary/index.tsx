import React, {FC} from 'react'
import {Box, Grid, MenuItem, Paper} from "@mui/material";
import FormCard from "../../../../../components/atoms/FormCard";
import SelectField from "../../../../../components/atoms/SelectField";
import DatePicker from "../../../../../components/atoms/Datepicker";
import TextFieldApp from "../../../../../components/atoms/TextFieldApp";
import ButtonApp from "../../../../../components/atoms/ButtonApp";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGeneralProgramRegistration from "../../../../pages/GeneralProgramRegistration/useGeneralProgramRegistration";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {MainInfoSummaryProps} from "./MainInfoSummary.type";

const MainInfoSummary: FC<MainInfoSummaryProps> = ({step, setStep}) => {
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
    return (
        <FormCard>
            <>
                <Grid container>
                    <Box component={Grid} item xs={12} p={2} mt={2}>
                        <TextFieldApp label="Specific Program Name"/>
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <SelectField data={Dummy} label={'Point Type'}/>
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <SelectField data={Dummy} label={'Mechanism'}/>
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <SelectField data={Dummy} label={'Owner'}/>
                    </Box>
                    <Box component={Grid} item xs={12} p={2}>
                        <TextFieldApp label="Owner Detail"/>
                    </Box>
                    <Box component={Grid} item xs={6} p={2}>
                        <DatePicker label="Start Period"/>
                    </Box>
                    <Box component={Grid} item xs={6} p={2}>
                        <DatePicker label="End Period"/>
                    </Box>

                    <Box component={Grid} item xs={4} p={2}>
                        <SelectField data={Dummy} label={'C. Poin Balance'}/>
                    </Box>
                    <Box component={Grid} item xs={4} p={2}>
                        <TextFieldApp label="Start Numeric"/>
                    </Box>
                    <Box component={Grid} item xs={4} p={2}>
                        <TextFieldApp label="End Numeric"/>
                    </Box>

                    <Box component={Grid} item xs={4} p={2}>
                        <SelectField data={Dummy} label={'C. LOS Enabled'}/>
                    </Box>
                    <Box component={Grid} item xs={4} p={2}>
                        <SelectField data={Dummy} label={'C. LOS Type'}/>
                    </Box>
                    <Box component={Grid} item xs={4} p={2}>
                        <SelectField data={Dummy} label={'C. LOS Value'}/>
                    </Box>
                </Grid>

                <Grid container justifyContent={"center"} alignContent={'center'} alignItems={'center'}>
                    <Box mt={2} component={Grid} xs={11} pb={2}>
                        <Grid container justifyContent={"space-between"}>
                            <Box component={Grid} item xs={2}>
                                {
                                    step !== 0 &&
                                    <ButtonApp onClick={() => {step > 0 && setStep(step - 1)}} icon={<ArrowBackIcon />} label={"Back"}/>
                                }
                            </Box>
                            <Box component={Grid} item xs={2}>
                                <ButtonApp onClick={() => {step < 4 && setStep(step + 1)}} icon={<ArrowForwardIcon />} label={"Next"}/>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </>
        </FormCard>
    )
}

export default MainInfoSummary