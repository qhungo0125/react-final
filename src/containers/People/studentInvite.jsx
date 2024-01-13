import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import ClientAxios from '../../utils/axiosConfig';
import { t } from 'i18next';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function StudentInviteModal({ open, classId, handleClose }) {
  const [email, setEmail] = React.useState('');

  const handleInvite = async () => {
    // send request
    const res = await ClientAxios.post('/class/invite', {
      classId: classId,
      teacherEmails: [],
      studentEmails: [email],
    });
    if (res && res.success) {
      alert('Invitation has been sent.');
    } else {
      alert(res.error.message);
    }
    handleClose();
  };
  return (
    <BootstrapDialog aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle
        sx={{ m: 0, p: 2, width: '500px' }}
        id='customized-dialog-title'
      >
        {t('label.students.invitaion')}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Email Address'
          type='email'
          fullWidth
          variant='standard'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          {t('label.button.cancel')}
        </Button>
        <Button autoFocus onClick={handleInvite}>
          {t('label.button.invite')}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
