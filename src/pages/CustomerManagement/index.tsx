import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  Paper,
  TextField,
} from "@mui/material";
import { DrawerNav, Gap, H2, SmallCopy, Subtitle } from "../../components";
import {
  useCustomerBadgeListQuery,
  useCustomerBrandListQuery,
  useCustomerTierListQuery,
  useLazyCustomerListForPrimeQuery,
} from "../../redux/features/customer/customer-api-slice";
import {
  CustomerInitial,
  CustomerTierInitial,
  CustomerBrandInitial,
  LocationInitial,
} from "./initial";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  Delete,
  FilterAlt,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import { ICustomers } from "../../redux/features/customer/interface";
import { useLocationTemplateQuery } from "../../redux/features/location/location-api-slice";
import { format } from "date-fns";

const Index = () => {
  // ============== Local State =================
  const [open, setOpen] = React.useState({
    filter: false,
    detail: false,
  });
  const [filter, setFilter] = React.useState({
    search: "",
    cluster_sales: "",
    region: "",
  });
  const [queryFilter, setQueryFilter] = React.useState({
    search: "",
    cluster_sales: "",
    region: "",
  });
  const [searchKey, setSearchKey] = React.useState<string>("msisdn");
  const [paginationCustomer, setPaginationCustomer] = React.useState({
    page: 0,
    limit: 10,
  });
  const [paginationBrand, setPaginationBrand] = React.useState({
    page: 0,
    limit: 5,
  });
  const [paginationBadge, setPaginationBadge] = React.useState({
    page: 0,
    limit: 5,
  });
  const [paginationTier, setPaginationTier] = React.useState({
    page: 0,
    limit: 5,
  });

  const [customerDetail, setCustomerDetail] =
    React.useState<ICustomers | null>();
  const { page, limit } = paginationCustomer;

  // ================= Fetching with RTK ===================

  const [getProgramList, { data: customerList = { data: [CustomerInitial] } }] =
    useLazyCustomerListForPrimeQuery();

  const { data: customerBadgeList = { data: [CustomerBrandInitial] } } =
    useCustomerBadgeListQuery({
      skip: paginationBadge.page,
      limit,
      filter: `{}`,
      sort: "{}",
    });

  const { data: customerBrandList = { data: [CustomerBrandInitial] } } =
    useCustomerBrandListQuery({
      skip: paginationBrand.page,
      limit: paginationBrand.limit,
      filter: `{}`,
      sort: "{}",
    });

  const { data: customerTierList = { data: [CustomerTierInitial] } } =
    useCustomerTierListQuery({
      skip: paginationTier.page,
      limit: paginationTier.limit,
      filter: `{}`,
      sort: "{}",
    });

  // ==================== Fetching Region =======================

  const { data: locationData = { data: [LocationInitial] } } =
    useLocationTemplateQuery({
      skip: 0,
      limit: 100,
      filter: `{}`,
      sort: "{}",
    });

  // ===== Spread data from fetching data =========
  const dataCustomer = customerList.data;
  const dataCustomerBadge = customerBadgeList.data;
  const dataCustomerBrand = customerBrandList.data;
  const dataCustomerTier = customerTierList.data;
  const dataLocation = locationData.data;

  // ==================== Handler =======================
  const handleSearch = (e: any) => {
    setFilter({ ...filter, search: e.target.value });
    console.log(e.target.value);
    setTimeout(
      () => setQueryFilter({ ...queryFilter, search: e.target.value }),
      1000
    );
  };
  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleChangeSearchKey = (e: any) => {
    console.log(e.target.value);
    setSearchKey(e.target.value);
  };
  const handleFilter = async () => {
    setQueryFilter({
      ...filter,
      cluster_sales: filter.cluster_sales,
      region: filter.region,
    });
    setOpen({ ...open, filter: false });
  };

  const handleCloseFilter = async () => {
    setFilter({
      search: "",
      region: "",
      cluster_sales: "",
    });
    setOpen({ ...open, filter: false });
  };

  //====== PRIME REACT =======
  const [loading, setLoading] = React.useState(false);
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [customers, setCustomers] = React.useState<any[]>([CustomerInitial]);
  const [lazyParams, setLazyParams] = React.useState<any>({
    first: 0,
    rows: 5,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      msisdn: { value: "", matchMode: "contains" },
      activation_date: { value: "", matchMode: "contains" },
      expire_date: { value: "", matchMode: "contains" },
      region_lacci: { value: "", matchMode: "contains" },
      cluster_sales: { value: "", matchMode: "contains" },
      loyalty_tier: { value: "", matchMode: "contains" },
      arpu: { value: "", matchMode: "contains" },
      brand: { value: "", matchMode: "contains" },
    },
  });

  let loadLazyTimeout: any = null;

  React.useEffect(() => {
    loadLazyData();
  }, [lazyParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getProgramList({
        lazyEvent: JSON.stringify(lazyParams),
      });
      console.log(data.payload);
      setCustomers(data.payload.data);
      setTotalRecords(data.payload.totalRecords);
      setLoading(false);
    }, Math.random() * 1000 + 250);
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
    setOpen({ ...open, detail: true });
    setCustomerDetail(event.data);
  };

  const activationDateBodyTemplate = (rowData: ICustomers) => {
    return (
      <React.Fragment>
        <span className="image-text">
          {rowData.activation_date !== "" &&
            format(new Date(rowData.activation_date), "PPP")}
        </span>
      </React.Fragment>
    );
  };
  const expireDateBodyTemplate = (rowData: ICustomers) => {
    return (
      <React.Fragment>
        <span className="image-text">
          {rowData.expire_date !== "" &&
            format(new Date(rowData.expire_date), "PPP")}
        </span>
      </React.Fragment>
    );
  };

  return (
    <DrawerNav>
      <Box
        sx={{
          paddingTop: "3vw",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <H2>CUSTOMER</H2>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <Container>
              <div className="card">
                <DataTable
                  value={customers}
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
                    footer="MSISDN"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="msisdn"
                    header="MSISDN"
                    sortable
                    filter
                    filterPlaceholder="Search by msisdn"
                  />
                  <Column
                    footer="Activation Date"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="activation_date"
                    sortable
                    filter
                    header="Avtivation Date"
                    body={activationDateBodyTemplate}
                    filterPlaceholder="Search by activation date"
                  />
                  <Column
                    footer="Expire Date"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="expire_date"
                    sortable
                    filter
                    header="Expire Date"
                    body={expireDateBodyTemplate}
                    filterPlaceholder="Search by expire date"
                  />
                  <Column
                    footer="Region Laccy"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="region_lacci"
                    header="Region Laccy"
                    filter
                    filterPlaceholder="Search by region lacci"
                  />
                  <Column
                    footer="Cluster Sales"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="cluster_sales"
                    header="Cluster Sales"
                    filter
                    filterPlaceholder="Search by Cluster"
                  />
                  <Column
                    footer="Loyalty Tier"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="loyalty_tier"
                    header="Loyalty Tier"
                    filter
                    filterPlaceholder="Search by Tier"
                  />
                  <Column
                    footer="Brand"
                    style={{ flexGrow: 1, flexBasis: "250px" }}
                    field="brand"
                    header="Brand"
                    filter
                    filterPlaceholder="Search by Brand"
                  />
                </DataTable>
              </div>
            </Container>
          </Paper>
        </Box>

        {/* ========================= Customer Badge =========================  */}
        <Gap width={0} height={30} />
        <H2>CUSTOMER BADGE</H2>
        <Gap width={0} height={20} />
        <Grid container spacing={8}>
          {dataCustomerBadge.length <= 0 ? (
            <Grid item>No Data</Grid>
          ) : (
            dataCustomerBadge.map((data: any) => (
              <Grid key={data._id} item sm={6} md={3} lg={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Subtitle>{data.name}</Subtitle>
                    <SmallCopy>{data.description}</SmallCopy>
                  </CardContent>
                  <CardActions
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <ModeEditOutlineOutlined />
                    <Icon color="error">
                      <Delete />
                    </Icon>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>

        {/* ========================= Customer Brand =========================  */}
        <Gap width={0} height={50} />
        <H2>CUSTOMER BRAND</H2>
        <Gap width={0} height={20} />
        <Grid container spacing={8}>
          {dataCustomerBrand.map((data: any) => (
            <Grid item sm={6} md={3} lg={3} key={data._id}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Subtitle>{data.name}</Subtitle>
                  <SmallCopy>{data.description}</SmallCopy>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ModeEditOutlineOutlined />
                  <Icon color="error">
                    <Delete />
                  </Icon>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* ========================= Customer Tier =========================  */}
        <Gap width={0} height={50} />
        <H2>CUSTOMER TIER</H2>
        <Gap width={0} height={20} />
        <Grid container spacing={8}>
          {dataCustomerTier.map((data: any) => (
            <Grid key={data._id} item sm={6} md={3} lg={3}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Subtitle>{data.name}</Subtitle>
                  <SmallCopy>{data.description}</SmallCopy>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ModeEditOutlineOutlined />
                  <Icon color="error">
                    <Delete />
                  </Icon>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Gap width={0} height={20} />
      </Box>

      {/* Modal Filter */}
      {/* <Dialog
        fullWidth
        open={open.filter}
        onClose={() => setOpen({ ...open, filter: false })}
      >
        <DialogTitle
          variant="h5"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          Filter
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            freeSolo
            disableClearable
            id="combo-box-demo"
            options={dataLocation.map((option) => option.name)}
            sx={{ margin: "10px 0" }}
            value={filter.region}
            onChange={(e: any, newValue: string) =>
              setFilter({ ...filter, region: newValue })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleChange}
                name="region"
                label="Region"
              />
            )}
          />
          <Gap width={0} height={10} />
          <Autocomplete
            fullWidth
            freeSolo
            disableClearable
            id="combo-box-demo"
            options={[""]}
            sx={{ margin: "10px 0" }}
            value={filter.cluster_sales}
            onChange={(e: any, newValue: string) =>
              setFilter({ ...filter, cluster_sales: newValue })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleChange}
                name="cluster_sales"
                label="Cluster Sales"
              />
            )}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "space-around" }}>
          <Button sx={{ color: "#001A41" }} onClick={handleCloseFilter}>
            Cancel
          </Button>
          <Button onClick={handleFilter}>Apply</Button>
        </DialogActions>
      </Dialog> */}
      {/* Show Detail Customer */}
      <Dialog
        fullWidth
        open={open.detail}
        onClose={() => setOpen({ ...open, detail: false })}
      >
        <DialogTitle variant="h5">
          Customer: {customerDetail && customerDetail.msisdn}
        </DialogTitle>
        <DialogContent>
          <SmallCopy>
            Customer Profile From BI:{" "}
            {customerDetail && customerDetail.nik_rgn_name}
          </SmallCopy>
          <SmallCopy>
            Customer Level / Tier:{" "}
            {customerDetail && customerDetail.loyalty_tier.join()}
          </SmallCopy>
          <SmallCopy>
            Customer LOS: {customerDetail && customerDetail.los}
          </SmallCopy>
          {/* <SmallCopy>
            Customer Type:{" "}
            {customerDetail && customerDetail.}
          </SmallCopy> */}
          <SmallCopy>
            Customer Location-City: {customerDetail && customerDetail.kabupaten}
          </SmallCopy>
          <SmallCopy>
            Customer Brand: {customerDetail && customerDetail.brand.join()}
          </SmallCopy>
          <SmallCopy>
            Customer ARPU: {customerDetail && customerDetail.arpu}
          </SmallCopy>
          {/* <SmallCopy>
            Customer BCP Profile: {customerDetail && customerDetail.}
          </SmallCopy> */}
          <SmallCopy>
            Customer Prepaid Registration:{" "}
            {customerDetail &&
              customerDetail.activation_date &&
              format(new Date(customerDetail.activation_date), "PPP")}
          </SmallCopy>
          {/* <SmallCopy>
            Customer Telkomsel Employee Numbers:{" "}
            {customerDetail && customerDetail.}
          </SmallCopy> */}
          {/* <SmallCopy>IMEI: {customerDetail && customerDetail.}</SmallCopy> */}
          <SmallCopy>
            Complete Name: {customerDetail && customerDetail.nik_rgn_name}
          </SmallCopy>
          {/* <SmallCopy>Email: {customerDetail && customerDetail}</SmallCopy> */}
          <SmallCopy>
            Province: {customerDetail && customerDetail.region_lacci}
          </SmallCopy>
          {/* <SmallCopy>Postal Code: {customerDetail && customerDetail.}</SmallCopy> */}
          {/* <SmallCopy>Address: {customerDetail && customerDetail}</SmallCopy> */}
        </DialogContent>
      </Dialog>
    </DrawerNav>
  );
};

export default Index;
