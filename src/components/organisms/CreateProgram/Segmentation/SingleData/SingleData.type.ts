export interface IWhitelist {
    type: string
    msisdn: string
    counter: number
}

export interface IBlacklist {
    type: string
    msisdn: string
}
export interface IWhitelistArray {
    data : Array<IWhitelist>
}

export interface IBlacklistArray {
    data : Array<IBlacklist>
}
