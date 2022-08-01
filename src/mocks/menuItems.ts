import {
    Close,
    AccountBalance,
    Equalizer,
    PeopleAlt,
    PersonSearch,
    Storefront,
    Redeem,
    BrightnessLow
} from "@mui/icons-material";


export interface Menu {
    label: string
    hasChild?: boolean
    icon: any
    child?: ChildMenu[]
    path?: string
}

export interface ChildMenu {
    label: string
    path: string
    alias?: string[]
}

export const menuItems: Menu[] = [
    {
        label: 'Management Program',
        hasChild: true,
        icon: PersonSearch,
        child: [
            {
                label: 'Program',
                path: '/dashboard',
                alias: ['/dashboard'],
            },
            {
                label: 'Program Mechanism',
                path: '/progarmMechanism',
                alias: ['/progarmMechanism'],
            },
        ],
    },

    {
        label: 'Management Program',
        hasChild: false,
        icon: PersonSearch,
        path: '/program-management',
    },
    {
        label: 'Merchant',
        hasChild: false,
        icon: Storefront,
        path: '/dashboard',
    },
    {
        label: 'Configuration',
        hasChild: false,
        icon: BrightnessLow,
        path: '/configuration',
    },
    {
        label: 'Report',
        hasChild: false,
        icon: Equalizer,
        path: '/report',
    },
    {
        label: 'Admin',
        hasChild: false,
        icon: PeopleAlt,
        path: '/admin',
    },

    {
        label: 'Lucky Draw',
        hasChild: false,
        icon: Redeem,
        path: '/luckyDraw',
    }
]
