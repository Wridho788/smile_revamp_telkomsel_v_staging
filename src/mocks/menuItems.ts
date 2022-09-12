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
  ErrorOutlineOutlined,
  ShareLocationOutlined,
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
    label: "Program Management",
    hasChild: false,
    icon: PersonSearch,
    path: "/program-management",
  },
  {
    label: "Keyword Management",
    hasChild: false,
    icon: Redeem,
    path: "/keyword-management",
  },
  {
    label: "Customer Management",
    hasChild: false,
    icon: PeopleAlt,
    path: "/customer-management",
  },

  {
    label: "Merchant Management",
    hasChild: true,
    icon: Storefront,
    child: [
      {
        label: "Merchant",
        path: "/merchant-management",
        alias: ["/merchant-management"],
      },
      {
        label: "Partner",
        path: "/merchant-partner-management",
        alias: ["/merchant-partner-management"],
      },
      {
        label: "Outlet",
        path: "/merchant-outlet-management",
        alias: ["/merchant-outlet-management"],
      },
    ],
  },

  {
    label: "Notification Management",
    hasChild: false,
    icon: ErrorOutlineOutlined,
    path: "/notification-management",
  },
  {
    label: "Location Management",
    hasChild: false,
    icon: ShareLocationOutlined,
    path: "/location-management",
  },
];
