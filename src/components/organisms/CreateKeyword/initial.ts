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
} from "./interfaces";

export const KeywordEligibilityLocationHelper: IKeywordEligibilityLocationHelper =
  {
    location_type: "",
  };

const KeywordEligibilityKeywordShift: IKeywordEligibilityKeywordShift = {
  from: new Date(),
  to: new Date(),
};

const KeywordEligibility: IKeywordEligibility = {
  name: "",
  start_period: new Date(),
  end_period: new Date(),
  keyword_type: "",
  point_type: "",
  poin_value: "",
  poin_redeemed: 0,
  channel_validation: false,
  channel_validation_list: [],
  program_id: "",
  eligibility_locations: false,
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
};

export const KeywordBonusLuckyDrawLocation: IKeywordBonusLuckyDrawLocation = {
  location_id: "",
  stock: 0,
};

export const KeywordBonusLuckyDraw: IKeywordBonusLuckyDraw = {
  bonus_type: "",
  lucky_draw_reguler: true,
  lucky_draw_allow_inject_coupon: false,
  lucky_draw_prize: "",
  redeem_after_verification: false,
  locations: [],
};

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
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
    {
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
    {
      code_identifier: "",
      notification_content: "",
      start_period: new Date(),
      end_period: new Date(),
      notif_type: "",
      via: "",
    },
    {
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
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
    code_identifier: "",
    notification_content: "",
    start_period: new Date(),
    end_period: new Date(),
    notif_type: "",
    via: "",
  },
  {
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
  bonus: [KeywordBonusLuckyDraw],
  notification: [
    ...KeywordNotificationEligibility,
    ...KeywordNotificationLuckyDraw,
  ],
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
