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
