import {
  IChannelID,
  INotifReceiver,
  NotificationInitialCreate,
  NotificationInitialUpdate,
} from "pages/NotificationManagement/interface";
import { IData } from "../../redux/features/notification/interface";

export const NotificationInitial: IData = {
  _id: "",
  notif_type: "",
  notif_name: "",
  notif_via: "",
  notif_content: "",
  __v: 0,
};

export const NotificationTypeInitial = {
  _id: "",
  group_name: "",
  set_value: "",
  created_by: "",
  created_at: "",
  updated_at: "",
  receiver: [],
  deleted_at: null,
  __v: 0,
};

export const NotifReceiverInitial: INotifReceiver = {
  _id: "",
  group_name: "",
  set_value: "",
  created_by: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};

export const NotifChannelID: IChannelID = {
  _id: "",
  code: "",
  ip: "",
  name: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};

export const channelsData = {
  data: [],
};

export const totalRecordsData = {
  data: 0,
};

export const selectedChannelData: { data: any[] } = {
  data: [],
};
export const lazyParamsData = {
  data: {
    first: 0,
    rows: 3,
    page: 1,
    sortField: "",
    sortOrder: null,
    filters: {
      _id: { value: "", matchMode: "contains" },
      code: { value: "", matchMode: "contains" },
      name: { value: "", matchMode: "contains" },
    },
  },
};

export const createNotification: NotificationInitialCreate = {
  notif_type: "",
  notif_name: "",
  notif_via: "",
  notif_content: "",
  receiver: [],
  channel_id: [],
};
export const editNotification: { data: NotificationInitialUpdate } = {
  data: {
    notif_type: "",
    notif_name: "",
    notif_via: "",
    notif_content: "",
    receiver: [],
    channel_id: [],
  },
};
