import React, {FC, useEffect, useState} from 'react'
import {BodyCopy, H2} from "../../atoms";
import {Alert, Box, Grid, IconButton, Paper, Stack, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import DarkButton from "../../atoms/DarkButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ProgramInitial} from "../../../pages/ProgramManagement/initial";
import {useLazyProgramPrimeListQuery,} from "../../../redux/features/program-primedt/program-primedt-api-slice";
import {IProgram} from "../../../redux/features/program-primedt/interface";
import moment from "moment";
import {useAppConfigQuery} from "../../../redux/features/app-config/app-config-api-slice";
import {useAccountAuthenticateQuery} from "../../../redux/features/account/account-api-slice";
import ProgramDetailsModal from "../Programs/Detail/ProgramDetailsModal";

const ProgramPrimeDt: FC = () => {
    const [programs, setPrograms] = useState<any>([ProgramInitial])
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [lazyParams, setLazyParams] = React.useState<any>({
        first: 0,
        rows: 10,
        page: 1,
        sortField: "created_at",
        sortOrder: -1,
        filters: {
            name: {value: "", matchMode: "contains"},
        },
    });

    // Role Access Authentication Check
    const {data: appConfig} = useAppConfigQuery();
    const defaultRoleManager =
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

    const {data: accountAuth} = useAccountAuthenticateQuery();

    // Detail Program
    const [item, setItem] = useState([ProgramInitial]);
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

    let loadLazyTimeout: any = null;
    const loadLazyData = () => {
        loadLazyTimeout = setTimeout(async () => {
            const {data}: any = await getProgramList({
                lazyEvent: JSON.stringify(lazyParams),
            });
            console.log(data.payload);
            setPrograms(data.payload.data)
            setTotalRecords(data.payload.totalRecords)
        }, Math.random() * 1000 + 250);
    };

    const [getProgramList, {data: programPrimeList = {data: [ProgramInitial]}}] = useLazyProgramPrimeListQuery()

    useEffect(() => {
        loadLazyData()
    }, [lazyParams])


    // Customize Column Render Component
    const NameRender = (rowData: IProgram) => {
        return rowData.name.length >= 7 ? rowData.name.substring(0, 7) + "..." : rowData.name
    }
    const StartPeriodRender = (rowData: IProgram) => {
        return <span>{moment(rowData.start_period).format('MMMM DD, YYYY')}</span>
    }
    const EndPeriodRender = (rowData: IProgram) => {
        return <span>{moment(rowData.end_period).format('MMMM DD, YYYY')}</span>
    }
    const ThresholdAlarmExpiredRender = (rowData: IProgram) => {
        return (
            <Box sx={{textAlign: 'center', width: '100%'}}>
                <Typography variant="body1"> H-{rowData.threshold_alarm_expired} </Typography>
            </Box>
        )
    }
    const ThresholdAlarmVoucherRender = (rowData: IProgram) => {
        return (
            <Box sx={{textAlign: 'center', width: '100%'}}>
                <Typography variant="body1"> {rowData.threshold_alarm_voucher} Voucher </Typography>
            </Box>
        )
    }
    const StatusApprovalRender = (rowData: any) => {
            return (
                <Box sx={{
                    textAlign: 'center',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                }}>
                    {

                        // rowData.isHQ ?
                        //     rowData.status &&
                        //     rowData.status.set_value === 'New' ? <Alert severity="warning">Waiting Approval HQ</Alert> :
                        //         <Alert severity="success">HQ Manager</Alert>
                        //     :
                        //     rowData.status &&
                        //     rowData.status.set_value === 'New' ? <Alert severity="warning">Waiting Manager HQ &
                        //             Manager {rowData.created_by.account_location.location_detail.name}</Alert> :
                        //         rowData.status.set_value === 'Approved by Manager HQ' ?
                        //             <Alert severity="success">HQ Manager</Alert> :
                        //             <Alert severity="warning">Waiting Approval HQ</Alert>

                        rowData.approval_log &&
                        rowData.approval_log.length > 0 ?
                            <Alert severity="success" icon={false}>{rowData.approval_log[rowData.approval_log.length - 1].status[0].set_value}</Alert> :
                            rowData.isHQ ?
                                <Alert severity="warning" icon={false}>Waiting Approval HQ Manager</Alert>:
                                <Alert severity="warning" icon={false}>Waiting Approval Area Manager</Alert>

                    }
                </Box>
            )
    }



    return (
        <>
            {/* Modal Detail Program */}
            <ProgramDetailsModal
                open={open}
                handleClose={() => {
                    setOpen(false)
                }}
                data={item}
                roleAccess={
                    accountAuth && defaultRoleManager ?
                        accountAuth.role === defaultRoleManager ? true : false : false
                }
                isHqLogin={
                    accountAuth && accountAuth.account_location.location_detail.type === defaultRoleManagerHQ ? true : false
                }
            />

            {/* Header Action */}
            <Stack direction={"row"} justifyContent={"space-between"}>
                <H2 color={"secondary.dark"} onClick={() => {console.log(accountAuth)}}>Program</H2>
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
                    <DarkButton
                        variant="contained"
                        size="medium"
                        startIcon={<FilterListIcon/>}
                    >
                        <BodyCopy>Filter</BodyCopy>
                    </DarkButton>
                </Stack>
            </Stack>

            {/* Prime DataTable */}
            <Grid container mt={10}>
                <Grid item xs={12}>
                    <Box>
                        <Paper>
                            <div className="card">
                                <DataTable
                                    value={programs}
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
                                >
                                    <Column
                                        style={{flexGrow: 1, flexBasis: "250px"}}
                                        field="name"
                                        header="PROGRAM NAME"
                                        sortable
                                        filter
                                        body={NameRender}
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        style={{flexGrow: 1, flexBasis: "250px"}}
                                        field="start_period"
                                        header="START PERIOD"
                                        sortable
                                        body={StartPeriodRender}
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        style={{flexGrow: 1, flexBasis: "250px"}}
                                        field="end_period"
                                        header="END PERIOD"
                                        sortable
                                        body={EndPeriodRender}
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        style={{flexGrow: 1, flexBasis: "250px"}}
                                        field="threshold_alarm_expired"
                                        header="THRESHOLD ALARM"
                                        sortable
                                        body={ThresholdAlarmExpiredRender}
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        style={{flexGrow: 1, flexBasis: "250px"}}
                                        field="threshold_alarm_voucher"
                                        header="THRESHOLD VOUCHER"
                                        sortable
                                        body={ThresholdAlarmVoucherRender}
                                        filterPlaceholder="Search"
                                    />

                                    <Column
                                        style={{
                                            flexGrow: 1,
                                            flexBasis: "250px",
                                            textAlign: "center",
                                            alignItems: 'center'
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
                </Grid>
            </Grid>
        </>
    )
}

export default ProgramPrimeDt
