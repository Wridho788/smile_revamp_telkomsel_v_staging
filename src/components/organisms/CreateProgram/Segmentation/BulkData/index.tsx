import * as React from "react";
import {
  Alert,
  Box,
  Button,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { BodyCopy, H2, Select } from "../../../../atoms";
import { useEffect, useState } from "react";
import { Warning } from "@mui/icons-material";
import { useImportListMutation } from "../../../../../redux/features/program/program-api-slice";
import { noticeUploadDataInitial, segmentationOptionInitial } from "../inital";
import ListItemText from "@mui/material/ListItemText";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";

interface ISegmentationProps {}

const EXTENSIONS = ["txt", "csv"];

const BulkData: React.FunctionComponent<ISegmentationProps> = () => {
  const nav = useNavigate();
  let { programId } = useParams();
  const [importFile, { isLoading: isUpdate, isSuccess }] =
    useImportListMutation();
  const [whitelistPath, setWhitelistPath] = useState<any>();
  const [blacklistPath, setBlacklistPath] = useState<any>();
  const [warningShow, setWarningShow] = useState<boolean>(false);
  const [successShow, setSuccessShow] = useState<boolean>(false);
  const getExention = (file: { name: string }) => {
    const parts = file.name.split(".");
    const extension = parts[parts.length - 1];
    return EXTENSIONS.includes(extension); // return boolean
  };

  // Handle Loading
  const [sendBulkProcess, setSendBulkProcess] = useState(false);

  const whitelistUpload = (e: any) => {
    const file = e.target.files[0];
    if (!getExention(file)) {
      return alert("Invalid file input, Select txt or csv file");
    }
    segmentationOption[0].filename = file.name;
    setWhitelistPath(file);
    setTriggerState(!triggerState);
  };

  const blacklistUpload = (e: any) => {
    const file = e.target.files[0];
    if (!getExention(file)) {
      return alert("Invalid file input, Select txt or csv file");
    }
    segmentationOption[1].filename = file.name;
    setBlacklistPath(file);
    setTriggerState(!triggerState);
  };

  const segmentationOption = segmentationOptionInitial;
  const [triggerState, setTriggerState] = useState<boolean>(false);

  const handleProcess = async () => {
    setSendBulkProcess(true);
    setSuccessShow(false);
    if (!segmentationOption[0].filename && !segmentationOption[1].filename) {
      setWarningShow(true);
      setSendBulkProcess(false);
      return;
    }

    if (segmentationOption[0].filename !== "") {
      let formData = new FormData();
      formData.append("file", whitelistPath);
      formData.append("type", "whitelist");
      formData.append("program", String(programId));
      await importFile(formData);
      segmentationOption[0].filename = "";
      setTriggerState(!triggerState);
    }

    if (segmentationOption[1].filename !== "") {
      let formData1 = new FormData();
      formData1.append("file", blacklistPath);
      formData1.append("type", "blacklist");
      formData1.append("program", String(programId));
      await importFile(formData1);
      segmentationOption[1].filename = "";
      setTriggerState(!triggerState);
    }

    Swal.fire("Success!", "Data has been created!", "success").then(()=>
        nav('/program-management'));
    setWarningShow(false);
    setSuccessShow(true);
    setSendBulkProcess(false);
  };
  useEffect(() => {}, [
    segmentationOption,
    triggerState,
    whitelistPath,
    blacklistPath,
    segmentationOption,
  ]);

  return (
    <Box px="3vw">
      {warningShow && (
        <Alert variant="outlined" severity="warning" sx={{ marginBottom: 5 }}>
          Please complete what is needed first!
        </Alert>
      )}
      {successShow && (
        <Alert variant="outlined" severity="success" sx={{ marginBottom: 5 }}>
          Success. The server is in the process of storing to the database,
          please next to finish
        </Alert>
      )}
      <Grid columns={12} container alignContent={"space-between"}>
        {segmentationOption.map((item, idx) => (
          <Grid xs={6}>
            <Box
              sx={{
                marginRight: idx === 0 ? 3 : 0,
                marginLeft: idx === 0 ? 0 : 3,
              }}
            >
              <H2 sx={{ textTransform: "capitalize" }}>{item.type}</H2>
              <ListItem disablePadding>
                <Warning color={"warning"} sx={{ marginRight: "10px" }} />
                <BodyCopy color={"red"}>
                  {noticeUploadDataInitial.label}
                </BodyCopy>
              </ListItem>
              {noticeUploadDataInitial.listCondition.map((curr, index) => (
                <ListItem disablePadding sx={{ marginLeft: "35px" }}>
                  <li />
                  <ListItemText primary={curr} />
                </ListItem>
              ))}
              <Box pt="2vw" pb="3vw">
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing="1vw"
                  mb="1.5vw"
                >
                  <Button
                    variant="contained"
                    component="label"
                    color={"inherit"}
                  >
                    File Choices
                    <input
                      type="file"
                      hidden
                      onChange={idx === 0 ? whitelistUpload : blacklistUpload}
                    />
                  </Button>

                  {item.filename && (
                    <BodyCopy>File Name : {item.filename}</BodyCopy>
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" alignItems="center" mt="1.5vw">
        {sendBulkProcess ? (
          <Button variant="contained" disabled component="label">
            Loading ...
          </Button>
        ) : (
          <Button
            onClick={() => handleProcess()}
            variant="contained"
            component="label"
          >
            Process
          </Button>
        )}
      </Stack>
    </Box>
  );
};
export default BulkData;
