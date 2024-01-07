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

export default function NavTabs() {
  const navigate = useNavigate()

  const menuContext = useContext(MenuContext)

  const handleTabClick = (e) => {
    menuContext.handleClassTabChanges((e.target.innerText).toLowerCase())
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleTeacherGradeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClose = (event) => {
    menuContext.handleClassTabChanges(`grade_${event.target.innerText.toLowerCase()}`)
    setAnchorEl(null);
  }

  return (
    <Box sx={{
      display: menuContext.displayClassTab ? 'block' : 'none',
    }}>
      {
        menuContext.displayClassTab ?
          <Tabs
            value={menuContext.classTab}
            sx={{
              marginLeft: '4px',
              '& .MuiTabs-indicator': { display: 'none' },
              "& .MuiTabScrollButton-root": { color: 'black' },
              "& .MuiTabs-flexContainer": { justifyContent: 'center' },
              "& .MuiButtonBase-root": { minHeight: 'inherit' },
              "& .MuiTabs-scroller": { marginTop: 'auto', marginBottom: 'auto !important' }
            }}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
          >
            <Tab value="stream" label="Stream" onClick={handleTabClick} />
            <Tab value="people" label="People" onClick={handleTabClick} />
            {localStorage.getItem('role') === "teacher" &&
              <Tab
                value={menuContext.classTab.includes("grade") ? menuContext.classTab : "grade"}
                label="Grade"
                icon={<KeyboardArrowDownIcon />}
                iconPosition="end"
                onClick={handleTeacherGradeClick}
              >
              </Tab>
            }
            {localStorage.getItem('role') === "teacher" &&
              <Menu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{ "& .MuiPaper-root": { minWidth: '110px' }, }}
              >
                <MenuItem
                  onClick={handleMenuItemClose}
                  sx={menuContext.classTab === "grade_detail" ? { backgroundColor: "aliceblue" } : {}}
                >
                  Detail
                </MenuItem>
                <MenuItem
                  onClick={handleMenuItemClose}
                  sx={menuContext.classTab === "grade_structure" ? { backgroundColor: "aliceblue" } : {}}
                >
                  Structure
                </MenuItem>
                <MenuItem
                  onClick={handleMenuItemClose}
                  sx={menuContext.classTab === "grade_review" ? { backgroundColor: "aliceblue" } : {}}
                >
                  Review
                </MenuItem>
              </Menu>
            }

            {localStorage.getItem('role') === "student" &&
              <Tab
                value="grade"
                label="Grade"
                onClick={handleTabClick}
              >
              </Tab>
            }

            {/* <Tab
              className="tab"
              value="general"
              label="General"
              onClick={handleTabClick}
            /> */}

          </Tabs>
          :
          <Typography
            variant="subtitle2"
            component="div"
            sx={{
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '48px',
              fontSize: '17px'
            }}
          >
            {TabsName(menuContext.tab)}
          </Typography>
      }
    </Box >
  );
}