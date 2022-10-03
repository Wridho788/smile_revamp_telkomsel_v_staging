import {
  IKeywordEligibilityKeywordShift,
  IKeywordEligibility,
  ICreateKeyword,
  IKeywordEligibilityLocationHelper,
  IKeywordBonusHelper,
  IKeywordNotificationEligibilityHelper,
  IKeywordNotificationLuckyDrawHelper,
  IKeywordBonusLuckyDraw,
  IKeywordNotificationEligibility,
  IKeywordBonusLuckyDrawLocation,
  IKeywordNotificationLuckyDraw,
  IKeywordBonusAuction,
  IKeywordNotificationAuction,
  IKeywordNotificationAuctionHelper,
  IKeywordBonusDirectRedeem,
  IKeywordBonusDonation,
  IKeywordBonusMobileBanking,
  IKeywordBonusLoyaltyPoin,
  IKeywordBonusTelcoProductPostpaid,
  IKeywordBonusTelcoProductPrepaid,
  IKeywordBonusVoucher,
  IKeywordBonusLinkAjaMain,
  IKeywordBonusLinkAjaBonus,
  IKeywordBonusNgrs,
} from "./interfaces";
import { IBonusTypeVoucher } from "./Bonus/Voucher/interface";

export const KeywordEligibilityLocationHelper: IKeywordEligibilityLocationHelper =
  {
    location_type: "",
  };

const KeywordEligibilityKeywordShift: IKeywordEligibilityKeywordShift = {
  from: new Date(),
  to: new Date(),
};

export const KeywordEligibility: IKeywordEligibility = {
  name: "",
  start_period: "",
  end_period: "",
  keyword_type: "",
  point_type: "",
  poin_value: "",
  poin_redeemed: 0,
  channel_validation: false,
  channel_validation_list: [],
  program_id: "",
  eligibility_locations: false,
  location_type: "",
  locations: [],
  program_title_expose: "",
  program_experience: [],
  program_bersubsidi: false,
  merchant: "",
  merchandise_keyword: false,
  keyword_schedule: "",
  total_budget: 0,
  customer_value: 0,
  multiwhitelist: false,
  multiwhitelist_program: "",
  enable_sms_masking: false,
  sms_masking: "",
  timezone: "",
  for_new_redeemer: false,
  max_mode: "",
  max_redeem_counter: 0,
  segmentation_customer_tier: [],
  segmentation_customer_los_operator: "",
  segmentation_customer_los: 0,
  segmentation_customer_los_max: 0,
  segmentation_customer_los_min: 0,
  segmentation_customer_type: "",
  segmentation_customer_most_redeem: [],
  segmentation_customer_brand: [],
  segmentation_customer_prepaid_registration: false,
  segmentation_customer_kyc_completeness: false,
  segmentation_customer_poin_balance_operator: "",
  segmentation_customer_poin_balance: 0,
  segmentation_customer_poin_balance_min: 0,
  segmentation_customer_poin_balance_max: 0,
  segmentation_customer_preference: "",
  segmentation_customer_arpu_operator: "",
  segmentation_customer_arpu: 0,
  segmentation_customer_arpu_min: 0,
  segmentation_customer_arpu_max: 0,
  segmentation_customer_preferences_bcp: "",
  file: "",
  segmentation_employee_numbers: false,
  keyword_shift: [KeywordEligibilityKeywordShift],
};

export const KeywordBonusHelper: IKeywordBonusHelper = {
  bonus_type: [],
  bonus_type_id: [],
};

export const KeywordBonusLuckyDrawLocation: IKeywordBonusLuckyDrawLocation = {
  location_id: "",
  stock: 0,
};

export const KeywordBonusLuckyDraw: IKeywordBonusLuckyDraw = {
  bonus_type: "lucky_draw",
  lucky_draw_reguler: true,
  lucky_draw_allow_inject_coupon: false,
  lucky_draw_prize: "",
  redeem_after_verification: false,
  locations: [],
};

export const KeywordBonusDirectRedeem: IKeywordBonusDirectRedeem = {
  bonus_type: "direct_redeem",
  stock_type: "",
  redeem_after_verification: false,
  locations: [],
};

export const KeywordBonusLoyaltyPoin: IKeywordBonusLoyaltyPoin = {
  bonus_type: "loyalty_poin",
  earning_poin: 0,
  redeem_after_verification: false,
  locations: [],
};

export const KeywordBonusTelcoProductPostpaid: IKeywordBonusTelcoProductPostpaid =
  {
    bonus_type: "telco_postpaid",
    telco_post_product_name: "",
    telco_post_bid: "",
    telco_post_api_config: "False",
    stock_location: [],
    redeem_after_verification: false,
  };

