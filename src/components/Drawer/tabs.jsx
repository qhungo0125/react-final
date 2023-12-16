import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';
import './style.css';

export default function NavTabs() {
  const navigate = useNavigate();
  const menuContext = useContext(MenuContext);

  const handleTabClick = (e) => {
    const tabName = e.target.innerText.toLowerCase();
    menuContext.handleClassTabChanges(tabName);
    const { classId } = menuContext;
    navigate(`/class/${tabName}?id=${classId}`);
  };

  return (
    <Box
      sx={{
        display: menuContext.displayClassTab ? 'block' : 'none',
      }}
    >
      <Tabs
        value={menuContext.classTab}
        sx={{
          marginLeft: '4px',
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTabScrollButton-root': { color: 'black' },
          '& .MuiTabs-flexContainer': { justifyContent: 'center' },
        }}
        variant="scrollable"
        scrollButtons="auto"
        // allowScrollButtonsMobile
      >
        <Tab
          className="tab"
          value="stream"
          label="Stream"
          onClick={handleTabClick}
        />
        <Tab
          className="tab"
          value="people"
          label="People"
          onClick={handleTabClick}
        />
        <Tab
          className="tab"
          value="grade"
          label="Grade"
          onClick={handleTabClick}
        />
        <Tab
          className="tab"
          value="general"
          label="General"
          onClick={handleTabClick}
        />
      </Tabs>
    </Box>
  );
}
