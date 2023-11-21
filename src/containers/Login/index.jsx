import SInput from '../../components/Custom/SInput';
import SButton from '../../components/Custom/SButton';
import './styles.css';
import { Box } from '@mui/material';
import { Apple, Google } from '@mui/icons-material';
import { useLogin } from './state';
import { Link } from 'react-router-dom';

const styles = {
  login_btn: {
    text: 'Log in',
    bgColor: '#187b87',
    hoverColor: '#609aa5',
    color: '#fff',
    icon: '',
  },

  login_w_gg: {
    text: 'Log in with Google',
    bgColor: '#fff',
    hoverColor: '#e6e6e6',
    color: '#000000',
    icon: <Google fontSize="inherit" />,
  },
  login_w_apple: {
    text: 'Log in with Apple',
    bgColor: '#000000',
    hoverColor: '#333333',
    color: '#fff',
    icon: <Apple fontSize="inherit" />,
  },
};

function Login() {
  const {
    formData,
    errors,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin();

  const { email, password } = formData;
  const { email: emailError, password: passwordError } = errors;

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
          <h2 style={{ textAlign: 'center' }}>Welcome back</h2>
          <SInput
            label={'Email'}
            value={email}
            onInputChange={handleEmailChange}
          />
          <span style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}>
            {emailError}
          </span>
          <SInput
            label={'Password'}
            type={'password'}
            value={password}
            onInputChange={handlePasswordChange}
          />
          <span style={{ color: 'red', fontSize: '12px', marginLeft: '15px' }}>
            {passwordError}
          </span>
          <div style={{ textAlign: 'right' }}>
            <Link to={'/'} color="inherit" sx={{ fontSize: '10px' }}>
              Forgot Password?
            </Link>
          </div>
          <div style={{ marginTop: '30px', fontSize: '12px' }}>
            <SButton styles={styles.login_btn} onButtonClick={handleLogin} />
          </div>
          <div
            style={{
              marginTop: '10px',
              textAlign: 'left',
              fontSize: '10px',
              color: '#acacab',
            }}
          >
            Don't have an account? &nbsp;
            <Link
              to={'/register'}
              color="#187b87"
              fontSize={'10px'}
              fontWeight={'500'}
            >
              Sign up
            </Link>
          </div>
          <div style={{ marginTop: '30px', fontSize: '11px' }}>
            <SButton styles={styles.login_w_apple} />
          </div>
          <div style={{ marginTop: '10px', fontSize: '11px' }}>
            <SButton styles={styles.login_w_gg} />
          </div>
        </Box>
        <div className="login_image">
          <img src="./login_bg.jpg" />
        </div>
      </div>
    </div>
  );
}

export default Login;