export const KeywordBonusTelcoProductPrepaid: IKeywordBonusTelcoProductPrepaid =
  {
    bonus_type: "telco_prepaid",
    telco_post_product_name: "",
    telco_post_bid: "",
    telco_post_api_config: "False",
    stock_location: [],
    redeem_after_verification: false,
  };

export const KeywordBonusAuction: IKeywordBonusAuction = {
  bonus_type: "auction",
  auction_prize_desc_id: "",
  auction_prize_desc_en: "",
  auction_prize_image: "",
  auction_poin_min_bidding: 0,
  auction_multiplier_poin: 0,
  auction_max_winner_inphase: 0,
  auction_prize_name: "",
  stock_location: [],
  redeem_after_verification: false,
};

export const KeywordBonusVoucher: IKeywordBonusVoucher = {
  bonus_type: "discount_voucher",
  exp_voucher: "",
  voucher_type: "",
  voucher_combination: "",
  jumlah_total_voucher: 0,
  stock_location: [],
  redeem_after_verification: false,
};

export const KeywordBonusLinkAjaMain: IKeywordBonusLinkAjaMain = {
  bonus_type: "linkaja_main",
  nominal: 0,
  external_api_config: false,
  location: "",
  location_detail: "",
  bucket: "",
  stock_location: [],
  redeem_after_verification: false,
};

export const KeywordBonusLinkAjaBonus: IKeywordBonusLinkAjaBonus = {
  bonus_type: "linkaja_bonus",
  nominal: 0,
  external_api_config: false,
  location: "",
  location_detail: "",
  bucket: "",
  stock_location: [],
  redeem_after_verification: false,
};

export const KeywordBonusNgrs: IKeywordBonusNgrs = {
  bonus_type: "ngrs",
  nominal: 0,
  external_api_config: false,
  location: "",
  location_detail: "",
  bucket: "",
  stock_location: [],
  redeem_after_verification: false,
};

export const KeyWordBonusDonation: IKeywordBonusDonation = {
  bonus_type: "donation",
  donation_category: "",
  minimum_poin: 0,
  target_poin: 0,
  stock_location: [],
  redeem_after_verification: false,
};

export const KeywordBonusMobileBanking: IKeywordBonusMobileBanking = {
  bonus_type: "mbp",
  bank: "",
  ip_address: "",
  digit_coupon: "",
  combination_coupon: "",
  stock_location: [],
  redeem_after_verification: false,
};

export const KeywordBonusVoid: any = {
  bonus_type: "void",
};

export const KeywordBonusVoting: any = {
  bonus_type: "voting",
};

export const KeywordBonusOther: any = {
  bonus_type: "other",
};

export const KeywordNotificationAuctionHelper: IKeywordNotificationAuctionHelper[] =
  [
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
  ];

