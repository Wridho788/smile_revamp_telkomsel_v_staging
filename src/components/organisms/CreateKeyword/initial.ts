import {IKeywordBonus, IKeywordNotification, IKeywordShift} from "./interface";

const KeywordBonus: IKeywordBonus = {
    bonus_type: "",
    location: "",
    limit: 0,
    stock: 0,
    bucket: "",
    qty_denom: "",
    payment: "",
    granular: "",
    bid: "",
    bonus_id: "",
    bonus_name: "",
}
const KeywordShift: IKeywordShift = {
    from: "00:00",
    to: "00:00"
}
const KeywordNotification: IKeywordNotification =
    {
        notification: "",
        via: "",
        receiver: "",
    }
export const CreateKeywordGeneral = {
    keyword_type:"",
    name: "",
    start_period: new Date,
    end_period: new Date,
    point_type: "",
    point_value: "",
    for_new_redeemer: true,
    max_mode: "",
    max_redeem_counter: 0,
    max_redeem_per_msisdn: 0,
    channel_validation: "",
    merchandise_keyword: false,
    merchant: "",
    merchant_name: "",
    telkomsel_los: true,
    telkomsel_los_type: "",
    telkomsel_los_operator: "",
    telkomsel_los_value: 0,
    telkomsel_los_range_min: 0,
    telkomsel_los_range_max: 0,
    enable_coorporate: true,
    customer_tier: "",
    comment_approval: "",
    keyword_parent: "",
    keyword_bonus: [KeywordBonus],
    keyword_notification: [KeywordNotification],
    keyword_shift: [KeywordShift]
}

export const BooleanOption = [
    {_id: "1", set_value: "True"},
    {_id: "2", set_value: "False"},
];

export const PointValueOption = [
    {_id: "Fixed", set_value: "Fixed"},
    {_id: "Flexible", set_value: "Flexible"},
    {_id: "Fixed-Multiple", set_value: "Fixed-Multiple"},
];
export const MaxModeOption = [
    {_id: "Day", set_value: "Day"},
    {_id: "Month", set_value: "Month"},
    {_id: "Year", set_value: "Year"},
    {_id: "Shift", set_value: "Shift"},
    {_id: "Program", set_value: "Program"},
];
export const TelkomselLOSTypeOption = [
    {_id: "Day", set_value: "Day"},
    {_id: "Month", set_value: "Month"},
    {_id: "Year", set_value: "Year"},
];
export const TelkomselLOSOperatorOption = [
    {_id: "LessThan", set_value: "LessThan"},
    {_id: "LessOrEqualTo", set_value: "LessOrEqualTo"},
    {_id: "EqualTo", set_value: "EqualTo"},
    {_id: "MoreThan", set_value: "MoreThan"},
    {_id: "MoreOrEqualTo", set_value: "MoreOrEqualTo"},
    {_id: "Ranged", set_value: "Ranged"},
];
