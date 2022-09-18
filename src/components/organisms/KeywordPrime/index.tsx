import React, { useState, useEffect, Fragment } from 'react';
import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { DrawerNav, Gap, H2 } from "../../../components";
import DarkButton from "../../atoms/DarkButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Add } from "@mui/icons-material";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import moment from "moment";
import { IKeywordPrime } from "./initial";
import { useLazyKeywordListPrimeQuery } from "../../../redux/features/keyword/keyword-api-slice";
import { useGetProgramExperienceQuery } from "../../../redux/features/lov/lov-api-slice";
import { useAppConfigQuery } from "../../../redux/features/app-config/app-config-api-slice";
import { useAccountAuthenticateQuery } from "../../../redux/features/account/account-api-slice";

import KeywordDetailsModal from "./KeywordDetail";

interface IkeywordPrime {
    bonus: any[],
    created_at: string,
    created_by: any,
    deleted_at: null,
    eligibility: any,
    keyword_approval: string,
    notification: any[],
    updated_at: string,
    __v: number,
    _id: string
  }

const KeywordPrime = () => {
    const [keywords, setKeywords] = useState<any>([IKeywordPrime])
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [lazyParams, setLazyParams] = useState<any>({
        first: 0,
        rows: 10,
        page: 1,
        sortField: "created_at",
        sortOrder: -1,
        filters: {
            "eligibility.name": { value: "", matchMode: "contains" },
        },
    });

    // Role Access Authentication Check
    const { data: appConfig } = useAppConfigQuery();
    const defaultRoleManager =
        appConfig !== undefined
            ? appConfig.find((item) => item["param_key"] === "DEFAULT_ROLE_MANAGER")[
            "param_value"
            ]
            : undefined;

    const { data: accountAuth } = useAccountAuthenticateQuery();

    const [item, setItem] = useState([]);
    const [open, setOpen] = useState(false);
    const handleButtonDetail = async (item: any) => {
        setItem(item);
        setOpen(true);
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
        handleButtonDetail(event.data)
    };

    const { data } = useGetProgramExperienceQuery()
    const [getKeywordList, { data: keywordList = { data: [IKeywordPrime] }, isError, isLoading }] = useLazyKeywordListPrimeQuery();

    let loadLazyTimeout: any = null;
    const loadLazyData = () => {
        setLoading(true)
        if (loadLazyTimeout) clearTimeout(loadLazyTimeout);
        loadLazyTimeout = setTimeout(async () => {
            const { data }: any = await getKeywordList({
                lazyEvent: JSON.stringify(lazyParams),
            });
            setKeywords(data.payload.data)
            setTotalRecords(data.payload.totalRecords)
            setLoading(false)
        }, Math.random() * 1000 + 250);
    };

    useEffect(() => {
        loadLazyData()
    }, [lazyParams])

    // Customize Column Render Component
    const NameRender = (rowData: any) => {
        return rowData?.eligibility?.name
    }
    const StartPeriodRender = (rowData: any) => {
        return <span>{moment(rowData?.eligibility?.start_period).format('MMMM DD, YYYY')}</span>
    }
    const EndPeriodRender = (rowData: any) => {
        return <span>{moment(rowData?.eligibility?.end_period).format('MMMM DD, YYYY')}</span>
    }

    const ProgramExperienceRender = (rowData: IkeywordPrime) => {
        let program = "";
        let program_exp : string[] = rowData?.eligibility?.program_experience;
        data?.data?.forEach((value:any) => {
            if(value?._id === program_exp?.[0]) program = value?.set_value;
        });
        return <span>{program}</span>
    }

    return (
        <Fragment>

            <KeywordDetailsModal
                open={open}
                handleClose={() => { setOpen(false) }}
                data={item}
            // roleAccess={
            //     accountAuth && defaultRoleManager ?
            //     accountAuth.role === defaultRoleManager ? true : false : false
            // } 
            />

            <Stack direction={"row"} justifyContent={"space-between"}>
                <H2 color={"secondary.dark"}>Keyword</H2>
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
                        <Add fontSize="inherit" />
                    </IconButton>
                </Stack>
            </Stack>

            <Grid container mt={3}>
                <Grid item xs={12}>
                    <DrawerNav>
                        <Box>
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
                                            filterField='eligibility.name'
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

                                    </DataTable>
                                </div>
                            </Paper>
                        </Box>
                    </DrawerNav>

                </Grid>
            </Grid>
        </Fragment>
    )
}

export default KeywordPrime;