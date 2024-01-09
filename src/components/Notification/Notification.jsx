import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useGlobal } from '../../context';
import { socket } from '../../socket';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const { changeSocketNotif, socketNotif } = useGlobal();
  React.useEffect(() => {
    const userId = localStorage.getItem('userid');
    if (userId) {
      // Emit 'userConnected' event with the user ID
      socket.emit('userConnected', userId);
    }

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('notification', (data) => {
      console.log('Received welcome event:', data);
      changeSocketNotif(data);
      setOpen(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Additional custom events can be handled here

    return () => {
      // Clean up the socket connection when the component unmounts
      socket.disconnect();
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const buildContent = () => {
    if (!socketNotif) return;
    switch (socketNotif.type) {
      case 'chat':
        return `New message from ${socketNotif.sender}`;
      case 'create_review':
        return `New review from ${socketNotif.sender}`;
      case 'reject':
        return `Your request has been rejected by ${socketNotif.sender}`;
      case 'approve':
        return `Your request has been approved by ${socketNotif.sender}`;
      case 'publish':
        return `Score ${socketNotif.scoreType.name} in class ${socketNotif.scoreType.class} has been published`;
    }
    // return 'This is a success message!';
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
          {buildContent()}
        </Alert>
      </Snackbar>
      {/* <Alert severity='error'>This is an error message!</Alert>
      <Alert severity='warning'>This is a warning message!</Alert>
      <Alert severity='info'>This is an information message!</Alert>
      <Alert severity='success'>This is a success message!</Alert> */}
    </Stack>
  );
}
