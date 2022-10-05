export interface IData {
  _id: string;
  notif_type: string;
  notif_name?: string;
  notif_via: string;
  notif_content: string;
  receiver?: Array<any>;
  channel_id?: Array<any>;
  __v?: number;
}
export interface IResponse {
  data: Array<IData>;
  total: number;
}

export interface DetailResponse {
  data: IData;
}
