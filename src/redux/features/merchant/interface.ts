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
  merchant_short_code: string;
  partner_code: string;
  partner_id: string;
  pic_name: string;
  partner_status: string;
  company_name: string;
  siup_number: string;
  province: string;
  city: string;
  location_id: string;
  zip_code: string;
  address: string;
  file_compro: string;
  pic_phone: string;
  pic_role_id: string;
  pic_email: string;
  npwp: string;
  poin_created_by: string;
  ktp: string;
  pic_ktp: string;
  bank_name: string;
  bank_account_name: string;
  bank_account_number: string;
  outlets_list: {
    _id: string;
    outlet: {
      _id: string;
      outlet_name: string;
      outlet_address: string;
    }[];
  }[];
  location_detail: {
    _id: string;
    name: string;
  };
  role_detail: {
    _id: string;
    name: string;
  };
}
