import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddIcon from '@mui/icons-material/Add';
import { classes } from '../../utils/sampleData';
import { useNavigate } from 'react-router-dom';
import NavTabs from './tabs.jsx';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext.jsx';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft(props) {
  const navigate = useNavigate()
  const menuContext = useContext(MenuContext)

  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(prev => !prev);
  };

  const handleClassChange = () => {
    menuContext.handleClassTabChanges("stream")
    navigate("/class/stream")
  }

  const handleAddClassButton = () => {
    menuContext.handleTabChanges("add_class")
    navigate("/add_class")
  }

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open} sx={{ backgroundColor: '#fff', boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Box sx={{ display: 'flex' }}>
          <Toolbar sx={{ minHeight: '48px !important' }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              // sx={{ mr: 2, ...(open && { display: 'none' }) }}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <NavTabs />
          <Box sx={{ width: "140px" }}></Box>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'absolute',
          },
          '& .MuiDrawer-paper div': { minHeight: '48px !important' }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography noWrap component="div" sx={{ width: '100%', paddingLeft: '10px', paddingTop: '12px', fontSize: '17px', fontWeight: '500' }}>
            Class List
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {classes.map((class_item) => (
            <ListItem key={class_item.id} disablePadding>
              <ListItemButton onClick={handleClassChange}>
                <ListItemIcon sx={{ minWidth: '37px' }}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={class_item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ width: "100%", textAlign: "center", marginTop: "10px" }}>
          <IconButton color="primary" size='large' onClick={handleAddClassButton}>
            <AddIcon />
          </IconButton>
        </Box>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {props.children}
      </Main>
    </Box>
  );
}