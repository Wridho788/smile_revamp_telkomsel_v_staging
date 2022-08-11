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

    const programSegmentation = ProgramSegmentationInitial
    const [type, setType] = React.useState(programSegmentation.customer_type);
    const [tier, setTier] = React.useState(programSegmentation.customer_tier);
    const [badges, setBadges] = React.useState(programSegmentation.customer_badges);
    const [location, setLocation] = React.useState(programSegmentation.customer_location);
    const [brand, setBrand] = React.useState(programSegmentation.customer_brand);
    const [arpu, setArpu] = React.useState(programSegmentation.customer_ARPU);
    const [msisdn, setMsisdn] = React.useState(programSegmentation.customer_msisdn);

    const [activeTab, setActiveTab] = React.useState<number>(0);
    const [state, setState] = useState(segmentation.customer_type);
    const [optionLabel, setOptionLabel] = useState('set_value');
    const [initialId, setInitialId] = useState(programSegmentation.customer_type);
    const setCheckbox = (id: string) => {
        setInitialId(id)
        switch (activeTab) {
            case 0 :
                return setType(id)
            case 1 :
                return setTier(id)
            case 2 :
                return setBadges(id)
            case 3 :
                return setLocation(id)
            case 4 :
                return setBrand(id)
            case 5 :
                return setArpu(id)
            case 6 :
                return setMsisdn(id)
        }
    }
    const onClickTab = (id: number) => {
        setActiveTab(id)
        switch (id) {
            case 0 :
                setOptionLabel('set_value')
                setInitialId(type)
                return setState(segmentation.customer_type)
            case 1 :
                setInitialId(tier)
                setOptionLabel('name')
                return setState(segmentation.customer_tier)
            case 2 :
                setInitialId(badges)
                setOptionLabel('name')
                return setState(segmentation.customer_badges)
            case 3 :
                setInitialId(location)
                setOptionLabel('name')
                return setState(segmentation.customer_location)
            case 4 :
                setInitialId(brand)
                setOptionLabel('name')
                return setState(segmentation.customer_brand)
            case 5 :
                setInitialId(arpu)
                setOptionLabel('name')
                return setState(segmentation.customer_ARPU)
            case 6 :
                setInitialId(msisdn)
                setOptionLabel('msisdn')
                return setState(segmentation.customer_msisdn)
        }
    }
    React.useEffect(() => {
        programSegmentation.customer_msisdn = state

        programSegmentation.customer_type = type
        programSegmentation.customer_tier = tier
        programSegmentation.customer_badges = badges
        programSegmentation.customer_location = location
        programSegmentation.customer_brand = brand
        programSegmentation.customer_ARPU = arpu
        programSegmentation.customer_msisdn = msisdn
        return;
    }, [
        activeTab,
        initialId,
        programSegmentation,
        state,
        tier,
        type,
        badges,
        location,
        brand,
        arpu,
        msisdn
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
                    onClickTab(newValue);
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
                                            checked={initialId == data['_id']}
                                            onClick={ () => setCheckbox(data['_id'])}
                                            key={initialId}
                                            control={<Checkbox/>}
                                            label={data[optionLabel]}
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
