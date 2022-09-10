export interface IKeywordScheduleShift {
  from: any;
  to: any;
}
export interface IKeywordShift {
  from: any;
  to: any;
}

export interface IKeywordEligibility {
  name: string;
  start_period: any;
  end_period: any;
  keyword_type: string;
  point_type: string;
  poin_value: string;
  poin_redeemed: number;
  channel_validation: boolean;
  channel_validation_list: string[];
  program_id: string;
  eligibility_locations: boolean;
  locations: string[];
  program_title_expose: string;
  program_experience: string[];
  program_bersubsidi: boolean;
  merchant: string;
  merchandise_keyword: boolean;
  keyword_schedule: string;
  total_budget: number;
  customer_value: number;
  multiwhitelist: boolean;
  multiwhitelist_program: string;
  enable_sms_masking: boolean;
  sms_masking: string;
  timezone: string;
  for_new_redeemer: boolean;
  max_mode: string;
  max_redeem_counter: number;
  segmentation_customer_tier: string[];
  segmentation_customer_los_operator: string;
  segmentation_customer_los: number;
  segmentation_customer_los_min: number;
  segmentation_customer_los_max: number;
  segmentation_customer_type: string;
  segmentation_customer_most_redeem: string[];
  segmentation_customer_brand: string[];
  segmentation_customer_prepaid_registration: boolean;
  segmentation_customer_kyc_completeness: boolean;
  segmentation_customer_poin_balance_operator: string;
  segmentation_customer_poin_balance: number;
  segmentation_customer_poin_balance_min: number;
  segmentation_customer_poin_balance_max: number;
  segmentation_customer_preference: string;
  segmentation_customer_arpu_operator: string;
  segmentation_customer_arpu: number;
  segmentation_customer_arpu_min: number;
  segmentation_customer_arpu_max: number;
  segmentation_customer_preferences_bcp: string;
  file: string;
  segmentation_employee_numbers: boolean;
  keyword_shift: IKeywordShift[];
}

// export interface IKeywordBonus {
//   bonus_type: string;
//   location: string;
//   bucket: string;
//   bonus_id: string;
//   bonus_name: string | undefined;
//   bid: string;
//   granular: string;
//   stock: number;
//   qty_denom: number;
//   limit: number;
//   payment: string;
// }

// export interface IKeywordNotification {
//   via: string;
//   notif_type: string;
//   notification: string;
//   transaction_type: string;
//   notification_content: string | undefined;
// }

export interface INotification {
  code_identifier: string;
  notification_content: string;
  start_period: Date;
  end_period: Date;
  notif_type: string;
  via: string;
}

export interface IKeywordLocationTypeGeneral {
  location_type: string;
}

export interface IKeywordNotificationInitial {
  notification_template: string;
  follow_period: boolean;
}

// Bonus Type "Lucky Draw"
export interface IBonusLuckyDrawInitial {
  bonus_type: string;
  lucky_draw_reguler: boolean;
  lucky_draw_allow_inject_coupon: boolean;
  lucky_draw_prize: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

// Bonus Type "Auction"
export interface IBonusAuctionInitial {
  bonus_type: string,
  auction_prize_desc_id: string,
  auction_prize_desc_en: string,
  auction_prize_image: string,
  auction_poin_min_bidding: number,
  auction_multiplier_poin: number,
  auction_max_winner_inphase: number,
  auction_prize_name: string,
  stock_location: any[],
  redeem_after_verification: boolean
}

export interface IKeywordBonus {
  bonus_type: any[];
}

export interface ICreateKeyword {
  eligibility: IKeywordEligibility;
  bonus: any[];
  notification: any[];
  // keyword_bonus: Array<IKeywordBonus>;
  // keyword_notification: Array<IKeywordNotification>;
}

// export interface ICreateKeyword {
//   program_id: string;
//   program_experience: string[];
//   name: string;
//   program_title_expose: string;
//   keyword_type: string;
//   keyword_parent: string;
//   start_period: any;
//   end_period: any;
//   point_type: string;
//   poin_value: string;
//   poin_redeemed: number;
//   max_mode: string;
//   max_redeem_counter: number;
//   merchandise_keyword: boolean;
//   enable_sms_masking: boolean;
//   sms_masking: string;
//   keyword_schedule_type: string;
//   keyword_schedule_shift: IKeywordScheduleShift[];
//   program_bersubsidi: boolean;
//   total_anggaran: number;
//   customer_value: number;
//   multiwhitelist: boolean;
//   multiwhitelist_program: string;
//   channel_validation: boolean;
//   channel_validation_list: string[];
//   eligibility_locations: boolean;
//   merchant: string;
//   segmentation_customer_tier: string[];
//   segmentation_customer_brand: string[];
//   segmentation_customer_most_redeem: string[];
//   segmentation_customer_prepaid_registration: boolean;
//   segmentation_customer_los_operator: string;
//   segmentation_customer_los: number;
//   segmentation_customer_los_min: number;
//   segmentation_customer_los_max: number;
//   for_new_redeemer: boolean;
//   customer_type: string;
//   locations: string[];
//   segmentation_customer_kyc_completeness: boolean;
//   segmentation_customer_arpu_operator: string;
//   segmentation_customer_arpu: number;
//   segmentation_customer_arpu_min: number;
//   segmentation_customer_arpu_max: number;
//   segmentation_employee_numbers: boolean;
//   segmentation_customer_poin_balance_operator: string;
//   segmentation_customer_poin_balance: number;
//   segmentation_customer_poin_balance_min: number;
//   segmentation_customer_poin_balance_max: number;

//   keyword_verification: string;
//   timezone: string;
//   segmentation_customer_type: string;
//   segmentation_customer_preferences_bcp: string;
//   keyword_shift: IKeywordShift[];

//   keyword_bonus: Array<IKeywordBonus>;
//   keyword_notification: Array<IKeywordNotification>;
// }
