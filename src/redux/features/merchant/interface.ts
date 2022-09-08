interface IData {
  _id: string;
  partner_id: string;
  partner_code: string;
  company_name: string;
  __v: number;
}
export interface IResponse {
  data: Array<IMerchant>;
  total: number;
}

export interface IMerchant {
  _id: string;
  merchant_name: string;
  partner_code: string;
  partner_id: string;
  pic_name: string;
  partner_status: string;
  company_name: string;
  siup_number: string;
  province: string;
  city: string;
}
