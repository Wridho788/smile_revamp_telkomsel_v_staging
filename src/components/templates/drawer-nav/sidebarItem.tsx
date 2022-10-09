import React, { FC, MouseEvent, useEffect } from 'react';
import { Menu } from '../../../mocks/menuItems';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Collapse } from '@mui/material';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { H3, BodyCopy, SmallCopy } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface SidebarItemProps {
  menu: Menu;
  openMenu: boolean;
}

const SidebarItem = ({ menu, openMenu, expandMenu }: SidebarItemProps) => {
  const router = useNavigate();
  const theme = useTheme();
  let [openList, setOpenList] = React.useState<boolean>(false);
  let [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!menuOpen) {
      // setOpenList(true);
      setMenuOpen(expendMenu);
    } else {
      console.log('open menu false', openMenu);
    }
  });
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={() => {
          if (!menu.hasChild) {
            return router(menu.path ?? '/');
          } else {
            setOpenList(!openList);
          }
          // setOpenList(id);
        }}
        component={Link}
        to={menu.path ?? ''}
        sx={{
          minHeight: 48,
          justifyContent: openMenu ? 'initial' : 'center',
          px: 2.5,
        }}>
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: openMenu ? 3 : 'auto',
            justifyContent: 'center',
          }}>
          {<menu.icon />}
        </ListItemIcon>
        <ListItemText
          primary={<SmallCopy>{menu.label}</SmallCopy>}
          sx={{ opacity: openMenu ? 1 : 0 }}
        />
        {menu.hasChild && openMenu ? (
          openList ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : null}
      </ListItemButton>

      <Collapse in={openList} timeout='auto' unmountOnExit>
        <List component='div' sx={{ marginLeft: 5 }} disablePadding>
          <Box>
            {menu.child?.map((child, index) => (
              <ListItem
                key={`menu__child__${index}`}
                disablePadding
                sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to={child.path}
                  sx={{
                    minHeight: 48,
                    justifyContent: openMenu ? 'initial' : 'center',
                    px: 2.5,
                  }}>
                  <ListItemText
                    primary={<SmallCopy>{child.label}</SmallCopy>}
                    sx={{ opacity: openMenu ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        </List>
      </Collapse>
    </ListItem>
  );
};

export default SidebarItem;
