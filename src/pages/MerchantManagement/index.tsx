import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
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
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toolbar } from "primereact/toolbar";
import {
  MerchantInitial,
  PartnerInitial,
  TableMerchantDataRows,
} from "./initial";
import {
  Add,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import {
  useLazyMerchantManagementListQuery,
  useAddMerchantManagementMutation,
  useMerchantOutletLinkMutation,
  useUpdateMerchantManagementMutation,
  useDeleteMerchantManagementMutation,
} from "../../redux/features/merchant/merchant-api-slice";
import { IMerchant } from "../../redux/features/merchant/interface";
import { usePartnerListQuery } from "../../redux/features/partner/partner-api-slice";
import Swal from "sweetalert2";
import { useGetLocationTypeQuery } from "../../redux/features/lov/lov-api-slice";
import { useLocationTemplateQuery } from "../../redux/features/location/location-api-slice";
import { useAccountRoleQuery } from "../../redux/features/account/account-api-slice";
import {
  useLazyOutletListQuery,
  useOutletListQuery,
} from "../../redux/features/outlet/outlet-api-slice";
import { LocationInitial } from "../CustomerManagement/initial";
import { RoleInitial, OutletInitial } from "./initial";

const MerchantManagement = () => {
  // ==================== State ==========================
  const [triger, setTriger] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [merchants, setMerchants] = React.useState<IMerchant[]>([]);
  const [outlets, setOutlets] = React.useState<typeof OutletInitial[]>([
    OutletInitial,
  ]);
  const [location, setLocation] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState({
    detail: false,
    add: false,
    edit: false,
    delete: false,
    link: false,
  });

  const [merchantDetail, setMerchantDetail] =
    React.useState<IMerchant | null>();
  const [lovPartner, setLovPartner] = React.useState<any[]>([]);
  const [locationType, setLocationType] = React.useState<string>("");
  const [initialLink, setInitialLink] = React.useState({
    merchant: "",
    outlet: "",
  });
  const [initialMerchant, setInitialMerchant] = React.useState({
    partner_id: "",
    merchant_name: "",
    merchant_short_code: "",
    siup_number: "",
    location_id: "",
    zip_code: "",
    address: "",
    file_compro: "",
    pic_name: "",
    pic_phone: "",
    pic_email: "",
    password: "",
    source_created_at: "",
    nat_loc: "",
    approver_1: "",
    approver_2: "",
    status_desc_1: "",
    status_desc_2: "",
    approver_1_status: "",
    approver_2_status: "",
    approver_date_1: "",
    approver_date_2: "",
    npwp: "",
    is_visible: "",
    ktp: "",
    pic_ktp: "",
    bank_name: "",
    bank_account_name: "",
    bank_account_number: "",
    apps_name: "",
    transaction_id: "",
    channel: "",
    id_business_type_1: "",
    id_business_type_2: "",
    callback_url: "",
    origin_data: "",
  });
  const [lazyParams, setLazyParams] = React.useState<any>({
    first: 0,
    rows: 5,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      merchant_name: { value: "", matchMode: "contains" },
      partner_id: { value: "", matchMode: "contains" },
      pic_name: { value: "", matchMode: "contains" },
      "poin_created_by_detail.first_name": { value: "", matchMode: "contains" },
    },
  });

  // ==================== Fetching Data ==================

  const [
    getMerchantList,
    {
      data: merchantList = { data: [MerchantInitial] },
      isError: customerError,
      isLoading: loadingCustomer,
    },
  ] = useLazyMerchantManagementListQuery();

  const { data: partnerList = { data: [PartnerInitial] } } =
    usePartnerListQuery({
      skip: 0,
      limit: 10,
      filter: `{}`,
      sort: "{}",
    });
  const { data: locationTypeList = { data: [PartnerInitial] } } =
    useGetLocationTypeQuery();
  const { data: locationList = { data: [LocationInitial] } } =
    useLocationTemplateQuery({
      type: locationType,
    });
  const { data: picRole = { data: [RoleInitial] } } = useAccountRoleQuery({
    skip: 0,
    limit: 10,
    filter: `{}`,
    sort: "{}",
  });
  const [getOutletList, { data: outletList = { data: [OutletInitial] } }] =
    useLazyOutletListQuery();

  const [linkMerchantOutlet, { isLoading: loadingLinkMerchant }] =
    useMerchantOutletLinkMutation();
  const [addMerchant, { isLoading: loadingAddMerchant }] =
    useAddMerchantManagementMutation();
  const [updateMerchant, { isLoading: loadingUpdateMerchant }] =
    useUpdateMerchantManagementMutation();
  const [deleteMerchant, { isLoading: loadingDelete }] =
    useDeleteMerchantManagementMutation();

  // ==================== Spreading State ================
  const dataMerchant = merchantList.data;

  const dataMerchantList = merchants.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.merchant_name;
    return newItem;
  });
  const dataOutletList = outlets
    .filter((item: typeof OutletInitial) => item.merchant_outlet.length <= 0)
    .map((item: typeof OutletInitial) => {
      let newItem: any = {};
      newItem["_id"] = item._id;
      newItem["name"] = item.outlet_name;
      return newItem;
    });
  const dataPartner = partnerList.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.partner_name;
    return newItem;
  });
  const dataLocationType = locationTypeList.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.set_value;
    return newItem;
  });
  const dataLocation = locationList.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.name;
    return newItem;
  });
  const dataRole = picRole.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.name;
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

  //   ================== side effect ====================
  //   ===================================================
  let loadLazyTimeout: any = null;
  React.useEffect(() => {
    loadLazyData();
  }, [lazyParams, triger]); // eslint-disable-line react-hooks/exhaustive-deps

  //   ================== Load Merchant ==================
  //   ===================================================
  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getMerchantList({
        lazyEvent: JSON.stringify(lazyParams),
      });
      setMerchants(data.payload.data);
      setTotalRecords(data.payload.totalRecords);

      const { data: dataOutlet }: any = await getOutletList({
        lazyEvent: JSON.stringify({
          first: 0,
          rows: 10,
          sortField: null,
          sortOrder: null,
          filters: {},
        }),
      });
      setOutlets(dataOutlet.payload.data);

      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  //*================ Event Handler =================
  const onClearForm = () => {
    setInitialMerchant({
      partner_id: "",
      merchant_name: "",
      merchant_short_code: "",
      siup_number: "",
      location_id: "",
      zip_code: "",
      address: "",
      file_compro: "",
      pic_name: "",
      pic_phone: "",
      pic_email: "",
      password: "",
      source_created_at: "",
      nat_loc: "",
      approver_1: "",
      approver_2: "",
      status_desc_1: "",
      status_desc_2: "",
      approver_1_status: "",
      approver_2_status: "",
      approver_date_1: "",
      approver_date_2: "",
      npwp: "",
      is_visible: "",
      ktp: "",
      pic_ktp: "",
      bank_name: "",
      bank_account_name: "",
      bank_account_number: "",
      apps_name: "",
      transaction_id: "",
      channel: "",
      id_business_type_1: "",
      id_business_type_2: "",
      callback_url: "",
      origin_data: "",
    });
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
    setMerchantDetail(event.data);
  };

  const onChange = (e: any) => {
    setInitialMerchant({ ...initialMerchant, [e.target.name]: e.target.value });
  };

  const onAddMerchant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addMerchant(initialMerchant);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Merchant success created.",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Created merchant is failed",
      });
    }
    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, add: false });
  };

  const onShowUpdateForm = async (data: typeof MerchantInitial) => {
    setOpen({ ...open, edit: true });
    setMerchantDetail(data);
    setInitialMerchant(data as any);
  };
  const onShowDeleteDialog = async (data: typeof MerchantInitial) => {
    setOpen({ ...open, delete: true });
    setMerchantDetail(data);
  };
  const onUpdateMerchant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        _id: merchantDetail?._id,
        partner_id: initialMerchant.partner_id,
        merchant_name: initialMerchant.merchant_name,
        merchant_short_code: initialMerchant.merchant_short_code,
        siup_number: initialMerchant.siup_number,
        location_id: initialMerchant.location_id,
        zip_code: initialMerchant.zip_code,
        address: initialMerchant.address,
        file_compro: initialMerchant.file_compro,
        pic_name: initialMerchant.pic_name,
        pic_phone: initialMerchant.pic_phone,
        pic_email: initialMerchant.pic_email,
        password: initialMerchant.password,
        npwp: initialMerchant.npwp,
        pic_ktp: initialMerchant.pic_ktp,
        bank_name: initialMerchant.bank_name,
        bank_account_name: initialMerchant.bank_account_name,
        bank_account_number: initialMerchant.bank_account_number,
      };
      await updateMerchant(data);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Merchant success updated.",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Update merchant is failed",
      });
    }

    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, edit: false });
  };

  const onDeleteMerchant = async (data: typeof merchantDetail) => {
    if (data && data.outlets_list.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't delete this merchant!",
      });
    } else {
      Swal.fire({
        title: "Do you want to delete data?",
        showDenyButton: true,
        confirmButtonText: `Delete`,
        denyButtonText: `Don't Delete`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteMerchant(data ? data._id : "");
          await Swal.fire("Deleted!", "", "success");
          setTriger((prev) => !prev);
        } else if (result.isDenied) {
          Swal.fire("Data are not deleted", "", "info");
        }
      });
    }
  };

  const onLinkedMerchantOutlet = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const response: any = await linkMerchantOutlet(initialLink);
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Merchant success linked to outlet.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Link merchant to outlet is failed",
      });
    }
    setInitialLink({
      merchant: "",
      outlet: "",
    });
    setTriger((prev) => !prev);
    setOpen({ ...open, link: false });
  };

  //============================== Templating for Prime Datatable =================================
  //===============================================================================================
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          sx={{ minWidth: "100px", backgroundColor: "#7B61FF" }}
          // icon="pi pi-plus"
          className="p-button-success mr-2"
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen({ ...open, add: true })}
        >
          Add Merchant
        </Button>
        <Gap width={10} height={0} />
        <Button
          sx={{
            minWidth: "100px",
            backgroundColor: "#83BB57",
            "&:hover": { backgroundColor: "#83BB57" },
          }}
          // icon="pi pi-plus"
          className="p-button-success mr-2"
          variant="contained"
          onClick={() => setOpen({ ...open, link: true })}
        >
          Link Merchant To Outlet
        </Button>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <IconButton
          sx={{ backgroundColor: "#83BB57", color: "#FFF" }}
          onClick={() => onShowUpdateForm(rowData)}
        >
          <DriveFileRenameOutlineOutlined />
        </IconButton>
        <IconButton
          sx={{ backgroundColor: "#ED0226", color: "#FFF" }}
          onClick={() => onDeleteMerchant(rowData)}
        >
          <DeleteForeverOutlined />
        </IconButton>
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
        <H2>MERCHANT</H2>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <div className="card">
              <Toolbar left={leftToolbarTemplate} />
              <DataTable
                value={merchants}
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
                  footer="Merchant Name"
                  header="Merchant Name"
                  field="merchant_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by merchant name"
                />
                <Column
                  footer="PIC Name"
                  header="PIC Name"
                  field="pic_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by pic name"
                />
                <Column
                  footer="PIC Email"
                  header="PIC Email"
                  field="pic_email"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by pic email"
                />
                <Column
                  footer="Created By"
                  header="Created By"
                  field="poin_created_by_detail.first_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder="Search by created"
                />
                <Column
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "8rem" }}
                />
              </DataTable>
            </div>
          </Paper>
        </Box>
      </Box>
      {/*======================= Dialog of Detail Merchant ========================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.detail}
        onClose={() => setOpen({ ...open, detail: false })}
      >
        <DialogTitle variant="h5">
          Merchant Name: {merchantDetail && merchantDetail.merchant_name}
        </DialogTitle>
        <DialogContent>
          <SmallCopy>
            Merchant Partner: {merchantDetail && merchantDetail.partner_id}
          </SmallCopy>
          <SmallCopy>
            SIUP Number: {merchantDetail && merchantDetail.siup_number}
          </SmallCopy>
          <SmallCopy>
            Merchant Sort Code:{" "}
            {merchantDetail && merchantDetail.merchant_short_code}
          </SmallCopy>
          <SmallCopy>
            Location: {merchantDetail && merchantDetail.location_detail.name}
          </SmallCopy>
          <SmallCopy>
            Address: {merchantDetail && merchantDetail.address}
          </SmallCopy>
          <SmallCopy>
            ZIP Code: {merchantDetail && merchantDetail.zip_code}
          </SmallCopy>
          <SmallCopy>
            Website: {merchantDetail && merchantDetail.file_compro}
          </SmallCopy>
          <SmallCopy>NPWP: {merchantDetail && merchantDetail.npwp}</SmallCopy>
          <Gap width={0} height={10} />
          <Title title="PIC" />
          <Gap width={0} height={10} />
          <SmallCopy>
            PIC Name: {merchantDetail && merchantDetail.pic_name}
          </SmallCopy>
          <SmallCopy>
            PIC Email: {merchantDetail && merchantDetail.pic_email}
          </SmallCopy>
          <SmallCopy>
            PIC Phone: {merchantDetail && merchantDetail.pic_phone}
          </SmallCopy>
          <SmallCopy>
            PIC KTP: {merchantDetail && merchantDetail.pic_ktp}
          </SmallCopy>
          <Gap width={0} height={10} />
          <Title title="Bank" />
          <Gap width={0} height={10} />
          <SmallCopy>
            Bank Name: {merchantDetail && merchantDetail.bank_name}
          </SmallCopy>
          <SmallCopy>
            Bank Account Name:{" "}
            {merchantDetail && merchantDetail.bank_account_name}
          </SmallCopy>
          <SmallCopy>
            Bank Account Number:{" "}
            {merchantDetail && merchantDetail.bank_account_number}
          </SmallCopy>
          <Gap width={0} height={10} />
          <Title title="Outlet" />
          <Gap width={0} height={10} />
          {merchantDetail &&
            merchantDetail.outlets_list.map((item) => (
              <Box sx={{ padding: "5px 0" }} key={item._id}>
                <SmallCopy>
                  Outlet Name: {item.outlet[0]?.outlet_name}
                </SmallCopy>
                <SmallCopy>
                  Outlet Address: {item.outlet[0]?.outlet_address}
                </SmallCopy>
              </Box>
            ))}
        </DialogContent>
      </Dialog>

      {/*======================= Dialog of Add Merchant ============================= */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
      >
        <DialogTitle variant="h5">ADD MERCHANT</DialogTitle>
        <form onSubmit={onAddMerchant}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Partner"
                options={dataPartner}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchant({
                    ...initialMerchant,
                    partner_id: newValue._id,
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
                value={initialMerchant.merchant_name}
                name="merchant_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="SIUP"
                value={initialMerchant.siup_number}
                name="siup_number"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Merchant Short Code"
                value={initialMerchant.merchant_short_code}
                name="merchant_short_code"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                type="password"
                size="small"
                fullWidth
                label="Password"
                value={initialMerchant.password}
                name="password"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Location Type"
                options={dataLocationType}
                onChange={(e: any, newValue: any) =>
                  setLocationType(newValue._id)
                }
              />
              <Gap width={50} height={0} />
              <InputSearchable
                required
                label="Location"
                options={dataLocation}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchant({
                    ...initialMerchant,
                    location_id: newValue._id,
                  })
                }
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="ZIP Code"
                value={initialMerchant.zip_code}
                name="zip_code"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Address"
                multiline
                rows={4}
                name="address"
                onChange={onChange}
                value={initialMerchant.address}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Website"
                value={initialMerchant.file_compro}
                name="file_compro"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="NPWP"
                value={initialMerchant.npwp}
                name="npwp"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Title title="PIC" />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="PIC Name"
                value={initialMerchant.pic_name}
                name="pic_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="PIC Email"
                value={initialMerchant.pic_email}
                name="pic_email"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="PIC Phone"
                value={initialMerchant.pic_phone}
                name="pic_phone"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />

              <TextField
                sx={{ width: "100%" }}
                size="small"
                fullWidth
                label="PIC KTP"
                value={initialMerchant.pic_ktp}
                name="pic_ktp"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Title title="Bank" />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Bank Name"
                value={initialMerchant.bank_name}
                name="bank_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Bank Account Name"
                value={initialMerchant.bank_account_name}
                name="bank_account_name"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                sx={{ width: "100%" }}
                size="small"
                fullWidth
                label="Bank Account Number"
                value={initialMerchant.bank_account_number}
                name="bank_account_number"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <Box sx={{ width: "100%" }}></Box>
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={loadingAddMerchant}
                variant="contained"
                sx={{ width: "100%" }}
                type="submit"
              >
                {loadingAddMerchant ? "LOADING.." : "SAVE"}
              </Button>
            </Box>
            <Gap width={0} height={20} />
          </Stack>
        </form>
        <Gap width={0} height={20} />
      </Dialog>

      {/*======================= Dialog of Update Merchant ========================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
      >
        <DialogTitle variant="h5">UPDATE MERCHANT</DialogTitle>
        <form onSubmit={onUpdateMerchant}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Partner"
                options={dataPartner}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchant({
                    ...initialMerchant,
                    partner_id: newValue._id,
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
                value={initialMerchant.merchant_name}
                name="merchant_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="SIUP"
                value={initialMerchant.siup_number}
                name="siup_number"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Merchant Short Code"
                value={initialMerchant.merchant_short_code}
                name="merchant_short_code"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                type="password"
                size="small"
                fullWidth
                label="Password"
                value={initialMerchant.password}
                name="password"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Location Type"
                options={dataLocationType}
                onChange={(e: any, newValue: any) =>
                  setLocationType(newValue._id)
                }
              />
              <Gap width={50} height={0} />
              <InputSearchable
                required
                label="Location"
                options={dataLocation}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchant({
                    ...initialMerchant,
                    location_id: newValue._id,
                  })
                }
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="ZIP Code"
                value={initialMerchant.zip_code}
                name="zip_code"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Address"
                multiline
                rows={4}
                name="address"
                onChange={onChange}
                value={initialMerchant.address}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Website"
                value={initialMerchant.file_compro}
                name="file_compro"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="NPWP"
                value={initialMerchant.npwp}
                name="npwp"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Title title="PIC" />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="PIC Name"
                value={initialMerchant.pic_name}
                name="pic_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="PIC Email"
                value={initialMerchant.pic_email}
                name="pic_email"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="PIC Phone"
                value={initialMerchant.pic_phone}
                name="pic_phone"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />

              <TextField
                sx={{ width: "100%" }}
                size="small"
                fullWidth
                label="PIC KTP"
                value={initialMerchant.pic_ktp}
                name="pic_ktp"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Title title="Bank" />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Bank Name"
                value={initialMerchant.bank_name}
                name="bank_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Bank Account Name"
                value={initialMerchant.bank_account_name}
                name="bank_account_name"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                sx={{ width: "100%" }}
                size="small"
                fullWidth
                label="Bank Account Number"
                value={initialMerchant.bank_account_number}
                name="bank_account_number"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <Box sx={{ width: "100%" }}></Box>
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={loadingUpdateMerchant}
                variant="contained"
                sx={{ width: "100%" }}
                type="submit"
              >
                {loadingUpdateMerchant ? "LOADING" : "SAVE"}
              </Button>
            </Box>
            <Gap width={0} height={20} />
          </Stack>
        </form>
        <Gap width={0} height={20} />
      </Dialog>

      {/*======================= Dialog of Link Merchant Outlet ===================== */}
      {/*============================================================================ */}
      <Dialog
        open={open.link}
        fullWidth
        onClose={() => setOpen({ ...open, link: false })}
      >
        {/* <Gap width={0} height={20} /> */}
        <form onSubmit={onLinkedMerchantOutlet}>
          <Stack p="3vw">
            <InputSearchable
              required
              label="Choose Merchant"
              options={dataMerchantList}
              onChange={(e: any, newValue: any) =>
                setInitialLink({
                  ...initialLink,
                  merchant: newValue._id,
                })
              }
            />
            <Gap width={0} height={20} />
            <InputSearchable
              required
              label="Choose Outlet"
              options={dataOutletList}
              onChange={(e: any, newValue: any) =>
                setInitialLink({
                  ...initialLink,
                  outlet: newValue._id,
                })
              }
            />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={loadingLinkMerchant}
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "#7B61FF",
                  color: "#FFF",
                }}
                type="submit"
              >
                {loadingLinkMerchant ? "LOADING" : "LINK"}
              </Button>
            </Box>
            <Gap width={0} height={20} />
          </Stack>
        </form>
      </Dialog>
    </DrawerNav>
  );
};

export default MerchantManagement;
