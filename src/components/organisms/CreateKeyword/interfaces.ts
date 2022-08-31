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
  receiver: string;
  notif_type: string;
  notification: string;
  transaction_type: string;
  notification_content: string;
}

interface IKeywordScheduleShift {
  from: any;
  to: any;
}

export interface ICreateKeyword {
  keyword_type: string;
  keyword_parent: string;
  name: string;
  start_period: any;
  end_period: any;
  point_type: [];
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
  channel_validation_list: [];
  program_experience: [];
  merchant: string;
  segmentation_customer_tier: [];
  segmentation_customer_brand: [];
  segmentation_customer_most_redeem: [];
  segmentation_customer_prepaid_registration: boolean;
  segmentation_customer_los_operator: string;
  segmentation_customer_los: number;
  segmentation_customer_los_min: number;
  segmentation_customer_los_max: number;
  for_new_redeemer: boolean;
  enable_corporate: boolean;
  segmentation_customer_kyc_completeness: boolean;
  segmentation_customer_arpu_operator: string;
  segmentation_customer_arpu_min: number;
  segmentation_customer_arpu_max: number;
  segmentation_employee_numbers: boolean;
  keyword_bonus: Array<IKeywordBonus>;
  keyword_notification: Array<IKeywordNotification>;
}
