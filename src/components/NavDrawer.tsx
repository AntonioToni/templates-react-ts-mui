import React from 'react';
import { Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LoginIcon from '@mui/icons-material/Login';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function NavDrawer() {
  const [state, setState] = React.useState(false);
  const { t } = useTranslation();

  const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState( open );
    };
  // UGLY code, to be fixed
  // See https://mui.com/material-ui/react-drawer/ to see original code
  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{
        width: '250px',
      }}
    >
      <LanguageSelector />
      <List>
        <Link to="/" style={{textDecoration: 'none', color: 'rgb(250, 250, 250)'}}>
          <ListItem key="Home" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeRoundedIcon sx={{color: 'rgb(250, 250, 250)'}}/>
                </ListItemIcon>
                <ListItemText primary={t('navDrawer.home')} />
              </ListItemButton>
          </ListItem>
        </Link>
      </List>
        <Divider sx={{borderColor: 'rgb(120, 120, 120)'}}/>
      <List>
        <Link to="register" style={{textDecoration: 'none', color: 'rgb(250, 250, 250)'}}>
          <ListItem key="Register" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <EditNoteIcon sx={{color: 'rgb(250, 250, 250)'}}/>
                </ListItemIcon>
                <ListItemText primary={t('navDrawer.register')} />
              </ListItemButton>
          </ListItem>
        </Link>
        <Link to="login" style={{textDecoration: 'none', color: 'rgb(250, 250, 250)'}}>
          <ListItem key="Login" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LoginIcon sx={{color: 'rgb(250, 250, 250)'}}/> 
              </ListItemIcon>
              <ListItemText primary={t('navDrawer.login')} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  return (
    <>
      <Button onClick={toggleDrawer(true)}> 
        <MenuRoundedIcon sx={{
          fontSize: '48px',
          color: 'rgb(255, 255, 255)',
        }}/> 
      </Button>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: 'rgb(12, 44, 80)',
          }
        }}
        open={state}
        onClose={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}
