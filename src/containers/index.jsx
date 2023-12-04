import React from 'react';
import ResponsiveDrawer from '../components/Drawer';
import { Container } from '@mui/material';
import DashBoard from './Dashboard';
import Stream from './Stream';
import People from './People';
import Grade from './Grade';
import General from './General'
import AddClass from './AddClass';
import PrimarySearchAppBar from '../components/Header'

import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const identifyTabs = () => {
  const menuContext = useContext(MenuContext)

  var tab;
  if (menuContext.displayClassTab) {
    switch (menuContext.classTab) {
      case ("stream"):
        tab = <Stream />
        break;
      case ("people"):
        tab = <People />
        break;
      case ("grade"):
        tab = <Grade />
        break;
      case ("add"):
        tab = <AddClass />
        break;
      default:
        tab = <Stream />
        break;
    }
  } else {
    switch (menuContext.tab) {
      case ("home"):
        tab = <DashBoard />
        break;
      case ("add_class"):
        tab = <AddClass />
        break;
      default:
        tab = <DashBoard />
        break;
    }
  }

  return tab
}

const Page = () => {
  const menuContext = useContext(MenuContext)

  return (
    <Container
      sx={{
        margin: 0,
        border: 'none',
        width: '100%',
        '&.MuiContainer-root': {
          maxWidth: '100%',
          padding: 0,
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <PrimarySearchAppBar />
      </div>
      <div>
        {
          <ResponsiveDrawer>
            <Container
              sx={{
                mt: { xs: 6, sm: 0 },
                background: 'white',
                borderRadius: 4,
                paddingY: 2,
                '&.MuiContainer-root': {
                  maxWidth: '100%',
                },
                height: '80vh'
              }}
            >
              {/* <DashBoard /> */}
              {identifyTabs()}
            </Container>
          </ResponsiveDrawer>
        }
      </div>

    </Container>
  );
};

export default Page;
