import * as React from "react";
import {Box, Button, Card, CardContent, Grid, IconButton, Stack} from "@mui/material";
import {BodyCopy, H2, SmallCopy, PreTitle} from "../..";
import KeywordSearch from "../../atoms/KeywordSearch";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useTypedSelector} from "../../../app/hooks/useTypedSelector";
import {useActions} from "../../../app/hooks/useActions";
import {useEffect} from "react";
import {programDetail} from "../../../app/redux/Actions/Program";
import {useNavigate} from "react-router-dom";

const Programs: React.FunctionComponent = () => {
        const navigate = useNavigate()
        const [listForm, setListForm] = React.useState<string>("card");
        const {result, error, loading} = useTypedSelector(state => state.programList);
        const {getProgramList, programDetail} = useActions();
        useEffect(() => {
            getProgramList({});
        }, [result])
        const handleButtonDelete = async (_id: string) => {
            const tes = await programDetail(_id)
            console.log(tes)
            getProgramList({});
        }
        const handleButtonDetail = async (_id: string) => {
            navigate('/program-management/' + _id)
        }
        const data = result.data;
        if (error) {
            return <h1 style={{color: 'red', fontWeight: '700'}}>{error}</h1>
        }
        if (loading) {
            return <h1>Loading ...</h1>
        }
        return (
            <>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <H2 color={"secondary.dark"}>Program</H2>
                    <Stack direction="row" alignItems="center" spacing={"1vw"}>
                        <ListButton
                            onClick={() => setListForm("list")}
                            sx={{
                                color:
                                    listForm === "list" ? "background.default" : "secondary.light",
                                backgroundColor:
                                    listForm === "list" ? "secondary.light" : "background.default",
                            }}
                        />
                        <CardButton
                            onClick={() => setListForm("card")}
                            sx={{
                                color:
                                    listForm === "card" ? "background.default" : "secondary.light",
                                backgroundColor:
                                    listForm === "card" ? "secondary.light" : "background.default",
                            }}
                        />
                        <KeywordSearch/>
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
                    <Grid container columns={5} spacing={"1vw"}>
                        {[0].map((_, id) =>
                            data.map((_: any, id: number) => (
                                <Grid key={id} item xs={1}>
                                    <Card>
                                        <CardContent>
                                            <Grid container columns={11}>
                                                <Grid item xs={9}>
                                                    <PreTitle
                                                        color={"secondary.light"}
                                                        sx={{opacity: 0.5}}
                                                    >
                                                        {_.name}
                                                    </PreTitle>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <IconButton
                                                        size="small"
                                                        sx={{
                                                            bgcolor: "secondary.main",
                                                            borderRadius: "0.4vw",
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        <MoreVertIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                            <H2 mt={"2.5vw"}>{_['name']}</H2>
                                            <Stack direction={"row"} spacing={"0.1vw"} mt={"0.5vw"}>
                                                <Button variant={"outlined"} onClick={() => handleButtonDelete(_['_id'])}>Delete</Button>
                                                <Button variant={"outlined"}  onClick={() => handleButtonDetail(_['_id'])}>Detail</Button>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Box>
            </>
        );
    }
;

export default Programs;
