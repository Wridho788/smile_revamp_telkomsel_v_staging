import * as React from "react";
import {Box, Card, CardContent, CircularProgress, Grid, IconButton, Input, Stack} from "@mui/material";
import {BodyCopy, H2, SmallCopy, PreTitle} from "../..";
import KeywordSearch from "../../atoms/KeywordSearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useTypedSelector} from "../../../app/hooks/useTypedSelector";
import {useActions} from "../../../app/hooks/useActions";
import {useEffect, useState} from "react";
import mock from "../../../mock-data/programs-data.json";
import {useNavigate} from "react-router-dom";
import Moment from 'moment';
import {Add, Delete, Edit, Visibility} from "@mui/icons-material";
import Modal from "../../../atomic/components/atoms/Modal";
import {IProgramItem} from "../../../app/redux/Utils/Interface/IProgram";
import {ProgramItemInitial} from "../../../app/redux/Utils/InitialState/ProgramInitial";
import {programDetail} from "../../../app/redux/Actions/Program";

const Programs: React.FunctionComponent = () => {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [listForm, setListForm] = React.useState<string>("list");
    const {result, error, loading} = useTypedSelector(state => state.programList);
    const {getProgramList, deleteProgram} = useActions();
    const [item, setItem] = useState(ProgramItemInitial);
    useEffect(() => {
        getProgramList({});
    }, [result])

    const handleButtonDelete = async (_id: string) => {
        const tes = await deleteProgram(_id)
        console.log(tes)
        getProgramList({});
    }
    const handleButtonDetail = async (item: IProgramItem) => {
        setItem(item)
        handleOpen()
    }
    const data = result.data;
    if (error) {
        return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
    }
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState(data);
    const searchItems = (searchValue: string) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = data.filter((i) => {
                return Object.values(i).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        } else {
            setFilteredResults(data)
        }
    }

    const description = <>
        <li>{item.name}</li>
        <li>{item.program_mechanism}</li>
        <li>{Moment(item.start_period).format('Y-m-d')}</li>
        <li>{Moment(item.end_period).format('Y-m-d')}</li>
    </>

    return (
        <>
            <Modal open={open} handleClose={handleClose} title={item.name} description={description}/>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <H2 color={"secondary.dark"}>Program</H2>
                <Stack direction="row" alignItems="center" spacing={"1vw"}>
                    <IconButton
                        href="/create-program/"
                        size="small"
                        sx={{
                            bgcolor: "primary",
                            borderRadius: "0.4vw",
                            opacity: 0.8,
                            width: "2.1vw",
                            height: "2.1vw",
                        }}
                    >
                        <Add fontSize="inherit"/>
                    </IconButton>
                    <ListButton
                        onClick={() => setListForm("list")}
                        sx={{
                            width: "2.1vw",
                            height: "2.1vw",
                            color:
                                listForm === "list" ? "background.default" : "secondary.light",
                            backgroundColor:
                                listForm === "list" ? "secondary.light" : "background.default",
                        }}
                    />

                    <CardButton
                        onClick={() => setListForm("card")}
                        sx={{
                            width: "2.1vw",
                            height: "2.1vw",
                            color:
                                listForm === "card" ? "background.default" : "secondary.light",
                            backgroundColor:
                                listForm === "card" ? "secondary.light" : "background.default",
                        }}
                    />
                    <Input
                        placeholder='Search...'
                        onChange={(e) => searchItems(e.target.value)}
                    />
                    {/*<KeywordSearch*/}
                    {/*    onChange={(e) => searchItems(e.target.value)}*/}
                    {/*/>*/}
                    <DarkButton
                        variant="contained"
                        size="medium"
                        startIcon={<FilterListIcon/>}
                    >
                        <BodyCopy>Filter</BodyCopy>
                    </DarkButton>
                </Stack>
            </Stack>

            <Box mt={5}>
                {
                    loading && <Box sx={{
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh"
                    }}>
                        <CircularProgress/>
                    </Box>
                }
                {listForm === "card" && (
                    <Grid container columns={5} spacing={"1vw"}>
                        {(searchInput.length > 1 ? filteredResults : data).map((_, id) =>
                            (<Grid key={id} item xs={1} onClick={() => handleButtonDetail(_)}>
                                    <Card sx={{position: "relative", minHeight: "12.5vw"}}>
                                        <CardContent>
                                            <Grid container columns={11}>
                                                <Grid item xs={9}>
                                                    <PreTitle
                                                        color={"secondary.light"}
                                                        sx={{opacity: 0.5}}
                                                    >
                                                        {/* 1 */}
                                                        {/* {_["name"]} */}
                                                        {_.name}
                                                    </PreTitle>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        sx={{
                                                            width: "2.1vw",
                                                            height: "2.1vw",
                                                            bgcolor: "secondary.main",
                                                            borderRadius: "0.4vw",
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        <MoreVertIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            {/* 2 */}
                                            {/* <H2 mt={"2.5vw"}>{_["name"]}</H2> */}
                                            <H2 mt={"1.5vw"} pb="2vw">
                                                {_.name}
                                            </H2>
                                            <Box position="absolute" bottom={"1vw"}>
                                                <Stack direction={"row"} spacing={"0.5vw"} mt={"0.5vw"}>
                                                    <Box
                                                        bgcolor={"secondary.main"}
                                                        color={"secondary.light"}
                                                        borderRadius={"1vw"}
                                                        px={"0.9vw"}
                                                        py={"0.2vw"}
                                                        sx={{opacity: 0.8}}
                                                    >
                                                        {/* 3 */}
                                                        {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                                                        <SmallCopy>{Moment(_.start_period).format('Y-m-d')}</SmallCopy>
                                                    </Box>
                                                    <Box
                                                        bgcolor={"secondary.main"}
                                                        color={"secondary.light"}
                                                        borderRadius={"1vw"}
                                                        px={"0.9vw"}
                                                        py={"0.2vw"}
                                                        sx={{opacity: 0.8}}
                                                    >
                                                        {/* 4 */}
                                                        {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                                                        <SmallCopy>{Moment(_.end_period).format('Y-m-d')}</SmallCopy>
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                )}

                {listForm === "list" && (
                    <Stack spacing="1vw">
                        {(searchInput.length > 1 ? filteredResults : data).map((_, id) => (
                            <Grid
                                container
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                bgcolor="background.paper"
                                py="1.5vw"
                                px="3vw"
                            >
                                <Grid item xs={9}>
                                    <Grid container display="flex" alignItems="center">
                                        <Grid item xs={6}>
                                            <BodyCopy
                                                color={"secondary.light"}
                                                sx={{opacity: 0.5}}
                                            >
                                                {/* 1 */}
                                                {/* {_["name"]} */}
                                                {_.name}
                                            </BodyCopy>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {/* 2 */}
                                            {/* <H2 mt={"2.5vw"}>{_["name"]}</H2> */}
                                            <H2>{_.name}</H2>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container display="flex" alignItems="center">
                                        <Grid item xs={4}>
                                            <Box
                                                bgcolor={"secondary.main"}
                                                color={"secondary.light"}
                                                borderRadius={"1vw"}
                                                maxWidth="6vw"
                                                px={"0.9vw"}
                                                py={"0.4vw"}
                                                sx={{opacity: 0.8}}
                                            >
                                                {/* 3 */}
                                                {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                                                <SmallCopy>{Moment(_.start_period).format('Y-m-d')}</SmallCopy>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Box
                                                bgcolor={"secondary.main"}
                                                color={"secondary.light"}
                                                borderRadius={"1vw"}
                                                maxWidth="6vw"
                                                px={"0.9vw"}
                                                py={"0.4vw"}
                                                sx={{opacity: 0.8}}
                                            >
                                                {/* 4 */}
                                                {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                                                <SmallCopy>{Moment(_.end_period).format('Y-m-d')}</SmallCopy>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Grid container display="flex" alignItems="center">
                                                <Grid item xs={4}>
                                                    <IconButton
                                                        onClick={() => handleButtonDetail(_)}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "secondary.main",
                                                            borderRadius: "0.4vw",
                                                            opacity: 0.8,
                                                            width: "2.1vw",
                                                            height: "2.1vw",
                                                        }}
                                                    >
                                                        <Visibility fontSize="inherit"/>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <IconButton
                                                        href={"/edit-program/" + _._id}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "secondary.main",
                                                            borderRadius: "0.4vw",
                                                            opacity: 0.8,
                                                            width: "2.1vw",
                                                            height: "2.1vw",
                                                        }}
                                                    >
                                                        <Edit fontSize="inherit"/>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <IconButton
                                                        onClick={() => handleButtonDelete(_._id)}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "secondary.main",
                                                            borderRadius: "0.4vw",
                                                            opacity: 0.8,
                                                            width: "2.1vw",
                                                            height: "2.1vw",
                                                        }}
                                                    >
                                                        <Delete fontSize="inherit"/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))
                        }
                    </Stack>
                )}
            </Box>
        </>
    );
};
export default Programs;
