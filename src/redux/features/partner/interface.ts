export interface IData {
  _id: string;
  partner_code: string;
  partner_name: string;
  partner_status: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  __v?: number;
}
export interface IResponse {
  data: Array<IData>;
  total: number;
}

export interface DetailResponse {
  data: IData;
}