export const KeywordNotificationAuction: IKeywordNotificationAuction[] = [
  {
    bonus_type_id: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    bonus_type_id: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    bonus_type_id: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    bonus_type_id: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
];

export const KeywordNotificationEligibilityHelper: IKeywordNotificationEligibilityHelper[] =
  [
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
  ];

export const KeywordNotificationEligibility: IKeywordNotificationEligibility[] =
  [
    {
      bonus_type_id: "",
      keyword_name: "",
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
    {
      bonus_type_id: "",
      keyword_name: "",
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
    {
      bonus_type_id: "",
      keyword_name: "",
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
    {
      bonus_type_id: "",
      keyword_name: "",
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
  ];

export const KeywordNotificationLuckyDrawHelper: IKeywordNotificationLuckyDrawHelper[] =
  [
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
    {
      notification_template: "",
      follow_period: false,
    },
  ];

export const KeywordNotificationLuckyDraw: IKeywordNotificationLuckyDraw[] = [
  {
    bonus_type_id: "",
    keyword_name: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    bonus_type_id: "",
    keyword_name: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    bonus_type_id: "",
    keyword_name: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    bonus_type_id: "",
    keyword_name: "",
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
];

export const CreateKeywordGeneral: ICreateKeyword = {
  eligibility: KeywordEligibility,
  bonus: [],
  notification: [...KeywordNotificationEligibility],
};

export const KeywordFirstStep: boolean = false;

// const KeywordBonus: IKeywordBonus = {
//   bonus_type: "",
//   location: "",
//   limit: 0,
//   stock: 0,
//   bucket: "",
//   qty_denom: 0,
//   payment: "",
//   granular: "",
//   bid: "",
//   bonus_id: "",
//   bonus_name: "",
// };

// const KeywordNotification: IKeywordNotification = {
//   notification: "",
//   notification_content: "",
//   notif_type: "",
//   transaction_type: "",
//   via: "",
// };

// export const CreateKeywordGeneral: ICreateKeyword = {
//   keyword_type: "",
//   keyword_parent: "",
//   name: "",
//   start_period: new Date(),
//   end_period: new Date(),
//   point_type: "",
//   poin_value: "",
//   poin_redeemed: 0,
//   max_mode: "",
//   max_redeem_counter: 0,
//   merchandise_keyword: false,
//   enable_sms_masking: false,
//   sms_masking: "",
//   keyword_schedule_type: "",
//   keyword_schedule_shift: [
//     {
//       from: "",
//       to: "",
//     },
//   ],
//   program_bersubsidi: false,
//   total_anggaran: 0,
//   customer_value: 0,
//   multiwhitelist: false,
//   multiwhitelist_program: "",
//   channel_validation: false,
//   channel_validation_list: [],
//   program_experience: [],
//   merchant: "",
//   segmentation_customer_tier: [],
//   segmentation_customer_brand: [],
//   segmentation_customer_most_redeem: [],
//   segmentation_customer_prepaid_registration: false,
//   segmentation_customer_los_operator: "",
//   segmentation_customer_los: 0,
//   segmentation_customer_los_min: 0,
//   segmentation_customer_los_max: 0,
//   for_new_redeemer: false,
//   enable_corporate: false,
//   segmentation_customer_kyc_completeness: false,
//   segmentation_customer_arpu_operator: "",
//   segmentation_customer_arpu_min: 0,
//   segmentation_customer_arpu_max: 0,
//   segmentation_employee_numbers: false,

//   keyword_verification: "63027a5f0c3cd2fee9dffd58",
//   program_title_expose: "Program Name to be Exposed",
//   timezone: "General",
//   segmentation_customer_type: "Regular",
//   segmentation_customer_preferences_bcp: "TESTING",

//   keyword_bonus: [
//     {
//       bonus_type: "",
//       location: "",
//       bucket: "",
//       bonus_id: "",
//       bonus_name: "",
//       bid: "",
//       granular: "",
//       stock: 0,
//       qty_denom: 0,
//       limit: 0,
//       payment: "TRF",
//     },
//   ],
//   keyword_notification: [
//     {
//       via: "",
//       notif_type: "",
//       notification: "",
//       transaction_type: "",
//       notification_content: "",
//     },
//   ],
//   keyword_shift: [
//     {
//       from: "00:00",
//       to: "00:00",
//     },
//   ],
// };

// export const CreateKeywordGeneral: ICreateKeyword = {
//   program_id: "",
//   program_experience: [],
//   name: "",
//   program_title_expose: "",
//   start_period: new Date(),
//   end_period: new Date(),
//   keyword_type: "",
//   point_type: "",
//   keyword_verification: "",
//   keyword_schedule_shift: [
//     {
//       from: new Date(),
//       to: new Date(),
//     },
//   ],
//   poin_value: "",
//   poin_redeemed: 0,
//   channel_validation: false,
//   customer_type: "RegularOnly",
//   channel_validation_list: [],
//   eligibility_locations: false,
//   merchant: "",
//   merchandise_keyword: false,
//   keyword_schedule_type: "",
//   program_bersubsidi: false,
//   total_anggaran: 0,
//   customer_value: 0,
//   multiwhitelist: false,
//   multiwhitelist_program: "",
//   enable_sms_masking: false,
//   sms_masking: "",
//   timezone: "",
//   for_new_redeemer: false,
//   max_mode: "",
//   max_redeem_counter: 0,
//   locations: [],
//   segmentation_customer_tier: [],
//   segmentation_customer_los_operator: "",
//   segmentation_customer_los: 0,
//   segmentation_customer_los_max: 0,
//   segmentation_customer_los_min: 0,
//   segmentation_customer_type: "",
//   segmentation_customer_most_redeem: [],
//   segmentation_customer_brand: [],
//   segmentation_customer_prepaid_registration: false,
//   segmentation_customer_kyc_completeness: false,
//   segmentation_customer_arpu_operator: "",
//   segmentation_customer_arpu: 0,
//   segmentation_customer_arpu_min: 0,
//   segmentation_customer_arpu_max: 0,
//   segmentation_employee_numbers: false,
//   segmentation_customer_poin_balance_operator: "",
//   segmentation_customer_poin_balance: 0,
//   segmentation_customer_poin_balance_min: 0,
//   segmentation_customer_poin_balance_max: 0,
//   segmentation_customer_preferences_bcp: "",
//   keyword_parent: "",
//   keyword_bonus: [
//     {
//       bonus_type: "",
//       location: "",
//       limit: 0,
//       stock: 0,
//       bucket: "",
//       qty_denom: 0,
//       payment: "",
//       granular: "",
//       bid: "",
//       bonus_id: "",
//       bonus_name: "",
//     },
//   ],
//   keyword_notification: [
//     {
//       notification: "",
//       notification_content: "",
//       notif_type: "",
//       transaction_type: "",
//       via: "",
//     },
//   ],
//   keyword_shift: [
//     {
//       from: new Date(),
//       to: new Date(),
//     },
//   ],
// };
