export interface IKeywordBonus {
  bonus_type: string;
  location: string;
  limit: number;
  stock: number;
  bucket: string;
  qty_denom: string;
  payment: string;
  granular: string;
  bid: string;
  bonus_id: string;
  bonus_name: string;
}

export interface IKeywordNotification {
  notification: string;
  via: string;
  receiver: string;
}

export interface IKeywordShift {
  from: string;
  to: string;
}

export interface ICreateKeyword {
  name: string;
  start_period: Date;
  end_period: Date;
  point_type: string;
  point_value: string;
  for_new_redeemer: boolean;
  max_mode: string;
  max_redeem_counter: number;
  max_redeem_per_msisdn: number;
  channel_validation: string;
  merchandise_keyword: boolean;
  merchant: string;
  merchant_name: string;
  telkomsel_los: boolean;
  telkomsel_los_type: string;
  telkomsel_los_operator: string;
  telkomsel_los_value: number;
  telkomsel_los_range_min: number;
  telkomsel_los_range_max: number;
  enable_coorporate: boolean;
  customer_tier: string;
  comment_approval: string;
  keyword_parent: string;
  keyword_bonus: Array<IKeywordBonus>;
  keyword_notification: Array<IKeywordNotification>;
  keyword_shift: Array<IKeywordShift>;
}
