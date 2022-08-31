import * as React from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton, ListItem,
    ListItemIcon,
    Pagination,
    Stack,
} from "@mui/material";
import {BodyCopy, Select} from "../../../../atoms";
import {useEffect, useState} from "react";
import {programSegmentationOptions} from "../../../../../mocks/options";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Delete, Warning, WarningAmber} from "@mui/icons-material";
import {
    useDeleteProgramTempListMutation,
    useImportListMutation, useLazyProgramTempListQuery, useProgramTempListQuery,

} from "../../../../../redux/features/program/program-api-slice";
import {FilterInitial} from "../../../../../redux/utils/initial-general";
import {IProgramImportFile, IResponse} from "../../../../../redux/features/program/interface";
import Swal from "sweetalert2";
import TablePagination from "@mui/material/TablePagination";
import SwitchCustom from "../../../../../atomic/components/atoms/Switch";
import {noticeUploadData} from "../../MainInfo/inital";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

interface ISegmentationProps {
}

const EXTENSIONS = ["txt", "csv"];

const BulkData: React.FunctionComponent<ISegmentationProps> = () => {
    const [importFile, {isLoading: isUpdate, isSuccess}] = useImportListMutation()

    const [typeMSSIDN, setTypeMSSIDN] = React.useState("");
    const [fileName, setFileName] = useState<string>('');
    const [filePath, setFilePath] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [warningShow, setWarningShow] = useState<boolean>(false);
    const [successShow, setSuccessShow] = useState<boolean>(false);
    const getExention = (file: { name: string }) => {
        const parts = file.name.split(".");
        const extension = parts[parts.length - 1];
        return EXTENSIONS.includes(extension); // return boolean
    };

    const convertToJson = (
        headers: { [x: string]: string | number },
        data: any[]
    ) => {
        const rows: {}[] = [];
        data.forEach((row: any[]) => {
            let rowData: any = {};
            row.forEach((element: any, index: any) => {
                rowData[headers[index]] = element;
            });
            rows.push(rowData);
        });
        return rows;
    };
    const importExcel = (e: any) => {
        const file = e.target.files[0];
        if (!getExention(file)) {
            return alert("Invalid file input, Select txt or csv file");
        }
        setFileName(file.name);
        setFilePath(file);
    }

    const handleProcess = async () => {
        if (!typeMSSIDN || !filePath) {
            setWarningShow(true)
            return
        }

        const Data = {
            "file": filePath,
            "type": typeMSSIDN
        }
        await importFile({Data})
        setFileName('')
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
                    Success. The server is in the process of storing to the database, please next to finish
                </Alert>
            }
            <ListItem disablePadding>
                <Warning color={"warning"} sx={{marginRight: "10px"}}/>
                <BodyCopy color={"red"}>{noticeUploadData.label}</BodyCopy>
            </ListItem>
            {
                noticeUploadData.listCondition.map((curr, index) => (
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
                        <input type="file" onChange={importExcel} hidden/>
                    </Button>

                    {
                        fileName &&
                        <Alert variant="outlined" severity="success" >
                            <BodyCopy>File Name : {fileName}</BodyCopy>
                        </Alert>
                    }
                </Stack>
                <Select
                    label="Segmentation Type"
                    placeholder="Select"
                    options={programSegmentationOptions}
                    optionValue="set_value"
                    value={typeMSSIDN}
                    leftColumn={3}
                    handleChange={setTypeMSSIDN}
                    sx={{maxWidth: "50%"}}
                />
                <Stack direction="row" alignItems="center" mt="1.5vw">
                    <Button onClick={() => handleProcess()} variant="contained" component="label">
                        Process
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default BulkData;
