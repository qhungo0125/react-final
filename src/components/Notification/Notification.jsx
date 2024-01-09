import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useGlobal } from '../../context';
import { socket } from '../../socket';
import { t } from 'i18next';
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
        return t('notif.receive.comment.from', { name: socketNotif.sender });
      case 'create_review':
        return t('notif.receive.request', { name: socketNotif.sender });
      case 'reject':
        return t('notif.receive.reject', { name: socketNotif.sender });
      case 'approve':
        return t('notif.receive.approve', { name: socketNotif.sender });
      case 'publish':
        return t('label.publish.scoretype', {
          type: socketNotif.scoreType.name,
          class: socketNotif.scoreType.class,
        });
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
    </Stack>
  );
}
