import {KeywordBonus, KeywordNotification, KeywordShift} from "./interface";

const KeywordBonus: KeywordBonus = {
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
const KeywordShift: KeywordShift = {
    from: "00:00",
    to: "00:00"
}
const KeywordNotification: KeywordNotification =
    {
        notification: "",
        via: "",
        receiver: "",
    }
export const CreateKeywordGeneral = {
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

