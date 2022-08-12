import {
    IBonus,
    ICreateKeyword,
    IKeywordBonus,
    IKeywordNotification,
    IMainInfo,
} from "../Interface/IKeyword";
import {IKeywordPageData} from "../Interface/IKeyword";
import {NotificationInitial} from "./ProgramInitial";

const MainInfoInitial: IMainInfo = {
    keyword_type: [],
    point_type: [],
    mechanism: [],
}

const BonusInitial: IBonus = {
    bonus_type: [],
    bonus: [],

}

export const KeywordPageDataInitial: IKeywordPageData = {
    main_info: MainInfoInitial,
    bonus: BonusInitial,
    notification: NotificationInitial
}

export const KeywordBonusInitial: IKeywordBonus = {
    bonus_type: "62ec176c0c884b4e4c5b6059",
    location: "tes",
    limit: 1,
    stock: 1,
    bucket: "tes",
    qty_denom: "tes",
    payment: "tes",
    granular: "tes",
    bid: "tes",
    bonus_id: "tes",
    bonus_name: "tes",
}

export const KeywordNotificationInitial: IKeywordNotification = {
    notification: "tes",
    via: "tes",
    receiver: 1,
    transaction_type: "62f142b6bbdf15809f92c004"
}

export const CreateKeywordInitial: ICreateKeyword = {
    name: "tes",
    start_period: "2022-01-01",
    end_period: "2022-01-01",
    max_redeem_per_msisdn: 1,
    max_redeem_per_msisdn_type: 1,
    max_redeem_per_msisdn_from: "tes",
    max_redeem_per_msisdn_to: "tes",
    channel_validation: "tes",
    telkomsel_los: true,
    telkomsel_los_value: 1,
    enable_coorporate: true,
    customer_tier: "tes",
    point_type: "tes",
    comment_approval: "tes",
    status_approval: "tes",
    notification_type: "tes",
    keyword_parent: "tes",
    keyword_bonus: [KeywordBonusInitial],
    keyword_notification: [KeywordNotificationInitial],
    keyword_type: "tes"
}
