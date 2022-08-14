import React, {useEffect} from "react";
import {Box, CircularProgress} from "@mui/material";
import {H2, Stepper, StepperPaper} from "../../components";
import {
    MainInfo,
    Notification,
    Segmentation,
    Summary,
} from "../../components/organisms/CreateProgram";
import {CreateProgramProvider} from "../../app/context/CreateProgram/Provider";
import {useTypedSelector} from "../../app/hooks/useTypedSelector";
import {useActions} from "../../app/hooks/useActions";
import {useParams} from "react-router-dom";

const EditProgram = () => {
    const {result, error, loading} = useTypedSelector(state => state.program);
    const {programDetail} = useActions();
    let {_id} = useParams()
    useEffect(() => {
        programDetail(_id ?? '')
    }, [result, _id])

    const [activeStep, setActiveStep] = React.useState<number>(0);
    const steps = ["Main Info", "Segmentation", "Notification"];
    const stepsItem = [
        <MainInfo mainInfo={result.main_info} slug={"edit"}/>,
        <Segmentation/>,
        <Notification notification={result.notification}/>,
        // <Summary />,
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
                        Create Program
                    </H2>

                    <Stepper
                        steps={steps}
                        activeStep={activeStep}
                        setActiveStep={setActiveStep}
                    >
                        { loading ? <Box sx={{
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
