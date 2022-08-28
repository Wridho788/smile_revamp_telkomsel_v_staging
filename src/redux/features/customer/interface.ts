interface IData {
  _id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  __v: number;
}
export interface IResponse {
  data: Array<any>;
  total: number;
}

export interface ICustomers {
  _id: string;
  msisdn: string;
  activation_date: string;
  expire_date: string;
  los: number;
  rev_m1: string;
  loyalty_tier: any[];
  brand: any[];
  arpu: string;
  nik_dob: string;
  nik_rgn_name: string;
  region_lacci: string;
  kabupaten: string;
  kecamatan: string;
  cluster_sales: string;
  pre_pst_flag: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  customer_badges: any[];
}

export interface ICustomerTier {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  __v: number;
}

export interface ICustomerBrand {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  __v: number;
}
