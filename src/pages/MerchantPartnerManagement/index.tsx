import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Toolbar } from "primereact/toolbar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";
import {
  DrawerNav,
  Gap,
  H2,
  InputFile,
  InputSearchable,
} from "../../components";
import {
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import {
  Add,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { MerchantPartnerInitial, IMerchantPartner } from "./initial";
import {
  useLazyMerchantPartnerListQuery,
  useAddMerchantPartnerMutation,
  useUpdateMerchantPartnerMutation,
  useDeleteMerchantPartnerMutation,
} from "../../redux/features/merchant/merchant-api-slice";

const MerchantParnerManagement = () => {
  //================================ State =================================
  //========================================================================
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
  const [triger, setTriger] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState({
    detail: false,
    add: false,
    delete: false,
    edit: false,
  });
  const [initialMerchantPartner, setInitialMerchantPartner] =
    React.useState<IMerchantPartner>({
      partner_code: "",
      partner_name: "",
      registration_number: "",
      priority: "",
      contact_person: "",
      phone: "",
      contact_email: "",
      address: "",
      website: "",
      remark: "",
      status: "",
      npwp: "",
      partner_logo: "",
      longtitude: "",
      latitude: "",
    });
  const [preview, setPreview] = React.useState<string>("");

  const [merchantPartners, setMerchantPartners] =
    React.useState<typeof MerchantPartnerInitial[]>();
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [merchantPartnerDetail, setMerchantPartnerDetail] =
    React.useState<typeof MerchantPartnerInitial>();

  //================================ Fetching Data =========================
  //========================================================================
  const [getMerchantPartner] = useLazyMerchantPartnerListQuery();
  const [addMerchantPartner] = useAddMerchantPartnerMutation();
  const [updateMerchantPartner] = useUpdateMerchantPartnerMutation();
  const [deleteMerchantPartner] = useDeleteMerchantPartnerMutation();

  //================================ Spread Data ===========================
  //========================================================================

  //================================ Handler ===============================
  //========================================================================
  const onClearForm = () => {
    setInitialMerchantPartner({
      partner_code: "",
      partner_name: "",
      registration_number: "",
      priority: "",
      contact_person: "",
      phone: "",
      contact_email: "",
      address: "",
      website: "",
      remark: "",
      status: "",
      npwp: "",
      partner_logo: "",
      longtitude: "",
      latitude: "",
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
    console.log(event);
  };

  const onChange = (e: any) => {
    setInitialMerchantPartner({
      ...initialMerchantPartner,
      [e.target.name]: e.target.value,
    });
  };
  const handleUploadClick = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files instanceof FileList) {
      const file = event.currentTarget.files[0];
      const result = URL.createObjectURL(file);
      setPreview(result);

      setInitialMerchantPartner({
        ...initialMerchantPartner,
        partner_logo: file,
      });
    }
  };

  const onAddMerchantPartner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("partner_code", initialMerchantPartner.partner_code);
    formdata.append("partner_name", initialMerchantPartner.partner_name);
    formdata.append(
      "registration_number",
      initialMerchantPartner.registration_number
    );
    formdata.append("priority", initialMerchantPartner.priority);
    formdata.append("contact_person", initialMerchantPartner.contact_person);
    formdata.append("contact_email", initialMerchantPartner.contact_email);
    formdata.append("phone", initialMerchantPartner.phone);
    formdata.append("address", initialMerchantPartner.address);
    formdata.append("website", initialMerchantPartner.website);
    formdata.append("remark", initialMerchantPartner.remark);
    formdata.append("status", initialMerchantPartner.status);
    formdata.append("npwp", initialMerchantPartner.npwp);
    formdata.append("partner_logo", initialMerchantPartner.partner_logo);
    formdata.append("latitude", initialMerchantPartner.latitude);
    formdata.append("longtitude", initialMerchantPartner.longtitude);
    console.log("formdata: ", formdata);
    console.log("initial: ", initialMerchantPartner);
    await addMerchantPartner(formdata);
    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, add: false });
  };

  const onShowUpdateForm = async (data: IMerchantPartner) => {
    setOpen({ ...open, edit: true });
    setInitialMerchantPartner(data);
  };
  const onShowDeleteDialog = async (data: typeof MerchantPartnerInitial) => {
    setOpen({ ...open, delete: true });
  };
  const onUpdateMerchant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("partner_code", initialMerchantPartner.partner_code);
    formdata.append("partner_name", initialMerchantPartner.partner_name);
    formdata.append(
      "registration_number",
      initialMerchantPartner.registration_number
    );
    formdata.append("priority", initialMerchantPartner.priority);
    formdata.append("contact_person", initialMerchantPartner.contact_person);
    formdata.append("contact_email", initialMerchantPartner.contact_email);
    formdata.append("phone", initialMerchantPartner.phone);
    formdata.append("address", initialMerchantPartner.address);
    formdata.append("website", initialMerchantPartner.website);
    formdata.append("remark", initialMerchantPartner.remark);
    formdata.append("status", initialMerchantPartner.status);
    formdata.append("npwp", initialMerchantPartner.npwp);
    formdata.append("partner_logo", initialMerchantPartner.partner_logo);
    formdata.append("latitude", initialMerchantPartner.latitude);
    formdata.append("longtitude", initialMerchantPartner.longtitude);
    console.log("formdata: ", formdata);
    console.log("initial: ", initialMerchantPartner);
    await updateMerchantPartner(formdata);
    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, edit: false });
  };

  const onDeleteMerchantPartner = async (
    data: typeof merchantPartnerDetail
  ) => {
    Swal.fire({
      title: "Do you want to delete data?",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteMerchantPartner(data ? data._id : "");
        await Swal.fire("Deleted!", "", "success");
        setTriger((prev) => !prev);
      } else if (result.isDenied) {
        Swal.fire("Data are not deleted", "", "info");
      }
    });
  };

  //================================ Side Effect ===========================
  //========================================================================

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
      //   const { data }: any = await getMerchantPartner({
      //     lazyEvent: JSON.stringify(lazyParams),
      //   });
      const { data }: any = await getMerchantPartner({
        skip: 0,
        limit: 10,
        filter: "{}",
        sort: "{}",
      });
      setMerchantPartners(data.data);
      //   setMerchants(data.payload.data);
      //   setTotalRecords(data.payload.totalRecords);
      setLoading(false);
    }, Math.random() * 1000 + 250);
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
          Add Partner
        </Button>
        <Gap width={10} height={0} />
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
          onClick={() => onDeleteMerchantPartner(rowData)}
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
                value={merchantPartners}
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
                  footer="Partner Name"
                  header="Partner Name"
                  field="partner_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by partner name"
                />
                <Column
                  footer="Registration Number"
                  header="Registration Number"
                  field="registration_number"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by pic name"
                />
                <Column
                  footer="Status"
                  header="Status"
                  field="priority"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by status"
                />
                <Column
                  footer="Webstite"
                  header="Webstite"
                  field="website"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder="Search by website"
                />
                <Column
                  footer="Merchant Linked"
                  header="Merchant Linked"
                  field="website"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder="Search by merchant linked"
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

      {/*======================= Dialog of Add Merchant Partner ===================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
      >
        <DialogTitle variant="h5">ADD MERCHANT PARTNER</DialogTitle>
        <form onSubmit={onAddMerchantPartner}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Partner Code"
                value={initialMerchantPartner.partner_code}
                name="partner_code"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Partner Name"
                value={initialMerchantPartner.partner_name}
                name="partner_name"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Latitude"
                value={initialMerchantPartner.latitude}
                name="latitude"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Longtitude"
                value={initialMerchantPartner.longtitude}
                name="longtitude"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Registration Number"
                value={initialMerchantPartner.registration_number}
                name="registration_number"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Contact Person"
                value={initialMerchantPartner.contact_person}
                name="contact_person"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Phone"
                value={initialMerchantPartner.phone}
                name="phone"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Contact Email"
                value={initialMerchantPartner.contact_email}
                name="contact_email"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Priority"
                value={initialMerchantPartner.priority}
                name="priority"
                onChange={onChange}
                required
              />
              <Box sx={{ width: "100%" }}></Box>
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
                value={initialMerchantPartner.address}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Website"
                value={initialMerchantPartner.website}
                name="website"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Remark"
                value={initialMerchantPartner.remark}
                name="remark"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Status"
                options={[{ name: "Active" }, { name: "Inactive" }]}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchantPartner({
                    ...initialMerchantPartner,
                    status: newValue.name,
                  })
                }
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="NPWP"
                value={initialMerchantPartner.npwp}
                name="npwp"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <InputFile
              height={150}
              onSelectFile={handleUploadClick}
              preview={preview}
            />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                SAVE
              </Button>
            </Box>
            <Gap width={0} height={20} />
          </Stack>
        </form>
        <Gap width={0} height={20} />
      </Dialog>
      {/*======================= Dialog of Update Merchant Partner ===================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
      >
        <DialogTitle variant="h5">ADD MERCHANT PARTNER</DialogTitle>
        <form onSubmit={onAddMerchantPartner}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Partner Code"
                value={initialMerchantPartner.partner_code}
                name="partner_code"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Partner Name"
                value={initialMerchantPartner.partner_name}
                name="partner_name"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Latitude"
                value={initialMerchantPartner.latitude}
                name="latitude"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Longtitude"
                value={initialMerchantPartner.longtitude}
                name="longtitude"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Registration Number"
                value={initialMerchantPartner.registration_number}
                name="registration_number"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Contact Person"
                value={initialMerchantPartner.contact_person}
                name="contact_person"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Phone"
                value={initialMerchantPartner.phone}
                name="phone"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Contact Email"
                value={initialMerchantPartner.contact_email}
                name="contact_email"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Priority"
                value={initialMerchantPartner.priority}
                name="priority"
                onChange={onChange}
                required
              />
              <Box sx={{ width: "100%" }}></Box>
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
                value={initialMerchantPartner.address}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Website"
                value={initialMerchantPartner.website}
                name="website"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Remark"
                value={initialMerchantPartner.remark}
                name="remark"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Status"
                options={[{ name: "Active" }, { name: "Inactive" }]}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchantPartner({
                    ...initialMerchantPartner,
                    status: newValue.name,
                  })
                }
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="NPWP"
                value={initialMerchantPartner.npwp}
                name="npwp"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <InputFile
              height={150}
              onSelectFile={handleUploadClick}
              preview={preview}
            />
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button variant="contained" sx={{ width: "100%" }} type="submit">
                SAVE
              </Button>
            </Box>
            <Gap width={0} height={20} />
          </Stack>
        </form>
        <Gap width={0} height={20} />
      </Dialog>
    </DrawerNav>
  );
};

export default MerchantParnerManagement;
