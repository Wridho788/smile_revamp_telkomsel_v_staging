import React, {FC} from 'react'
import {Box, Grid, MenuItem, Paper} from "@mui/material";
import FormCard from "../../../../../components/atoms/FormCard";
import SelectField from "../../../../../components/atoms/SelectField";
import DatePicker from "../../../../../components/atoms/Datepicker";
import TextFieldApp from "../../../../../components/atoms/TextFieldApp";
import ButtonApp from "../../../../../components/atoms/ButtonApp";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useGeneralProgramRegistration from "../../../../pages/GeneralProgramRegistration/useGeneralProgramRegistration";

const MainInfoSummary: FC = () => {
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
            </>
        </FormCard>
    )
}

export default MainInfoSummary