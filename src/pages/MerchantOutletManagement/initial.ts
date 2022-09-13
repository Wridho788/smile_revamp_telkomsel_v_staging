export const MerchantOutletInitial = {
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
  regional_detail: {
    _id: "",
    code: "",
    name: "",
    type: "",
    parent: "",
    created_by: "",
    __v: 0,
  },
  branch_detail: {
    _id: "",
    code: "",
    name: "",
    type: "",
    __v: 0,
  },
};

export interface IMerchantOutlet {
  outlet_code: string;
  regional: string;
  branch: string;
  outlet_name: string;
  outlet_address: string;
  longtitude: string;
  latitude: string;
}

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

export const LocationInitial = {
  _id: "",
  code: "",
  name: "",
  type: "",
  __v: 0,
  bucket: [],
};
