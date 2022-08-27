import { TableColumn } from "react-data-table-component";
import {
  ICustomerBrand,
  ICustomers,
  ICustomerTier,
} from "../../redux/features/customer/interface";

// type of row
export interface TableDataRows<T> {
  msisdn: T;
  activation_date: T;
  expire_date: T;
  region_lacci: T;
  cluster_sales: T;
  loyalty_tier: T[];
  arpu: T;
  brand: T[];
}

// initial column of table
export const TableColumnCustomer: TableColumn<TableDataRows<any>>[] = [
  {
    name: "MSISDN",
    selector: (row) => row.msisdn,
  },
  {
    name: "Activation Date",
    selector: (row) => row.activation_date,
  },
  {
    name: "Expiration Date",
    selector: (row) => row.expire_date,
  },
  {
    name: "Region Lacci",
    selector: (row) => row.region_lacci,
  },
  {
    name: "Cluster Sales",
    selector: (row) => row.cluster_sales,
  },
  {
    name: "Loyalty Tier",
    selector: (row) => row.loyalty_tier,
  },
  {
    name: "Arpu",
    selector: (row) => row.arpu,
  },
  {
    name: "Brand",
    selector: (row) => row.brand,
  },
];

export const CustomerInitial: ICustomers = {
  _id: "",
  msisdn: "",
  activation_date: "",
  expire_date: "",
  los: 0,
  rev_m1: "",
  loyalty_tier: [],
  brand: [],
  arpu: "",
  nik_dob: "",
  nik_rgn_name: "",
  region_lacci: "",
  kabupaten: "",
  kecamatan: "",
  cluster_sales: "",
  pre_pst_flag: 0,
  created_at: "",
  updated_at: "",
  deleted_at: "",
  customer_badges: [],
};
export const CustomerBadgeInitial: ICustomers = {
  _id: "",
  msisdn: "",
  activation_date: "",
  expire_date: "",
  los: 0,
  rev_m1: "",
  loyalty_tier: [],
  brand: [],
  arpu: "",
  nik_dob: "",
  nik_rgn_name: "",
  region_lacci: "",
  kabupaten: "",
  kecamatan: "",
  cluster_sales: "",
  pre_pst_flag: 0,
  created_at: "",
  updated_at: "",
  deleted_at: "",
  customer_badges: [],
};

export const CustomerTierInitial: ICustomerTier = {
  _id: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
  __v: 0,
};

export const CustomerBrandInitial: ICustomerBrand = {
  _id: "",
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
  __v: 0,
};
