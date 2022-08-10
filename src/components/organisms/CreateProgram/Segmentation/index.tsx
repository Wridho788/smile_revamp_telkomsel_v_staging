import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Pagination,
    Stack,
} from "@mui/material";
import {BodyCopy} from "../../../atoms";
import KeywordSearch from "../../../atoms/KeywordSearch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";
import {tabTitles} from "../../../../mocks/tabTitles";
import {useTypedSelector} from "../../../../app/hooks/useTypedSelector";
import {useActions} from "../../../../app/hooks/useActions";
import {useEffect, useState} from "react";
import {ISegmentation} from "../../../../app/redux/Utils/Interface/IProgram";
import {ProgramSegmentationInitial} from "../../../../app/redux/Utils/InitialState/ProgramInitial";

interface ISegmentationProps {
    segmentation: ISegmentation
}

const Segmentation: React.FunctionComponent<ISegmentationProps> = ({segmentation}: ISegmentationProps) => {
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const programSegmentation = ProgramSegmentationInitial
    const [msisdn, setMsisdn] = React.useState(segmentation.customer_msisdn);
    const [badges, setBadges] = React.useState(segmentation.customer_badges);
    const [location, setLocation] = React.useState(segmentation.customer_location);
    const [brand, setBrand] = React.useState(segmentation.customer_brand);
    const [preferences, setPreferences] = React.useState(segmentation.customer_preferences);
    const [type, setType] = React.useState(segmentation.customer_type);
    const [state, setState] = useState(segmentation.customer_badges);
    const onClickCard = (id: number) => {
        setActiveTab(id)
        switch (id) {
            case 0 :
               return setState(badges)
            case 1 :
               return setState(location)
            case 2 :
                return setState(brand)
            case 3 :
                return setState(preferences)
        }
    }
    React.useEffect(() => {
        programSegmentation.customer_msisdn = msisdn

        return;
    }, [
        programSegmentation,
        msisdn,
    ]);


    return (
        <Box
            border="0.1vw solid rgba(0, 0, 0, 0.1)"
            borderRadius="0.3vw"
            pt="2vw"
            pb="3vw"
            px="3vw"
        >
            <Tabs
                value={activeTab}
                onChange={(event: React.SyntheticEvent, newValue: number) => {
                    onClickCard(newValue);
                }}
                variant="scrollable"
                scrollButtons="auto"
            >
                {tabTitles.map((tabTitle, idx) => (
                    <Tab key={`tabTitle__${idx}`} label={tabTitle}/>
                ))}
            </Tabs>
            <Grid container columns={11} mt="2vw" position="relative">
                <Grid item xs={5} px="1vw">
                    <Stack spacing={"1vw"}>
                        <BodyCopy pl="0.5vw">List of {tabTitles[activeTab]} Items</BodyCopy>
                        <Grid container columns={10}>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <KeywordSearch
                                    sx={{minWidth: "100%", borderRadius: "0.3vw"}}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IconButton
                                    aria-label="filter"
                                    size="large"
                                    sx={{color: "primary.main"}}
                                >
                                    <FilterAltIcon color="disabled" fontSize="inherit"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <FormGroup>
                            {state.map((data: any, idx: any) => (
                                <Grid container columns={10} key={`checkActiveItem__${idx}`}>
                                    <Grid
                                        item
                                        xs={8}
                                        display="flex"
                                        alignItems="center"
                                        pl="0.5vw"
                                    >
                                        <FormControlLabel
                                            key={`checkBox__${idx}`}
                                            control={<Checkbox/>}
                                            label={data['name']}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={2}
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        visibility="hidden"
                                    >
                                        <IconButton
                                            aria-label="delete"
                                            size="large"
                                            sx={{color: "primary.main"}}
                                        >
                                            <DeleteIcon fontSize="inherit"/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            ))}
                        </FormGroup>
                    </Stack>
                    <Stack direction="row" justifyContent="center" mt="2vw">
                        <Pagination count={10} color="primary" shape="rounded"/>
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Stack spacing="1vw">
                        <Button
                            aria-label="rightArrow"
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{
                                fontSize: "1.2vw",
                                paddingBlock: "1vw",
                                borderRadius: "0.3vw",
                            }}
                        >
                            <KeyboardDoubleArrowRightIcon fontSize="inherit"/>
                        </Button>
                        <Button
                            aria-label="leftArrow"
                            size="large"
                            color="primary"
                            variant="contained"
                            sx={{
                                fontSize: "1.2vw",
                                paddingBlock: "1vw",
                                borderRadius: "0.3vw",
                            }}
                        >
                            <KeyboardDoubleArrowLeftIcon fontSize="inherit"/>
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={5} px="1vw">
                    <Stack spacing={"1vw"}>
                        <BodyCopy pl="0.5vw">List of Choose Items</BodyCopy>
                        <Grid container columns={10}>
                            <Grid
                                item
                                xs={8}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <KeywordSearch
                                    sx={{minWidth: "100%", borderRadius: "0.3vw"}}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <IconButton
                                    aria-label="filter"
                                    size="large"
                                    sx={{color: "primary.main"}}
                                >
                                    <FilterAltIcon color="disabled" fontSize="inherit"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <FormGroup>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                                (_, idx) => (
                                    <Grid container columns={10} key={`checkChooseItem__${idx}`}>
                                        <Grid
                                            item
                                            xs={8}
                                            display="flex"
                                            alignItems="center"
                                            pl="0.5vw"
                                        >
                                            <FormControlLabel
                                                key={`checkBox__${idx}`}
                                                control={<Checkbox/>}
                                                label="Item List"
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={2}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <IconButton
                                                aria-label="delete"
                                                size="large"
                                                sx={{color: "primary.main"}}
                                            >
                                                <DeleteIcon fontSize="inherit"/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                )
                            )}
                        </FormGroup>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Segmentation;
