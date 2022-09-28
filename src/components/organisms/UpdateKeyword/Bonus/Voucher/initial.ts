import {IBonusTypeVoucher, IStockLocation} from "./interface";

export const BonusTypeVoucherInitial: IBonusTypeVoucher = {
    bonus_type: "discount_voucher",
    exp_voucher: "",
    voucher_type: "",
    voucher_combination: "",
    jumlah_total_voucher: 0,
    stock_location: [],
    redeem_after_verification: false
}
