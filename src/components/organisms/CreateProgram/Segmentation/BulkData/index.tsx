import * as React from "react";
import {
    Alert,
    Box,
    Button, Grid, ListItem,
    Stack,
} from "@mui/material";
import {BodyCopy, Select} from "../../../../atoms";
import {useEffect, useState} from "react";
import {Warning} from "@mui/icons-material";
import {
    useImportListMutation

} from "../../../../../redux/features/program/program-api-slice";
import {noticeUploadDataInitial, segmentationOptionInitial} from "../inital";
import ListItemText from "@mui/material/ListItemText";
import {useParams} from "react-router-dom";

interface ISegmentationProps {
}

const EXTENSIONS = ["txt", "csv"];

const BulkData: React.FunctionComponent<ISegmentationProps> = () => {

        let {programId} = useParams();
        const [importFile, {isLoading: isUpdate, isSuccess}] = useImportListMutation()
        const [whitelistPath, setWhitelistPath] = useState<any>();
        const [blacklistPath, setBlacklistPath] = useState<any>();
        const [warningShow, setWarningShow] = useState<boolean>(false);
        const [successShow, setSuccessShow] = useState<boolean>(false);
        const getExention = (file: { name: string }) => {
            const parts = file.name.split(".");
            const extension = parts[parts.length - 1];
            return EXTENSIONS.includes(extension); // return boolean
        };

        const whitelistUpload = (e: any) => {
            const file = e.target.files[0];
            if (!getExention(file)) {
                return alert("Invalid file input, Select txt or csv file");
            }
            segmentationOption[0].filename = file.name
            setWhitelistPath(file);
            setTriggerState(!triggerState)
            console.log(segmentationOption[0].filename)
        }

        const blacklistUpload = (e: any) => {
            const file = e.target.files[0];
            if (!getExention(file)) {
                return alert("Invalid file input, Select txt or csv file");
            }
            segmentationOption[1].filename = file.name
            setBlacklistPath(file);
            setTriggerState(!triggerState)
        }

        const segmentationOption = segmentationOptionInitial
        const [triggerState, setTriggerState] = useState<boolean>(false)
        useEffect(() => {
        }, [segmentationOption, triggerState, whitelistPath, blacklistPath]);


        const handleProcess = async () => {
            setSuccessShow(false)
            if (!segmentationOption[0].filename && !segmentationOption[1].filename) {
                setWarningShow(true)
                return
            }
            await importFile({
                "file": whitelistPath,
                "type": 'whitelist',
                'program': programId
            })

            await importFile({
                "file": blacklistPath,
                "type": 'blacklist',
                'program': programId
            })
            segmentationOption[0].filename = ''
            segmentationOption[1].filename = ''
            setWarningShow(false)
            setSuccessShow(true)
        }
        return (
            <Box px="3vw">
                {
                    warningShow &&
                    <Alert variant="outlined" severity="warning" sx={{marginBottom: 5}}>
                        Please complete what is needed first!
                    </Alert>
                }
                {
                    successShow &&

                    <Alert variant="outlined" severity="success" sx={{marginBottom: 5}}>
                        Success. The server is in the process of storing to the database, please next to
                        finish
                    </Alert>
                }
                <Grid columns={12} container alignContent={"space-between"}>
                    {
                        segmentationOption.map((item, idx) => (
                            <Grid xs={6}>
                                <Box sx={{marginRight: idx === 0 ? 3 : 0, marginLeft: idx === 0 ? 0 : 3}}>
                                    <ListItem disablePadding>
                                        <Warning color={"warning"} sx={{marginRight: "10px"}}/>
                                        <BodyCopy color={"red"}>{noticeUploadDataInitial.label}</BodyCopy>
                                    </ListItem>
                                    {
                                        noticeUploadDataInitial.listCondition.map((curr, index) => (
                                            <ListItem disablePadding sx={{marginLeft: "35px"}}>
                                                <li/>
                                                <ListItemText primary={curr}/>
                                            </ListItem>
                                        ))
                                    }
                                    <Box pt="2vw" pb="3vw">
                                        <Stack direction="row" alignItems="center" spacing="1vw" mb="1.5vw">
                                            <Button variant="contained" component="label" color={"inherit"}>
                                                File Choices
                                                <input type="file" hidden onChange={
                                                    idx === 0 ? whitelistUpload : blacklistUpload
                                                }/>
                                            </Button>

                                            {
                                                item.filename &&
                                                <BodyCopy>File Name : {item.filename}</BodyCopy>
                                            }
                                        </Stack>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}


                </Grid>

                <Stack direction="row" alignItems="center" mt="1.5vw">
                    <Button onClick={() => handleProcess()} variant="contained" component="label">
                        Process
                    </Button>
                </Stack>
            </Box>
        );
    }
;

export default BulkData;
