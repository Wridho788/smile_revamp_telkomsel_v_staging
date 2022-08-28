import {
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
} from "@mui/material";
import React from "react";
import {
  DrawerNav,
  Gap,
  H2,
  OutlinedTextField,
  PreTitle,
  SmallCopy,
} from "../../components";
import DataTable, { TableColumn } from "react-data-table-component";
import { MerchantInitial, TableMerchantDataRows } from "./initial";
import { Add, VisibilityOutlined } from "@mui/icons-material";
import { useMerchantManagementListQuery } from "../../redux/features/merchant/merchant-api-slice";
import { IMerchant } from "../../redux/features/merchant/interface";

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

  // ==================== Spreading State ================
  const dataMerchant = merchantList.data;

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
            <OutlinedTextField
              placeholder="Name"
              value=""
              handleChange={() => {}}
              variant="outlined"
            />
            <Gap width={50} height={0} />
            <OutlinedTextField
              placeholder="Name"
              value=""
              handleChange={() => {}}
              variant="outlined"
            />
          </Box>
        </Stack>
      </Dialog>
    </DrawerNav>
  );
};

export default MerchantManagement;
