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
import { useState } from 'react';

const Page = ({ tab_name }) => {
  var tab;
  switch (tab_name) {
    case ("stream"):
      tab = <Stream />
      break;
    case ("people"):
      tab = <People />
      break;
    case ("grade"):
      tab = <Grade />
      break;
    case ("general"):
      tab = <General />
      break;
    case ("add"):
      tab = <AddClass />
      break;
    default:
      tab = <Stream />
      break;
  }

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
              {tab}
            </Container>
          </ResponsiveDrawer>
        }
      </div>

    </Container>
  );
};

export default Page;
