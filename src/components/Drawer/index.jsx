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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import NavTabs from './tabs.jsx';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext.jsx';
import ClientAxios from '../../utils/axiosConfig.js';

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
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);

  const [open, setOpen] = React.useState(false);
  const [classList, setClassList] = React.useState([]);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); //

  React.useEffect(() => {
    const getClassList = async () => {
      const res = await ClientAxios.get('/classes');
      setClassList(res.data);
    };
    getClassList();
  }, []);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const handleClassChange = (classId) => {
    menuContext.updateClassId(classId);
    menuContext.handleClassTabChanges('stream');
    navigate(`/class/stream?id=${classId}`);
  };

  const handleAddClassButton = () => {
    menuContext.handleTabChanges('add_class');
    navigate('/add_class');
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        open={open}
        sx={{
          backgroundColor: '#fff',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Toolbar sx={{ minHeight: '48px !important', maxWidth: '50px' }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <NavTabs />
          {/* 
          <Box
            sx={{ width: '140px', display: { sx: 'none', sm: 'block' } }}
          ></Box> */}
        </Box>
      </AppBar>
      <Drawer
        sx={{
          height:"90vh",
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'absolute',
          },
          '& .MuiDrawer-paper div': { minHeight: '48px !important' },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography
            noWrap
            component="div"
            sx={{
              width: '100%',
              paddingLeft: '10px',
              paddingTop: '12px',
              fontSize: '17px',
              fontWeight: '500',
            }}
          >
            Class List
          </Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {classList.map((classInfor) => (
            <ListItem key={classInfor._id} disablePadding>
              <ListItemButton onClick={() => handleClassChange(classInfor._id)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <p
                  style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {classInfor.name}
                </p>
                {/* <ListItemText primary={classInfor.name} /> */}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box sx={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
          <IconButton
            color="primary"
            size="large"
            onClick={handleAddClassButton}
          >
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
