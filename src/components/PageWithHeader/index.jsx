import { Container } from '@mui/material';
import PrimarySearchAppBar from '../Header';

const PageWithHeader = ({ children }) => {
  return (
    <Container
      sx={{
        margin: 0,
        border: 'none',
        width: '100vw',
        '&.MuiContainer-root': {
          maxWidth: '100%',
          padding: 0,
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <PrimarySearchAppBar />
      </div>
      {children}
    </Container>
  );
};

export default PageWithHeader;
