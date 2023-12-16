import React from 'react';
import SInput from '../../components/Custom/SInput';
import SButton from '../../components/Custom/SButton';
import './styles.css';
import Box from '@mui/system/Box';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthenticationAPI } from '../../api/authentication';

const styles = {
  login_btn: {
    text: 'Confirm',
    bgColor: '#187b87',
    hoverColor: '#609aa5',
    color: '#fff',
    icon: '',
  },
};

const ConfirmPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = React.useState({
    isLoading: false,
    password: '',
    cfPassword: '',
    isError: false,
    errorMessage: '',
  });
  const navigate = useNavigate();

  const handleSubmit = React.useCallback(async () => {

    if (data.password === '' || data.cfPassword === '') {
      setData((current) => ({
        ...current,
        isError: true,
        errorMessage: 'Password can not empty',
      }));
      return;
    }
    if (data.password !== data.cfPassword) {
      setData((current) => ({
        ...current,
        isError: true,
        errorMessage: 'Password and confirm password is not matched',
      }));
      return;
    }

    setData((current) => ({ ...current, isLoading: true }));
    const res = await AuthenticationAPI.updatePassword({
      password: data.password,
    });
    setData((current) => ({ ...current, isLoading: false }));
    if (!res.success) {
      alert(res.error?.message);
    } else {
      alert(res.message);
    }
    navigate('/login');
  }, [data]);

  React.useEffect(() => {
    const token = searchParams.get('token');
    const validateToken = async (token) => {
      localStorage.setItem('token', token);
    };

    if (!token) {
      alert('Invalid token');
      navigate('/');
    } else {
      validateToken(token);
    }
  }, []);

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
          <h2 style={{ textAlign: 'center' }}>Update Password</h2>
          <SInput
            label={'Password'}
            type={'password'}
            value={data.password}
            onInputChange={(e) => {
              setData((current) => ({
                ...current,
                isError: false,
                errorMessage: '',
                password: e.target.value,
              }));
            }}
          />

          <SInput
            label={'Confirm password'}
            type={'password'}
            value={data.cfPassword}
            onInputChange={(e) => {
              setData((current) => ({
                ...current,
                isError: false,
                errorMessage: '',
                cfPassword: e.target.value,
              }));
            }}
          />

          {data.isError ? (
            <span
              style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}
            >
              {data.errorMessage}
            </span>
          ) : null}

          <div style={{ marginTop: '30px', fontSize: '12px' }}>
            <SButton styles={styles.login_btn} onButtonClick={handleSubmit} />
          </div>
        </Box>
        <div className="login_image">
          <img src="./login_bg.jpg" />
        </div>
      </div>
    </div>
  );

  return;
};

export default ConfirmPassword;
