import React, { useState, useEffect, Fragment } from "react";
import {
  Chip,
  Alert,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { DrawerNav, Gap, H2 } from "../../../components";
import DarkButton from "../../atoms/DarkButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Add } from "@mui/icons-material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";
import moment from "moment";
import {
  IKeywordPrime,
  InitialFilter,
  InitialKeywordApproval as InitialProgramExperience,
} from "./initial";
import { useLazyKeywordListPrimeQuery } from "../../../redux/features/keyword/keyword-api-slice";
import {
  useGetProgramExperienceQuery,
  useGetLocationTypeQuery,
} from "../../../redux/features/lov/lov-api-slice";
import { useAppConfigQuery } from "../../../redux/features/app-config/app-config-api-slice";
import { useAccountAuthenticateQuery } from "../../../redux/features/account/account-api-slice";
import { useDetailProgramQuery } from "../../../redux/features/program/program-api-slice";

import KeywordDetailsModal from "./KeywordDetail";
import { keywordProgramDetailHelper } from "../Programs/Detail/KeywordLink/initial";
import { ProgramDetailInitial } from "../../../pages/CreateProgram/programInitial";
import FilterKeyword from "./filter";
import { BodyCopy } from "components/atoms";

interface IkeywordPrime {
  bonus: any[];
  created_at: string;
  created_by: any;
  deleted_at: null;
  eligibility: any;
  keyword_approval: string;
  notification: any[];
  updated_at: string;
  __v: number;
  _id: string;
}

const KeywordPrime = () => {
  const [keywords, setKeywords] = useState<any>([IKeywordPrime]);
  const [loading, setLoading] = useState<boolean>(false);
  const [triger, setTriger] = useState<boolean>(false);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [lazyParams, setLazyParams] = useState<any>({
    first: 0,
    rows: 10,
    page: 1,
    sortField: "created_at",
    sortOrder: -1,
    filters: {
      "eligibility.name": { value: "", matchMode: FilterMatchMode.CONTAINS },

      // Filter field
      "eligibility.program_experience": {
        value: InitialFilter.program_experience._id,
        matchMode: FilterMatchMode.CONTAINS,
      },
      keyword_approval: {
        value: InitialFilter.keyword_approval._id,
        matchMode: FilterMatchMode.EQUALS,
      },
    },
  });

  // Role Access Authentication Check
  const { data: appConfig } = useAppConfigQuery();
  const defaultRoleManager: any =
    appConfig !== undefined
      ? appConfig.find((item) => item["param_key"] === "DEFAULT_ROLE_MANAGER")[
          "param_value"
        ]
      : undefined;
  const defaultRoleManagerHQ =
    appConfig !== undefined
      ? appConfig.find((item) => item["param_key"] === "DEFAULT_LOCATION_HQ")[
          "param_value"
        ]
      : undefined;

  const { data: accountAuth } = useAccountAuthenticateQuery();

  // Detail Keyword
  const [item, setItem] = useState([]);
  const [open, setOpen] = useState({
    detail: false,
    filter: false,
  });
  const handleButtonDetail = async (item: any) => {
    setItem(item);
    setOpen({ ...open, detail: true });
  };

  const onPage = (event: any) => {
    setLazyParams(event);
  };

  const onSort = (event: any) => {
    setLazyParams(event);
  };

  const onFilter = (event: any) => {
    event["first"] = 0;
    setLazyParams(event);
  };

  const onRowSelect = (event: any) => {
    handleButtonDetail(event.data);
  };

  const { data: locationTypeOptions = { data: [] } } =
    useGetLocationTypeQuery();
  const { data: programExperienceList = { data: [InitialProgramExperience] } } =
    useGetProgramExperienceQuery();
  const [
    getKeywordList,
    { data: keywordList = { data: [IKeywordPrime] }, isError, isLoading },
  ] = useLazyKeywordListPrimeQuery();

  let loadLazyTimeout: any = null;
  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) clearTimeout(loadLazyTimeout);
    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getKeywordList({
        lazyEvent: JSON.stringify({
          ...lazyParams,
          filters: {
            "eligibility.name": {
              value: "",
              matchMode: FilterMatchMode.CONTAINS,
            },

            // Filter field
            "eligibility.program_experience": {
              value: InitialFilter.program_experience._id,
              matchMode: FilterMatchMode.CONTAINS,
            },
            keyword_approval: {
              value: InitialFilter.keyword_approval._id,
              matchMode: FilterMatchMode.EQUALS,
            },
          },
        }),
      });
      setKeywords(data.payload.data);
      setTotalRecords(data.payload.totalRecords);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  // ====================== Effect =========================
  // =======================================================
  useEffect(() => {
    loadLazyData();
  }, [lazyParams, triger]);

  // Customize Column Render Component
  const NameRender = (rowData: any) => {
    return rowData?.eligibility?.name;
  };
  const StartPeriodRender = (rowData: any) => {
    return (
      <span>
        {moment(rowData?.eligibility?.start_period).format("MMMM DD, YYYY")}
      </span>
    );
  };
  const EndPeriodRender = (rowData: any) => {
    return (
      <span>
        {moment(rowData?.eligibility?.end_period).format("MMMM DD, YYYY")}
      </span>
    );
  };

  const ProgramExperienceRender = (rowData: IkeywordPrime) => {
    let program = "";
    let program_exp: string[] = rowData?.eligibility?.program_experience;
    programExperienceList?.data?.forEach((value: any) => {
      if (value?._id === program_exp?.[0]) program = value?.set_value;
    });
    return <span>{program}</span>;
  };

  const ProgramNameRender = (rowData: IkeywordPrime) => {
    let { program_id } = rowData?.eligibility;
    const { data: programDetail = ProgramDetailInitial.data, isLoading } =
      useDetailProgramQuery(program_id ?? "");
    return <span>{programDetail?.name || ""}</span>;
  };

  const CreatedAtRender = (rowData: any) => {
    return <span>{moment(rowData?.created_at).format("MMMM DD, YYYY")}</span>;
  };

  const CreatedByRender = (rowData: any) => {
    return <span>{rowData?.created_by?.user_name}</span>;
  };

  const LocationCreatedRender = (rowData: any) => {
    let location = "";
    let location_type: string =
      rowData?.created_by?.account_location?.location_detail?.type;
    locationTypeOptions?.data?.forEach((value: any) => {
      if (value?._id === location_type) location = value?.set_value;
    });
    return <span>{location}</span>;
  };

  const StatusApprovalRender = (rowData: any) => {
    return (
      <Box
        sx={{
          display: "flex",
          textAlign: "center",
          width: "100%",
          justifyContent: "left",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {rowData.approval_log && rowData.approval_log.length > 0 ? (
          <Alert severity="success" icon={false}>
            {
              rowData.approval_log[rowData.approval_log.length - 1].status[0]
                .set_value
            }
          </Alert>
        ) : rowData.isHQ ? (
          <Alert severity="warning" icon={false}>
            Waiting For Approval 2
          </Alert>
        ) : (
          <Alert severity="warning" icon={false}>
            Waiting For Approval 1
          </Alert>
        )}
      </Box>
    );
  };

  useEffect(() => {
    if (
      keywordProgramDetailHelper.data !== undefined &&
      keywordProgramDetailHelper.opened === false
    ) {
      handleButtonDetail(keywordProgramDetailHelper.data);
    }
    return;
  }, []);

  return (
    <Fragment>
      <FilterKeyword
        loading={loading}
        open={open.filter}
        onClose={() => setOpen({ ...open, filter: false })}
        filters={InitialFilter}
        triger={triger}
        setTriger={setTriger}
      />
      <KeywordDetailsModal
        open={open.detail}
        handleClose={() => {
          setOpen({ ...open, detail: false });
        }}
        data={item}
        roleAccess={
          accountAuth && defaultRoleManager
            ? accountAuth.role === defaultRoleManager
              ? true
              : false
            : false
        }
        isHqLogin={
          accountAuth &&
          accountAuth.account_location.location_detail.type ===
            defaultRoleManagerHQ
            ? true
            : false
        }
      />

      <Stack direction={"row"} justifyContent={"space-between"}>
        <H2 color={"secondary.dark"}>Keyword</H2>
        <Stack direction="row" alignItems="center" spacing={"1vw"}>
          <IconButton
            href="/create-keyword/"
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
          <DarkButton
            variant="contained"
            size="medium"
            startIcon={<FilterListIcon />}
            onClick={() => setOpen({ ...open, filter: true })}
          >
            <BodyCopy>Filter</BodyCopy>
          </DarkButton>
        </Stack>
      </Stack>

      <Grid container>
        <Grid item xs={12}>
          <DrawerNav>
            <Box>
              <Stack direction="row" spacing="1vw" mb={1}>
                {Object.values(InitialFilter).map(
                  (item) =>
                    item.name && (
                      <Chip
                        sx={{
                          backgroundColor: "rgb(25, 118, 210)",
                          color: "#FFF",
                          "& .MuiChip-deleteIcon": {
                            color: "#FFF",
                          },
                        }}
                        label={item.name}
                        onDelete={() => {
                          if (InitialFilter.keyword_approval === item) {
                            InitialFilter.keyword_approval = {
                              _id: "",
                              name: "",
                            };
                          } else if (
                            InitialFilter.program_experience === item
                          ) {
                            InitialFilter.program_experience = {
                              _id: "",
                              name: "",
                            };
                          }
                          setTriger(!triger);
                        }}
                      />
                    )
                )}
              </Stack>
              <Paper>
                <div className="card">
                  <DataTable
                    value={keywords}
                    lazy
                    filterDisplay="row"
                    responsiveLayout="scroll"
                    dataKey="id"
                    paginator
                    first={lazyParams.first}
                    rows={10}
                    totalRecords={totalRecords}
                    onPage={onPage}
                    onSort={onSort}
                    onFilter={onFilter}
                    filters={lazyParams.filters}
                    loading={loading}
                    scrollable
                    scrollDirection="both"
                    selectionMode="single"
                    onRowSelect={onRowSelect}
                    globalFilterFields={["eligibility.name"]}
                  >
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="name"
                      header="KEYWORD NAME"
                      sortable
                      filter
                      filterField="eligibility.name"
                      body={NameRender}
                      filterPlaceholder="Search"
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="start_period"
                      header="START PERIOD"
                      sortable
                      body={StartPeriodRender}
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="end_period"
                      header="END PERIOD"
                      sortable
                      body={EndPeriodRender}
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="set_value"
                      header="PROGRAM EXPERIENCE"
                      body={ProgramExperienceRender}
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="set_value"
                      header="PROGRAM NAME"
                      body={ProgramNameRender}
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="set_value"
                      header="CREATED AT"
                      body={CreatedAtRender}
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="set_value"
                      header="CREATED BY"
                      body={CreatedByRender}
                    />
                    <Column
                      style={{ flexGrow: 1, flexBasis: "250px" }}
                      field="set_value"
                      header="LOCATION CREATED"
                      body={LocationCreatedRender}
                    />
                    <Column
                      style={{
                        flexGrow: 1,
                        flexBasis: "250px",
                        alignItems: "center",
                      }}
                      field="program_time_zone"
                      header="STATUS"
                      sortable
                      body={StatusApprovalRender}
                      filterPlaceholder="Search"
                    />
                  </DataTable>
                </div>
              </Paper>
            </Box>
          </DrawerNav>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default KeywordPrime;
