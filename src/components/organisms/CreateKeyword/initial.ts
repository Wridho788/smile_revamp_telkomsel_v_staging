import {
  ICreateKeyword,
  IKeywordBonus,
  IKeywordNotification,
  IKeywordShift,
} from "./interface";

// export const KeywordBonus: IKeywordBonus = {
//   bonus_type: "",
//   bonus_id: "",
//   bonus_name: "",
//   location: "",
//   bucket: "",
//   limit: 0,
//   stock: 0,
//   qty_denom: "",
//   payment: "",
//   granular: "",
//   bid: "",
// };
// const KeywordShift: IKeywordShift = {
//   from: "00:00",
//   to: "00:00",
// };
// const KeywordNotification: IKeywordNotification = {
//   notification: "",
//   via: "",
//   receiver: "",
// };
export const CreateKeywordGeneral: ICreateKeyword = {
  // keyword_type: "",
  keyword_parent: "",
  name: "",
  start_period: new Date(),
  end_period: new Date(),
  point_type: [],
  poin_value: "",
  poin_redeemed: 0,
  for_new_redeemer: false,
  max_mode: "",
  max_redeem_counter: 0,
  max_redeem_per_msisdn: 0,
  channel_validation: false,
  // channel_validation: [],
  merchandise_keyword: false,
  sms_masking: "",
  keyword_shift: [
    {
      from: new Date().getTime(),
      to: new Date().getTime(),
    },
  ],
  merchant: "",
  merchant_name: "",
  telkomsel_los: false,
  telkomsel_los_type: "",
  telkomsel_los_operator: "",
  telkomsel_los_value: 0,
  telkomsel_los_range_min: 0,
  telkomsel_los_range_max: 0,
  enable_coorporate: false,
  customer_tier: [],
  comment_approval: "",
  keyword_bonus: [
    {
      bonus_type: "",
      bonus_id: "",
      bonus_name: "",
      location: "",
      bucket: "",
      limit: 0,
      stock: 0,
      qty_denom: 0,
      payment: "",
      granular: "",
      bid: "",
    },
  ],
  keyword_notification: [
    {
      notification: "",
      via: "",
      receiver: "",
    },
  ],
};

export const BooleanOption = [
  { _id: "1", set_value: "True" },
  { _id: "2", set_value: "False" },
];

export const PointValueOption = [
  { _id: "Fixed", set_value: "Fixed" },
  { _id: "Flexible", set_value: "Flexible" },
  { _id: "Fixed-Multiple", set_value: "Fixed-Multiple" },
];
export const MaxModeOption = [
  { _id: "Day", set_value: "Day" },
  { _id: "Month", set_value: "Month" },
  { _id: "Year", set_value: "Year" },
  { _id: "Shift", set_value: "Shift" },
  { _id: "Program", set_value: "Program" },
];
export const TelkomselLOSTypeOption = [
  { _id: "Day", set_value: "Day" },
  { _id: "Month", set_value: "Month" },
  { _id: "Year", set_value: "Year" },
];
export const TelkomselLOSOperatorOption = [
  { _id: "LessThan", set_value: "LessThan" },
  { _id: "LessOrEqualTo", set_value: "LessOrEqualTo" },
  { _id: "EqualTo", set_value: "EqualTo" },
  { _id: "MoreThan", set_value: "MoreThan" },
  { _id: "MoreOrEqualTo", set_value: "MoreOrEqualTo" },
  { _id: "Ranged", set_value: "Ranged" },
];
