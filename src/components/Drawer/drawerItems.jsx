import { Container, Drawer, Stack } from '@mui/material';
import SidebarButtons from '../SidebarButtons';

const DrawerItems = (props) => {
  // eslint-disable-next-line react/prop-types
  const { handleDrawerToggle, drawerWidth, mobileOpen } = props;

  const drawer = (
    <Container
      sx={{
        height: '100%',
        background: '#ebcfcc',
        paddingY: 2,
      }}
    >
      <Stack
        direction="column"
        spacing={0}
        justifyContent="space-between"
        sx={{
          padding: 2,
          height: '100%',
          background: 'white',
          borderRadius: 4,
        }}
      >
        <SidebarButtons />
      </Stack>
    </Container>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          background: 'transparent',
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default DrawerItems;
