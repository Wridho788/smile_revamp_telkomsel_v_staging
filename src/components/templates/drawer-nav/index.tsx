/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Collapse } from "@mui/material";
import {
  BtnArrowLeft,
  BtnArrowRight,
  LogoTsel,
  TelkomselLabel,
  UserIcon,
} from "../../../assets";
import { menuItems } from "../../../mocks/menuItems";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import SidebarItem from "./sidebarItem";
import { SmallCopy } from "../../atoms";

const drawerWidth = 260;
const drawerHeight = "50%";
const drawerPosition = "25%";

const openedMixin = (theme: Theme): CSSObject => ({
  top: drawerPosition,
  width: drawerWidth,
  height: drawerHeight,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  top: drawerPosition,
  height: drawerHeight,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Index: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const theme = useTheme();
  // const [open, setOpen] = React.useState<boolean>(false);
  let [open, setOpenList] = React.useState<boolean>(false);

  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent" open={open} anchor="right">
        {open == false ? (
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start">
              <img
                src={LogoTsel}
                srcSet={LogoTsel}
                style={{ width: 28, height: 35 }}
              />
            </IconButton>
          </Toolbar>
        ) : (
          <DrawerHeader sx={{ justifyContent: "center" }}>
            <img
              src={TelkomselLabel}
              srcSet={TelkomselLabel}
              style={{ height: 55 }}
            />
          </DrawerHeader>
        )}
        <Divider />
        <List>
          {menuItems.map((menu, index) => (
            <SidebarItem menu={menu} openMenu={open} />
          ))}
        </List>

        <IconButton
          style={{
            position: "absolute", //Here is the trick
            bottom: 35,
            left: -10,
          }}
          // onClick={handleClick}
        >
          <img
            src={open ? BtnArrowRight : BtnArrowLeft}
            style={{ height: 35 }}
          />
        </IconButton>

        <Box
          style={{
            width: "100%",
            position: "absolute",
            bottom: 10,
          }}
        >
          <Divider />

          <ListItem
            disablePadding
            sx={{
              display: "block",
              top: 10,
            }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <img src={UserIcon} style={{ height: 30 }} />
              </ListItemIcon>
              <ListItemText
                primary={<SmallCopy>{"Nathan Smitch"}</SmallCopy>}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginBottom: 40 }}>
        {children}
      </Box>
    </Box>
  );
};
export default Index;
