import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import {
  DrawerNav,
  Gap,
  H2,
  InputSearchable,
  PreTitle,
  SmallCopy,
} from "../../components";
import { IData } from "../../redux/features/notification/interface";
import {
  useLazyNotificationTemplateQuery,
  useAddNotificationMutation,
} from "../../redux/features/notification/notification-api-slice";
import {
  useGetNotifTypeQuery,
  useGetNotifViaQuery,
} from "../../redux/features/lov/lov-api-slice";
import { NotificationInitial, NotificationTypeInitial } from "./initial";

const NotificationManagement = () => {
  // ==================== local state ====================
  const [loading, setLoading] = React.useState<boolean>(false);
  const [notifications, setNotifications] = React.useState<IData[]>([]);
  const [notificationDetail, setNotificationDetail] = React.useState<IData>();
  const [totalRecords, setTotalRecords] = React.useState<number>(0);
  const [open, setOpen] = React.useState({
    detail: false,
    add: false,
  });
  const [triger, setTriger] = React.useState<boolean>(false);
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
    },
  });
  const [initialNotif, setInitialNotif] = React.useState({
    notif_type: "",
    notif_name: "",
    notif_via: "",
    notif_content: "",
  });

  //================= Fetching Function ===================
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

  const [addNotification, { isLoading }] = useAddNotificationMutation();

  //================= Spreads Fetching Data ===================
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

  const onChange = (e: any) => {
    setInitialNotif({ ...initialNotif, [e.target.name]: e.target.value });
  };

  const onAddNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addNotification(initialNotif);
    setTriger((prev) => !prev);
    setInitialNotif({
      notif_type: "",
      notif_name: "",
      notif_via: "",
      notif_content: "",
    });
    setOpen({ ...open, add: false });
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
        <H2>NOTIFICATION</H2>
        <Gap width={0} height={20} />
        <Box sx={{ display: "flex" }}>
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
            <PreTitle>Add Notification</PreTitle>
          </Button>
        </Box>
        <Gap width={0} height={20} />
        <Box>
          <Paper>
            <div className="card">
              <DataTable
                value={notifications}
                lazy
                filterDisplay="row"
                responsiveLayout="scroll"
                dataKey="id"
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
                scrollDirection="both"
                selectionMode="single"
                onRowSelect={onRowSelect}
              >
                <Column
                  footer="Notification Type"
                  header="Notification Type"
                  field="notif_type"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by Type"
                />
                <Column
                  footer="Notification Name"
                  header="Notification Name"
                  field="notif_name"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by Name"
                />
                <Column
                  footer="Notification Via"
                  header="Notification Via"
                  field="notif_via"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  sortable
                  filter
                  filterPlaceholder="Search by Via"
                />
                <Column
                  footer="Notification Content"
                  header="Notification Content"
                  field="notif_content"
                  style={{ flexGrow: 1, flexBasis: "250px" }}
                  filter
                  filterPlaceholder="Search by Content"
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
        onClose={() => setOpen({ ...open, detail: false })}
      >
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
        onClose={() => setOpen({ ...open, add: false })}
        sx={{ "& .MuiPaper-root": { overflowY: "initial" } }}
      >
        <DialogTitle variant="h5">Add Notification</DialogTitle>
        <Gap width={0} height={10} />
        <form onSubmit={onAddNotification}>
          <DialogContent>
            <Stack sx={{ display: "flex" }} px="3vw">
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  fullWidth
                  label="Notification Name"
                  value={initialNotif.notif_name}
                  name="notif_name"
                  onChange={onChange}
                  required
                />
              </Box>
              <Gap width={0} height={20} />
              <Box sx={{ display: "flex" }}>
                <InputSearchable
                  required
                  label="Type"
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
                  label="Via"
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
                  id="outlined-multiline-static"
                  label="Notification Content"
                  multiline
                  rows={4}
                  name="notif_content"
                  onChange={onChange}
                  value={initialNotif.notif_content}
                  required
                />
              </Box>
              {/* <Gap width={0} height={20} /> */}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack px="3vw">
              <Button
                sx={{
                  background: "#7B61FF",
                  color: "#FFF",
                  "&:hover": {
                    color: "#7B61FF",
                  },
                }}
                autoFocus
                type="submit"
                // onClick={onAddNotification}
              >
                Create Notification
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
