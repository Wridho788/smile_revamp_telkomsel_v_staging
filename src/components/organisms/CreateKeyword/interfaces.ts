export interface IKeywordBonus {
  bonus_type: string;
  location: string;
  bucket: string;
  bonus_id: string;
  bonus_name: string | undefined;
  bid: string;
  granular: string;
  stock: number;
  qty_denom: number;
  limit: number;
  payment: string;
}

export interface IKeywordNotification {
  via: string;
  notif_type: string;
  notification: string;
  transaction_type: string;
  notification_content: string | undefined;
}

interface IKeywordScheduleShift {
  from: any;
  to: any;
}

interface IKeywordShift {
  from: any;
  to: any;
}

export interface ICreateKeyword {
  program_id: string;
  program_experience: string[];
  name: string;
  program_title_expose: string;
  keyword_type: string;
  keyword_parent: string;
  start_period: any;
  end_period: any;
  point_type: string;
  poin_value: string;
  poin_redeemed: number;
  max_mode: string;
  max_redeem_counter: number;
  merchandise_keyword: boolean;
  enable_sms_masking: boolean;
  sms_masking: string;
  keyword_schedule_type: string;
  keyword_schedule_shift: IKeywordScheduleShift[];
  program_bersubsidi: boolean;
  total_anggaran: number;
  customer_value: number;
  multiwhitelist: boolean;
  multiwhitelist_program: string;
  channel_validation: boolean;
  channel_validation_list: string[];
  eligibility_locations: boolean;
  merchant: string;
  segmentation_customer_tier: string[];
  segmentation_customer_brand: string[];
  segmentation_customer_most_redeem: string[];
  segmentation_customer_prepaid_registration: boolean;
  segmentation_customer_los_operator: string;
  segmentation_customer_los: number;
  segmentation_customer_los_min: number;
  segmentation_customer_los_max: number;
  for_new_redeemer: boolean;
  customer_type: string;
  locations: string[];
  segmentation_customer_kyc_completeness: boolean;
  segmentation_customer_arpu_operator: string;
  segmentation_customer_arpu: number;
  segmentation_customer_arpu_min: number;
  segmentation_customer_arpu_max: number;
  segmentation_employee_numbers: boolean;
  segmentation_customer_poin_balance_operator: string;
  segmentation_customer_poin_balance: number;
  segmentation_customer_poin_balance_min: number;
  segmentation_customer_poin_balance_max: number;

  keyword_verification: string;
  timezone: string;
  segmentation_customer_type: string;
  segmentation_customer_preferences_bcp: string;
  keyword_shift: IKeywordShift[];

  keyword_bonus: Array<IKeywordBonus>;
  keyword_notification: Array<IKeywordNotification>;
}
