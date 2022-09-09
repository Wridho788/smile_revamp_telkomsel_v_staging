export interface IWhitelist {
    type: string
    msisdn: string
    counter: number
    program: string
}

export interface IBlacklist {
    type: string
    msisdn: string
    program:string
}
export interface IWhitelistArray {
    data : Array<IWhitelist>
}

export interface IBlacklistArray {
    data : Array<IBlacklist>
}
