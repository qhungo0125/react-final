import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MenuContext } from '../../context/MenuContext';


export default function NavTabs() {
  const navigate = useNavigate()

  const menuContext = useContext(MenuContext)

  const handleTabClick = (e) => {
    console.log(e)
    menuContext.handleClassTabChanges((e.target.innerText).toLowerCase())
  }

  return (
    <Box sx={{
      width: '80%',
      display: menuContext.displayClassTab ? 'block' : 'none',
    }}>
      <Tabs
        value={menuContext.classTab}
        sx={{
          "& .MuiTabs-indicator": { display: 'none' },
          "& .MuiTabScrollButton-root": { color: 'black' },
          "& .MuiTabs-flexContainer": { justifyContent: 'center' }
        }}
        variant='scrollable'
        scrollButtons='auto'
        allowScrollButtonsMobile
      >
        <Tab value="stream" label="Stream" onClick={handleTabClick} />
        <Tab value="people" label="People" onClick={handleTabClick} />
        <Tab value="grade" label="Grade" onClick={handleTabClick} />
        <Tab value="general" label="General" onClick={handleTabClick} />
      </Tabs>
    </Box>
  );
}