import { IKeywordEligibility } from "../../../components/organisms/CreateKeyword/interfaces";

export interface IKeywordBonus {
  _id: string;
  keyword: string;
  bonus_type: string;
  location: string;
  limit: number;
  stock: number;
  bucket: string;
  qty_denom: number;
  payment: string;
  granular: string;
  bid: string;
  bonus_id: string;
  bonus_name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  __v: number;
  bonus_type_detail: any[];
  location_detail: any[];
  bucket_detail: any[];
}

export interface IkeywordPrime {
  bonus: any[];
  created_at: string;
  created_by: any;
  deleted_at: null;
  eligibility: any;
  keyword_approval: string;
  notification: any[];
  updated_at: string;
  __v: number;
  _id: string;
}
export interface IDetail {
  name: string;
  start_period: Date;
  end_period: Date;
  point_type: any[];
  point_value: string;
  for_new_redeemer: boolean;
  max_mode: string;
  max_redeem_counter: number;
  max_redeem_per_msisdn: number;
  channel_validation: string[];
  merchandise_keyword: boolean;
  merchant: string;
  merchant_name: string;
  telkomsel_los_type: string;
  telkomsel_los_operator: string;
  telkomsel_los_value: number;
  telkomsel_los_range_min: number;
  telkomsel_los_range_max: number;
  enable_coorporate: boolean;
  customer_tier: string[];
  comment_approval: string;
  __v: 0;
}
export interface IData {
  telkomsel_los_value?: string;
  telkomsel_los_range_max?: string;
  telkomsel_los_range_min?: string;
  telkomsel_los_operator?: string;
  telkomsel_los_type?: string;
  max_redeem_per_msisdn?: string;
  max_redeem_counter?: string;
  max_mode?: string;
  merchandise_keyword?: string;
  for_new_redeemer?: string;
  enable_coorporate?: string;
  point_value?: string;
  _id: string;
  name: string;
  start_period: Date;
  end_period: Date;
  merchant: string;
  merchant_name: string;
  foreign_collection: string;
  foreign_id: string;
  keyword_approval: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  detail: IDetail;
  keyword_bonus: Array<IKeywordBonus>;
  __v: 0;
}
export interface IResponse {
  data: Array<IData>;
  total: number;
}

export interface IGetKeywordData {
  channel_validation: [];
  comment_approval: string;
  created_at: string;
  customer_tier: [];
  deleted_at: any;
  enable_coorporate: boolean;
  end_period: string;
  for_new_redeemer: boolean;
  keyword_bonus: [];
  max_mode: string;
  max_redeem_counter: number;
  max_redeem_per_msisdn: number;
  merchandise_keyword: boolean;
  merchant: string;
  merchant_name: string;
  name: string;
  point_type: [];
  point_value: string;
  start_period: string;
  telkomsel_los_operator: string;
  telkomsel_los_range_max: number;
  telkomsel_los_range_min: number;
  telkomsel_los_type: string;
  telkomsel_los_value: number;
  updated_at: string;
  __v: number;
  _id: string;
}

export interface IKeywordNameExistingHandler {
  transaction_classify: string;
  message: string;
  statusCode: number;
}

export interface ICreateKeywordValidation {
  keywordName: string;
}
