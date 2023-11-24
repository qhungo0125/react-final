import React from 'react';
import ResponsiveDrawer from '../components/Drawer';
import { Container } from '@mui/material';
import { DashBoard } from './Dashboard';
import General from './General';
import People from './People';
import PrimarySearchAppBar from '../components/Header'

const Page = () => {
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
      <div style={{position:"relative"}}>
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
              <People />
            </Container>
          </ResponsiveDrawer>
        }
      </div>

    </Container>
  );
};

export default Page;
