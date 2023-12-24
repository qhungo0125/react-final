import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { ADMIN_PAGES } from '../../constant';
const drawerWidth = 240;

// function DemandIcon(props) {
//   const { name = '' } = props;
//   switch (name) {
//     case 'Manage Accounts':
//       return <AccountCircleIcon />;
//     case 'Mapping students':
//       return <ChecklistIcon />;
//     case 'Manage Classes':
//       return <ClassIcon />;
//     default:
//       return;
//   }
// }

function ListItemCustom(props) {
  const { name = '', handleItemClick = () => {} } = props;
  return (
    <ListItem disablePadding onClick={(e) => handleItemClick()}>
      <ListItemButton>
        {/* <DemandIcon name={name} /> */}
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}

function ListCustom(props) {
  const {
    header = '',
    items = [],
    itemsName = [],
    handleItemClick = () => {},
  } = props;
  return (
    <>
      <Typography variant="h5" padding={1} noWrap component="div">
        {header}
      </Typography>
      <List>
        {itemsName.map((name, index) => (
          <ListItemCustom
            handleItemClick={() => handleItemClick(items[index])}
            key={index}
            name={name}
          />
        ))}
      </List>
    </>
  );
}

function ResponsiveDrawer(props) {
  const { t } = useTranslation();
  const { children, handleItemClick } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (value)=>{
    handleItemClick(value);
    handleDrawerToggle();
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <ListCustom
        handleItemClick={handleClick}
        header={t('admin.nav.accounts')}
        items={[ADMIN_PAGES[0], ADMIN_PAGES[2]]}
        itemsName={[t('admin.manage.accounts'), t('admin.mapping.students')]}
      />
      <Divider />
      <ListCustom
        handleItemClick={handleClick}
        header={t('admin.nav.classes')}
        items={[ADMIN_PAGES[1]]}
        itemsName={[t('admin.manage.classes')]}
      />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {t('group.name')}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
