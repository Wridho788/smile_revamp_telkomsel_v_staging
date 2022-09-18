import { IMerchant } from "../../redux/features/merchant/interface";

export interface TableMerchantDataRows<T> {
  _id: T;
  merchant_name: T;
  company_name: T;
  partner_code: T;
  partner_id: T;
  pic_name: T;
  partner_status: T;
}

export const MerchantInitial: IMerchant = {
  _id: "",
  merchant_name: "",
  merchant_short_code: "",
  partner_code: "",
  partner_id: "",
  pic_name: "",
  partner_status: "",
  company_name: "",
  siup_number: "",
  province: "",
  city: "",
  location_id: "",
  zip_code: "",
  address: "",
  file_compro: "",
  pic_phone: "",
  pic_role_id: "",
  pic_email: "",
  npwp: "",
  poin_created_by: "",
  ktp: "",
  pic_ktp: "",
  bank_name: "",
  bank_account_name: "",
  bank_account_number: "",
  outlets_list: [
    {
      _id: "",
      outlet: [
        {
          _id: "",
          outlet_name: "",
          outlet_address: "",
        },
      ],
    },
  ],
  location_detail: {
    _id: "",
    name: "",
  },
  role_detail: {
    _id: "",
    name: "",
  },
};

export const PartnerInitial = {
  _id: "",
  partner_code: "",
  partner_name: "",
  partner_status: "",
  created_by: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};
export const LocationInitial = {
  _id: "",
  code: "",
  name: "",
  type: "",
  __v: 0,
  bucket: [],
};

export const RoleInitial = {
  _id: "",
  role_id: "",
  name: "",
  desc: "",
  __v: 0,
};
export const OutletInitial = {
  _id: "",
  outlet_id: "",
  regional: "",
  branch: "",
  outlet_name: "",
  outlet_address: "",
  longtitude: "",
  latitude: "",
  merchant_outlet: [],
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};
