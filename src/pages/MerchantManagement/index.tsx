import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  Paper,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React from "react";
import {
  DrawerNav,
  Gap,
  H2,
  InputSearchable,
  OutlinedTextField,
  PreTitle,
  SmallCopy,
  Title,
} from "../../components";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  MerchantInitial,
  PartnerInitial,
  TableMerchantDataRows,
} from "./initial";
import { Add, VisibilityOutlined } from "@mui/icons-material";
import { useMerchantManagementListQuery } from "../../redux/features/merchant/merchant-api-slice";
import { IMerchant } from "../../redux/features/merchant/interface";
import { usePartnerListQuery } from "../../redux/features/partner/partner-api-slice";

const MerchantManagement = () => {
  // ==================== State ==========================
  const [paginationMerchant, setPaginationMerchant] = React.useState({
    page: 0,
    limit: 10,
  });
  const [open, setOpen] = React.useState({
    detail: false,
    add: false,
  });
  const [filter, setFilter] = React.useState({
    company_name: "",
  });
  const [queryFilter, setQueryFilter] = React.useState({
    company_name: "",
  });
  const [merchantDetail, setMerchantDetail] =
    React.useState<IMerchant | null>();
  const [lovPartner, setLovPartner] = React.useState<any[]>([]);
  const [initialMerchant, setInitialMerchant] = React.useState({
    partner: "",
    location: "",
    pic_role: "",
  });

  // ==================== Fetching Data ==================

  const {
    data: merchantList = { data: [MerchantInitial] },
    isError: customerError,
    isLoading: loadingCustomer,
  } = useMerchantManagementListQuery({
    skip: paginationMerchant.page,
    limit: paginationMerchant.limit,
    filter: `{"company_name":"${queryFilter.company_name}"}`,
    sort: "{}",
  });

  const { data: partnerList = { data: [PartnerInitial] } } =
    usePartnerListQuery({
      skip: 0,
      limit: 10,
      filter: `{}`,
      sort: "{}",
    });

  // ==================== Spreading State ================
  const dataMerchant = merchantList.data;
  const dataPartner = partnerList.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.partner_name;
    return newItem;
  });

  // ==================== Handler ========================

  const handleShowMerchant = async (data: any) => {
    const merchantShow = await dataMerchant.filter(
      (item) => item._id === data._id
    );
    setOpen({ ...open, detail: true });
    setMerchantDetail(merchantShow ? merchantShow[0] : null);
  };

  const handleSearch = (e: any) => {
    setFilter({ ...filter, company_name: e.target.value });
    setTimeout(
      () => setQueryFilter({ ...queryFilter, company_name: e.target.value }),
      1000
    );
  };
  // ================= initial Table Column ======================
  const TableColumnCustomers: TableColumn<TableMerchantDataRows<any>>[] = [
    {
      name: "Company Name",
      selector: (row) => row.company_name,
    },
    {
      name: "Partner Code",
      selector: (row) => row.partner_code,
    },
    {
      name: "Partner ID",
      selector: (row) => row.partner_id,
    },
    {
      name: "Pic Name",
      selector: (row) => row.pic_name,
    },
    {
      name: "Partner Status",
      selector: (row) => row.partner_status,
    },
    {
      name: "Action",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      cell: (row) => (
        <VisibilityOutlined
          sx={{ cursor: "pointer" }}
          onClick={() => handleShowMerchant(row)}
        />
      ),
    },
  ];

  const top100Films = [
    { name: "The Shawshank Redemption", year: 1994 },
    { name: "The Godfather", year: 1972 },
    { name: "The Godfather: Part II", year: 1974 },
    { name: "The Dark Knight", year: 2008 },
    { name: "12 Angry Men", year: 1957 },
    { name: "Schindler's List", year: 1993 },
    { name: "Pulp Fiction", year: 1994 },
    {
      name: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { name: "The Good, the Bad and the Ugly", year: 1966 },
    { name: "Fight Club", year: 1999 },
    {
      name: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
  ];

  console.log(dataPartner);

  //====================== Memo for Searching component ==========================
  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <div>
          <FormControl
            sx={{
              width: "25ch",
              "& .MuiInputBase-root": {
                borderRadius: "4px",
              },
            }}
          >
            <OutlinedInput
              name="msisdn"
              value={filter.company_name}
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
              backgroundColor: "#7B61FF",
            }}
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen({ ...open, add: true })}
          >
            <PreTitle>Add Merchant</PreTitle>
          </Button>
          <Button
            sx={{
              marginLeft: 3,
              minWidth: "100px",
              backgroundColor: "#83BB57",
              "&:hover": {
                backgroundColor: "#83BB57",
              },
            }}
            variant="contained"
            onClick={() => setOpen({ ...open, add: true })}
          >
            <PreTitle>Import Merchant</PreTitle>
          </Button>
        </div>
      </Box>
    );
  }, [filter.company_name]);

  return (
    <DrawerNav>
      <Box
        sx={{
          paddingTop: "3vw",
          paddingLeft: "50px",
          paddingRight: "50px",
        }}
      >
        <H2>MERCHANT</H2>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <Container>
              <DataTable
                columns={TableColumnCustomers}
                data={dataMerchant}
                highlightOnHover
                pagination
                paginationServer
                paginationTotalRows={50}
                paginationPerPage={paginationMerchant.limit}
                subHeaderComponent={subHeaderComponentMemo}
                paginationComponentOptions={{
                  noRowsPerPage: true,
                }}
                onChangePage={(page) =>
                  setPaginationMerchant({ ...paginationMerchant, page })
                }
                subHeader
              />
            </Container>
          </Paper>
        </Box>
      </Box>
      {/* Show Detail Customer */}
      <Dialog
        fullWidth
        open={open.detail}
        onClose={() => setOpen({ ...open, detail: false })}
      >
        <DialogTitle variant="h5">
          Company: {merchantDetail && merchantDetail.company_name}
        </DialogTitle>
        <DialogContent>
          <SmallCopy>
            Merchant Name: {merchantDetail && merchantDetail.merchant_name}
          </SmallCopy>
          <SmallCopy>
            SIUP Number: {merchantDetail && merchantDetail.siup_number}
          </SmallCopy>
          <SmallCopy>
            Province: {merchantDetail && merchantDetail.province}
          </SmallCopy>
          <SmallCopy>City: {merchantDetail && merchantDetail.city}</SmallCopy>
        </DialogContent>
      </Dialog>

      {/* Dialog of Add Merchant */}
      <Dialog
        fullWidth
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
      >
        <DialogTitle variant="h5">ADD MERCHANT</DialogTitle>
        <Stack sx={{ display: "flex" }} px="3vw">
          <Box sx={{ display: "flex" }}>
            {/* <Autocomplete
              fullWidth
              freeSolo
              disableClearable
              id="combo-box-demo"
              options={top100Films.map((option) => option.name)}
              // sx={{ padding: "2px" }}
              value={""}
              onChange={(e: any, newValue: string) => {}}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={() => {}}
                  name="region"
                  label="Region"
                />
              )}
            /> */}
            <InputSearchable
              required
              label="Partner"
              options={top100Films}
              onChange={(e: any, newValue: any) =>
                setInitialMerchant({
                  ...initialMerchant,
                  partner: newValue.name,
                })
              }
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              fullWidth
              label="Merchant Name"
              value={""}
              name="merchant_name"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="SIUP"
              value={""}
              name="siup"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              fullWidth
              label="Merchant Short Code"
              value={""}
              name="merchant_short_code"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="Password"
              value={""}
              name="password"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <InputSearchable
              required
              label="Location"
              options={top100Films}
              onChange={(e: any, newValue: any) =>
                setInitialMerchant({
                  ...initialMerchant,
                  location: newValue.name,
                })
              }
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="ZIP Code"
              value={""}
              name="zip_code"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              id="outlined-multiline-static"
              label="Notification Content"
              multiline
              rows={4}
              name="notif_content"
              onChange={() => {}}
              value={""}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              fullWidth
              label="Website"
              value={""}
              name="website"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="NPWP"
              value={""}
              name="npwp"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Title title="PIC" />
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <InputSearchable
              required
              label="PIC Role"
              options={top100Films}
              onChange={(e: any, newValue: any) =>
                setInitialMerchant({
                  ...initialMerchant,
                  pic_role: newValue.name,
                })
              }
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="PIC Name"
              value={""}
              name="pic_name"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              fullWidth
              label="PIC Phone"
              value={""}
              name="pic_phone"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="PIC Email"
              value={""}
              name="pic_email"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              fullWidth
              label="PIC KTP"
              value={""}
              name="pic_ktp"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <Box sx={{ width: "100%" }}></Box>
          </Box>
          <Gap width={0} height={20} />
          <Title title="Bank" />
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <TextField
              size="small"
              fullWidth
              label="Bank Name"
              value={""}
              name="bank_name"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <TextField
              size="small"
              fullWidth
              label="Bank Account Name"
              value={""}
              name="bank_account_name"
              onChange={() => {}}
              required
            />
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              sx={{ width: "100%" }}
              size="small"
              fullWidth
              label="ZIP Code"
              value={""}
              name="zip_code"
              onChange={() => {}}
              required
            />
            <Gap width={50} height={0} />
            <Box sx={{ width: "100%" }}></Box>
          </Box>
          <Gap width={0} height={20} />
          <Box sx={{ display: "flex" }}>
            <Button variant="contained" sx={{ width: "100%" }}>
              SAVE
            </Button>
          </Box>
          <Gap width={0} height={20} />
        </Stack>
        <Gap width={0} height={20} />
      </Dialog>
    </DrawerNav>
  );
};

export default MerchantManagement;
