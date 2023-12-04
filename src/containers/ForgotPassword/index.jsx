import React from 'react';
import SInput from '../../components/Custom/SInput';
import SButton from '../../components/Custom/SButton';
import './styles.css';
import Box from '@mui/system/Box';
import { Apple, Google } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useForgotState from './state';

const styles = {
  login_btn: {
    text: 'Confirm',
    bgColor: '#187b87',
    hoverColor: '#609aa5',
    color: '#fff',
    icon: '',
  },
};

const ForgotPassword = () => {
  const { data, setEmail, submitForgot } = useForgotState();
  return (
    <div className="login_background">
      <div className="login_wrapper">
        <Box
          className="login_form"
          component="form"
          sx={{
            '& .MuiTextField-root': { marginBlock: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <h2 style={{ textAlign: 'center' }}>Recovery Password</h2>
          <SInput label={'Email'} value={data.email} onInputChange={setEmail} />
          {data.isError ? (
            <span
              style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}
            >
              {data.errorMessage}
            </span>
          ) : null}

          <div style={{ marginTop: '30px', fontSize: '12px' }}>
            <SButton styles={styles.login_btn} onButtonClick={submitForgot} />
          </div>
        </Box>
        <div className="login_image">
          <img src="./login_bg.jpg" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
