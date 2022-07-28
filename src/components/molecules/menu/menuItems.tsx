
import {BarChart, Redeem} from "@mui/icons-material";
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
    label: 'Home',
    hasChild: false,
    icon: BarChart,
    path: '/',
  },
  {
    label: 'Trade',
    hasChild: true,
    icon: Redeem,
    child: [
      {
        label: 'Exchange',
        path: '/swap',
        alias: ['/swap'],
      },
      {
        label: 'Liquidity',
        path: '/liquidity',
        alias: ['/liquidity', '/add', '/remove', '/find'],
      },
      {
        label: 'LP Migration',
        path: '/trade/lp_migration',
      },
    ],
  },
  {
    label: 'Farms',
    hasChild: false,
    icon: Redeem,
    path: '/farms',
  },
]
