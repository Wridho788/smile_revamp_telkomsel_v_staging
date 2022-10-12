export interface IKeywordEligibilityLocationHelper {
  location_type: string;
}

export interface IKeywordEligibilityKeywordShift {
  from: any;
  to: any;
}

export interface IKeywordEligibility {
  name: string;
  start_period: string;
  end_period: string;
  keyword_type: string;
  point_type: string;
  poin_value: string;
  poin_redeemed: number;
  channel_validation: boolean;
  channel_validation_list: any[];
  program_id: string;
  eligibility_locations: boolean;
  locations: any[];
  program_title_expose: string;
  program_experience: any[];
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
  segmentation_customer_tier: any[];
  segmentation_customer_los_operator: string;
  segmentation_customer_los: number;
  segmentation_customer_los_max: number;
  segmentation_customer_los_min: number;
  segmentation_customer_type: string;
  segmentation_customer_most_redeem: any[];
  segmentation_customer_brand: any[];
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
  eligibility_location: boolean;
  location_type: string;
  keyword_shift: IKeywordEligibilityKeywordShift[];
}

export interface IKeywordBonusHelper {
  bonus_type: any[];
  bonus_type_id: any[];
}

export interface IKeywordBonusLuckyDrawLocation {
  location_id: string;
  stock: number;
}

export interface IKeywordBonusLuckyDraw {
  bonus_type: string;
  lucky_draw_reguler: boolean;
  lucky_draw_allow_inject_coupon: boolean;
  lucky_draw_prize: string;
  redeem_after_verification: boolean;
  locations: any[];
}

export interface IKeywordBonusDirectRedeem {
  bonus_type: string;
  stock_type: string;
  redeem_after_verification: boolean;
  locations: any[];
}

export interface IKeywordBonusLoyaltyPoin {
  bonus_type: string;
  earning_poin: number;
  redeem_after_verification: boolean;
  locations: any[];
}

export interface IKeywordNotificationEligibilityHelper {
  notification_template: string;
  follow_period: boolean;
}

export interface IKeywordNotificationEligibility {
  bonus_type_id: string;
  keyword_name: string;
  code_identifier: string;
  notification_content: string;
  start_period: Date | string;
  end_period: Date | string;
  notif_type: string;
  via: string;
}

export interface IKeywordNotificationLuckyDrawHelper {
  notification_template: string;
  follow_period: boolean;
}

export interface IKeywordNotificationLuckyDraw {
  bonus_type_id: string;
  keyword_name: string;
  code_identifier: string;
  notification_content: string;
  start_period: Date | string;
  end_period: Date | string;
  notif_type: string;
  via: string;
}

// Bonus Type "Telco Product Postpaid"
export interface IKeywordBonusTelcoProductPostpaid {
  bonus_type: string;
  telco_post_product_name: string;
  telco_post_bid: string;
  telco_post_api_config: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

// Bonus Type "Telco Product Postpaid"
export interface IKeywordBonusTelcoProductPrepaid {
  bonus_type: string;
  telco_post_product_name: string;
  telco_post_bid: string;
  telco_post_api_config: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

// Bonus Type "Auction"
export interface IKeywordBonusAuction {
  bonus_type: string;
  auction_prize_desc_id: string;
  auction_prize_desc_en: string;
  auction_prize_image: string;
  auction_poin_min_bidding: number;
  auction_multiplier_poin: number;
  auction_max_winner_inphase: number;
  auction_prize_name: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

export interface IKeywordNotificationAuctionHelper {
  notification_template: string;
  follow_period: boolean;
}

export interface IKeywordNotificationAuction {
  bonus_type_id: string;
  code_identifier: string;
  notification_content: string;
  start_period: Date | string;
  end_period: Date | string;
  notif_type: string;
  via: string;
  keyword_name?: string;
}

export interface ICreateKeyword {
  _id: string;
  eligibility: IKeywordEligibility;
  bonus: any[];
  notification: any[];
  is_draft?: boolean;
  need_review_after_edit?: boolean;
}

export interface IKeywordBonusLinkAjaMain {
  bonus_type: string;
  nominal: number;
  external_api_config: boolean;
  location: string;
  location_detail: string;
  bucket: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

export interface IKeywordBonusLinkAjaBonus {
  bonus_type: string;
  nominal: number;
  external_api_config: boolean;
  location: string;
  location_detail: string;
  bucket: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

export interface IKeywordBonusNgrs {
  bonus_type: string;
  nominal: number;
  external_api_config: boolean;
  location: string;
  location_detail: string;
  bucket: string;
  stock_location: any[];
  redeem_after_verification: boolean;
}

export interface IKeywordBonusVoucher {
  bonus_type: string;
  exp_voucher: string;
  voucher_type: string;
  voucher_combination: string;
  jumlah_total_voucher: number;
  stock_location: any[];
  voucher_prefix?: string;
  redeem_after_verification: boolean;
}

export interface IKeywordBonusDonation {
  bonus_type: string;
  donation_category: string;
  minimum_poin: number;
  target_poin: number;
  stock_location: {
    bucket?: any;
    location: string;
    stock: number;
  }[];
  redeem_after_verification: boolean;
}

export interface IKeywordBonusMobileBanking {
  bonus_type: string;
  bank: string;
  ip_address: string;
  digit_coupon: string;
  combination_coupon: string;
  stock_location: {
    bucket?: any;
    location: string;
    stock: number;
  }[];
  redeem_after_verification: boolean;
}

export interface IKeywordBonusVoting {
  bonus_type: string;
  target_redeemer: number;
  stock_location: any[];
  redeem_after_verification: boolean;
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
