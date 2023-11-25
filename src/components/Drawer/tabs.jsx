import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

function LinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (LinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

export default function NavTabs() {
  const navigate = useNavigate()

  const [value, setValue] = React.useState("stream");

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && LinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} sx={{ "& .MuiTabs-indicator": { display: 'none' } }} centered>
        <Tab value="stream" label="Stream" onClick={() => { navigate("/class/stream") }}/>
        <Tab value="people" label="People" onClick={() => { navigate("/class/people") }} />
        <Tab value="grade" label="Grade" onClick={() => { navigate("/class/grade") }}/>
        <Tab value="general" label="General" onClick={() => { navigate("/class/general") }} />
      </Tabs>
    </Box>
  );
}