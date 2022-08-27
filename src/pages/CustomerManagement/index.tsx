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
  FormControl,
  Grid,
  Icon,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import {
  DrawerNav,
  Gap,
  H1,
  H2,
  PreTitle,
  SmallCopy,
  Subtitle,
} from "../../components";
import {
  useCustomerBadgeListQuery,
  useCustomerBrandListQuery,
  useCustomerListQuery,
  useCustomerTierListQuery,
} from "../../redux/features/customer/customer-api-slice";
import {
  TableColumnCustomer,
  CustomerInitial,
  CustomerTierInitial,
  CustomerBrandInitial,
  TableDataRows,
} from "./initial";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  Delete,
  FilterAlt,
  ModeEditOutlineOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { ICustomers } from "../../redux/features/customer/interface";

const Index = () => {
  // ============== Local State =================
  const [open, setOpen] = React.useState({
    filter: false,
    detail: false,
  });
  const [filter, setFilter] = React.useState({
    brand: "",
    msisdn: "",
    search: "",
  });
  const [queryFilter, setQueryFilter] = React.useState({
    brand: "",
    msisdn: "",
    search: "",
  });
  const [paginationCustomer, setPaginationCustomer] = React.useState({
    page: 0,
    limit: 3,
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

  const {
    data: customerList = { data: [CustomerInitial] },
    isError: customerError,
    isLoading: loadingCustomer,
  } = useCustomerListQuery({
    skip: page,
    limit,
    filter: `{"msisdn":"${queryFilter.msisdn}", "region_lacci": "${queryFilter.brand}", "arpu": "${queryFilter.search}"}`,
    sort: "{}",
  });
  const {
    data: customerBadgeList = { data: [CustomerBrandInitial] },
    isError: badgeError,
    isLoading: loadingBadge,
  } = useCustomerBadgeListQuery({
    skip: paginationBadge.page,
    limit,
    filter: `{}`,
    sort: "{}",
  });
  const {
    data: customerBrandList = { data: [CustomerBrandInitial] },
    isError: brandError,
    isLoading: loadingBrand,
  } = useCustomerBrandListQuery({
    skip: paginationBrand.page,
    limit: paginationBrand.limit,
    filter: `{}`,
    sort: "{}",
  });
  const {
    data: customerTierList = { data: [CustomerTierInitial] },
    isError: tierError,
    isLoading: loadingTier,
  } = useCustomerTierListQuery({
    skip: paginationTier.page,
    limit: paginationTier.limit,
    filter: `{}`,
    sort: "{}",
  });

  const dataCustomer = customerList.data;
  const dataCustomerBadge = customerBadgeList.data;
  const dataCustomerBrand = customerBrandList.data;
  const dataCustomerTier = customerTierList.data;

  // ==================== Handler =======================
  const handleSearch = (e: any) => {
    setFilter({ ...filter, search: e.target.value });
    setTimeout(
      () => setQueryFilter({ ...queryFilter, search: e.target.value }),
      1000
    );
  };
  const handleChange = (e: any) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const handleFilter = async () => {
    setQueryFilter({
      ...filter,
      brand: filter.brand,
      msisdn: filter.msisdn,
    });
    setFilter({
      brand: "",
      msisdn: "",
      search: "",
    });
    setOpen({ ...open, filter: false });
  };

  const handleCloseFilter = async () => {
    setFilter({
      brand: "",
      msisdn: "",
      search: "",
    });
    setOpen({ ...open, filter: false });
  };

  const handleShowCustomer = async (data: any) => {
    const customerShow = await dataCustomer.filter(
      (item) => item._id === data._id
    );
    setOpen({ ...open, detail: true });
    setCustomerDetail(customerShow ? customerShow[0] : null);
  };

  //====================== Memo for Searching component ==========================
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Box sx={{ display: "flex" }}>
        <FormControl
          sx={{
            width: "25ch",
            "& .MuiInputBase-root": {
              borderRadius: "4px",
            },
          }}
        >
          <OutlinedInput
            name="search"
            value={filter.search}
            onChange={handleSearch}
            sx={{
              "& .MuiInputBase-input": {
                padding: "5px 10px",
              },
            }}
            placeholder="Search"
          />
        </FormControl>
        <Button
          sx={{
            marginLeft: 3,
            minWidth: "100px",
            backgroundColor: "#001A41",
          }}
          variant="contained"
          endIcon={<FilterAlt />}
          onClick={() => setOpen({ ...open, filter: true })}
        >
          <PreTitle>Filter</PreTitle>
        </Button>
      </Box>
    );
  }, [filter.search]);

  //
  const TableColumnCustomers: TableColumn<TableDataRows<any>>[] = [
    {
      name: "MSISDN",
      selector: (row) => row.msisdn,
    },
    {
      name: "Activation Date",
      selector: (row) => row.activation_date,
    },
    {
      name: "Expiration Date",
      selector: (row) => row.expire_date,
    },
    {
      name: "Region Lacci",
      selector: (row) => row.region_lacci,
    },
    {
      name: "Cluster Sales",
      selector: (row) => row.cluster_sales,
    },
    {
      name: "Loyalty Tier",
      selector: (row) => row.loyalty_tier,
    },
    {
      name: "Arpu",
      selector: (row) => row.arpu,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Action",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      cell: (row) => (
        <VisibilityOutlined onClick={() => handleShowCustomer(row)} />
      ),
    },
  ];

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
              <DataTable
                columns={TableColumnCustomers}
                data={dataCustomer}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={10}
                paginationPerPage={paginationCustomer.limit}
                subHeaderComponent={subHeaderComponentMemo}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                onChangePage={(page) =>
                  setPaginationCustomer({ ...paginationCustomer, page })
                }
                subHeader
              />
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
              <Grid item sm={6} md={3} lg={3}>
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
      <Dialog
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
            value={filter.msisdn}
            onChange={(e: any) => {
              setFilter({ ...filter, msisdn: e.target.value });
            }}
            id="combo-box-demo"
            options={[""]}
            sx={{ margin: "10px 0" }}
            renderInput={(params) => (
              <TextField
                {...params}
                name="msisdn"
                onChange={handleChange}
                label="MSISDN"
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
            value={filter.brand}
            onChange={(e: any) =>
              setFilter({ ...filter, brand: e.target.value })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={handleChange}
                name="brand"
                label="Brand"
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
      </Dialog>
      {/* Show Detail Customer */}
      <Dialog
        fullWidth
        open={open.detail}
        onClose={() => setOpen({ ...open, detail: false })}
      >
        <DialogTitle variant="h5">Filter</DialogTitle>
        <DialogContent>
          <SmallCopy></SmallCopy>
        </DialogContent>
      </Dialog>
    </DrawerNav>
  );
};

export default Index;
