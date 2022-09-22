export const BooleanOptions = [
  { _id: true, set_value: "True" },
  { _id: false, set_value: "False" },
];

export const PoinValueOptions = [
  { _id: "Fixed", set_value: "Fixed" },
  { _id: "Flexible", set_value: "Flexible" },
  { _id: "Fixed-Multiple", set_value: "Fixed-Multiple" },
];
export const MaxModeOptions = [
  { _id: "Day", set_value: "Day" },
  { _id: "Month", set_value: "Month" },
  { _id: "Year", set_value: "Year" },
  { _id: "Shift", set_value: "Shift" },
  { _id: "Program", set_value: "Program" },
];
export const KeywordScheduleTypeOptions = [
  { _id: "Shift", set_value: "Shift" },
  { _id: "Daily", set_value: "Daily" },
  // { _id: "Hourly", set_value: "Hourly" },
];
export const ComparisonOptions = [
  { _id: "LessThan", set_value: "LessThan" },
  { _id: "LessOrEqualTo", set_value: "LessOrEqualTo" },
  { _id: "EqualTo", set_value: "EqualTo" },
  { _id: "MoreThan", set_value: "MoreThan" },
  { _id: "MoreOrEqualTo", set_value: "MoreOrEqualTo" },
  { _id: "Ranged", set_value: "Ranged" },
];

export const CustomerTypeOptions = [
  { _id: "RegularOnly", set_value: "Regular Only" },
  { _id: "CorporateOnly", set_value: "Corporate Only" },
  { _id: "Both", set_value: "Both" },
];

export const StockTypeOptions = [
  { _id: "no_stock", set_value: "No Stock" },
  { _id: "daily", set_value: "Daily" },
  { _id: "daily_carry_over", set_value: "Daily Carry Over" },
  { _id: "carry_over", set_value: "Carry Over" },
  { _id: "shift", set_value: "Shift" },
];
