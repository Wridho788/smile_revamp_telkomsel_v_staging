import {
    ICreateKeyword,
    IKeywordBonus,
    IKeywordNotification,
} from "./interface";



export const KeywordBonusInitial: IKeywordBonus = {
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

export const KeywordNotificationInitial: IKeywordNotification = {
    notification: "",
    via: "",
    receiver: 0,
    transaction_type: ""
}

export const CreateKeywordInitial: ICreateKeyword = {
    name: "",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    max_redeem_per_msisdn: 0,
    max_redeem_per_msisdn_type: 0,
    max_redeem_per_msisdn_from: "",
    max_redeem_per_msisdn_to: "",
    channel_validation: "",
    telkomsel_los: true,
    telkomsel_los_value: 0,
    enable_coorporate: true,
    customer_tier: "",
    point_type: "",
    comment_approval: "",
    status_approval: "",
    notification_type: "",
    keyword_parent: "",
    keyword_bonus: [KeywordBonusInitial],
    keyword_notification: [KeywordNotificationInitial],
    keyword_type: ""
}
