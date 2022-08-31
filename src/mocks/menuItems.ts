import {
  Close,
  AccountBalance,
  Equalizer,
  PeopleAlt,
  PersonSearch,
  Storefront,
  Redeem,
  BrightnessLow,
  StarsOutlined,
} from "@mui/icons-material";

export interface Menu {
  label: string;
  hasChild?: boolean;
  icon: any;
  child?: ChildMenu[];
  path?: string;
}

export interface ChildMenu {
  label: string;
  path: string;
  alias?: string[];
}

export const menuItems: Menu[] = [
  {
    label: "Management Program",
    hasChild: true,
    icon: PersonSearch,
    child: [
      {
        label: "Program",
        path: "/dashboard",
        alias: ["/dashboard"],
      },
      {
        label: "Program Mechanism",
        path: "/progarmMechanism",
        alias: ["/progarmMechanism"],
      },
    ],
  },

  {
    label: "Merchant",
    hasChild: true,
    icon: Storefront,
    path: "/dashboard",
    child: [
      {
        label: "Merchant",
        path: "/merchant",
        alias: ["/merchant"],
      },
      {
        label: "Product Category",
        path: "/merchant",
        alias: ["/merchant"],
      },
      {
        label: "Products",
        path: "/merchant",
        alias: ["/merchant"],
      },
      {
        label: "Contract",
        path: "/merchant",
        alias: ["/merchant"],
      },
      {
        label: "P/O",
        path: "/merchant",
        alias: ["/merchant"],
      },
      {
        label: "Merchant User",
        path: "/merchant",
        alias: ["/merchant"],
      },
      {
        label: "Vouchers",
        path: "/merchant",
        alias: ["/merchant"],
      },
    ],
  },
  {
    label: "Configuration",
    hasChild: true,
    icon: BrightnessLow,
    path: "/configuration",
    child: [
      {
        label: "Earning",
        path: "/configuration",
        alias: ["/configuration"],
      },
      {
        label: "Redeemption",
        path: "/configuration",
        alias: ["/configuration"],
      },
      {
        label: "Reward",
        path: "/configuration",
        alias: ["/configuration"],
      },
      {
        label: "Condition",
        path: "/configuration",
        alias: ["/configuration"],
      },
    ],
  },
  {
    label: "Report",
    hasChild: false,
    icon: Equalizer,
    path: "/report",
  },
  {
    label: "Admin",
    hasChild: true,
    icon: PeopleAlt,
    path: "/admin",
    child: [
      {
        label: "User",
        path: "/admin",
        alias: ["/admin"],
      },
      {
        label: "Menu Authorize",
        path: "/admin",
        alias: ["/admin"],
      },
    ],
  },

  {
    label: "Lucky Draw",
    hasChild: false,
    icon: StarsOutlined,
    path: "/luckyDraw",
  },
  {
    label: "Keyword",
    hasChild: false,
    icon: Redeem,
    path: "/keyword",
  },
];
