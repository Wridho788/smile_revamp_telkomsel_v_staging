import {
  Add,
  Cancel,
  DeleteForeverOutlined,
  DriveFileRenameOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import {
  DrawerNav,
  Gap,
  H2,
  InputSearchable,
  PreTitle,
  Select,
  SmallCopy,
} from "../../components";
import { IData } from "../../redux/features/notification/interface";
import {
  useLazyNotificationTemplateQuery,
  useAddNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
} from "../../redux/features/notification/notification-api-slice";
import {
  useGetNotifReceiverQuery,
  useGetNotifTypeQuery,
  useGetNotifViaQuery,
} from "../../redux/features/lov/lov-api-slice";
import {
  createNotification,
  NotifChannelID,
  NotificationInitial,
  NotificationTypeInitial,
  NotifReceiverInitial,
} from "./initial";
import Swal from "sweetalert2";
import { NotificationInitialCreate } from "pages/NotificationManagement/interface";
import _without from "lodash/without";
import find from "lodash/find";
import { useChannelListQuery } from "redux/features/channel/channel-api-slice";
import { FilterInitial } from "redux/utils/initial-general";
import Channel from "pages/NotificationManagement/Channel";

const NotificationManagement = () => {
  // ==================== local state ====================
  const [loading, setLoading] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<IData[]>([]);
  const [notificationDetail, setNotificationDetail] = React.useState<IData>();
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [open, setOpen] = React.useState({
    detail: false,
    add: false,
    edit: false,
    delete: false,
  });
  const [triger, setTriger] = React.useState<boolean>(false);
  const [stateTriger, setStateTriger] = React.useState<boolean>(false);
  const [lazyParams, setLazyParams] = React.useState<any>({
    first: 0,
    rows: 5,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      notif_type: { value: "", matchMode: "contains" },
      notif_name: { value: "", matchMode: "contains" },
      notif_content: { value: "", matchMode: "contains" },
      notif_via: { value: "", matchMode: "contains" },
      // receiver: { value: "", matchMode: "on" },
      // channel_id: { value: "", matchMode: "on" },
    },
  });
  const [initialNotif, setInitialNotif] = React.useState<
    NotificationInitialCreate
  >(createNotification);

  //================= Fetching Function ===================
  //=======================================================
  const [
    getNotificationTemplate,
    { data: notificationList = { data: [NotificationInitial] } },
  ] = useLazyNotificationTemplateQuery();

  const {
    data: notificationType = { data: [NotificationTypeInitial] },
    isLoading: loadingNotificationType,
    isError: errorNotificationType,
  } = useGetNotifTypeQuery();
  const {
    data: notificationVia = { data: [NotificationTypeInitial] },
    isLoading: loadingNotificationVia,
    isError: errorNotificationVia,
  } = useGetNotifViaQuery();
  const { data: notifReceiverData = { data: [] } } = useGetNotifReceiverQuery();
  const {
    data: channelIdData = { data: [NotifChannelID] },
  } = useChannelListQuery(FilterInitial);

  const [
    addNotification,
    { isLoading: loadingAdd },
  ] = useAddNotificationMutation();
  const [
    updateNotification,
    { isLoading: loadingUpdate },
  ] = useUpdateNotificationMutation();
  const [
    deleteNotification,
    { isLoading: loadingDelete },
  ] = useDeleteNotificationMutation();

  //================= Spreads Fetching Data ===================
  //===========================================================
  const dataNotificationType = notificationType.data.map((item: any) => {
    let newItem: any = {};
    newItem["name"] = item.set_value;
    return newItem;
  });
  const dataNotificationVia = notificationVia.data.map((item: any) => {
    let newItem: any = {};
    newItem["name"] = item.set_value;
    return newItem;
  });

  let loadLazyTimeout: any = null;

  //   ================== side effect ====================
  //   ===================================================
  React.useEffect(() => {
    loadLazyData();
  }, [lazyParams, triger]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }

    //imitate delay of a backend call
    loadLazyTimeout = setTimeout(async () => {
      const { data }: any = await getNotificationTemplate({
        skip: 0,
        limit: 10,
        filter: "{}",
        sort: "{}",
      });
      setNotifications(data.data);
      setTotalRecords(data.total);
      setLoading(false);
    }, Math.random() * 1000 + 250);
  };

  //*================ Event Handler =================
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
    setNotificationDetail(event.data);
  };

  // const onChange = (e: any) => {
  //   setInitialNotif({ ...initialNotif, [e.target.name]: e.target.value });
  // };

  const onAddNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addNotification(initialNotif);
    setTriger((prev) => !prev);
    setInitialNotif({
      notif_type: "",
      notif_name: "",
      notif_via: "",
      notif_content: "",
      receiver: [],
      channel_id: [],
    });
    setOpen({ ...open, add: false });
  };

  const onShowUpdateForm = async (data: typeof NotificationInitial) => {
    setOpen({ ...open, edit: true });
    setNotificationDetail(data);
    setInitialNotif(data as any);
  };
  const onShowDeleteDialog = async (data: typeof NotificationInitial) => {
    setOpen({ ...open, delete: true });
    setNotificationDetail(data);
  };
  const onUpdateNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      _id: notificationDetail?._id,
      notif_type: initialNotif?.notif_type,
      notif_name: initialNotif?.notif_name,
      notif_via: initialNotif?.notif_via,
      notif_content: initialNotif?.notif_content,
    };
    await updateNotification(data);
    setTriger((prev) => !prev);
    setOpen({ ...open, edit: false });
  };

  const onDeleteNotification = async (data: typeof notificationDetail) => {
    Swal.fire({
      title: "Do you want to delete data?",
      showDenyButton: true,
      confirmButtonText: `Delete`,
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteNotification(data ? data._id : "");
        await Swal.fire("Deleted!", "", "success");
        setTriger((prev) => !prev);
      } else if (result.isDenied) {
        Swal.fire("Data are not deleted", "", "info");
      }
    });
  };

  //============================== Templating for Prime Datatable =================================
  //===============================================================================================
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          sx={{ minWidth: "100px", backgroundColor: "#7B61FF" }}
          // icon="pi pi-plus"
          className='p-button-success mr-2'
          variant='contained'
          startIcon={<Add />}
          onClick={() => setOpen({ ...open, add: true })}>
          New
        </Button>
      </React.Fragment>
    );
  };

  const receiverBodyTemplate = (rowData: any) => {
    const data = rowData.receiver.map((item: any) => item.set_value);
    return (
      <React.Fragment>
        <span className='image-text'>{data.join(",")}</span>
      </React.Fragment>
    );
  };
  const channelBodyTemplate = (rowData: any) => {
    const data = rowData.channel_id.map((item: any) => item.name);
    return (
      <React.Fragment>
        <span className='image-text'>{data.join(",")}</span>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <IconButton
          sx={{ backgroundColor: "#83BB57", color: "#FFF" }}
          onClick={() => onShowUpdateForm(rowData)}>
          <DriveFileRenameOutlineOutlined />
        </IconButton>
        <IconButton
          sx={{ backgroundColor: "#ED0226", color: "#FFF" }}
          onClick={() => onDeleteNotification(rowData)}>
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
        }}>
        <H2>NOTIFICATION</H2>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <div className='card'>
              <Toolbar left={leftToolbarTemplate} />
              <DataTable
                value={notifications}
                lazy
                filterDisplay='row'
                responsiveLayout='scroll'
                dataKey='id'
                paginator
                first={lazyParams.first}
                rows={10}
                totalRecords={10}
                onPage={onPage}
                onSort={onSort}
                onFilter={onFilter}
                filters={lazyParams.filters}
                loading={loading}
                scrollable
                scrollDirection='both'
                selectionMode='single'
                onRowSelect={onRowSelect}>
                <Column
                  footer='Notification Type'
                  header='Notification Type'
                  field='notif_type'
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder='Search by Type'
                />
                <Column
                  footer='Notification Name'
                  header='Notification Name'
                  field='notif_name'
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder='Search by Name'
                />
                <Column
                  footer='Notification Via'
                  header='Notification Via'
                  field='notif_via'
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder='Search by Via'
                />
                <Column
                  footer='Notification Content'
                  header='Notification Content'
                  field='notif_content'
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder='Search by Content'
                />

                <Column
                  footer='Receiver'
                  header='Receiver'
                  field='receiver'
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  body={receiverBodyTemplate}
                  filter
                  filterPlaceholder='Search by Receiver '
                />
                <Column
                  footer='Channel'
                  header='Channel'
                  field='channel_id'
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  body={channelBodyTemplate}
                  filter
                  filterPlaceholder='Search by Receiver '
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

      {/*============================= Show Detail ======================== */}
      {/*================================================================== */}
      <Dialog
        fullWidth
        open={open.detail}
        onClose={() => setOpen({ ...open, detail: false })}>
        <DialogTitle>Detail Notification</DialogTitle>
        <DialogContent>
          <SmallCopy>
            Notification Type :{" "}
            {notificationDetail && notificationDetail.notif_type}
          </SmallCopy>
          <SmallCopy>
            Notification Name :{" "}
            {notificationDetail && notificationDetail.notif_name}
          </SmallCopy>
          <SmallCopy>
            Notification Via :{" "}
            {notificationDetail && notificationDetail.notif_via}
          </SmallCopy>
          <SmallCopy>
            Notification Content :{" "}
            {notificationDetail && notificationDetail.notif_content}
          </SmallCopy>
        </DialogContent>
      </Dialog>

      {/*=========================== Dialog of Add Notification ======================== */}
      {/* ============================================================================== */}
      <Dialog
        fullWidth
        open={open.add}
        scroll='body'
        onClose={() => setOpen({ ...open, add: false })}
        sx={{ "& .MuiPaper-root": { overflowY: "initial" } }}>
        <DialogTitle variant='h5'>Add Notification</DialogTitle>
        <Gap width={0} height={10} />
        <form onSubmit={onAddNotification}>
          <DialogContent>
            <Stack sx={{ display: "flex" }} px='3vw'>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size='small'
                  fullWidth
                  label='Notification Name'
                  value={createNotification.notif_name}
                  name='notif_name'
                  onChange={(e: any) => {
                    createNotification.notif_name = e.target.value;
                    setStateTriger(!stateTriger);
                  }}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: "flex" }}>
                <InputSearchable
                  required
                  label='Type'
                  options={dataNotificationType}
                  // onChange={(e: any, newValue: any) =>
                  //   setInitialNotif({
                  //     ...initialNotif,
                  //     notif_type: newValue.name,
                  //   })
                  // }
                  onChange={(e: any, newValue: any) => {
                    createNotification.notif_type = newValue.name;
                    setStateTriger(!stateTriger);
                  }}
                />
                <Gap width={50} height={0} />
                <InputSearchable
                  label='Via'
                  options={dataNotificationVia}
                  // onChange={(e: any, newValue: any) =>
                  //   setInitialNotif({
                  //     ...initialNotif,
                  //     notif_via: newValue.name,
                  //   })
                  // }
                  onChange={(e: SelectChangeEvent, newValue: any) => {
                    createNotification.notif_via = newValue.name;
                    setStateTriger(!stateTriger);
                  }}
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: "flex" }}>
                <Select
                  multiple
                  direction='column'
                  label='Receiver'
                  placeholder='Option'
                  options={notifReceiverData.data}
                  renderValue={(selected: any) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value: any) => {
                        return (
                          <Chip
                            key={value}
                            label={
                              notifReceiverData.data.find(
                                (e: any) => e["_id"] === value
                              )?.set_value
                            }
                            clickable
                            deleteIcon={
                              <Cancel
                                onMouseDown={(event: any) =>
                                  event.stopPropagation()
                                }
                              />
                            }
                            onDelete={(e) => {
                              e.preventDefault();
                              createNotification.receiver = _without(
                                [...createNotification.receiver],
                                value
                              );
                              setStateTriger(!stateTriger);
                            }}
                            onClick={() => console.log("clicked chip")}
                          />
                        );
                      })}
                    </Box>
                  )}
                  value={createNotification.receiver}
                  handleChange={(value: Array<string>) => {
                    createNotification.receiver = value;
                    setStateTriger(!stateTriger);
                  }}
                />
              </Box>
              <Gap width={0} height={20} />

              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  id='outlined-multiline-static'
                  label='Notification Content'
                  multiline
                  rows={4}
                  name='notif_content'
                  onChange={(e: any) => {
                    createNotification.notif_content = e.target.value;
                    setStateTriger(!stateTriger);
                  }}
                  value={createNotification.notif_content}
                  required
                />
              </Box>
              {/* <Gap width={0} height={20} /> */}
              <Channel notificationCreate={createNotification} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack px='3vw'>
              <Button
                sx={{
                  background: "#7B61FF",
                  color: "#FFF",
                  "&:hover": {
                    color: "#7B61FF",
                  },
                }}
                autoFocus
                type='submit'
                // onClick={onAddNotification}
              >
                Create Notification
              </Button>
            </Stack>
          </DialogActions>
        </form>
        <Gap width={0} height={20} />
      </Dialog>

      {/*=========================== Dialog of Edit Notification ======================== */}
      {/* ============================================================================== */}
      <Dialog
        fullWidth
        open={open.edit}
        onClose={() => setOpen({ ...open, edit: false })}
        sx={{ "& .MuiPaper-root": { overflowY: "initial" } }}>
        <DialogTitle variant='h5'>Update Notification</DialogTitle>
        <Gap width={0} height={10} />
        <form onSubmit={onUpdateNotification}>
          <DialogContent>
            <Stack sx={{ display: "flex" }} px='3vw'>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size='small'
                  fullWidth
                  label='Notification Name'
                  value={createNotification.notif_name}
                  name='notif_name'
                  onChange={(e: any) => {
                    createNotification.notif_name = e.target.value;
                    setStateTriger(!stateTriger);
                  }}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: "flex" }}>
                <InputSearchable
                  value={{ name: initialNotif.notif_type }}
                  required
                  label='Type'
                  options={dataNotificationType}
                  onChange={(e: any, newValue: any) =>
                    setInitialNotif({
                      ...initialNotif,
                      notif_type: newValue.name,
                    })
                  }
                />
                <Gap width={50} height={0} />
                <InputSearchable
                  value={{ name: initialNotif.notif_via }}
                  label='Via'
                  options={dataNotificationVia}
                  onChange={(e: any, newValue: any) =>
                    setInitialNotif({
                      ...initialNotif,
                      notif_via: newValue.name,
                    })
                  }
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: "flex" }}>
                <TextField
                  fullWidth
                  id='outlined-multiline-static'
                  label='Notification Content'
                  multiline
                  rows={4}
                  name='notif_content'
                  onChange={(e: any) => {
                    createNotification.notif_content = e.target.value;
                    setStateTriger(!stateTriger);
                  }}
                  value={initialNotif.notif_content}
                  required
                />
              </Box>
              {/* <Gap width={0} height={20} /> */}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack px='3vw'>
              <Button
                sx={{
                  background: "#7B61FF",
                  color: "#FFF",
                  "&:hover": {
                    color: "#7B61FF",
                  },
                }}
                autoFocus
                type='submit'
                // onClick={onAddNotification}
              >
                Update Notification
              </Button>
            </Stack>
          </DialogActions>
        </form>
        <Gap width={0} height={20} />
      </Dialog>
    </DrawerNav>
  );
};

export default NotificationManagement;
