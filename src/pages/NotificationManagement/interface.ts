export interface NotificationInitialCreate {
  notif_type: string;
  notif_name: string;
  notif_via: string;
  notif_content: string;
  receiver: string[];
  channel_id: string[];
}

export interface INotifReceiver {
  _id: string;
  group_name: string;
  set_value: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at?: null | string;
  __v: number;
}

export interface IChannelID {
  _id: string;
  code: string;
  ip: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  __v: number;
}
