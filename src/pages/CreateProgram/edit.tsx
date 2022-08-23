import React, {useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import {H2, Stepper, StepperPaper} from "../../components";
import {
    MainInfo,
    Notification,
    Segmentation,
} from "../../components/organisms/CreateProgram";
import {CreateProgramProvider} from "../../app/context/CreateProgram/Provider";
import {useParams} from "react-router-dom";
import {useDetailProgramQuery} from "../../redux/features/program/program-api-slice";
import {ProgramDetailInitial} from "../../app/redux/Utils/InitialState/ProgramInitial";

const EditProgram = () => {
    let {_id} = useParams()
    let ProgramDetail = ProgramDetailInitial.data
    const {data = ProgramDetailInitial.data, isLoading} = useDetailProgramQuery(_id ?? '')
    useEffect(() => {
        ProgramDetail = data
    }, [data]);

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const steps = ["Main Info", "Segmentation", "Notification"];
    const stepsItem = [
        <MainInfo slug={"edit"}/>,
        <Segmentation/>,
        <Notification/>,
    ];

    return (
        <CreateProgramProvider>
            <Box
                sx={{
                    paddingBlock: "3vw",
                    paddingInline: "20vw",
                }}
            >
                <StepperPaper sx={{paddingTop: "4vw"}}>
                    <H2 textAlign="center" mb="2vw">
                        Edit Program
                    </H2>

                    <Stepper
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    >
                        {isLoading ? <Box sx={{
                                display: 'flex',
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "50vh"
                            }}>
                                <CircularProgress/>
                            </Box>
                            :
                            stepsItem[activeStep]
                        }
                    </Stepper>
                </StepperPaper>
            </Box>
        </CreateProgramProvider>
    );
};

export default EditProgram;
