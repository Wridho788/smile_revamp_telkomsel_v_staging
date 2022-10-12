export interface IBonusTypeVoucher {
    bonus_type: string,
    exp_voucher:string,
    voucher_type:string,
    voucher_combination:string,
    jumlah_total_voucher:number
    stock_location: Array<IStockLocation>,
    redeem_after_verification: boolean
}

export interface IStockLocation {
    location_id: string,
    stock: number
}
