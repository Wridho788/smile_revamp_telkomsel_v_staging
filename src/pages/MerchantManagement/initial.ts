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
  partner_code: "",
  partner_id: "",
  pic_name: "",
  partner_status: "",
  company_name: "",
  siup_number: "",
  province: "",
  city: "",
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
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};
