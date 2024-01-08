import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import './style.css';
import TabsName from '../../utils/tabsName';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';

export default function NavTabs() {
  const navigate = useNavigate();
  const { classId } = useParams();

  const menuContext = useContext(MenuContext);

  const handleTabClick = (value) => {
    navigate(`/class/${classId}/${value}`);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleTeacherGradeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClose = (params) => {
    const { origin, path } = params;
    navigate(`/class/${classId}/${origin}/${path}`);
    // menuContext.handleClassTabChanges(eventName);
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: menuContext.displayClassTab ? 'block' : 'none',
      }}
    >
      {menuContext.displayClassTab ? (
        <Tabs
          value={menuContext.classTab}
          sx={{
            marginLeft: '4px',
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTabScrollButton-root': { color: 'black' },
            '& .MuiTabs-flexContainer': { justifyContent: 'center' },
            '& .MuiButtonBase-root': { minHeight: 'inherit' },
            '& .MuiTabs-scroller': {
              marginTop: 'auto',
              marginBottom: 'auto !important',
            },
          }}
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile
        >
          <Tab
            value='stream'
            label={t('label.class.home')}
            onClick={(e) => handleTabClick('stream')}
          />
          <Tab
            value='people'
            label={t('label.class.people')}
            onClick={(e) => handleTabClick('people')}
          />
          <Tab
            value={
              menuContext.classTab.includes('grade')
                ? menuContext.classTab
                : 'grade'
            }
            label={t('label.gradescore')}
            icon={
              localStorage.getItem('role') === 'teacher' && (
                <KeyboardArrowDownIcon />
              )
            }
            iconPosition='end'
            onClick={(e) => {
              localStorage.getItem('role') === 'teacher'
                ? handleTeacherGradeClick(e)
                : handleTabClick('grade');
            }}
          ></Tab>
          <Menu
            id='demo-customized-menu'
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            sx={{ '& .MuiPaper-root': { minWidth: '110px' } }}
          >
            <MenuItem
              onClick={(e) =>
                handleMenuItemClose({
                  origin: 'grade',
                  path: 'upload',
                })
              }
              sx={
                menuContext.classTab === 'grade_upload'
                  ? { backgroundColor: 'aliceblue' }
                  : {}
              }
            >
              {t('label.class.score.upload')}
            </MenuItem>
            <MenuItem
              onClick={(e) =>
                handleMenuItemClose({
                  origin: 'grade',
                  path: 'students',
                })
              }
              sx={
                menuContext.classTab === 'grade_students'
                  ? { backgroundColor: 'aliceblue' }
                  : {}
              }
            >
              {t('label.class.score.students')}
            </MenuItem>
            <MenuItem
              onClick={(e) =>
                handleMenuItemClose({
                  origin: 'grade',
                  path: 'structure',
                })
              }
              sx={
                menuContext.classTab === 'grade_structure'
                  ? { backgroundColor: 'aliceblue' }
                  : {}
              }
            >
              {t('label.class.score.structure')}
            </MenuItem>
            <MenuItem
              onClick={(e) =>
                handleMenuItemClose({
                  origin: 'grade',
                  path: 'review',
                })
              }
              sx={
                menuContext.classTab === 'grade_review'
                  ? { backgroundColor: 'aliceblue' }
                  : {}
              }
            >
              {t('label.class.score.request')}
            </MenuItem>
          </Menu>
        </Tabs>
      ) : (
        <Typography
          variant='subtitle2'
          component='div'
          sx={{
            color: 'black',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '48px',
            fontSize: '17px',
          }}
        >
          {TabsName(menuContext.tab)}
        </Typography>
      )}
    </Box>
  );
}
