export const MerchantPartnerInitial = {
  _id: "",
  partner_code: "",
  partner_name: "",
  registration_number: "",
  priority: "",
  contact_person: "",
  phone: "",
  contact_email: "",
  address: "",
  website: "",
  remark: "",
  npwp: "",
  partner_logo: "",
  created_at: "",
  updated_at: "",
  deleted_at: null,
  __v: 0,
};

export interface IMerchantPartner {
  partner_code: string;
  partner_name: string;
  registration_number: string;
  priority: string;
  contact_person: string;
  phone: string;
  contact_email: string;
  address: string;
  website: string;
  remark: string;
  status: string;
  npwp: string;
  partner_logo: string | File;
  longtitude: string;
  latitude: string;
}

export const PartnerInitial = {
  _id: "",
  partner_code: "",
  partner_name: "",
  partner_status: "",
  created_by: "",
  created_at: "",
  updated_at: "",
};
