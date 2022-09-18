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
import {
  MerchantPartnerInitial,
  IMerchantPartner,
  PartnerInitial,
} from "./initial";
import {
  useAddPartnerMutation,
  useDeletePartnerMutation,
  useLazyPartnerListQuery,
  useUpdatePartnerMutation,
} from "redux/features/partner/partner-api-slice";

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
      partner_name: { value: "", matchMode: "contains" },
      partner_code: { value: "", matchMode: "contains" },
      status: { value: "", matchMode: "contains" },
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
  const [initialPartner, setInitialPartner] = React.useState({
    partner_code: "",
    partner_name: "",
    partner_status: "",
  });

  const [partners, setPartners] = React.useState<typeof PartnerInitial[]>();
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [partnerDetail, setPartnerDetail] =
    React.useState<typeof PartnerInitial>();

  //================================ Fetching Data =========================
  //========================================================================
  const [getPartner] = useLazyPartnerListQuery();
  const [addPartner, { isLoading: loadingAddPartner }] =
    useAddPartnerMutation();
  const [updatePartner, { isLoading: loadingUpdatePartner }] =
    useUpdatePartnerMutation();
  const [deletePartner, { isLoading: loadingDeletePartner }] =
    useDeletePartnerMutation();

  //================================ Spread Data ===========================
  //========================================================================

  //================================ Handler ===============================
  //========================================================================
  const onClearForm = () => {
    setInitialPartner({
      partner_code: "",
      partner_name: "",
      partner_status: "",
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
    setInitialPartner({
      ...initialPartner,
      [e.target.name]: e.target.value,
    });
  };

  const onAddPartner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addPartner(initialPartner);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Create Partner success",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Create  partner is failed.",
      });
    }
    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, add: false });
  };

  const onShowUpdateForm = async (data: typeof PartnerInitial) => {
    setOpen({ ...open, edit: true });
    console.log(data);
    setInitialPartner(data);
  };
  const onShowDeleteDialog = async (data: typeof PartnerInitial) => {
    setOpen({ ...open, delete: true });
  };
  const onUpdatePartner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePartner(initialPartner);
      Swal.fire({
        icon: "success",
        title: "Success...",
        text: "Update partner success",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Update  partner is failed.",
      });
    }

    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, edit: false });
  };

  const onDeletePartner = async (data: typeof partnerDetail) => {
    Swal.fire({
      title: "Do you want to delete data?",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deletePartner(data ? data._id : "");
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
      const { data }: any = await getPartner({
        limit: 10,
        skip: 0,
        filter: "{}",
        sort: "{}",
      });
      setPartners(data.data);
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
          onClick={() => onDeletePartner(rowData)}
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
        <H2>PARTNER</H2>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <div className="card">
              <Toolbar left={leftToolbarTemplate} />
              <DataTable
                value={partners}
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
                  footer="Partner Code"
                  header="Partner Code"
                  field="partner_code"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by partner code"
                />
                <Column
                  footer="Status"
                  header="Status"
                  field="partner_status"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by status"
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

      {/*======================= Dialog of Add Partner ===================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
      >
        <DialogTitle variant="h5">ADD PARTNER</DialogTitle>
        <form onSubmit={onAddPartner}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Partner Code"
                value={initialPartner.partner_code}
                name="partner_code"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Partner Name"
                value={initialPartner.partner_name}
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
                label="Partner Code"
                value={initialPartner.partner_status}
                name="partner_status"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={loadingAddPartner}
                variant="contained"
                sx={{ width: "100%" }}
                type="submit"
              >
                {loadingAddPartner ? "Loading" : "SAVE"}
              </Button>
            </Box>
            <Gap width={0} height={20} />
          </Stack>
        </form>
        <Gap width={0} height={20} />
      </Dialog>
      {/*======================= Dialog of Update Partner ===================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
      >
        <DialogTitle variant="h5">ADD PARTNER</DialogTitle>
        <form onSubmit={onUpdatePartner}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Partner Code"
                value={initialPartner.partner_code}
                name="partner_code"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Partner Name"
                value={initialPartner.partner_name}
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
                label="Partner Status"
                value={initialPartner.partner_status}
                name="partner_status"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={loadingUpdatePartner}
                variant="contained"
                sx={{ width: "100%" }}
                type="submit"
              >
                {loadingUpdatePartner ? "Loading" : "SAVE"}
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
