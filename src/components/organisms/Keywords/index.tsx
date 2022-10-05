import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  Stack,
} from "@mui/material";
import { BodyCopy, H2, SmallCopy, PreTitle, OutlinedTextField } from "../..";
import FilterListIcon from "@mui/icons-material/FilterList";
import DarkButton from "../../atoms/DarkButton";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import Moment from "moment";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import Modal from "../../../atomic/components/atoms/Modal";
import { FilterInitial } from "../../../redux/utils/initial-general";
import { IData } from "../../../redux/features/keyword/interface";
import { KeywordItemInitial } from "./initial";
import {
  useKeywordGeneralDeleteMutation,
  useLazyKeywordGeneralListQuery,
  useLazyKeywordListQuery,
} from "../../../redux/features/keyword/keyword-api-slice";
import Swal from "sweetalert2";
import { useAppConfigQuery } from "../../../redux/features/app-config/app-config-api-slice";
import { useAccountAuthenticateQuery } from "../../../redux/features/account/account-api-slice";
import KeywordDetailsModal from "../../../atomic/components/atoms/Modal/KeywordDetailsModal";

const Keywords: React.FunctionComponent = () => {
  const { data: appConfig } = useAppConfigQuery();
  const defaultRoleManager =
    appConfig !== undefined
      ? appConfig.find((item) => item["param_key"] === "DEFAULT_ROLE_MANAGER")[
          "param_value"
        ]
      : undefined;

  const { data: accountAuth } = useAccountAuthenticateQuery();

  // console.log(defaultRoleManager);
  // console.log(accountAuth?.role_id.replace("role-", ""));

  const [
    getKeywordList,
    { data: keywordList = { data: [KeywordItemInitial] }, isError, isLoading },
  ] = useLazyKeywordListQuery();

  const [deleteKeyword, { isLoading: deleteLoading }] =
    useKeywordGeneralDeleteMutation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [listForm, setListForm] = React.useState<string>("list");
  const [item, setItem] = useState(keywordList.data[0]);

  const data = keywordList.data;
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState(data);

  useEffect(() => {
    getKeywordList(FilterInitial);
    if (searchInput !== "") {
      const filteredData = data.filter((i) => {
        return Object.values(i)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(data);
    }
  }, [data, getKeywordList, searchInput]);

  // console.log(data);

  const handleButtonDelete = async (_id: string) => {
    Swal.fire({
      title: "Do you want to delete data?",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteKeyword(_id);
        Swal.fire("Deleted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Data are not deleted", "", "info");
      }
      getKeywordList(FilterInitial);
    });
  };

  const handleButtonDetail = async (item: IData) => {
    setItem(item);
    handleOpen();
  };

  if (isError) {
    return <h1 style={{ color: "red", fontWeight: "700" }}>{isError}</h1>;
  }

  return (
    <>
      <KeywordDetailsModal
        open={open}
        handleClose={handleClose}
        data={item}
        roleAccess={
          defaultRoleManager !== undefined && accountAuth !== undefined
            ? defaultRoleManager === accountAuth.role
              ? true
              : false
            : false
        }
        userLoginId={""}
        // roleAccess={
        //   defaultRoleManager !== undefined && accountAuth !== undefined
        //     ? defaultRoleManager === defaultRoleManager
        //       ? true
        //       : false
        //     : false
        // }
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <H2 color={"secondary.dark"}>Keyword</H2>
        <Stack direction="row" alignItems="center" spacing={"1vw"}>
          <IconButton
            href="/create-keyword"
            size="small"
            sx={{
              bgcolor: "primary",
              borderRadius: "0.4vw",
              opacity: 0.8,
              width: "2.1vw",
              height: "2.1vw",
            }}
          >
            <Add fontSize="inherit" />
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
            placeholder="Search..."
            onChange={(e) => setSearchInput(e.target.value)}
          />
          {/*<KeywordSearch*/}
          {/*    onChange={(e) => searchItems(e.target.value)}*/}
          {/*/>*/}
          <DarkButton
            variant="contained"
            size="medium"
            startIcon={<FilterListIcon />}
          >
            <BodyCopy>Filter</BodyCopy>
          </DarkButton>
        </Stack>
      </Stack>

      <Box mt={5}>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {listForm === "card" && (
          <Grid container columns={5} spacing={"1vw"}>
            {(searchInput.length > 1 ? filteredResults : data).map((_, id) => (
              <Grid key={id} item xs={1} onClick={() => handleButtonDetail(_)}>
                <Card sx={{ position: "relative", minHeight: "12.5vw" }}>
                  <CardContent>
                    <Grid container columns={11}>
                      <Grid item xs={9}>
                        <PreTitle
                          color={"secondary.light"}
                          sx={{ opacity: 0.5 }}
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
                          <MoreVertIcon fontSize="inherit" />
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
                          sx={{ opacity: 0.8 }}
                        >
                          {/* 3 */}
                          {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                          <SmallCopy>{_.name}</SmallCopy>
                        </Box>
                        <Box
                          bgcolor={"secondary.main"}
                          color={"secondary.light"}
                          borderRadius={"1vw"}
                          px={"0.9vw"}
                          py={"0.2vw"}
                          sx={{ opacity: 0.8 }}
                        >
                          {/* 4 */}
                          {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                          <SmallCopy>
                            {Moment(_.created_at).format("Y-m-d")}
                          </SmallCopy>
                        </Box>
                      </Stack>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {listForm === "list" && (
          <Stack spacing="1vw">
            {(searchInput.length > 1 ? filteredResults : data).map((_, id) => (
              <Grid
                key={id}
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
                      <BodyCopy color={"secondary.light"} sx={{ opacity: 0.5 }}>
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
                        sx={{ opacity: 0.8 }}
                      >
                        {/* 3 */}
                        {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                        <SmallCopy>
                          {Moment(_.created_at).format("Y-m-d")}
                        </SmallCopy>
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
                        sx={{ opacity: 0.8 }}
                      >
                        {/* 4 */}
                        {/* <SmallCopy>{_["name"]}</SmallCopy> */}
                        <SmallCopy>
                          {Moment(_.created_at).format("Y-m-d")}
                        </SmallCopy>
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
                            <Visibility fontSize="inherit" />
                          </IconButton>
                        </Grid>
                        <Grid item xs={4}>
                          <IconButton
                            href={"/edit-keyword/" + _._id}
                            size="small"
                            sx={{
                              bgcolor: "secondary.main",
                              borderRadius: "0.4vw",
                              opacity: 0.8,
                              width: "2.1vw",
                              height: "2.1vw",
                            }}
                          >
                            <Edit fontSize="inherit" />
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
                            <Delete fontSize="inherit" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Stack>
        )}
      </Box>
    </>
  );
};
export default Keywords;
