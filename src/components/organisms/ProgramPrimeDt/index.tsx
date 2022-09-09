import React, {FC, useEffect, useState} from 'react'
import {BodyCopy, H2} from "../../atoms";
import {Box, Grid, IconButton, Input, Paper, Stack} from "@mui/material";
import {Add} from "@mui/icons-material";
import ListButton from "../../atoms/ListButton";
import CardButton from "../../atoms/CardButton";
import DarkButton from "../../atoms/DarkButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {ProgramInitial} from "../../../pages/ProgramManagement/initial";
import {
    useLazyProgramPrimeListQuery,
} from "../../../redux/features/program-primedt/program-primedt-api-slice";
import {CustomerBrandInitial} from "../../../pages/CustomerManagement/initial";
import {useCustomerBadgeListQuery} from "../../../redux/features/customer/customer-api-slice";
import {IProgram} from "../../../redux/features/program-primedt/interface";
import moment from "moment";
import {IData} from "../../../redux/features/program/interface";
import ProgramDetailsModal from "../../../atomic/components/atoms/Modal/ProgramDetailsModal";

const ProgramPrimeDt: FC = () => {
    const [programs, setPrograms] = useState<any>([ProgramInitial])
    const [loading, setLoading] = useState<boolean>(false);
    const [totalRecords, setTotalRecords] = useState<number>(0)
    const [lazyParams, setLazyParams] = React.useState<any>({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            name: { value: "", matchMode: "contains" },
        },
    });

    // Detail Program
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

    let loadLazyTimeout: any = null;
    const loadLazyData = () => {
        loadLazyTimeout = setTimeout(async () => {
            const { data }: any = await getProgramList({
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
    const StartPeriodRender = (rowData: IProgram) => {
        return <span>{moment(rowData.start_period).format('MMMM DD, YYYY')}</span>
    }
    const EndPeriodRender = (rowData: IProgram) => {
        return <span>{moment(rowData.end_period).format('MMMM DD, YYYY')}</span>
    }


    return (
        <>
            {/* Modal Detail Program */}
            <ProgramDetailsModal
                open={open}
                handleClose={() => {setOpen(false)}}
                data={item}
                roleAccess={false}
            />

            {/* Header Action */}
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
                                        footer="Program Name"
                                        style={{ flexGrow: 1, flexBasis: "250px" }}
                                        field="name"
                                        header="PROGRAM NAME"
                                        sortable
                                        filter
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        footer="Start Period"
                                        style={{ flexGrow: 1, flexBasis: "250px" }}
                                        field="start_period"
                                        header="START PERIOD"
                                        sortable
                                        filter={false}
                                        body={StartPeriodRender}
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        footer="End Period"
                                        style={{ flexGrow: 1, flexBasis: "250px" }}
                                        field="end_period"
                                        header="END PERIOD"
                                        sortable
                                        filter={false}
                                        body={EndPeriodRender}
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        footer="Time Zone"
                                        style={{ flexGrow: 1, flexBasis: "250px", textAlign: "center", alignItems:'center' }}
                                        field="program_time_zone"
                                        header="TIME ZONE"
                                        sortable
                                        filter
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        footer="Threshold Alarm Expired"
                                        style={{ flexGrow: 1, flexBasis: "250px" }}
                                        field="threshold_alarm_expired"
                                        header="THRESHOLD ALARM EXPIRED"
                                        sortable
                                        filter
                                        filterPlaceholder="Search"
                                    />
                                    <Column
                                        footer="Threshold Alarm Voucher"
                                        style={{ flexGrow: 1, flexBasis: "250px" }}
                                        field="threshold_alarm_voucher"
                                        header="THRESHOLD ALARM VOUCHER"
                                        sortable
                                        filter
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
