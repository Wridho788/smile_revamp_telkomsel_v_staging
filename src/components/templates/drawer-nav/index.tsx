/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  BtnArrowLeft,
  BtnArrowRight,
  LogoTsel,
  TelkomselLabel,
  UserIcon,
  NotificationActive,
  NotificationDisabled,
} from '../../../assets';
import { menuItems } from '../../../mocks/menuItems';
import SidebarItem from './sidebarItem';
import { SmallCopy } from '../../atoms';
import { useLazyAccountAuthenticateQuery } from '../../../redux/features/account/account-api-slice';
import { useEffect, useState } from 'react';
import UserDetail from 'components/organisms/UserDetail';
import Notification from 'components/organisms/Notifications';

const drawerWidth = 300;
const drawerHeight = '70%';
const drawerPosition = '25%';

const openedMixin = (theme: Theme): CSSObject => ({
  top: drawerPosition,
  width: drawerWidth,
  height: drawerHeight,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  top: drawerPosition,
  height: drawerHeight,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Index: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  // const [open, setOpen] = React.useState<boolean>(false);
  let [open, setOpenList] = useState<boolean>(false);
  const [openUserDetail, setOpenUserDetail] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const handleCloseUserDetail = () => setOpenUserDetail(!openUserDetail);
  const handleCloseNotification = () => setOpenNotification(!openNotification);
  const [
    getAuthenticatedUser,
    { data: accountAuth },
  ] = useLazyAccountAuthenticateQuery();

  useEffect(() => {
    getAuthenticatedUser();
  }, [getAuthenticatedUser, open]);

  return (
    <Box>
      <CssBaseline />
      {openUserDetail && (
        <UserDetail
          open={openUserDetail}
          handleClose={handleCloseUserDetail}
          data={accountAuth}
        />
      )}
      <Drawer variant='permanent' open={open} anchor='right'>
        {open === false ? (
          <Toolbar
            sx={{
              '&.MuiToolbar-root': {
                padding: '16px',
                display: 'flex',
                justifyContent: 'center',
              },
            }}>
            <IconButton color='inherit' aria-label='open drawer' edge='start'>
              <img
                src={LogoTsel}
                srcSet={LogoTsel}
                style={{ width: 28, height: 35 }}
              />
            </IconButton>
          </Toolbar>
        ) : (
          <DrawerHeader>
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
            <SidebarItem
              key={`menuItems__menu__${index}`}
              menu={menu}
              openMenu={open}
            />
          ))}
          <div style={{ height: '50px' }}> </div>
        </List>
        <Divider />
        <ListItem
          disablePadding
          sx={{
            top: 10,
          }}>
          <ListItemButton
            sx={{
              position: 'fixed',
              bottom: 92,
              zIndex: 9,
              width: '100%',
              backgroundColor: '#FFF',
              minHeight: 30,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
            onClick={handleCloseNotification}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}>
              <img src={NotificationDisabled} style={{ height: 25 }} />
            </ListItemIcon>
            <ListItemText
              primary={<SmallCopy>Notifications</SmallCopy>}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>

        <IconButton
          style={{
            position: 'fixed', //Here is the trick
            bottom: 35,
            zIndex: 10,
            right: open ? drawerWidth - 30 : 40,
          }}
          onClick={() => setOpenList((prev) => !prev)}>
          <img
            src={open ? BtnArrowRight : BtnArrowLeft}
            style={{ height: 35 }}
          />
        </IconButton>

        <Box
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 10,
          }}>
          {/* <Divider /> */}
          <ListItem
            disablePadding
            sx={{
              display: 'block',
              top: 10,
            }}>
            <ListItemButton
              sx={{
                position: 'fixed',
                bottom: 32,
                zIndex: 9,
                width: '100%',
                backgroundColor: '#FFF',
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleCloseUserDetail}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                <img src={UserIcon} style={{ height: 30 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <SmallCopy>
                    {accountAuth?.first_name || accountAuth?.last_name
                      ? `${accountAuth?.first_name} ${accountAuth?.last_name}`
                      : 'Unknown'}
                  </SmallCopy>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
      {openNotification && (
        <Notification
          open={openNotification}
          handleClose={handleCloseNotification}
          data={accountAuth?.first_name}
        />
      )}

      <Box component='main' sx={{ flexGrow: 1, p: 3, marginBottom: 40 }}>
        {children}
      </Box>
    </Box>
  );
};
export default Index;
