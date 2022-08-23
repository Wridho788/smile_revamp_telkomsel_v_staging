import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {BodyCopy} from "../Typography";
import {styled} from "@mui/material/styles";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import {StepIconProps} from "@mui/material/StepIcon";
import {CreateProgramInitial, ProgramDetailInitial} from "../../../app/redux/Utils/InitialState/ProgramInitial";
import {useCreateProgramMutation, useUpdateProgramMutation} from "../../../redux/features/program/program-api-slice";
import {CircularProgress} from "@mui/material";
import {CreateKeywordInitial} from "../../../pages/CreateKeyword/initial";
import {CreateKeywordGeneral} from "../../organisms/CreateKeyword/initial";
import {useKeywordGeneralCreateMutation} from "../../../redux/features/keyword/keyword-api-slice";
import {useEffect, useState} from "react";

const ColorlibConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 33,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: theme.palette.secondary.dark,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 5,
        border: 0,
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({theme, ownerState}) => ({
    backgroundColor: theme.palette.background.paper,
    zIndex: 1,
    color: "rgba(0, 26, 65, 0.2)",
    fontFamily: "sans-serif",
    fontSize: 24,
    fontWeight: "bold",
    width: 70,
    height: 70,
    display: "flex",
    border: "5px solid",
    borderColor: theme.palette.secondary.main,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.secondary.dark,
        border: "5px solid",
        borderColor: theme.palette.secondary.dark,
    }),
    ...(ownerState.completed && {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.secondary.dark,
        border: "5px solid",
        borderColor: theme.palette.secondary.dark,
    }),
}));

function ColorlibStepIcon(props: StepIconProps) {
    const {active, completed, className} = props;

    const icons: { [index: string]: React.ReactElement | number | string } = {
        // If you want to change the number to be an Icon, you can use the example below
        // 1: <SettingsIcon />,
        // 2: <GroupAddIcon />,
        // 3: <VideoLabelIcon />,
        1: "1",
        2: "2",
        3: "3",
        4: "4",
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{completed, active}}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

export default function HorizontalLinearStepper({
                                                    children,
                                                    optionalStep = 0,
                                                    steps,
                                                    activeStep,
                                                    setActiveStep,
                                                    slug, type
                                                }: {
    children?: any;
    optionalStep?: number;
    steps?: any;
    activeStep?: any;
    setActiveStep?: any;
    slug?: string,
    type?: string
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [createProgram] = useCreateProgramMutation()
    const [updateProgram] = useUpdateProgramMutation()
    const [createKeywordGeneral] = useKeywordGeneralCreateMutation()
    const [skipped, setSkipped] = React.useState<Set<number>>(new Set<number>());
    useEffect(() => {
    }, [isLoading]);

    const isStepOptional = (step: number) => {
        return optionalStep ? step === optionalStep : false;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = async () => {
        if (activeStep === 2) {
            setIsLoading(true)
            if (type === "program") {
                slug === "insert" ? await createProgram(CreateProgramInitial) : await updateProgram(CreateProgramInitial)
                window.location.href = '/program-management'
            } else {
                slug === "insert" ? await createKeywordGeneral(CreateKeywordGeneral) : await updateProgram(CreateKeywordGeneral)
                // window.location.href = '/keyword'
            }
            setIsLoading(false)
        }

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleShowList = () => {
        window.location.href = '/program-management'
    };

    return (
        <Box sx={{width: "100%"}}>
            {
                isLoading && <Box sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh"
                }}>
                    <CircularProgress/>
                </Box>
            }
            <Box>
                <Stepper
                    alternativeLabel
                    activeStep={activeStep}
                    connector={<ColorlibConnector/>}
                    sx={{mb: "3vw"}}
                >
                    {steps.map((label: any, index: any) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepOptional(index)) {
                            labelProps.optional = (
                                <Typography variant="caption">Optional</Typography>
                            );
                        }
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>
                                    <BodyCopy>{label}</BodyCopy>
                                </StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
            </Box>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Box sx={{display: "flex", flexDirection: "row", pt: 2}}>
                        <Box sx={{flex: "1 1 auto"}}/>
                        <Button onClick={handleShowList}>Show List</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box>{children}</Box>
                    <Box sx={{display: "flex", flexDirection: "row", mt: "3vw"}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            color="inherit"
                            sx={{
                                width: "50%",
                                borderTop: "3px solid",
                                borderRight: "1.5px solid",
                                borderColor: "secondary.main",
                                borderRadius: 0,
                                paddingBlock: "1vw",
                            }}
                        >
                            Back
                        </Button>
                        <Box sx={{flex: "1 1 auto"}}/>
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                                Skip
                            </Button>
                        )}
                        <Button
                            onClick={handleNext}
                            color="primary"
                            sx={{
                                width: "50%",
                                borderTop: "3px solid",
                                borderLeft: "1.5px solid",
                                borderColor: "secondary.main",
                                borderRadius: 0,
                                paddingBlock: "1vw",
                            }}
                        >
                            {activeStep === steps.length - 1 ? (slug === "insert" ? "Create" : "Update") : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
