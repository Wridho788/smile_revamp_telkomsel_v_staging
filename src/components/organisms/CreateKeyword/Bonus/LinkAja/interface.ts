export interface IBonusTypeLinkAja {
    nominal:string,
    location:string,
    bonus_type: string,
    external_api_config: string,
    bucket: string,
    stock_location: Array<IStockLocation>,
    redeem_after_verification: boolean
}

export interface IStockLocation {
    bucket: string,
    location_id: string,
    stock: number
}
