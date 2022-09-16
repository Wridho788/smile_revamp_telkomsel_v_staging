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
  SmallCopy,
} from "../../components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import {
  Add,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  MerchantOutletInitial,
  IMerchantOutlet,
  OutletInitial,
  LocationInitial,
} from "./initial";
import {
  useLazyOutletListQuery,
  useAddOutletMutation,
  useUpdateOutletMutation,
  useDeleteOutletMutation,
} from "../../redux/features/outlet/outlet-api-slice";
import { useGetLocationTypeQuery } from "../../redux/features/lov/lov-api-slice";
import { useLocationTemplateQuery } from "../../redux/features/location/location-api-slice";

const MerchantOutletManagement = () => {
  //================================ State =================================
  //========================================================================
  const [lazyParams, setLazyParams] = React.useState<any>({
    first: 0,
    rows: 5,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      outlet_name: { value: "", matchMode: "contains" },
      outlet_id: { value: "", matchMode: "contains" },
      region: { value: "", matchMode: "contains" },
      branch: { value: "", matchMode: "contains" },
      "merchant-outlet[0].merchant_id.merchant_name": {
        value: "",
        matchMode: "contains",
      },
    },
  });
  const [triger, setTriger] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);
  const [locationType, setLocationType] = React.useState({ name: "", _id: "" });

  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState({
    detail: false,
    add: false,
    delete: false,
    edit: false,
  });
  const [initialMerchantOutlet, setInitialMerchantOutlet] =
    React.useState<IMerchantOutlet>({
      outlet_code: "",
      regional: "",
      branch: "",
      outlet_name: "",
      outlet_address: "",
      longtitude: "",
      latitude: "",
    });

  const [merchantOutlets, setMerchantOutlets] =
    React.useState<typeof MerchantOutletInitial[]>();
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [merchantOutletDetail, setMerchantOutletDetail] =
    React.useState<typeof MerchantOutletInitial>();

  //================================ Fetching Data =========================
  //========================================================================
  const [getOutletList] = useLazyOutletListQuery();
  const [addOutlet] = useAddOutletMutation();
  const [updateOutlet] = useUpdateOutletMutation();
  const [deleteOutlet] = useDeleteOutletMutation();

  const { data: locationTypeList = { data: [OutletInitial] } } =
    useGetLocationTypeQuery();

  const { data: locationList = { data: [LocationInitial] } } =
    useLocationTemplateQuery({
      skip: 0,
      limit: 10,
      filter: `{"type": "${locationType?._id}"}`,
      sort: "{}",
    });
  const { data: locationBranch = { data: [LocationInitial] } } =
    useLocationTemplateQuery({
      skip: 0,
      limit: 10,
      filter: `{"type": "62ffc0fc8a01008799e785bf"}`,
      sort: "{}",
    });
  //================================ Spread Data ===========================
  //========================================================================
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
  const dataBranch = locationBranch.data.map((item: any) => {
    let newItem: any = {};
    newItem["_id"] = item._id;
    newItem["name"] = item.name;
    return newItem;
  });

  //================================ Handler ===============================
  //========================================================================
  const onClearForm = () => {
    setInitialMerchantOutlet({
      outlet_code: "",
      regional: "",
      branch: "",
      outlet_name: "",
      outlet_address: "",
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
    setMerchantOutletDetail(event.data);
  };

  const onChange = (e: any) => {
    setInitialMerchantOutlet({
      ...initialMerchantOutlet,
      [e.target.name]: e.target.value,
    });
  };

  const onAddMerchantOutlet = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addOutlet(initialMerchantOutlet);
    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, add: false });
  };

  const onShowUpdateForm = async (data: IMerchantOutlet) => {
    setOpen({ ...open, edit: true });
    setInitialMerchantOutlet(data);
  };
  const onShowDeleteDialog = async (data: typeof MerchantOutletInitial) => {
    setOpen({ ...open, delete: true });
  };
  const onUpdateMerchantOutlet = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await updateOutlet(initialMerchantOutlet);
    setTriger((prev) => !prev);
    onClearForm();
    setOpen({ ...open, edit: false });
  };

  const onDeleteMerchantOutlet = async (data: typeof merchantOutletDetail) => {
    Swal.fire({
      title: "Do you want to delete data?",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteOutlet(data ? data._id : "");
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
      const { data }: any = await getOutletList({
        lazyEvent: JSON.stringify(lazyParams),
      });
      setMerchantOutlets(data.payload.data);
      setTotalRecords(data.payload.totalRecords);
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
          Add Outlet
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
          onClick={() => onDeleteMerchantOutlet(rowData)}
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
        <H2>OUTLET</H2>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <div className="card">
              <Toolbar left={leftToolbarTemplate} />
              <DataTable
                value={merchantOutlets}
                lazy
                filterDisplay="row"
                responsiveLayout="scroll"
                dataKey="id"
                paginator
                first={lazyParams.first}
                rows={5}
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
                  footer="Outlet Name"
                  header="Outlet Name"
                  field="outlet_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search"
                />
                <Column
                  footer="Outlet Code"
                  header="Outlet Code"
                  field="outlet_id"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search"
                />
                <Column
                  footer="Location"
                  header="Location"
                  field="regional_detail.name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search"
                />
                <Column
                  footer="Telkomsel Branch"
                  header="Telkomsel Branch"
                  field="branch_detail.name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder="Search"
                />
                <Column
                  footer="Merchant"
                  header="Merchant"
                  field="merchant-outlet[0].merchant_id.merchant_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder="Search"
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
          Outlet Name:{" "}
          {merchantOutletDetail && merchantOutletDetail.outlet_name}
        </DialogTitle>
        <DialogContent>
          <SmallCopy>
            Outlet ID: {merchantOutletDetail && merchantOutletDetail.outlet_id}
          </SmallCopy>
          <SmallCopy>
            Outlet Address:{" "}
            {merchantOutletDetail && merchantOutletDetail.outlet_address}
          </SmallCopy>
          <SmallCopy>
            Branch:{" "}
            {merchantOutletDetail && merchantOutletDetail.branch_detail.name}
          </SmallCopy>
          <SmallCopy>
            Regional:{" "}
            {merchantOutletDetail && merchantOutletDetail.regional_detail.name}
          </SmallCopy>
        </DialogContent>
      </Dialog>

      {/*======================= Dialog of Add Merchant Outlet ===================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.add}
        onClose={() => setOpen({ ...open, add: false })}
      >
        <DialogTitle variant="h5">ADD MERCHANT Outlet</DialogTitle>
        <form onSubmit={onAddMerchantOutlet}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Outlet Name"
                value={initialMerchantOutlet.outlet_name}
                name="outlet_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Outlet Code"
                value={initialMerchantOutlet.outlet_code}
                name="outlet_code"
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
                onChange={(e: any, newValue: any) => setLocationType(newValue)}
              />
              <Gap width={50} height={0} />
              <InputSearchable
                required
                label="Location"
                options={dataLocation}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchantOutlet({
                    ...initialMerchantOutlet,
                    regional: newValue._id,
                  })
                }
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Telkomsel Branch"
                options={dataBranch}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchantOutlet({
                    ...initialMerchantOutlet,
                    branch: newValue._id,
                  })
                }
              />
              <Gap width={50} height={0} />
              <Box sx={{ width: "100%" }}></Box>
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Longtitude"
                value={initialMerchantOutlet.longtitude}
                name="longtitude"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Latitude"
                value={initialMerchantOutlet.latitude}
                name="latitude"
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
                name="outlet_address"
                onChange={onChange}
                value={initialMerchantOutlet.outlet_address}
                required
              />
            </Box>
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
      {/*======================= Dialog of Update Merchant Outlet ===================== */}
      {/*============================================================================ */}
      <Dialog
        fullWidth
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
      >
        <DialogTitle variant="h5">ADD MERCHANT Outlet</DialogTitle>
        <form onSubmit={onUpdateMerchantOutlet}>
          <Stack sx={{ display: "flex" }} px="3vw">
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Outlet Name"
                value={initialMerchantOutlet.outlet_name}
                name="outlet_name"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Outlet Code"
                value={initialMerchantOutlet.outlet_code}
                name="outlet_code"
                onChange={onChange}
                required
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                value={locationType}
                required
                label="Location Type"
                options={dataLocationType}
                onChange={(e: any, newValue: any) => setLocationType(newValue)}
              />
              <Gap width={50} height={0} />
              <InputSearchable
                required
                label="Location"
                options={dataLocation}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchantOutlet({
                    ...initialMerchantOutlet,
                    regional: newValue._id,
                  })
                }
              />
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <InputSearchable
                required
                label="Telkomsel Branch"
                options={dataBranch}
                onChange={(e: any, newValue: any) =>
                  setInitialMerchantOutlet({
                    ...initialMerchantOutlet,
                    branch: newValue._id,
                  })
                }
              />
              <Gap width={50} height={0} />
              <Box sx={{ width: "100%" }}></Box>
            </Box>
            <Gap width={0} height={20} />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                fullWidth
                label="Longtitude"
                value={initialMerchantOutlet.longtitude}
                name="longtitude"
                onChange={onChange}
                required
              />
              <Gap width={50} height={0} />
              <TextField
                size="small"
                fullWidth
                label="Latitude"
                value={initialMerchantOutlet.latitude}
                name="latitude"
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
                name="outlet_address"
                onChange={onChange}
                value={initialMerchantOutlet.outlet_address}
                required
              />
            </Box>
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

export default MerchantOutletManagement;
