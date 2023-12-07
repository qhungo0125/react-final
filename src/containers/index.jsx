import React from 'react';
import ResponsiveDrawer from '../components/Drawer';
import { Container } from '@mui/material';
import DashBoard from './Dashboard';
import Stream from './Stream';
import People from './People';
import Grade from './Grade';
import AddClass from './AddClass';
import PrimarySearchAppBar from '../components/Header'
import Detail from './Grade/Detail';
import Review from './Grade/Review';
import Structure from './Grade/Structure';

import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const identifyTabs = () => {
  const menuContext = useContext(MenuContext)

  var tab;
  if (menuContext.displayClassTab) {
    var currentClassTab = menuContext.classTab
    switch (currentClassTab) {
      case ("stream"):
        tab = <Stream />
        break;
      case ("people"):
        tab = <People />
        break;
      case ("grade_detail"):
        tab = <Detail />
        break;
      case ("grade_structure"):
        tab = <Structure />
        break;
      case ("grade_review"):
        tab = <Review />
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
  return (
    <Container
      sx={{
        margin: 0,
        border: 'none',
        width: '100%',
        marginBottom:'50px',
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
                  marginTop:'0 !important'
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
